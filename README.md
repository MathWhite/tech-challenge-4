 # 📝 Blog FIAP - Tech Challenge 4 (Aplicativo Mobile)

Aplicativo móvel desenvolvido em React Native com Expo para gerenciamento de posts educacionais, professores e alunos.

## 📱 Descrição

Este é o quarto Tech Challenge do curso, desenvolvido como uma aplicação mobile que complementa o sistema web existente (TC3). O aplicativo permite que professores gerenciem posts, alunos e outros professores através de uma interface mobile intuitiva.

### Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento facilitado
- **React Navigation** - Navegação entre telas
- **Styled Components** - Estilização dos componentes
- **Axios** - Cliente HTTP para comunicação com a API
- **Expo SecureStore** - Armazenamento seguro de credenciais
- **Ionicons** - Biblioteca de ícones

## 🚀 Funcionalidades

### Posts
- ✅ Listar todos os posts disponíveis
- ✅ Visualizar conteúdo completo de um post
- ✅ Buscar posts por palavras-chave
- ✅ Criar novos posts (professores autenticados)
- ✅ Editar posts existentes (professores autenticados)
- ✅ Visualizar comentários dos posts

### Professores
- ✅ Listar todos os professores cadastrados
- ✅ Cadastrar novos professores
- ✅ Editar dados de professores existentes
- ✅ Excluir professores do sistema
- ✅ Autenticação de professores

### Alunos
- ✅ Listar todos os alunos cadastrados
- ✅ Cadastrar novos alunos
- ✅ Editar dados de alunos existentes
- ✅ Excluir alunos do sistema
- ✅ Autenticação de alunos

### Autenticação
- ✅ Login seguro com JWT
- ✅ Armazenamento seguro de tokens (SecureStore)
- ✅ Controle de acesso baseado em autenticação
- ✅ Logout com limpeza de credenciais

## 📁 Estrutura do Projeto

```
tech-challenge-4/
├── src/
│   ├── api/                    # Serviços de API
│   │   ├── axios.js           # Configuração do Axios
│   │   ├── posts.js           # API de posts
│   │   ├── teachers.js        # API de professores
│   │   └── students.js        # API de alunos
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Button.jsx         # Botão customizado
│   │   ├── Input.jsx          # Input customizado
│   │   └── Loading.jsx        # Indicador de carregamento
│   ├── contexts/              # Context API
│   │   ├── AuthContext.js     # Contexto de autenticação
│   │   ├── AuthProvider.jsx   # Provider de autenticação
│   │   └── useAuth.js         # Hook customizado
│   ├── navigation/            # Configuração de navegação
│   │   └── AppNavigator.jsx   # Navigator principal
│   ├── screens/               # Telas da aplicação
│   │   ├── LoginScreen.jsx
│   │   ├── HomeScreen.jsx
│   │   ├── PostReadScreen.jsx
│   │   ├── PostCreateScreen.jsx
│   │   ├── PostEditScreen.jsx
│   │   ├── PostsAdminScreen.jsx
│   │   ├── AdminScreen.jsx
│   │   ├── TeachersListScreen.jsx
│   │   ├── TeacherCreateScreen.jsx
│   │   ├── TeacherEditScreen.jsx
│   │   ├── StudentsListScreen.jsx
│   │   ├── StudentCreateScreen.jsx
│   │   └── StudentEditScreen.jsx
│   ├── styles/                # Estilos e temas
│   │   └── theme.js           # Tema global
│   ├── services/              # Serviços auxiliares
│   └── utils/                 # Utilitários
├── App.js                     # Componente raiz
├── package.json               # Dependências
├── README.md                  # Documentação principal
├── ARCHITECTURE.md            # Arquitetura detalhada
├── CONTRIBUTING.md            # Guia de contribuição
├── QUICKSTART.md              # Início rápido
└── TECH-CHALLENGE-4-DOCUMENTACAO.md  # Documentação completa do TC4

```

## 🔧 Setup Inicial

### Pré-requisitos

