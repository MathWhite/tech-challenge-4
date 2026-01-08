# 🚀 Quick Start - Tech Challenge 4

Guia rápido para rodar o projeto em minutos!

## Pré-requisitos Rápidos

✅ Node.js instalado (v18+)  
✅ npm instalado  
✅ Smartphone com Expo Go App instalado  
✅ Computador e smartphone na mesma rede Wi-Fi

## Instalação em 3 Passos

### 1️⃣ Instalar Dependências

```bash
cd tech-challenge-4
npm install --legacy-peer-deps
```

⏱️ Tempo estimado: 2-3 minutos

### 2️⃣ Iniciar Servidor

```bash
npm start
```

Você verá um QR Code no terminal! 📱

### 3️⃣ Abrir no Celular

**Android:**
1. Abra o Expo Go
2. Escaneie o QR Code

**iOS:**
1. Abra a Câmera
2. Escaneie o QR Code
3. Toque na notificação do Expo

## 🔑 Credenciais de Teste

Para fazer login, você precisa de um professor cadastrado no backend.

**Exemplo:**
```
Email: admin@admin.com
Senha: senha123
```
```
Email: aluno@aluno.com
Senha: senha123
```

## 🎯 Primeira Navegação

Após o login:

1. **Home** - Veja todos os posts
2. **Admin** - Acesse o painel administrativo
3. **Criar Post** - Botão "+" flutuante na Home

## ⚡ Atalhos de Teclado (Terminal)

Quando o Expo está rodando:

- `a` - Abrir no Android Emulator
- `i` - Abrir no iOS Simulator (macOS)
- `w` - Abrir no navegador web
- `r` - Recarregar app
- `m` - Toggle menu
- `c` - Limpar cache

## 🐛 Problemas Comuns

### Erro ao instalar
```bash
npm install --legacy-peer-deps --force
```

### QR Code não funciona
1. Certifique-se de estar na mesma rede Wi-Fi
2. Tente modo Tunnel:
   ```bash
   npm start -- --tunnel
   ```

### App não carrega
```bash
npm start -- --clear
```

### Erro de conexão com API
Verifique se `https://tech-challenge-edn9.onrender.com` está acessível.

## 📱 Emuladores

### Android Studio
```bash
npm run android
```

### Xcode (macOS)
```bash
npm run ios
```

## 🌐 Testar no Navegador

```bash
npm run web
```

**Nota:** Algumas funcionalidades podem não funcionar perfeitamente na web (SecureStore, por exemplo).

## 📚 Próximos Passos

Depois de rodar o projeto:

1. Leia o [README.md](README.md) completo
2. Veja a [ARCHITECTURE.md](ARCHITECTURE.md) para entender a estrutura
3. Explore o código em `src/`
4. Experimente criar posts, professores e alunos

## 💡 Dicas

- Use `Ctrl+C` no terminal para parar o servidor
- O app recarrega automaticamente ao salvar arquivos
- Use React DevTools para debug
- Ative Fast Refresh para hot reload

## 📞 Ajuda

Se encontrar problemas:
1. Verifique o [README.md](README.md) → Seção Troubleshooting
2. Limpe o cache: `npm start -- --clear`
3. Reinstale dependências: `rm -rf node_modules && npm install --legacy-peer-deps`

## ✨ Recursos do App

- ✅ Login com JWT
- ✅ Lista de Posts com busca
- ✅ CRUD completo de Posts
- ✅ CRUD de Professores
- ✅ CRUD de Alunos
- ✅ Navegação por tabs
- ✅ Pull to refresh
- ✅ Interface responsiva

---

**Pronto!** 🎉 Você já tem o app rodando!

Divirta-se explorando o Tech Challenge 4! 🚀
