#!/bin/sh
set -e

# Ejecuta migraciones solo si defines RUN_MIGRATIONS=true en el entorno
if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "Aplicando migraciones de Prisma...."
  bunx prisma migrate deploy
fi

echo "Iniciando Next.js (standalone)..."
# server.js lo genera Next cuando usas output: 'standalone'
exec bun server.js