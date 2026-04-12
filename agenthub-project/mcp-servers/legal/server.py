from fastapi import FastAPI
import httpx
import uvicorn
import os

# Servidor de herramientas del agente LexAdvisor.
# Expone endpoints REST que ejecuta McpClientService cuando el LLM solicita una herramienta.
# Usa Tavily como motor de búsqueda web especializado para agentes de IA.

app = FastAPI()

# API Key de Tavily — cargada desde backend/.env via docker-compose (env_file)
# Nunca hardcodeada en código. Si está vacía, las búsquedas fallarán con 401.
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY", "")


# Herramienta: buscar_boe
# El LLM llama a este endpoint cuando necesita consultar legislación española.
# Recibe: {"query": "despido improcedente"}
# Devuelve: {"result": "texto con resumen + fuentes"}
# Tavily busca en internet enfocando en BOE y fuentes legales españolas.
@app.post("/tools/buscar_boe")
async def buscar_boe(body: dict):
    query = body.get("query", "")
    try:
        with httpx.Client(timeout=15) as client:
            response = client.post(
                "https://api.tavily.com/search",
                json={
                    "api_key": TAVILY_API_KEY,
                    "query": f"{query} legislación española BOE",
                    "search_depth": "advanced",
                    "max_results": 3,
                    "include_answer": True
                }
            )
            print(f"Tavily status: {response.status_code}")
            data = response.json()
            
            # Tavily devuelve dos cosas útiles:
            #   - answer: resumen generado por IA (muy útil como contexto para el LLM)
            #   - results: lista de fuentes con título, extracto y URL
            if response.status_code == 200:
                answer = data.get("answer", "")
                results = data.get("results", [])

                texto = ""
                if answer:
                    texto += f"Resumen: {answer}\n\n"
                for r in results:
                    texto += f"- {r.get('title', 'Sin título')}\n"
                    texto += f"  {r.get('content', '')[:200]}\n"
                    texto += f"  URL: {r.get('url', '')}\n\n"

                return {"result": texto if texto else "No se encontraron resultados"}

            return {"result": f"Error Tavily: {response.status_code} - {response.text[:100]}"}
    except Exception as e:
        return {"result": f"Error: {str(e)}"}

# Herramienta: consultar_articulo
# El LLM llama a este endpoint cuando el usuario pregunta por un artículo concreto.
# Recibe: {"ley": "Estatuto de los Trabajadores", "articulo": "55"}
# Devuelve: {"result": "texto con el contenido del artículo"}
@app.post("/tools/consultar_articulo")
async def consultar_articulo(body: dict):
    ley = body.get("ley", "")
    articulo = body.get("articulo", "")
    try:
        with httpx.Client(timeout=15) as client:
            response = client.post(
                "https://api.tavily.com/search",
                json={
                    "api_key": TAVILY_API_KEY,
                    "query": f"{ley} artículo {articulo} España BOE",
                    "search_depth": "advanced",
                    "max_results": 2,
                    "include_answer": True
                }
            )
            data = response.json()
            if response.status_code == 200:
                answer = data.get("answer", "")
                results = data.get("results", [])
                texto = answer if answer else ""
                for r in results[:2]:
                    texto += f"\n- {r.get('title')}: {r.get('content', '')[:300]}"
                return {"result": texto or "No encontrado"}
            return {"result": f"Error: {response.status_code}"}
    except Exception as e:
        return {"result": f"Error: {str(e)}"}


if __name__ == "__main__":
    # Arranca el servidor en 0.0.0.0 para ser accesible desde otros contenedores Docker.
    # Puerto 8001 — configurado en docker-compose y guardado en mcp_server_url de la BD.
    # En Railway, este servicio se despliega como un servicio independiente con URL pública.
    uvicorn.run(app, host="gleaming-growth-production-1b6d.up.railway.app", port=8001)