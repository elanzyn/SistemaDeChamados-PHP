#!/bin/bash

# Script para iniciar o Sistema de Chamados de TI
# Execute com: ./start-project.sh

echo "🚀 Iniciando Sistema de Chamados de TI..."
echo ""

# Carregar NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Verificar se o Node está correto
NODE_VERSION=$(node --version)
echo "✓ Node.js: $NODE_VERSION"

# Entrar na pasta do backend
cd "$(dirname "$0")"

echo ""
echo "📦 Instalando dependências (se necessário)..."
if [ ! -d "node_modules" ]; then
    npm install
fi

echo ""
echo "🗄️  Verificando banco de dados..."
php artisan migrate:status > /dev/null 2>&1 || php artisan migrate --force

echo ""
echo "▶️  Iniciando servidores..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Backend (Laravel):  http://localhost:8000"
echo "  Frontend (Vite):    http://localhost:5173"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️  Pressione Ctrl+C para parar os servidores"
echo ""

# Iniciar Laravel em background
php artisan serve > /tmp/laravel.log 2>&1 &
LARAVEL_PID=$!

# Aguardar 2 segundos
sleep 2

# Iniciar Vite (em foreground para ver os logs)
npm run dev

# Quando Vite for interrompido, matar o Laravel também
kill $LARAVEL_PID 2>/dev/null

echo ""
echo "👋 Servidores encerrados!"
