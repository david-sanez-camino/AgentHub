# AgentHub - Configuración Docker

Este proyecto utiliza Docker Compose para orquestar todos los servicios necesarios.

## Servicios

- **PostgreSQL** (puerto 5432): Base de datos principal
- **Ollama** (puerto 11434): Servidor LLM local
- **Backend** (puerto 8080): API Spring Boot
- **Frontend** (puerto 3000): Aplicación React

## Iniciar el proyecto

```bash
# Construir e iniciar todos los servicios
docker-compose up --build

# Iniciar en segundo plano
docker-compose up -d
```

## Configurar Ollama

Después de levantar los servicios, descarga el modelo LLM:

```bash
docker exec -it agenthub-project-ollama-1 ollama pull phi3:mini
```

## Comandos útiles

```bash
# Ver logs
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reconstruir un servicio específico
docker-compose up --build backend
```

## URLs de acceso

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Ollama API: http://localhost:11434
- PostgreSQL: localhost:5432

## Variables de entorno

Las credenciales por defecto son:
- DB Name: `agenthub`
- DB User: `agenthub`
- DB Password: `agenthub123`

⚠️ **Importante**: Cambiar estas credenciales en producción.

## Estructura de archivos

```
.
├── docker-compose.yml          # Orquestación de servicios
├── backend/
│   ├── Dockerfile              # Imagen del backend
│   └── .dockerignore
└── frontend/
    ├── Dockerfile              # Imagen del frontend
    └── .dockerignore
```
