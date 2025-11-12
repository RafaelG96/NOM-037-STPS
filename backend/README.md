# Backend · Plan de implementación

Este directorio albergará el servicio que recibirá, validará y almacenará la información de los cuestionarios NOM-037-STPS-2023.

## Tecnologías recomendadas

- **Runtime/API**: Node.js con Express o Fastify (puedes adaptarlo a tu framework favorito).
- **ORM/Query Builder**: Prisma, Sequelize o TypeORM con soporte para MariaDB.
- **Base de datos**: MariaDB (compatible con MySQL y disponible en XAMPP).
- **Almacenamiento de fotografías**: sistema de archivos del servidor (`backend/uploads/`) o servicio de objetos (S3, Backblaze, etc.). En la base se guardan solo los metadatos y la ruta del archivo.

## Pasos para preparar MariaDB

1. Asegúrate de que el servicio MariaDB de XAMPP esté corriendo.
2. Importa el esquema inicial:
   ```bash
   mysql -u root -p < backend/db/schema.sql
   ```
   Esto creará la base `nom037` con las tablas:
   - `respondents`, `questionnaires`, `questions`, `responses`, `answers`
   - `workspace_photos` (metadatos de las imágenes)
3. Crea un usuario dedicado (opcional pero recomendado):
   ```sql
   CREATE USER 'nom037'@'localhost' IDENTIFIED BY 'tu_password_segura';
   GRANT ALL PRIVILEGES ON nom037.* TO 'nom037'@'localhost';
   FLUSH PRIVILEGES;
   ```

## Variables de entorno sugeridas

```
# backend/.env (no versionar)
DATABASE_URL="mysql://nom037:tu_password@localhost:3306/nom037"
UPLOADS_DIR="./uploads/workspaces"
MAX_UPLOAD_SIZE_MB=10
```

Mantén un archivo `backend/env.example` con los nombres de las variables para referencia y copia su contenido a un archivo `.env` local (no versionado).

## Estructura API propuesta

- `POST /api/responses`: recibe datos del cuestionario y retorna el `response_id`.
- `POST /api/responses/:id/photos`: carga individual de fotografías (multipart/form-data).
- `GET /api/questionnaires`: listado de cuestionarios/configuración para sincronizar con el frontend.
- `GET /api/responses/:id`: consulta una respuesta completa (con fotos).

Las fotos se guardan en `UPLOADS_DIR` con un nombre único (por ejemplo, `responseId_timestamp_uuid.ext`). El backend debe validar tipo MIME y tamaño antes de copiarlas al directorio.

## Próximas tareas sugeridas

1. Inicializar un proyecto Node.js en `backend/` (`npm init -y`).
2. Instalar dependencias: `npm install express multer mysql2` (ajusta según tu ORM).
3. Implementar los endpoints y conectar con MariaDB usando el `DATABASE_URL`.
4. Configurar middlewares de subida (ej. Multer) para escribir archivos en `UPLOADS_DIR`.
5. Actualizar el frontend para enviar los formularios al nuevo backend en lugar de `localStorage`.

Mientras este backend se implementa, el frontend continúa usando almacenamiento local. Cuando el API esté listo bastará con reemplazar la lógica de persistencia en `QuestionnaireForm.jsx`.*** End Patch

