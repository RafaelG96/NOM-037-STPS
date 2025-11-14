# NOM-037-STPS-2023

NOM-037-STPS-2023: Norma mexicana que establece los requisitos de seguridad y salud para el teletrabajo. Incluye políticas, identificación de riesgos ergonómicos y psicosociales, entrega de equipo y derecho a la desconexión.

## Estructura del proyecto

```
.
├── backend/
│   ├── db/
│   │   ├── schema_postgresql.sql    # Esquema completo de PostgreSQL
│   │   └── init_postgresql.sh      # Script de inicialización de la BD
│   ├── env.example                  # Plantilla de variables de entorno
│   └── README.md                    # Guía de implementación del backend
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx             # Punto de entrada de la app React
│       ├── App.jsx              # Definición de rutas
│       ├── content/             # Configuración estática de cuestionarios y recursos
│       ├── components/          # Componentes reutilizables (Hero, Forms, Cards, etc.)
│       ├── pages/               # Vistas principales (Home, Questionnaire, QuestionnaireForm)
│       ├── services/            # Servicios auxiliares (ej. localStorage)
│       └── styles/              # Hojas de estilo compartidas
└── README.md
```

## Cómo ejecutar el frontend

```bash
cd frontend
npm install
npm run dev
```

Esto levanta la aplicación en `http://localhost:5173`.

## Configuración de la base de datos

El proyecto utiliza **PostgreSQL** con un esquema completo que incluye gestión de empleadores, trabajadores, checklists, validaciones y evidencias.

### Inicialización rápida

```bash
# Ejecutar el script de inicialización
bash backend/db/init_postgresql.sh
```

Este script:
- Verifica que PostgreSQL esté instalado y corriendo
- Crea la base de datos `nom037`
- Crea un usuario dedicado (opcional)
- Importa el esquema completo desde `backend/db/schema_postgresql.sql`

### Configuración manual

Si prefieres configurar manualmente, consulta las instrucciones detalladas en `backend/README.md`.

## Próximos pasos sugeridos

1. ✅ Base de datos PostgreSQL configurada con esquema completo
2. Definir el stack del backend (por ejemplo, Node.js con Express o Fastify)
3. Implementar los endpoints API según la estructura propuesta en `backend/README.md`
4. Reemplazar en el frontend la persistencia local por llamadas al backend cuando esté disponible
