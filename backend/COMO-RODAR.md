# 🚀 Como Rodar o Projeto

## Opção 1: Script Automático (RECOMENDADO)

```bash
cd ~/projetos/SistemaDeChamados-PHP/backend
./start-project.sh
```

Isso vai iniciar automaticamente:
- ✅ Backend Laravel (http://localhost:8000)
- ✅ Frontend Vite (http://localhost:5173)

**Para parar:** Pressione `Ctrl + C`

---

## Opção 2: Manual (2 terminais)

### Terminal 1 - Backend Laravel

```bash
cd ~/projetos/SistemaDeChamados-PHP/backend
php artisan serve
```

Vai iniciar em: **http://localhost:8000**

### Terminal 2 - Frontend Vite

```bash
cd ~/projetos/SistemaDeChamados-PHP/backend

# Carregar NVM (necessário)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Iniciar Vite
npm run dev
```

Vai iniciar em: **http://localhost:5173**

---

## 🌐 Como Acessar

Abra o navegador e acesse:

```
http://localhost:8000
```

### Primeira vez usando?

1. **Registre um usuário novo**
   - Clique em "Register"
   - Preencha nome, email e senha
   - Faça login

2. **Use o sistema**
   - Criar chamados
   - Ver dashboard com métricas
   - Gerenciar categorias (se for admin)

---

## 🔧 Comandos Úteis

### Ver logs do Laravel
```bash
tail -f storage/logs/laravel.log
```

### Limpar cache
```bash
php artisan config:clear
php artisan route:clear
php artisan cache:clear
```

### Recriar banco de dados
```bash
php artisan migrate:fresh --seed
```

### Verificar rotas
```bash
php artisan route:list
```

---

## ⚠️ Problemas Comuns

### Erro "Node version"
```bash
# Recarregar NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### Erro "Port already in use"
```bash
# Matar processos nas portas
kill $(lsof -t -i:8000)  # Laravel
kill $(lsof -t -i:5173)  # Vite
```

### Erro de permissões
```bash
chmod -R 775 storage bootstrap/cache
```

---

## 📊 Funcionalidades Disponíveis

✅ Login e Registro  
✅ Recuperação de Senha  
✅ Dashboard com Métricas  
✅ CRUD de Chamados (Tickets)  
✅ CRUD de Categorias  
✅ Atribuir Técnicos  
✅ Atualizar Status  
✅ Sistema de Permissões (ADMIN, TECH, USER)  

---

## 🎯 Próximos Passos

1. ✅ **Rodar o projeto** - Você está aqui!
2. 📝 **Criar testes automatizados**
3. 📊 **Adicionar gráficos no frontend**
4. 📄 **Escrever documentação de testes**
5. 🎨 **Personalizar interface**

---

**Dica:** Adicione o NVM ao seu `.bashrc` para não precisar carregar manualmente:

```bash
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc
source ~/.bashrc
```
