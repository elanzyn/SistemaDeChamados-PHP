# Sistema de Chamados - Como Rodar

## Instalação rápida

1. Clone o projeto:
   ```bash
   git clone <URL-do-repositório>
   cd backend
   ```

2. Instale dependências:
   ```bash
   composer install
   npm install
   ```

3. Copie o arquivo de ambiente:
   ```bash
   cp .env.example .env
   # Se não existir, copie o .env do projeto
   ```

4. Gere a chave da aplicação:
   ```bash
   php artisan key:generate
   ```

5. Rode as migrations e seeders:
   ```bash
   php artisan migrate --seed
   ```

6. Inicie o backend:
   ```bash
   php artisan serve
   ```

7. Inicie o frontend:
   ```bash
   npm run dev
   ```

## Usando com XAMPP

- O projeto usa SQLite por padrão, compatível com PHP do XAMPP.
- Não é necessário configurar MySQL ou phpMyAdmin.
- Basta seguir os passos de instalação acima normalmente.

Pronto! Acesse pelo navegador: `http://localhost:8000`

## Como criar um usuário administrador

- Após instalar, você pode criar um admin pelo Tinker:
  ```bash
  php artisan tinker
  >>> \App\Models\User::create(['name' => 'Administrador', 'email' => 'admin@admin.com', 'password' => bcrypt('senha_segura'), 'role' => 'ADMIN']);
  ```
- Depois, faça login com esse usuário para cadastrar novos usuários pelo sistema.