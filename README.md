# AgentHub

Marketplace de agentes de inteligencia artificial donde desarrolladores publican agentes, clientes los compran y los usan, y administradores gestionan la plataforma.

**Producción:** https://agent-hub-ashy-six.vercel.app/

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 18, Tailwind CSS, React Router |
| Backend | Spring Boot 3, Java 21, Spring Security, JWT |
| Base de datos | PostgreSQL 16 |
| LLM | OpenRouter API (claude-3-haiku, gpt-oss-20b) |
| Pagos | Stripe |
| Servidores MCP | Python 3 + FastAPI |
| Email | Gmail SMTP |
| Despliegue frontend | Vercel |
| Despliegue backend/BD | Railway |

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend (React)                   │
│         Vercel · https://agent-hub-ashy-six.vercel.app  │
└────────────────────────┬────────────────────────────────┘
                         │ REST / JSON
┌────────────────────────▼────────────────────────────────┐
│              Backend (Spring Boot)                      │
│         Railway · :8080                                 │
│                                                         │
│  AuthController  AgenteController  ChatController       │
│  DesarrolladorController  PaymentController             │
│                                                         │
│  ┌──────────────┐   ┌──────────────┐                   │
│  │ OpenRouter   │   │ McpClient    │                   │
│  │ Service      │──▶│ Service      │──▶ MCP Servers    │
│  └──────────────┘   └──────────────┘                   │
└────────────────────────┬────────────────────────────────┘
                         │ JPA / Hibernate
┌────────────────────────▼────────────────────────────────┐
│                  PostgreSQL (Railway)                   │
│  usuario · desarrollador · agente · herramienta         │
│  agente_herramienta · conversacion · mensaje            │
└─────────────────────────────────────────────────────────┘

Servidores MCP (FastAPI · Python)
  mcp-legal  :8001 — búsqueda legislación BOE (Tavily API)
  mcp-webdev :8002 — docs MDN, paquetes NPM, validación HTML
```

---

## Roles y funcionalidades

### Admin
- Ver y gestionar todos los usuarios y desarrolladores (aprobar / rechazar)
- Ver todos los agentes con filtros por estado (PENDIENTE / APROBADO / RECHAZADO)
- Hacer clic en el nombre de un agente para ver sus detalles completos y probarlo en un chat integrado
- Aprobar o rechazar agentes directamente desde el panel o desde el modal de detalle

### Desarrollador
- Registrarse y ser aprobado por el admin
- Crear y publicar agentes (nombre, descripción, categoría, modelo, system prompt, precio, URL MCP)
- Ver sus agentes y su estado de verificación
- Probar sus agentes en un chat en tiempo real
- Los agentes quedan en estado PENDIENTE hasta que el admin los aprueba

### Cliente
- Registrarse y acceder al marketplace
- Ver todos los agentes aprobados, filtrar y buscar
- Comprar agentes mediante Stripe
- Acceder a sus agentes comprados y chatear con ellos
- Recuperar contraseña por email

---

## Flujo de chat con herramientas MCP

```
Usuario envía mensaje
  → ChatService carga el agente y sus Herramientas (con mcp_server_url)
  → OpenRouterService fase 1: envía mensaje + tools al LLM
  → Si el LLM decide usar una tool:
      → McpClientService hace POST a {mcp_server_url}/tools/{toolName}
      → El servidor MCP consulta la API externa (Tavily, MDN, NPM…)
      → El resultado vuelve al LLM (fase 2)
  → LLM redacta la respuesta final
  → Se persiste en Conversacion / Mensaje
```

---

## Base de datos

| Tabla | Descripción |
|---|---|
| `usuario` | Todos los usuarios de la plataforma |
| `desarrollador` | Perfil extendido del desarrollador (empresa, estado) |
| `agente` | Agentes publicados (nombre, modelo, systemPromt, precio, estado) |
| `herramienta` | Herramientas MCP disponibles (nombre, mcp_server_url, esquema) |
| `agente_herramienta` | Relación N:M entre agentes y herramientas |
| `conversacion` | Sesiones de chat entre usuario y agente |
| `mensaje` | Mensajes individuales de cada conversación |
| `instancia_agente` | Registro de agentes comprados por clientes |

---


## Ejecución en desarrollo

```bash
# 1. Entrar al directorio del proyecto
cd agenthub-project

# 2. Crear el fichero .env con las variables de arriba

# 3. Levantar todos los servicios (PostgreSQL + Backend + Frontend + MCP)
docker compose up --build

# 4. Acceder en el navegador
http://localhost:3000
```

Los servicios levantados por Docker:

| Servicio | Puerto |
|---|---|
| Frontend (React) | 3000 |
| Backend (Spring Boot) | 8080 |
| PostgreSQL | 5432 |
| MCP Legal (FastAPI) | 8001 |

---

## Estructura del proyecto

```
AgentHub/
├── README.md
└── agenthub-project/
    ├── docker-compose.yml
    ├── backend/                          # Spring Boot
    │   ├── Dockerfile
    │   ├── pom.xml
    │   └── src/main/java/com/agenthub/
    │       ├── controller/
    │       │   ├── AgenteController.java
    │       │   ├── AuthController.java
    │       │   ├── ChatController.java
    │       │   ├── DesarrolladorController.java
    │       │   └── PaymentController.java
    │       ├── model/
    │       │   ├── dto/                  # Request / Response DTOs
    │       │   └── entity/               # Entidades JPA
    │       ├── repository/               # Spring Data JPA
    │       ├── security/                 # JWT filter + SecurityConfig
    │       └── service/
    │           ├── AgenteService.java
    │           ├── ChatService.java
    │           ├── McpClientService.java
    │           ├── OpenRouterService.java
    │           └── UsuarioService.java
    ├── frontend/                         # React + Tailwind
    │   └── src/
    │       ├── components/
    │       ├── pages/
    │       │   ├── PantallasAdmin/
    │       │   ├── PantallasCliente/
    │       │   ├── PantallasDesarrollador/
    │       │   ├── PantallaChatAgentes/
    │       │   └── PantallaPrincipal/    # Home + Marketplace
    │       └── services/
    │           ├── auth.js
    │           └── conexion_api.js
    └── mcp-servers/
        ├── legal/                        # Tavily — legislación BOE
        │   ├── server.py
        │   ├── requirements.txt
        │   └── Dockerfile
        └── webdev/                       # MDN + NPM + W3C
            ├── server.py
            ├── requirements.txt
            └── Dockerfile
```

---

## API principal

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/auth/registro` | Registro de usuario |
| POST | `/api/auth/login` | Login — devuelve JWT |
| POST | `/api/auth/forgot-password` | Solicitar reset de contraseña |
| POST | `/api/auth/reset-password` | Resetear contraseña con token |
| GET | `/api/agentes` | Listar agentes aprobados (marketplace) |
| GET | `/api/agentes/{id}` | Detalle de un agente |
| POST | `/api/agentes` | Crear agente (desarrollador) |
| PUT | `/api/agentes/{id}/aprobar` | Aprobar agente (admin) |
| PUT | `/api/agentes/{id}/rechazar` | Rechazar agente (admin) |
| POST | `/api/chat` | Enviar mensaje a un agente |
| POST | `/api/payments/create-payment-intent` | Iniciar pago Stripe |
| GET | `/api/payments/mis-agentes` | Agentes comprados por el cliente |
