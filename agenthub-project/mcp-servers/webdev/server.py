from fastapi import FastAPI
import httpx
import uvicorn
import os

app = FastAPI()

PORT = int(os.getenv("PORT", 8002))


# Herramienta: buscar_documentacion
# Recibe: {"query": "how to use flexbox css"}
# Devuelve: {"result": "texto con resultados de MDN"}
@app.post("/tools/buscar_documentacion")
async def buscar_documentacion(body: dict):
    query = body.get("query", "")
    try:
        with httpx.Client(timeout=15) as client:
            response = client.get(
                "https://developer.mozilla.org/api/v1/search",
                params={"q": query, "locale": "en-US", "limit": 3}
            )
            data = response.json()
            docs = data.get("documents", [])
            if not docs:
                return {"result": "No se encontraron resultados en MDN."}
            texto = ""
            for doc in docs:
                texto += f"- {doc.get('title')}\n"
                texto += f"  {doc.get('summary', '')[:300]}\n"
                texto += f"  URL: https://developer.mozilla.org{doc.get('mdn_url', '')}\n\n"
            return {"result": texto}
    except Exception as e:
        return {"result": f"Error: {str(e)}"}


# Herramienta: buscar_npm
# Recibe: {"package_name": "axios"}
# Devuelve: {"result": "info del paquete"}
@app.post("/tools/buscar_npm")
async def buscar_npm(body: dict):
    package_name = body.get("package_name", "")
    try:
        with httpx.Client(timeout=15) as client:
            response = client.get(f"https://registry.npmjs.org/{package_name}/latest")
            if response.status_code != 200:
                return {"result": f"Paquete '{package_name}' no encontrado."}
            data = response.json()
            texto = (
                f"Paquete: {data.get('name')} v{data.get('version')}\n"
                f"Descripción: {data.get('description', 'N/A')}\n"
                f"Licencia: {data.get('license', 'N/A')}\n"
                f"Homepage: {data.get('homepage', 'N/A')}\n"
                f"Repositorio: {data.get('repository', {}).get('url', 'N/A')}"
            )
            return {"result": texto}
    except Exception as e:
        return {"result": f"Error: {str(e)}"}


# Herramienta: validar_html
# Recibe: {"html": "<html>...</html>"}
# Devuelve: {"result": "errores encontrados o 'HTML válido'"}
@app.post("/tools/validar_html")
async def validar_html(body: dict):
    html = body.get("html", "")
    try:
        with httpx.Client(timeout=15) as client:
            response = client.post(
                "https://validator.w3.org/nu/",
                params={"out": "json"},
                content=html.encode("utf-8"),
                headers={"Content-Type": "text/html; charset=utf-8"}
            )
            data = response.json()
            messages = data.get("messages", [])
            if not messages:
                return {"result": "HTML válido, sin errores."}
            errores = [
                f"[{m['type']}] línea {m.get('lastLine', '?')}: {m['message']}"
                for m in messages[:5]
            ]
            return {"result": "\n".join(errores)}
    except Exception as e:
        return {"result": f"Error: {str(e)}"}


@app.get("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)