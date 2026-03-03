const portfolioData = {
  pt: {
    langName: "Português",
    hero: {
      title: "Engenheiro de Software | Mobile (Flutter) & Frontend (React/TypeScript)",
      pitch: "5 anos criando interfaces complexas para IoT, Streaming de Vídeo e Controle de Hardware.",
      academic: "Bacharel em Engenharia da Computação e mestrando em Ciências da Computação (UFU)",
    },
    experience: {
      years: 5,
      projects: 18,
      stacks: [
        { name: "Flutter", years: 4, projects: 7 },
        { name: "React/TypeScript", years: 4, projects: 8 },
        { name: "IoT/Hardware", years: 3, projects: 5 },
        { name: "Streaming Vídeo", years: 2, projects: 3 },
      ],
    },
    buildingNow: [
      "IPTV (ENTELVIAS)",
      "Cortes de vídeo automatizados via IA (Streamlit)",
      "Sistema inteligente de monitoramento de subestações (SIMAS)",
    ],
    stack: {
      frontend: ["React.js", "TypeScript", "Next.js", "Tailwind", "Vite"],
      mobile: ["Flutter", "Dart", "PWA", "Integração Nativa (Android)",],
      backend: ["Node.js", "Firebase", "Docker", "Shell Scripting"],
      domains: ["Integração de Hardware", "Streaming de Vídeo (HLS)", "Protocolos de Rede (WebSocket, HTTP)", "Offline-First"],
    },
    languages: [
      { name: "Português", level: "Nativo" },
      { name: "Inglês", level: "Avançado (B2)" },
      { name: "Espanhol", level: "Intermediário" },
    ],
    contact: {
      github: "https://github.com/gusbmachado",
      linkedin: "https://linkedin.com/in/gusbmachado",
      email: "gusbmachado@gmail.com",
    },
    pdfs: {
      cv: "./assets/pdf/cv-pt.pdf",
      cover: "./assets/pdf/cover-pt.pdf",
    },
    salary: {
      brl: "R$ 40/hora",
      usd: "US$ 15/h",
      eur: "€ 14/h",
      note: "Valores negociáveis conforme escopo e modalidade."
    },
    more: "Disponível para remoto, projetos internacionais e consultoria técnica."
  },
  en: {
    langName: "English",
    hero: {
      title: "Software Engineer | Mobile (Flutter) & Frontend (React/TypeScript)",
      pitch: "5 years building complex interfaces for IoT, Video Streaming, and Hardware Control.",
      academic: "Bachelor in Computer Engineering and MSc student (UFU)",
    },
    experience: {
      years: 5,
      projects: 18,
      stacks: [
        { name: "Flutter", years: 4, projects: 7 },
        { name: "React/TypeScript", years: 4, projects: 8 },
        { name: "IoT/Hardware", years: 3, projects: 5 },
        { name: "Video Streaming", years: 2, projects: 3 },
      ],
    },
    buildingNow: [
      "IPTV (ENTELVIAS)",
      "Automated video cutting with AI (Streamlit)",
      "Intelligent substation monitoring system (SIMAS)",
    ],
    stack: {
      frontend: ["React.js", "TypeScript", "Next.js", "Tailwind", "Vite"],
      mobile: ["Flutter", "Dart", "PWA", "Native Integration (Android)",],
      backend: ["Node.js", "Firebase", "Docker", "Shell Scripting"],
      domains: ["Hardware Integration", "Video Streaming (HLS)", "Network Protocols (WebSocket, HTTP)", "Offline-First"],
    },
    languages: [
      { name: "Portuguese", level: "Native" },
      { name: "English", level: "Advanced (B2)" },
      { name: "Spanish", level: "Intermediate" },
    ],
    contact: {
      github: "https://github.com/gusbmachado",
      linkedin: "https://linkedin.com/in/gusbmachado",
      email: "gusbmachado@gmail.com",
    },
    pdfs: {
      cv: "./assets/pdf/cv-en.pdf",
      cover: "./assets/pdf/cover-en.pdf",
    },
    salary: {
      brl: "R$ 40/h",
      usd: "US$ 15/h",
      eur: "€ 14/h",
      note: "Rates negotiable depending on scope and contract type."
    },
    more: "Available for remote, international projects and technical consulting."
  },
  es: {
    langName: "Español",
    hero: {
      title: "Ingeniero de Software | Mobile (Flutter) & Frontend (React/TypeScript)",
      pitch: "5 años creando interfaces complejas para IoT, Streaming de Video y Control de Hardware.",
      academic: "Licenciado en Ingeniería Informática y estudiante de maestría (UFU)",
    },
    experience: {
      years: 5,
      projects: 18,
      stacks: [
        { name: "Flutter", years: 4, projects: 7 },
        { name: "React/TypeScript", years: 4, projects: 8 },
        { name: "IoT/Hardware", years: 3, projects: 5 },
        { name: "Streaming de Video", years: 2, projects: 3 },
      ],
    },
    caseStudies: [
      {
        title: "Case Controller (Mobile & IoT)",
        desc: "App crítica en Flutter. Eliminación de configuración manual mediante comandos AT y puertos seriales para módems 4G/5G.",
      },
      {
        title: "Comunicación Táctica por Radio (PM)",
        desc: "Integración con NanoPi, APIs de routers y dashboard de telemetría en tiempo real.",
      },
      {
        title: "EPG Editor (Web SaaS)",
        desc: "Arquitectura Serverless, React, operación 100% offline, estándar Globo.",
      },
      {
        title: "Modernización de Legado",
        desc: "Migración de PHP a SPA moderna (React, TypeScript, Vite, Tailwind CSS).",
      },
    ],
    buildingNow: [
      "IPTV (ENTELVIAS)",
      "Cortes de video automatizados con IA (Streamlit)",
      "Sistema inteligente de monitoreo de subestaciones (SIMAS)",
    ],
    stack: {
      frontend: ["React.js", "TypeScript", "Next.js", "Tailwind", "Vite"],
      mobile: ["Flutter", "Dart", "PWA", "Integración Nativa (Android)",],
      backend: ["Node.js", "Firebase", "Docker", "Shell Scripting"],
      domains: ["Integración de Hardware", "Streaming de Video (HLS)", "Protocolos de Red (WebSocket, HTTP)", "Offline-First"],
    },
    languages: [
      { name: "Portugués", level: "Nativo" },
      { name: "Inglés", level: "Avanzado (B2)" },
      { name: "Español", level: "Intermedio" },
    ],
    contact: {
      github: "https://github.com/gusbmachado",
      linkedin: "https://linkedin.com/in/gusbmachado",
      email: "gusbmachado@gmail.com",
    },
    pdfs: {
      cv: "./assets/pdf/cv-es.pdf",
      cover: "./assets/pdf/cover-es.pdf",
    },
    salary: {
      brl: "R$ 40/hora",
      usd: "US$ 15/h",
      eur: "€ 14/h",
      note: "Valores negociables según alcance y modalidad."
    },
    more: "Disponible para remoto, proyectos internacionales y consultoría técnica."
  }
};
