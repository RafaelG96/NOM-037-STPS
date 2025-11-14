# Backend · Plan de implementación

Este directorio albergará el servicio que recibirá, validará y almacenará la información de los cuestionarios NOM-037-STPS-2023.

## Tecnologías recomendadas

- **Runtime/API**: Node.js con Express o Fastify (puedes adaptarlo a tu framework favorito).
- **ORM/Query Builder**: Prisma, Sequelize o TypeORM con soporte para PostgreSQL.
- **Base de datos**: PostgreSQL (esquema completo en `backend/db/schema_postgresql.sql`).
- **Almacenamiento de fotografías**: sistema de archivos del servidor (`backend/uploads/`) o servicio de objetos (S3, Backblaze, etc.). En la base se guardan solo los metadatos y la ruta del archivo en la tabla `evidencias`.

## Pasos para preparar PostgreSQL

1. **Asegúrate de que PostgreSQL esté instalado y corriendo**:
   ```bash
   sudo systemctl status postgresql
   # Si no está corriendo:
   sudo systemctl start postgresql
   ```

2. **Accede a PostgreSQL como superusuario**:
   ```bash
   sudo -u postgres psql
   ```

3. **Crea la base de datos y el usuario** (dentro de `psql`):
   ```sql
   CREATE DATABASE nom037;
   CREATE USER nom037_user WITH PASSWORD 'tu_password_segura';
   GRANT ALL PRIVILEGES ON DATABASE nom037 TO nom037_user;
   \q
   ```

4. **Importa el esquema completo**:
   ```bash
   sudo -u postgres psql -d nom037 -f backend/db/schema_postgresql.sql
   ```
   
   O si prefieres usar el usuario creado:
   ```bash
   psql -U nom037_user -d nom037 -h localhost -f backend/db/schema_postgresql.sql
   ```

   Esto creará el schema `nom037` con todas las tablas:
   - `empleadores`, `trabajadores`, `lugares_trabajo`
   - `equipos_catalogo`, `equipos_asignados`
   - `checklist_templates`, `checklist_items`, `checklist_instances`, `checklist_answers`
   - `validaciones`, `evidencias` (para fotografías y documentos)
   - `capacitaciones`, `politicas`, `auditoria`
   - Funciones, triggers y vistas

5. **Verifica la instalación**:
   ```bash
   psql -U nom037_user -d nom037 -h localhost -c "\dt nom037.*"
   ```

## Variables de entorno sugeridas

```
# backend/.env (no versionar)
DATABASE_URL="postgresql://nom037_user:tu_password@localhost:5432/nom037"
UPLOADS_DIR="./uploads/workspaces"
MAX_UPLOAD_SIZE_MB=10
```

Mantén un archivo `backend/env.example` con los nombres de las variables para referencia y copia su contenido a un archivo `.env` local (no versionado).

## Estructura API propuesta

- `POST /api/trabajadores`: crear/actualizar trabajador.
- `POST /api/checklist-instances`: crear una instancia de checklist para un trabajador.
- `POST /api/checklist-instances/:id/answers`: guardar respuestas del checklist.
- `POST /api/validaciones/:id/evidencias`: subir fotografías/documentos como evidencia (multipart/form-data).
- `GET /api/checklist-templates`: listado de templates disponibles.
- `GET /api/trabajadores/:id/resumen`: obtener resumen del trabajador (usa la vista `v_trabajador_resumen`).

Las fotos se guardan en `UPLOADS_DIR` con un nombre único (por ejemplo, `evidencia_uuid.ext`). El backend debe validar tipo MIME y tamaño antes de copiarlas al directorio. Los metadatos se guardan en la tabla `evidencias` con el campo `uri_archivo` apuntando a la ruta relativa o absoluta del archivo.

## Características del esquema PostgreSQL

- **UUIDs** como claves primarias para mejor distribución y seguridad.
- **Tipos ENUM** para validación a nivel de base de datos (`evidence_type`, `equipment_type`, `validation_result`).
- **JSONB** para almacenar datos flexibles (actividades, metadata).
- **Triggers automáticos** para actualizar `updated_at` y registrar cambios en auditoría.
- **Vista `v_trabajador_resumen`** para consultas rápidas de resúmenes.

## Próximas tareas sugeridas

1. Inicializar un proyecto Node.js en `backend/` (`npm init -y`).
2. Instalar dependencias: `npm install express multer pg` (o `pg-promise`, o tu ORM preferido como Prisma/Sequelize).
3. Implementar los endpoints y conectar con PostgreSQL usando el `DATABASE_URL`.
4. Configurar middlewares de subida (ej. Multer) para escribir archivos en `UPLOADS_DIR`.
5. Actualizar el frontend para enviar los formularios al nuevo backend en lugar de `localStorage`.

Mientras este backend se implementa, el frontend continúa usando almacenamiento local. Cuando el API esté listo bastará con reemplazar la lógica de persistencia en `QuestionnaireForm.jsx`.
