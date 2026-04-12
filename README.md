# AgentHub
Para la ejecucion de la aplicacion seguir los siguientes pasos:

DESARROLLO
1. cd agenthub-project
2. Abrir Docker Desktop
3. Ejecutar docker compose up --build
4. Acceder a : http://localhost:3000/

PRODUCCION
https://agent-hub-ashy-six.vercel.app/

Ha dia 1/03/2026 solamente se desarrollo el home, login , creacion de usuario. Hay mas apartados en desarrollo pero pendientes de implementacion que se haran durante las semanas posteriores. Aclaramos esto ya que hubo problemas tecnicos con el alcance del proyecto durante el desarrollo que se comentaron al profesor Roberto.
```text
AgentHub/
├── Guia_GitFlow_10.md
├── README.md
└── agenthub-project/
	├── .vscode/
	│   └── settings.json
	├── backend/
	│   ├── .dockerignore
	│   ├── Dockerfile
	│   ├── pom.xml
	│   ├── src/
	│   │   ├── main/
	│   │   │   ├── java/
	│   │   │   │   └── com/
	│   │   │   │       └── agenthub/
	│   │   │   │           ├── Application.java
	│   │   │   │           ├── controller/
	│   │   │   │           │   ├── AgenteController.java
	│   │   │   │           │   ├── AuthController.java
	│   │   │   │           │   └── DesarrolladorController.java
	│   │   │   │           ├── controllers/
	│   │   │   │           ├── exception/
	│   │   │   │           │   ├── GlobalExceptionHandler.java
	│   │   │   │           │   └── ResourceNotFoundException.java
	│   │   │   │           ├── model/
	│   │   │   │           │   ├── dto/
	│   │   │   │           │   │   ├── AgenteRequest.java
	│   │   │   │           │   │   ├── AgenteResponse.java
	│   │   │   │           │   │   ├── DesarrolladorRequest.java
	│   │   │   │           │   │   ├── DesarrolladorResponse.java
	│   │   │   │           │   │   ├── LoginRequest.java
	│   │   │   │           │   │   ├── LoginResponse.java
	│   │   │   │           │   │   ├── RegistroUsuarioRequest.java
	│   │   │   │           │   │   └── UsuarioResponse.java
	│   │   │   │           │   └── entity/
	│   │   │   │           │       ├── Agente.java
	│   │   │   │           │       ├── Conversacion.java
	│   │   │   │           │       ├── Desarrollador.java
	│   │   │   │           │       ├── Herramienta.java
	│   │   │   │           │       ├── InstanciaAgente.java
	│   │   │   │           │       ├── Mensaje.java
	│   │   │   │           │       └── Usuario.java
	│   │   │   │           ├── models/
	│   │   │   │           ├── repositories/
	│   │   │   │           ├── repository/
	│   │   │   │           │   ├── AgenteRepository.java
	│   │   │   │           │   ├── ConversacionRepository.java
	│   │   │   │           │   ├── DesarrolladorRepository.java
	│   │   │   │           │   ├── HerramientaRepository.java
	│   │   │   │           │   ├── InstanciaAgenteRepostory.java
	│   │   │   │           │   ├── MensajeRepository.java
	│   │   │   │           │   └── UsuarioRepository.java
	│   │   │   │           ├── security/
	│   │   │   │           │   ├── JwtAuthenticationFilter.java
	│   │   │   │           │   └── SecurityConfig.java
	│   │   │   │           ├── service/
	│   │   │   │           │   ├── AgenteService.java
	│   │   │   │           │   ├── DesarrolladorService.java
	│   │   │   │           │   ├── JwtService.java
	│   │   │   │           │   └── UsuarioService.java
	│   │   │   │           └── services/
	│   │   │   ├── resources/
	│   │   │   │   ├── application.properties
	│   │   │   │   ├── log4jdbc.log4j2.properties
	│   │   │   │   ├── queries.sql
	│   │   │   │   └── templates/
	│   │   │   │       └── hello.html
	│   │   │   └── test/
	│   │   └── test/
	│   │       ├── java/
	│   │       │   └── com/
	│   │       │       └── agenthub/
	│   │       │           ├── AgenteControllerTest.java
	│   │       │           ├── AuthControllerTest.java
	│   │       │           └── HelloControllerTest.java
	│   │       └── resources/
	│   │           ├── .gitkeep
	│   │           └── application.properties
	│   └── target/
	│       ├── classes/
	│       │   ├── application.properties
	│       │   ├── log4jdbc.log4j2.properties
	│       │   ├── queries.sql
	│       │   ├── com/
	│       │   │   └── agenthub/
	│       │   │       ├── Application.class
	│       │   │       ├── controller/
	│       │   │       │   ├── AgenteController.class
	│       │   │       │   ├── AuthController.class
	│       │   │       │   └── DesarrolladorController.class
	│       │   │       ├── controllers/
	│       │   │       ├── exception/
	│       │   │       │   ├── GlobalExceptionHandler.class
	│       │   │       │   └── ResourceNotFoundException.class
	│       │   │       ├── model/
	│       │   │       │   ├── dto/
	│       │   │       │   │   ├── AgenteRequest.class
	│       │   │       │   │   ├── AgenteResponse$AgenteResponseBuilder.class
	│       │   │       │   │   ├── AgenteResponse.class
	│       │   │       │   │   ├── DesarrolladorRequest.class
	│       │   │       │   │   ├── DesarrolladorResponse.class
	│       │   │       │   │   ├── LoginRequest.class
	│       │   │       │   │   ├── LoginResponse$LoginResponseBuilder.class
	│       │   │       │   │   ├── LoginResponse.class
	│       │   │       │   │   ├── RegistroUsuarioRequest.class
	│       │   │       │   │   ├── UsuarioResponse$UsuarioResponseBuilder.class
	│       │   │       │   │   └── UsuarioResponse.class
	│       │   │       │   └── entity/
	│       │   │       │       ├── Agente$AgenteBuilder.class
	│       │   │       │       ├── Agente.class
	│       │   │       │       ├── Conversacion$ConversacionBuilder.class
	│       │   │       │       ├── Conversacion.class
	│       │   │       │       ├── Desarrollador$DesarrolladorBuilder.class
	│       │   │       │       ├── Desarrollador.class
	│       │   │       │       ├── Herramienta$HerramientaBuilder.class
	│       │   │       │       ├── Herramienta.class
	│       │   │       │       ├── InstanciaAgente$InstanciaAgenteBuilder.class
	│       │   │       │       ├── InstanciaAgente.class
	│       │   │       │       ├── Mensaje$MensajeBuilder.class
	│       │   │       │       ├── Mensaje.class
	│       │   │       │       ├── Usuario$UsuarioBuilder.class
	│       │   │       │       └── Usuario.class
	│       │   │       ├── models/
	│       │   │       ├── repositories/
	│       │   │       ├── repository/
	│       │   │       │   ├── AgenteRepository.class
	│       │   │       │   ├── ConversacionRepository.class
	│       │   │       │   ├── DesarrolladorRepository.class
	│       │   │       │   ├── HerramientaRepository.class
	│       │   │       │   ├── InstanciaAgenteRepostory.class
	│       │   │       │   ├── MensajeRepository.class
	│       │   │       │   └── UsuarioRepository.class
	│       │   │       ├── security/
	│       │   │       │   ├── JwtAuthenticationFilter.class
	│       │   │       │   └── SecurityConfig.class
	│       │   │       ├── service/
	│       │   │       │   ├── AgenteService.class
	│       │   │       │   ├── DesarrolladorService.class
	│       │   │       │   ├── JwtService.class
	│       │   │       │   └── UsuarioService.class
	│       │   │       └── services/
	│       │   └── templates/
	│       │       └── hello.html
	│       ├── generated-sources/
	│       │   └── annotations/
	│       ├── generated-test-sources/
	│       │   └── test-annotations/
	│       ├── maven-status/
	│       │   └── maven-compiler-plugin/
	│       │       └── compile/
	│       │           └── default-compile/
	│       │               ├── createdFiles.lst
	│       │               └── inputFiles.lst
	│       └── test-classes/
	│           ├── .gitkeep
	│           ├── application.properties
	│           └── com/
	│               └── agenthub/
	│                   ├── AgenteControllerTest.class
	│                   ├── AuthControllerTest.class
	│                   └── HelloControllerTest.class
	├── docker-compose.yml
	├── DOCKER-README.md
	└── frontend/
		├── .dockerignore
		├── Dockerfile
		├── package.json
		├── postcss.config.js
		├── public/
		│   └── index.html
		├── src/
		│   ├── assets/
		│   │   ├── imagen_agent.png
		│   │   ├── imagenes.txt
		│   │   └── logo.png
		│   ├── components/
		│   │   ├── componentes.txt
		│   │   ├── Footer.jsx
		│   │   ├── proteccion_ruta.jsx
		│   │   └── TopNavbar.jsx
		│   ├── index.css
		│   ├── index.js
		│   ├── pages/
		│   │   ├── AboutUs.jsx
		│   │   ├── crear_usuario.jsx
		│   │   ├── home.jsx
		│   │   ├── login.jsx
		│   │   ├── pantalla_admin.jsx
		│   │   └── pantallas.txt
		│   ├── Router.jsx
		│   └── services/
		│       ├── auth.js
		│       ├── conexion_api.js
		│       └── conexionApi.txt
		└── tailwind.config.js
```
