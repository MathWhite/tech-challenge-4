# Tech Challenge 4 - Documentação Completa
## Aplicativo Mobile React Native

**Curso:** Pós-Graduação FIAP  
**Disciplina:** Tech Challenge 4  
**Data:** Janeiro 2026  
**Versão:** 1.1.1

---

## 📋 Índice

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Arquitetura do Sistema](#2-arquitetura-do-sistema)
3. [Guia de Uso da Aplicação](#3-guia-de-uso-da-aplicação)
4. [Relato de Experiências e Desafios](#4-relato-de-experiências-e-desafios)
5. [Conclusão](#5-conclusão)

---

## 1. Visão Geral do Projeto

### 1.1 Contexto

O Tech Challenge 4 consiste no desenvolvimento de uma aplicação mobile em React Native que complementa o sistema web desenvolvido no Tech Challenge 3. O objetivo é fornecer aos professores uma interface mobile para gerenciar posts educacionais, alunos e outros professores de forma prática e acessível.

### 1.2 Objetivos

- Desenvolver um aplicativo mobile multiplataforma (iOS e Android)
- Implementar autenticação segura para professores
- Permitir operações CRUD completas para posts, professores e alunos
- Garantir uma experiência de usuário fluida e intuitiva
- Integrar com a API REST existente (Tech Challenge 3)

### 1.3 Tecnologias Principais

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| React Native | 0.81.5 | Framework mobile multiplataforma |
| Expo | 54.0.30 | Plataforma de desenvolvimento |
| React Navigation | 7.x | Sistema de navegação |
| Styled Components | 6.1.19 | Estilização de componentes |
| Axios | 1.13.2 | Cliente HTTP |
| Expo SecureStore | 15.0.8 | Armazenamento seguro |

---

## 2. Arquitetura do Sistema

### 2.1 Arquitetura Geral

O aplicativo segue uma arquitetura em camadas, promovendo separação de responsabilidades e facilitando manutenção:

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Screens (View Components)               │  │
│  │  - Login, Home, Admin, CRUD Screens              │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Reusable Components                       │  │
│  │  - Button, Input, Loading                        │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓↑
┌─────────────────────────────────────────────────────────┐
│                  STATE MANAGEMENT LAYER                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Context API (AuthContext)             │  │
│  │  - User state, Authentication methods           │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓↑
┌─────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │              API Services                         │  │
│  │  - postsAPI, teachersAPI, studentsAPI           │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓↑
┌─────────────────────────────────────────────────────────┐
│                   DATA ACCESS LAYER                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Axios (HTTP Client)                       │  │
│  │  - Interceptors, Error handling                  │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │         SecureStore (Local Storage)              │  │
│  │  - Token, User data                              │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓↑
┌─────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                     │
│                Backend API (Tech Challenge 2)            │
│          https://tech-challenge-edn9.onrender.com       │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Estrutura de Diretórios

```
tech-challenge-4/
├── App.js                          # Componente raiz da aplicação
├── index.js                        # Entry point
├── package.json                    # Dependências e scripts
│
├── assets/                         # Recursos estáticos
│   └── icon.png, splash.png, etc.
│
└── src/                           # Código-fonte principal
    │
    ├── api/                       # Camada de comunicação com backend
    │   ├── axios.js              # Configuração Axios + interceptors
    │   ├── posts.js              # Endpoints relacionados a posts
    │   ├── teachers.js           # Endpoints relacionados a professores
    │   └── students.js           # Endpoints relacionados a alunos
    │
    ├── components/               # Componentes reutilizáveis
    │   ├── Button.jsx           # Botão customizado com variants
    │   ├── Input.jsx            # Input com label e validação
    │   └── Loading.jsx          # Indicador de carregamento
    │
    ├── contexts/                # Gerenciamento de estado global
    │   ├── AuthContext.js       # Definição do contexto
    │   ├── AuthProvider.jsx     # Provider com lógica de autenticação
    │   └── useAuth.js           # Hook customizado para auth
    │
    ├── navigation/              # Sistema de navegação
    │   └── AppNavigator.jsx     # Configuração de rotas e tabs
    │
    ├── screens/                 # Telas da aplicação
    │   ├── LoginScreen.jsx              # Login de professores
    │   ├── HomeScreen.jsx               # Lista de posts (público)
    │   ├── PostReadScreen.jsx           # Visualização detalhada
    │   ├── PostCreateScreen.jsx         # Criação de posts
    │   ├── PostEditScreen.jsx           # Edição de posts
    │   ├── PostsAdminScreen.jsx         # Admin de posts
    │   ├── AdminScreen.jsx              # Dashboard administrativo
    │   ├── TeachersListScreen.jsx       # Lista de professores
    │   ├── TeacherCreateScreen.jsx      # Cadastro de professor
    │   ├── TeacherEditScreen.jsx        # Edição de professor
    │   ├── StudentsListScreen.jsx       # Lista de alunos
    │   ├── StudentCreateScreen.jsx      # Cadastro de aluno
    │   └── StudentEditScreen.jsx        # Edição de aluno
    │
    ├── styles/                  # Estilos globais
    │   └── theme.js            # Sistema de design tokens
    │
    ├── services/               # Serviços auxiliares (futuro)
    └── utils/                  # Utilitários gerais (futuro)
```

### 2.3 Fluxo de Dados e Autenticação

#### 2.3.1 Fluxo de Autenticação

```
┌──────────────┐
│ LoginScreen  │
└──────┬───────┘
       │ 1. Usuário insere credenciais
       ↓
┌──────────────────────┐
│ AuthProvider.login() │
└──────────┬───────────┘
           │ 2. Criptografa senha (SHA-256)
           ↓
┌─────────────────────────────┐
│ POST /api/teachers/login    │
│ { email, palavraPasse }     │
└──────────┬──────────────────┘
           │ 3. Backend valida e retorna JWT
           ↓
┌────────────────────────────┐
│ Response: { token, user }  │
└──────────┬─────────────────┘
           │ 4. Salva dados localmente
           ↓
┌─────────────────────────────┐
│ SecureStore.setItemAsync()  │
│ - userToken                 │
│ - userData                  │
└──────────┬──────────────────┘
           │ 5. Atualiza Context
           ↓
┌─────────────────────────┐
│ setUser(userData)       │
└──────────┬──────────────┘
           │ 6. Navegação automática
           ↓
┌──────────────────────┐
│ MainTabs (Home+Admin)│
└──────────────────────┘
```

#### 2.3.2 Fluxo de Requisições Autenticadas

```
┌──────────────┐
│   Screen     │
└──────┬───────┘
       │ 1. Chama método da API
       ↓
┌──────────────────┐
│  postsAPI.getAll()│
└──────┬───────────┘
       │ 2. Axios faz requisição
       ↓
┌─────────────────────────┐
│ Request Interceptor     │
│ - Busca token no Store  │
│ - Adiciona Authorization│
└──────┬──────────────────┘
       │ 3. Envia para backend
       ↓
┌──────────────────────────┐
│ Backend API              │
│ - Valida JWT             │
│ - Processa requisição    │
└──────┬───────────────────┘
       │ 4. Retorna resposta
       ↓
┌─────────────────────────┐
│ Response Interceptor    │
│ - Trata erros 401       │
│ - Logout em caso de erro│
└──────┬──────────────────┘
       │ 5. Retorna dados
       ↓
┌──────────────┐
│   Screen     │
│ - Atualiza UI│
└──────────────┘
```

### 2.4 Componentes Principais

#### 2.4.1 App.js - Componente Raiz

```javascript
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { AuthProvider } from './src/contexts/AuthProvider';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/styles/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>      {/* Fornece tema global */}
      <AuthProvider>                    {/* Fornece contexto de auth */}
        <AppNavigator />                {/* Sistema de navegação */}
      </AuthProvider>
    </ThemeProvider>
  );
}
```

**Responsabilidades:**
- Inicialização da aplicação
- Configuração de providers globais
- Injeção de tema e contexto de autenticação

#### 2.4.2 AuthProvider - Gerenciamento de Autenticação

```javascript
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Métodos principais:
  // - login(email, password)
  // - logout()
  // - loadStoredUser()
  // - encryptPassword(text)
};
```

**Responsabilidades:**
- Gerenciar estado do usuário autenticado
- Persistir e recuperar credenciais do SecureStore
- Criptografar senhas antes de enviar ao backend
- Fornecer métodos de login/logout para toda aplicação

#### 2.4.3 AppNavigator - Sistema de Navegação

```javascript
const AppNavigator = () => {
  const { user, loading } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          // Stack de autenticação
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          // Stack principal com tabs
          <Stack.Screen name="Main" component={MainTabs} />
          // + outras telas modais
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

**Responsabilidades:**
- Definir estrutura de navegação
- Controlar acesso baseado em autenticação
- Configurar tabs e stacks de navegação

### 2.5 Integração com Backend

#### 2.5.1 Configuração do Axios

```javascript
// src/api/axios.js
const api = axios.create({
  baseURL: 'https://tech-challenge-edn9.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Injeta token
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor - Trata erros
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token inválido - fazer logout
      await logout();
    }
    return Promise.reject(error);
  }
);
```

#### 2.5.2 Endpoints da API

| Recurso | Método | Endpoint | Autenticação |
|---------|--------|----------|--------------|
| **Posts** |
| Listar posts | GET | `/posts` | Não |
| Buscar post | GET | `/posts/:id` | Não |
| Buscar por keyword | GET | `/posts/search?query=` | Não |
| Criar post | POST | `/posts` | Sim |
| Atualizar post | PUT | `/posts/:id` | Sim |
| Deletar post | DELETE | `/posts/:id` | Sim |
| **Professores** |
| Login | POST | `/teachers/login` | Não |
| Listar professores | GET | `/teachers` | Sim |
| Buscar professor | GET | `/teachers/:id` | Sim |
| Criar professor | POST | `/teachers` | Sim |
| Atualizar professor | PUT | `/teachers/:id` | Sim |
| Deletar professor | DELETE | `/teachers/:id` | Sim |
| **Alunos** |
| Listar alunos | GET | `/students` | Sim |
| Buscar aluno | GET | `/students/:id` | Sim |
| Criar aluno | POST | `/students` | Sim |
| Atualizar aluno | PUT | `/students/:id` | Sim |
| Deletar aluno | DELETE | `/students/:id` | Sim |
| **Autenticação** |
| Login | POST | `/login` | Não |

Documentação completa da API em https://tech-challenge-edn9.onrender.com/api-docs/#/

### 2.6 Segurança

#### 2.6.1 Medidas Implementadas

1. **Criptografia de Senhas**
   - Algoritmo: SHA-256
   - Biblioteca: Expo Crypto
   - Senhas nunca armazenadas em texto plano

2. **Armazenamento Seguro**
   - Expo SecureStore para tokens e dados sensíveis
   - Criptografia nativa do sistema operacional
   - Isolamento por aplicação

3. **Tokens JWT**
   - Validação em cada requisição autenticada
   - Expiração automática no backend
   - Renovação transparente quando possível

4. **Comunicação HTTPS**
   - Todas as requisições via HTTPS
   - Certificados SSL validados

5. **Tratamento de Erros**
   - Logout automático em caso de token inválido
   - Mensagens genéricas para o usuário
   - Logs detalhados apenas em desenvolvimento

### 2.7 Performance e Otimizações

1. **Renderização de Listas**
   - Uso de `FlatList` para virtualização
   - `keyExtractor` para identificação única
   - `initialNumToRender` otimizado

2. **Navegação**
   - Lazy loading de telas por padrão
   - Listeners de foco para recarregar dados quando necessário

3. **Gerenciamento de Estado**
   - Context API apenas para estado global essencial
   - Estado local para dados específicos de tela

4. **Cache e Revalidação**
   - Pull-to-refresh implementado
   - Recarregamento ao focar tela

---

## 3. Guia de Uso da Aplicação

### 3.1 Instalação e Configuração

#### 3.1.1 Pré-requisitos

- Node.js v18+ instalado
- npm ou yarn
- Smartphone com Expo Go App
- Computador e smartphone na mesma rede Wi-Fi

#### 3.1.2 Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/MathWhite/tech-challenge-4
cd tech-challenge-4

# 2. Instale as dependências
npm install --legacy-peer-deps

# 3. Inicie o servidor de desenvolvimento
npm start

# 4. Escaneie o QR Code com o Expo Go
# Android: Use o app Expo Go
# iOS: Use a câmera nativa do iPhone
```

### 3.2 Funcionalidades e Navegação

#### 3.2.1 Tela de Login

**Objetivo:** Autenticar professores no sistema.

**Como usar:**
1. Insira seu e-mail cadastrado
2. Insira sua senha
3. Toque em "Entrar"

**Credenciais de exemplo:**
```
Email: admin@admin.com
Senha: admin123
```
```
Email: aluno@aluno.com
Senha: aluno123
```

**Observações:**
- Apenas professores cadastrados podem fazer login
- As senhas são criptografadas automaticamente
- Em caso de erro, uma mensagem clara será exibida

![Fluxo de Login]
```
┌─────────────────┐
│  LoginScreen    │
│                 │
│  [Email____]    │
│  [Senha____]    │
│  [  Entrar  ]   │
└────────┬────────┘
         │ Login bem-sucedido
         ↓
┌─────────────────┐
│   Main Tabs     │
│  Home | Admin   │
└─────────────────┘
```

#### 3.2.2 Tela Home (Posts)

**Objetivo:** Visualizar e buscar posts educacionais.

**Funcionalidades:**
- ✅ Listar todos os posts disponíveis
- ✅ Buscar posts por palavra-chave
- ✅ Visualizar detalhes completos de um post
- ✅ Criar novo post (botão flutuante +)
- ✅ Refresh pull-to-refresh

**Como usar:**
1. Role a lista para ver todos os posts
2. Use a barra de busca no topo para filtrar
3. Toque em um card para ver detalhes
4. Toque no botão "+" para criar novo post

**Layout:**
```
┌──────────────────────────────┐
│ Home                    🔍   │
│ [Buscar posts...______]      │
├──────────────────────────────┤
│ ┌──────────────────────────┐ │
│ │ Título do Post           │ │
│ │ Por: Professor X         │ │
│ │ Resumo do conteúdo...    │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ Outro Post               │ │
│ │ Por: Professor Y         │ │
│ └──────────────────────────┘ │
│                              │
│                          [+] │
└──────────────────────────────┘
```

#### 3.2.3 Visualização de Post

**Objetivo:** Ler o conteúdo completo de um post.

**Informações exibidas:**
- Título
- Autor
- Conteúdo completo
- Data de criação
- Comentários (se houver)

**Ações disponíveis:**
- Voltar para lista
- Editar (se for autor do post)

#### 3.2.4 Criar/Editar Post

**Objetivo:** Criar novos posts ou editar existentes.

**Campos:**
- Título (obrigatório)
- Conteúdo (obrigatório)

**Como usar:**
1. Preencha o título
2. Escreva o conteúdo no editor
3. Toque em "Salvar"
4. Aguarde confirmação

**Validações:**
- Título não pode estar vazio
- Conteúdo não pode estar vazio
- Feedback visual em caso de erro

#### 3.2.5 Tela Admin

**Objetivo:** Acessar funcionalidades administrativas.

**Menu de opções:**
```
┌──────────────────────────────┐
│ Administração           👤  │
│ Professor: [Nome]            │
├──────────────────────────────┤
│                              │
│ 📝 Posts                    │
│ [Criar Novo Post]            │
│ [Editar Posts]               │
│                              │
│ 👨‍🏫 Professores              |
│ [Cadastrar Professor]        │
│ [Listar Professores]         │
│                              │
│ 👨‍🎓 Alunos                   │
│ [Cadastrar Aluno]            │
│ [Listar Alunos]              │
│                              │
│ ⚙️ Conta                    │
│ [Sair da Conta]              │
└──────────────────────────────┘
```

#### 3.2.6 Gerenciar Professores

**Lista de Professores:**
- Visualizar todos os professores cadastrados
- Paginação automática
- Busca por nome ou email
- Ações: Editar | Excluir

**Cadastrar Professor:**
- Nome completo
- Email
- Senha

**Editar Professor:**
- Atualizar dados cadastrais
- Alterar senha (opcional)

**Excluir Professor:**
- Confirmação antes de excluir

#### 3.2.7 Gerenciar Alunos

Similar ao gerenciamento de professores, com as seguintes operações:
- Listar alunos
- Cadastrar novo aluno
- Editar dados de aluno
- Excluir aluno

**Campos de Aluno:**
- Nome completo
- Email
- Senha

#### 3.2.8 Logout

**Como sair:**
1. Vá para a tela Admin
2. Role até o final
3. Toque em "Sair da Conta"
4. Confirme a ação

**O que acontece:**
- Token é removido do SecureStore
- Dados do usuário são limpos
- Redirecionamento automático para Login

### 3.3 Dicas de Uso

#### 3.3.1 Boas Práticas

✅ **Faça logout ao sair** - Especialmente em dispositivos compartilhados
✅ **Use a busca** - Mais rápido que rolar a lista inteira
✅ **Pull to refresh** - Puxe para baixo para atualizar dados
✅ **Verifique sua conexão** - Aplicativo requer internet

#### 3.3.2 Solução de Problemas

**Problema: App não carrega posts**
- Verifique sua conexão com internet
- Puxe para baixo (pull-to-refresh) para recarregar
- Verifique se a API está online

**Problema: Login falha**
- Verifique suas credenciais
- Confirme que você está cadastrado como professor
- Tente redefinir a senha pelo sistema web

**Problema: Não consigo criar post**
- Verifique se você está autenticado
- Confirme que preencheu todos os campos
- Verifique sua conexão com internet

**Problema: App está lento**
- Feche e reabra o aplicativo
- Limpe o cache: `npm start -- --clear`
- Verifique se há atualizações disponíveis

---

## 4. Relato de Experiências e Desafios

### 4.1 Escolhas Tecnológicas

#### 4.1.1 Por que React Native com Expo?

**Decisão:** Utilizar Expo em vez de React Native puro.

**Justificativa:**
- **Agilidade no desenvolvimento:** Expo fornece ferramentas prontas (SecureStore, Crypto, etc.)
- **Facilidade de teste:** Expo Go permite testar em dispositivos reais sem build
- **Multiplataforma:** Um código para iOS e Android
- **Comunidade ativa:** Vasta documentação e suporte

**Trade-offs:**
- Tamanho do app um pouco maior
- Algumas limitações em módulos nativos (não foi problema neste projeto)

#### 4.1.2 Styled Components vs. StyleSheet

**Decisão:** Utilizar Styled Components.

**Justificativa:**
- CSS-in-JS familiar para desenvolvedores web
- Temas facilmente gerenciáveis
- Props dinâmicos mais elegantes
- Componentes autocontidos e reutilizáveis

**Desafio enfrentado:**
Inicialmente tivemos problemas com performance em listas grandes. Solução: usar `FlatList` com `styled-components` apenas nos componentes de card, não em cada item individual.

#### 4.1.3 Context API vs. Redux

**Decisão:** Utilizar Context API.

**Justificativa:**
- Estado global simples (apenas autenticação)
- Menos boilerplate
- Nativo do React
- Suficiente para o escopo do projeto

**Reflexão:**
Para um projeto maior com mais estados globais, Redux ou Zustand poderiam ser mais adequados.

### 4.2 Desafios Técnicos Enfrentados

#### 4.2.1 Desafio: Criptografia de Senha

**Problema:**
O backend esperava senhas criptografadas em SHA-256, mas não estava claro inicialmente qual biblioteca usar no React Native.

**Tentativas:**
1. Primeiro tentamos usar `crypto` nativo do Node.js - **Falhou** (não disponível no RN)
2. Tentamos biblioteca `react-native-crypto` - **Conflitos de dependências**
3. Finalmente usamos `expo-crypto` - **Sucesso!**

**Solução implementada:**
```javascript
import * as Crypto from 'expo-crypto';

const encryptPassword = async (text) => {
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    text
  );
  return hash;
};
```

**Aprendizado:**
- Sempre verificar compatibilidade de bibliotecas com React Native
- Expo geralmente tem soluções nativas mais confiáveis
- Documentação do Expo é excelente

#### 4.2.2 Desafio: Persistência de Autenticação

**Problema:**
Usuário deslogava toda vez que o app era recarregado.

**Causa raiz:**
Não estávamos carregando os dados do SecureStore ao iniciar o app.

**Solução:**
```javascript
useEffect(() => {
  loadStoredUser();
}, []);

const loadStoredUser = async () => {
  const userData = await SecureStore.getItemAsync('userData');
  const token = await SecureStore.getItemAsync('userToken');
  
  if (userData && token) {
    setUser(JSON.parse(userData));
  }
  setLoading(false);
};
```

**Aprendizado:**
- Sempre pensar no ciclo de vida completo do app
- SecureStore é assíncrono - usar loading states
- Testar fluxo de "matar e reabrir app"

#### 4.2.3 Desafio: Interceptors do Axios

**Problema:**
Token JWT não estava sendo enviado automaticamente nas requisições.

**Primeira tentativa (falha):**
```javascript
// Tentamos passar token manualmente em cada requisição
const data = await api.get('/posts', {
  headers: { Authorization: `Bearer ${token}` }
});
```

**Problema:** Muito repetitivo e propenso a erros.

**Solução elegante:**
```javascript
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Aprendizado:**
- Interceptors são poderosos para funcionalidades transversais
- Centralizar lógica evita duplicação
- Importante tratar casos onde token pode não existir

#### 4.2.4 Desafio: Navegação Condicional

**Problema:**
Como mostrar telas diferentes para usuários autenticados vs. não autenticados?

**Solução:**
```javascript
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            {/* outras telas autenticadas */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

**Aprendizado:**
- Renderização condicional é chave para autenticação
- Loading state previne flashes indesejados
- Navigator aceita componentes condicionais

#### 4.2.5 Desafio: Recarregar Dados ao Focar Tela

**Problema:**
Ao editar um professor e voltar para lista, os dados não atualizavam.

**Solução:**
```javascript
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    loadTeachers();
  });
  
  return unsubscribe;
}, [navigation]);
```

**Aprendizado:**
- React Navigation fornece listeners úteis
- `focus` event é perfeito para recarregar dados
- Sempre fazer cleanup dos listeners

#### 4.2.6 Desafio: Compatibilidade de Dependências

**Problema:**
```
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Causa:**
React 19.1.0 e algumas bibliotecas esperavam React 18.

**Solução temporária:**
```bash
npm install --legacy-peer-deps
```

**Aprendizado:**
- Ecossistema React Native ainda se adaptando ao React 19
- `--legacy-peer-deps` resolve na maioria dos casos
- Importante documentar para outros desenvolvedores

### 4.3 Desafios de UX/UI

#### 4.3.1 Feedback Visual

**Desafio:**
Usuários não sabiam quando uma ação estava sendo processada.

**Solução:**
- Estados de loading em todos os botões
- Indicadores de carregamento em listas
- Mensagens de sucesso/erro com `Alert`
- Disable de botões durante processamento

**Exemplo:**
```javascript
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await api.post('/posts', data);
    Alert.alert('Sucesso', 'Post criado!');
    navigation.goBack();
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível criar o post');
  } finally {
    setLoading(false);
  }
};
```

#### 4.3.2 Validação de Formulários

**Desafio:**
Validar campos antes de enviar ao backend.

**Solução implementada:**
```javascript
const validateForm = () => {
  if (!title.trim()) {
    Alert.alert('Erro', 'Título é obrigatório');
    return false;
  }
  if (!content.trim()) {
    Alert.alert('Erro', 'Conteúdo é obrigatório');
    return false;
  }
  return true;
};
```

**Melhoria futura:**
- Usar biblioteca como Formik ou React Hook Form
- Validação em tempo real com feedback inline
- Schemas com Yup

#### 4.3.3 Responsividade

**Desafio:**
Garantir que o app funcione bem em diferentes tamanhos de tela.

**Solução:**
- Evitar valores fixos em pixels
- Usar `flex` sempre que possível
- Testar em múltiplos dispositivos (iPhone SE, iPhone 14, Android pequeno/grande)

**Exemplo:**
```javascript
const Container = styled.View`
  flex: 1;
  padding: ${props => props.theme.spacing.md}px;
`;
```

### 4.4 Integração com Backend

#### 4.4.1 CORS e Testes

**Desafio:**
Testar integração com backend durante desenvolvimento.

**Solução:**
- Backend já tinha CORS configurado corretamente
- Usar Postman para testar endpoints antes de implementar no app
- Console logs detalhados durante desenvolvimento

#### 4.4.2 Tratamento de Erros de Rede

**Desafio:**
App crashava quando não havia internet.

**Solução:**
```javascript
try {
  const response = await api.get('/posts');
  setPosts(response.data);
} catch (error) {
  if (error.message === 'Network Error') {
    Alert.alert('Sem conexão', 'Verifique sua internet');
  } else {
    Alert.alert('Erro', 'Algo deu errado. Tente novamente.');
  }
}
```

**Melhoria futura:**
- Modo offline com cache
- Sincronização ao recuperar conexão

### 4.5 Experiências Positivas

#### 4.5.1 Desenvolvimento Rápido com Expo

**Experiência:**
O Expo Go permitiu testar mudanças instantaneamente no dispositivo físico, acelerando muito o desenvolvimento.

**Exemplo:**
- Fazer mudança no código
- Hot reload automático no telefone
- Ver resultado em segundos

Isso é **muito mais rápido** do que compilar um build nativo toda vez.

#### 4.5.2 Reusabilidade de Componentes

**Experiência:**
Criar componentes reutilizáveis (`Button`, `Input`) economizou muito tempo.

**Resultado:**
- Consistência visual automática
- Mudanças em um lugar refletem em todo app
- Desenvolvimento de novas telas mais rápido

#### 4.5.3 Context API Simplifica Estado Global

**Experiência:**
Context API foi suficiente e simples para gerenciar autenticação.

**Benefícios:**
- Menos código boilerplate que Redux
- Mais fácil de entender para novos desenvolvedores
- Adequado para o escopo do projeto

### 4.6 O que faria Diferente

#### 4.6.1 TypeScript

**Reflexão:**
Usar JavaScript foi mais rápido no início, mas TypeScript teria evitado vários bugs relacionados a tipos.

**Exemplo de bug evitável:**
```javascript
// Bug: teacherId era string, mas enviamos como número
const response = await api.get(`/teachers/${teacherId}`);
// Erro 404 porque rota esperava número
```

Com TypeScript:
```typescript
const teacherId: number = parseInt(params.teacherId);
```

#### 4.6.2 Tratamento de Erros Mais Robusto

**Reflexão:**
Usamos try-catch básico, mas poderíamos ter:
- Criado um hook customizado `useAsyncError`
- Implementado um ErrorBoundary
- Logs estruturados com Sentry

#### 4.6.3 Acessibilidade

**Reflexão:**
Não focamos em acessibilidade (WCAG).

**Melhorias necessárias:**
- Adicionar `accessibilityLabel` em todos os componentes
- Testar com VoiceOver (iOS) e TalkBack (Android)
- Garantir contraste adequado de cores
- Tamanhos de toque adequados (44x44 mínimo)

### 4.7 Aprendizados Principais

#### 4.7.1 Técnicos

1. **React Native não é React Web**
   - Componentes diferentes (`View` vs `div`)
   - Comportamentos diferentes (eventos, styling)
   - Bibliotecas específicas para mobile

2. **Expo é poderoso mas tem limitações**
   - Ótimo para prototipagem e apps "simples"
   - Para features muito específicas, pode precisar eject

3. **Performance importa no mobile**
   - Listas grandes precisam de `FlatList`
   - Animações pesadas travam UI
   - Bundle size afeta tempo de carregamento

4. **Segurança é crítica**
   - Nunca armazenar dados sensíveis em AsyncStorage
   - Sempre usar HTTPS
   - Validar no cliente E no servidor

#### 4.7.2 Processuais

1. **Documentar enquanto desenvolve**
   - Mais fácil que documentar no final
   - Não esquecemos detalhes importantes

2. **Testar em dispositivos reais**
   - Simuladores não capturam todos os problemas
   - Diferentes versões de iOS/Android podem ter bugs específicos

3. **Commits frequentes e descritivos**
   - Facilita encontrar quando bugs foram introduzidos
   - Revisão de código mais fácil

#### 4.7.3 Colaborativos

1. **Comunicação é essencial**
   - Alinhamento sobre arquitetura antes de codificar
   - Code reviews construtivos
   - Documentação clara para onboarding

2. **Priorização de funcionalidades**
   - MVP primeiro, features "nice-to-have" depois
   - Evitar scope creep

---

## 5. Conclusão

### 5.1 Objetivos Alcançados

- **Aplicativo mobile funcional** desenvolvido em React Native com Expo
- **Autenticação segura** implementada com JWT e SecureStore
- **CRUD completo** para Posts, Professores e Alunos
- **Integração bem-sucedida** com backend existente (TC2)
- **Interface intuitiva** com navegação por tabs e stacks
- **Código organizado** seguindo boas práticas e arquitetura em camadas

### 5.2 Métricas do Projeto

| Métrica | Valor |
|---------|-------|
| Linhas de código | ~3.000 |
| Componentes criados | 16 screens + 3 components |
| Telas implementadas | 13 |
| APIs integradas | 3 (Posts, Teachers, Students) |
| Tempo de desenvolvimento | 3-4 semanas |
| Plataformas suportadas | iOS e Android |

### 5.3 Próximos Passos

#### Curto Prazo
- [ ] Implementar testes unitários e de integração
- [ ] Adicionar TypeScript
- [ ] Melhorar acessibilidade
- [ ] Implementar modo offline

#### Médio Prazo
- [ ] Sistema de notificações push
- [ ] Upload de imagens em posts
- [ ] Sistema de comentários interativo
- [ ] Dark mode

#### Longo Prazo
- [ ] Publicar nas lojas (App Store e Play Store)
- [ ] Analytics e monitoramento
- [ ] Internacionalização (i18n)
- [ ] Gamificação para alunos

### 5.4 Considerações Finais

O desenvolvimento do Tech Challenge 4 foi uma experiência enriquecedora que nos permitiu aplicar conceitos de desenvolvimento mobile, integração com APIs RESTful, e design de aplicações seguras.

Os desafios enfrentados foram valiosos para o aprendizado, desde questões técnicas (criptografia, persistência) até aspectos de UX/UI e arquitetura de software.

O resultado é um aplicativo funcional, seguro e com potencial para evolução, que atende aos requisitos propostos e fornece uma base sólida para futuras melhorias.

### 5.5 Agradecimentos

Agradecemos:
- Aos professores da FIAP pelo suporte e orientação
- À comunidade React Native e Expo pela documentação excelente

---

## Anexos

### A. Referências Técnicas

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Styled Components](https://styled-components.com/)
- [Axios Documentation](https://axios-http.com/)

### B. Repositório e Documentação Adicional

- README.md - Guia de instalação e uso
- CONTRIBUTING.md - Guia de contribuição
- QUICKSTART.md - Início rápido

### C. Glossário

| Termo | Definição |
|-------|-----------|
| **JWT** | JSON Web Token - padrão para autenticação stateless |
| **CRUD** | Create, Read, Update, Delete - operações básicas |
| **SecureStore** | Armazenamento criptografado do Expo |
| **Context API** | Mecanismo do React para estado global |
| **Interceptor** | Middleware do Axios que intercepta req/res |
| **Stack Navigator** | Navegação empilhada (com histórico) |
| **Tab Navigator** | Navegação por abas |

---

**Documento gerado em:** Janeiro 2026  
**Versão:** 1.0  
**Status:** Completo

