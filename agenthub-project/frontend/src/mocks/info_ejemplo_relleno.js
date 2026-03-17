export const mockUsuarios = [
    {
        id: 1,
        email: "juan@agenthub.com",
        contrasenia: "juan123",
        nombre: "Juan",
        apellido: "Pérez",
        empresa: "DevSolutions AI",
        telefono: "600123456",
        rol: "DESARROLLADOR"
    },
    {
        id: 2,
        email: "maria@empresa.com",
        contrasenia: "maria123",
        nombre: "Maria",
        apellido: "Gómez",
        empresa: "Marketing Pro",
        telefono: "600987654",
        rol: "CLIENTE"
    }
];

export const mockAgentes = [
    {
        id: 101,
        nombre: "CopyWriter Pro",
        descripcion: "Un agente especializado en redactar textos persuasivos para marketing digital, campañas de email y redes sociales.",
        systemPromt: "Eres un experto en copywriting. Tu objetivo es escribir textos atractivos que conviertan.",
        modelo: "gpt-4-turbo",
        categoria: "Marketing",
        tecnologias: ["OpenAI API", "Python", "Vercel"],
        posibilidades: "Generación de posts, emails de venta, landing pages.",
        negocios: "Agencias de marketing, e-commerce, influencers.",
        precio: 49,
        fabricanteId: 1,
        descargas: 1240,
        ingresosGenerados: 60760,
        vistas: 5400
    },
    {
        id: 102,
        nombre: "DataAnalyst AI",
        descripcion: "Agente capaz de analizar grandes volúmenes de datos en CSV o Excel y extraer insights visuales y reportes ejecutivos.",
        systemPromt: "Eres un analista de datos Senior. Recibe datos crudos y devuelve conclusiones claras y accionables.",
        modelo: "claude-3-opus",
        categoria: "Análisis de Datos",
        tecnologias: ["Anthropic", "Pandas", "Streamlit"],
        posibilidades: "Limpieza de datos, reportes financieros, predicciones de ventas.",
        negocios: "Departamentos financieros, consultorías, startups tecnológicas.",
        precio: 99,
        fabricanteId: 1,
        descargas: 450,
        ingresosGenerados: 44550,
        vistas: 2100
    },
    {
        id: 103,
        nombre: "SupportBot 24/7",
        descripcion: "Atención al cliente automatizada capaz de leer la documentación de tu empresa y responder dudas frecuentes en tiempo real.",
        systemPromt: "Eres un agente de soporte empático y resolutivo. Basa tus respuestas únicamente en los documentos proporcionados.",
        modelo: "phi-3-mini",
        categoria: "Atención al Cliente",
        tecnologias: ["Ollama", "LangChain", "Vector DB"],
        posibilidades: "Resolución de FAQs, triaje de tickets, soporte multilingüe.",
        negocios: "SaaS, tiendas online, empresas de servicios.",
        precio: 29,
        fabricanteId: 1,
        descargas: 3200,
        ingresosGenerados: 92800,
        vistas: 15400
    }
];
