# AgentHub
Trabajo de proyectos2 marketplace de agentes de ia

Distribuccion de las carpetas iniciales 
agenthub-project/
├── backend/                # Proyecto Spring Boot (Java 21)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/agenthub/
│   │   │   │   ├── controllers/    # Exposición de la API [cite: 118]
│   │   │   │   ├── services/       # Lógica de negocio [cite: 118]
│   │   │   │   ├── repositories/   # Acceso a base de datos (PostgreSQL/Hibernate) 
│   │   │   │   ├── models/         # Entidades de dominio [cite: 116]
│   │   │   │   └── security/       # Configuración de JWT y seguridad [cite: 100]
│   │   │   └── resources/          # Configuración (application.properties)
│   │   └── test/                   # Testeo por capas 
│   ├── pom.xml                     # Gestión de dependencias Maven [cite: 119]
│   └── Dockerfile                  # Contenerización para Azure [cite: 122]
├── frontend/               # Proyecto React.js
│   ├── public/
│   ├── src/
│   │   ├── components/             # Componentes reutilizables de la interfaz
│   │   ├── pages/                  # Vistas (Registro, Búsqueda, Dashboard) [cite: 106, 111]
│   │   ├── services/               # Llamadas a la API Rest del backend [cite: 120]
│   │   └── assets/                 # Imágenes, estilos (accesibilidad WCAG 2.1 AA) [cite: 123]
│   ├── package.json
│   └── Dockerfile                  # Contenerización para Azure [cite: 122]
└── docker-compose.yml              # Orquestación de contenedores (App + PostgreSQL)