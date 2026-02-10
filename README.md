# SistemaDeChamados-PHP

# 🚀 Instalação e Configuração

   ## 📋 Pré-requisitos

   Antes de começar, certifique-se de ter instalado em sua máquina:

   - **PHP** >= 8.2
   - **Composer** (gerenciador de dependências PHP)
   - **Node.js** >= 18.x e **npm** (gerenciador de pacotes JavaScript)
   - **SQLite** (já incluído no PHP por padrão) ou outro banco de dados de sua preferência

   ## 🔧 Instalação

   ### 1. Clone o repositório

   ```bash
   git clone <url-do-repositorio>
   cd SistemaDeChamados-PHP/backend

  2. Instale as dependências do PHP

   composer install

  3. Instale as dependências do Node.js

   npm install

  4. Configure o arquivo de ambiente

  Copie o arquivo .env.example para .env:

   cp .env.example .env

  5. Gere a chave da aplicação

   php artisan key:generate

  6. Configure o banco de dados

  O projeto está configurado para usar SQLite por padrão. Para criar o arquivo do banco de dados:

   touch database/database.sqlite

  Ou, se preferir usar MySQL/PostgreSQL:

  Edite o arquivo .env e configure as credenciais do banco:

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nome_do_banco
   DB_USERNAME=seu_usuario
   DB_PASSWORD=sua_senha

  7. Execute as migrations

   php artisan migrate

  8. (Opcional) Popule o banco de dados com dados de teste

   php artisan db:seed

  ▶️ Como Rodar o Projeto

  Opção 1: Comando único (Recomendado)

  Execute o servidor de desenvolvimento com todos os serviços necessários:

   composer dev

  Este comando irá iniciar automaticamente:

   - 🌐 Servidor PHP (http://localhost:8000)
   - 📦 Vite (build de assets frontend)
   - 🔄 Queue listener (processamento de filas)
   - 📝 Logs em tempo real

  Opção 2: Comandos separados

  Se preferir rodar cada serviço separadamente, abra terminais diferentes para cada comando:

  Terminal 1 - Servidor PHP:

   php artisan serve

  Terminal 2 - Vite (desenvolvimento frontend):

   npm run dev

  Terminal 3 - Queue (opcional, se usar filas):

   php artisan queue:listen

  🌐 Acessando a Aplicação

  Após iniciar o servidor, acesse a aplicação em:

   http://localhost:8000

  🏗️ Build para Produção

  Para gerar os arquivos otimizados para produção:

   npm run build

  🧪 Executar Testes

  Para rodar os testes automatizados:

   composer test
   # ou
   php artisan test

  🛠️ Comandos Úteis

   - Limpar cache: php artisan cache:clear
   - Limpar configuração: php artisan config:clear
   - Limpar rotas: php artisan route:clear
   - Limpar views: php artisan view:clear
   - Recriar banco de dados: php artisan migrate:fresh --seed

  ⚠️ Solução de Problemas

  Erro de permissão nas pastas storage e bootstrap/cache

   chmod -R 775 storage bootstrap/cache

  Erro ao instalar dependências do Composer

   composer update
   composer install --ignore-platform-reqs

  Erro ao compilar assets

   rm -rf node_modules package-lock.json
   npm install
   npm run dev

  📦 Instalação em Servidor de Produção

   1. Clone o repositório
   2. Execute: composer install --optimize-autoloader --no-dev
   3. Execute: npm install && npm run build
   4. Configure o arquivo .env com as credenciais de produção
   5. Execute: php artisan migrate --force
   6. Configure o servidor web (Apache/Nginx) para apontar para a pasta public
   7. Configure as permissões corretas para storage e bootstrap/cache