- Node.js (versão 18.x ou superior recomendada)
- npm ou yarn
- Expo CLI (instalado globalmente ou via npx)
- Expo Go App (para testar no dispositivo físico)
  - [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

### Instalação

1. **Clone o repositório** (se ainda não tiver feito):
   ```bash
   git clone https://github.com/MathWhite/tech-challenge-4
   cd tech-challenge-4
   ```

2. **Instale as dependências**:
   ```bash
   npm install --legacy-peer-deps
   ```
   
   Nota: O flag `--legacy-peer-deps` é necessário devido a compatibilidades de versão entre algumas dependências.

3. **Configure a URL da API**:
   
   O arquivo `src/api/axios.js` já está configurado com a URL base da API:
   ```javascript
   baseURL: 'https://tech-challenge-edn9.onrender.com'
   ```
   
   Nota 1: Estamos utilizando o backend do TC2 que recebeu melhorias para as novas funcionalidades, acessível em https://github.com/MathWhite/tech-challenge-2.
   Nota 2: O backend está hospedado no 'Render', portanto deve-se "acordar" o servidor antes de obter a resposta dos dados.

### Executar o Projeto

#### Desenvolvimento com Expo Go

1. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm start
   ```
   ou
   ```bash
   npx expo start
   ```

   Nota: Se você estiver usando WSL, precisará utilizar o tunnel do expo com o seguinte comando

   ```bash
   npm start -- --tunnel
   ```

2. **Execute no dispositivo**:
   - **Android**: Escaneie o QR code com o Expo Go App
   - **iOS**: Escaneie o QR code com a câmera nativa do iPhone
   - **Web**: Pressione `w` no terminal
   - **Android Emulator**: Pressione `a` no terminal
   - **iOS Simulator**: Pressione `i` no terminal (apenas em macOS)

#### Outras opções de execução

```bash
# Android
npm run android

# iOS (apenas em macOS)
npm run ios

# Web
npm run web
```

## 🏗️ Arquitetura da Aplicação

### Context API
A aplicação utiliza Context API para gerenciamento de estado de autenticação:

```javascript
// Uso do hook de autenticação
const { user, login, logout, isAuthenticated } = useAuth();
```

### Navegação
A navegação é implementada com React Navigation, combinando:
- **Stack Navigator**: Para navegação entre telas
- **Bottom Tab Navigator**: Para navegação principal (Posts e Admin)

### Armazenamento Seguro
Tokens e dados sensíveis são armazenados usando Expo SecureStore:
- Token JWT de autenticação
- Dados do usuário logado

### API Integration
Todas as chamadas de API utilizam Axios com interceptors configurados:
- Adição automática de tokens JWT
- Tratamento de erros de autenticação
- Redirecionamento automático em caso de token inválido

## 📱 Guia de Uso

### Login
1. Abra o aplicativo
2. Insira suas credenciais de professor:
   - E-mail
   - Senha
3. Toque em "Entrar"

> Credenciais de teste (Professor)
```bash
email: admin@admin.com
senha: admin123
```
> Credenciais de teste (Aluno)
```bash
email: aluno@aluno.com
senha: aluno123
```

### Gerenciar Posts
1. Na tela inicial (Home), visualize todos os posts
2. Use a barra de busca para filtrar posts
3. Toque em um post para ler o conteúdo completo
4. Use o botão "+" para criar um novo post
5. Na tela de configuração, acesse opções de criação

### Gerenciar Professores
1. Vá para a tela de Configuração
2. Toque em "Listar Professores"
3. Use os botões "Editar" ou "Excluir" em cada professor
4. Toque em "Cadastrar Professor" para adicionar novo

### Gerenciar Alunos
1. Vá para a tela de Configuração
2. Toque em "Listar Alunos"
3. Use os botões "Editar" ou "Excluir" em cada aluno
4. Toque em "Cadastrar Aluno" para adicionar novo

### Logout
1. Vá para a tela de Administração
2. Role até o final
3. Toque no botão "Sair da Conta"

## 🎨 Design System

O aplicativo utiliza um tema consistente definido em `src/styles/theme.js`:

### Cores
- **Primary**: #007AFF (Azul)
- **Secondary**: #5856D6 (Roxo)
- **Success**: #34C759 (Verde)
- **Danger**: #FF3B30 (Vermelho)
- **Warning**: #FF9500 (Laranja)

### Espaçamentos
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **xxl**: 48px

### Tipografia
- Tamanhos: xs (12px) a xxxl (32px)
- Pesos: normal (400) a bold (700)

## 🔌 Integração com Backend

### Endpoints Utilizados

#### Posts
- `GET /posts` - Listar posts
- `GET /posts/:id` - Buscar post por ID
- `GET /posts/search?query=` - Buscar posts
- `POST /posts` - Criar post
- `PUT /posts/:id` - Atualizar post
- `DELETE /posts/:id` - Deletar post
- `POST /posts/:id/comments` - Adiciona um comentário ao post
- `PUT /posts/:id/comments/:commentId` - Atualizar um comentário específico
- `DELETE /posts/:id/comments/:commentId` - Remove um comentário espeífico

#### Professores
- `GET /teachers` - Listar professores
- `GET /teachers/:id` - Buscar professor
- `POST /teachers` - Criar professor
- `PUT /teachers/:id` - Atualizar professor
- `DELETE /teachers/:id` - Deletar professor

#### Alunos
- `GET /students` - Listar alunos
- `GET /students/:id` - Buscar aluno
- `POST /students` - Criar aluno
- `PUT /students/:id` - Atualizar aluno
- `DELETE /students/:id` - Deletar aluno

#### Autenticação
- `POST /login` - Realiza login de alunos e professores

> Para mais informações acesse https://tech-challenge-edn9.onrender.com/api-docs/#/

## 🔐 Segurança

- ✅ Autenticação via JWT
- ✅ Tokens armazenados de forma segura (SecureStore)
- ✅ Proteção de rotas
- ✅ Validação de dados no cliente
- ✅ Tratamento seguro de erros de API


## 📦 Build para Produção

### Gerar APK (Android)
```bash
eas build --platform android
```

### Gerar IPA (iOS)
```bash
eas build --platform ios
```

Nota: Requer configuração do EAS (Expo Application Services).

## 🐛 Troubleshooting

### Problema: Erro ao instalar dependências
**Solução**: Use o flag `--legacy-peer-deps`:
```bash
npm install --legacy-peer-deps
```

### Problema: Erro de conexão com a API
**Solução**: Verifique:
1. Se a URL da API está correta em `src/api/axios.js`
2. Se o backend está rodando
3. Se há conexão com internet

### Problema: Erro no Expo Go
**Solução**: 
1. Limpe o cache: `npx expo start -c`
2. Reinstale o Expo Go no dispositivo
3. Verifique se está na mesma rede Wi-Fi

### Problema: Warnings do Node.js
**Solução**: Os warnings sobre versão do Node são esperados e não impedem o funcionamento. Para removê-los, atualize o Node.js para versão 20+.

## Documentação Adicional

### Documentos Importantes

- **[TECH-CHALLENGE-4-DOCUMENTACAO.md](TECH-CHALLENGE-4-DOCUMENTACAO.md)** - 📘 **Documentação completa do projeto**
  - Arquitetura detalhada do sistema
  - Guia completo de uso da aplicação
  - Relato de experiências e desafios enfrentados
  - Aprendizados e próximos passos

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Arquitetura técnica e padrões de código
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guia de contribuição para desenvolvedores
- **[QUICKSTART.md](QUICKSTART.md)** - Início rápido em 3 passos

### Para o Tech Challenge

A documentação principal exigida para o Tech Challenge 4 está no arquivo:
**[TECH-CHALLENGE-4-DOCUMENTACAO.md](TECH-CHALLENGE-4-DOCUMENTACAO.md)**

Este documento inclui:
1. ✅ Descrição da arquitetura do sistema
2. ✅ Instruções de uso da aplicação
3. ✅ Relato de experiências e desafios enfrentados pela equipe

## 📄 Licença

Este projeto faz parte do curso Tech Challenge da FIAP.

## 👥 Autores

- Matheus Carvalho
