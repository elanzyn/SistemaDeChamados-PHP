# Sistema de Chamados - Como Rodar

## Pré-requisitos

- PHP 8.2+
- Composer 2+
- Node.js 18+
- NPM

## Instalação rápida

1. Entre na pasta `backend`.

2. Instale as dependências do Laravel:
   ```bash
   composer install
   ```

3. Crie o arquivo de ambiente:
   ```powershell
   if (!(Test-Path .env)) { Copy-Item .env.example .env }
   ```

4. Gere a chave da aplicação:
   ```bash
   php artisan key:generate
   ```

5. Execute as migrations:
   ```bash
   php artisan migrate
   ```

6. Instale as dependências do frontend:
   ```bash
   npm install
   ```

## Rodando o projeto

Em um terminal (backend Laravel):

```bash
php artisan serve
```

Em outro terminal (Vite/frontend):

```bash
npm run dev
```

Acesse: `http://127.0.0.1:8000`

## Criar usuário administrador

```bash
php artisan tinker --execute="App\\Models\\User::updateOrCreate(['email' => 'admin@admin.com'], ['name' => 'Administrador', 'password' => 'admin123', 'role' => 'ADMIN', 'department' => 'TI', 'active' => true]);"
```

Credenciais padrão:

- Email: `admin@admin.com`
- Senha: `admin123`

## Tecnologias utilizadas

### Backend

- PHP 8.2
- Laravel 12
- Laravel Sanctum
- Laravel Breeze
- Inertia.js (Laravel adapter)
- SQLite (padrão do projeto)

### Frontend

- React 19
- Inertia.js React
- Vite 7
- Tailwind CSS
- Axios
- Recharts

### Qualidade e testes

- PHPUnit 11
- Laravel Pint