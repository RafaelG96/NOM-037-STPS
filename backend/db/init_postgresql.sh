#!/bin/bash
# Script de inicialización para PostgreSQL - NOM-037-STPS-2023
# Ejecutar con: bash backend/db/init_postgresql.sh

set -e

echo "Inicializando base de datos PostgreSQL para NOM-037-STPS-2023..."
echo ""

# Verificar que PostgreSQL esté instalado
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL no está instalado. Por favor instálalo primero."
    exit 1
fi

# Verificar que el servicio esté corriendo
if ! sudo systemctl is-active --quiet postgresql 2>/dev/null; then
    echo "PostgreSQL no está corriendo. Intentando iniciarlo..."
    sudo systemctl start postgresql || {
        echo "No se pudo iniciar PostgreSQL. Verifica la instalación."
        exit 1
    }
fi

echo "PostgreSQL está corriendo"
echo ""

# Solicitar información
read -p "¿Deseas crear un usuario dedicado? (s/n): " create_user
if [[ $create_user =~ ^[Ss]$ ]]; then
    read -p "Nombre de usuario (default: nom037_user): " db_user
    db_user=${db_user:-nom037_user}
    
    read -sp "Contraseña para $db_user: " db_password
    echo ""
else
    db_user="postgres"
    db_password=""
fi

# Crear base de datos y usuario
echo "Creando base de datos y usuario..."
sudo -u postgres psql <<EOF
-- Crear base de datos
SELECT 'Creando base de datos...' AS status;
CREATE DATABASE nom037;

-- Crear usuario si se solicitó
$([ "$create_user" = "s" ] || [ "$create_user" = "S" ] && echo "
SELECT 'Creando usuario $db_user...' AS status;
CREATE USER $db_user WITH PASSWORD '$db_password';
GRANT ALL PRIVILEGES ON DATABASE nom037 TO $db_user;
")

-- Conceder permisos en el schema público
\c nom037
CREATE SCHEMA IF NOT EXISTS nom037;
GRANT ALL ON SCHEMA nom037 TO $db_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA nom037 TO $db_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA nom037 TO $db_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA nom037 GRANT ALL ON TABLES TO $db_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA nom037 GRANT ALL ON SEQUENCES TO $db_user;

\q
EOF

echo "Base de datos y usuario creados"
echo ""

# Importar esquema
echo "Importando esquema..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCHEMA_FILE="$SCRIPT_DIR/schema_postgresql.sql"

if [ ! -f "$SCHEMA_FILE" ]; then
    echo "No se encontró el archivo schema_postgresql.sql en $SCHEMA_FILE"
    exit 1
fi

if [ "$create_user" = "s" ] || [ "$create_user" = "S" ]; then
    PGPASSWORD="$db_password" psql -U "$db_user" -d nom037 -h localhost -f "$SCHEMA_FILE"
else
    sudo -u postgres psql -d nom037 -f "$SCHEMA_FILE"
fi

echo "Esquema importado correctamente"
echo ""

# Verificar tablas creadas
echo "Verificando tablas creadas..."
if [ "$create_user" = "s" ] || [ "$create_user" = "S" ]; then
    PGPASSWORD="$db_password" psql -U "$db_user" -d nom037 -h localhost -c "\dt nom037.*" | head -20
else
    sudo -u postgres psql -d nom037 -c "\dt nom037.*" | head -20
fi

echo ""
echo "Configuración completada!"
echo ""
echo "Configura tu archivo backend/.env con:"
if [ "$create_user" = "s" ] || [ "$create_user" = "S" ]; then
    echo "DATABASE_URL=\"postgresql://$db_user:$db_password@localhost:5432/nom037\""
else
    echo "DATABASE_URL=\"postgresql://postgres:@localhost:5432/nom037\""
fi
echo ""

