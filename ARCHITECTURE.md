# Arquitetura do Tech Challenge 4

## Visão Geral

O Tech Challenge 4 é uma aplicação mobile desenvolvida em React Native utilizando o framework Expo. A aplicação segue uma arquitetura modular e organizada, facilitando manutenção e escalabilidade.

## Stack Tecnológica

### Core
- **React Native**: Framework principal para desenvolvimento mobile
- **Expo SDK 54**: Plataforma de desenvolvimento e build
- **JavaScript/JSX**: Linguagem de programação

### Navegação
- **React Navigation v7**: Biblioteca de navegação
  - Native Stack Navigator: Para navegação entre telas
  - Bottom Tab Navigator: Para navegação por abas

### Gerenciamento de Estado
- **Context API**: Gerenciamento de estado global (autenticação)
- **React Hooks**: useState, useEffect, useContext

### Estilização
- **Styled Components**: CSS-in-JS para estilização de componentes
- **Sistema de Tema**: Cores, espaçamentos e tipografia centralizados

### Comunicação com API
- **Axios**: Cliente HTTP para requisições REST
- **Interceptors**: Para injeção automática de tokens e tratamento de erros

### Armazenamento
- **Expo SecureStore**: Armazenamento criptografado de tokens e credenciais

### UI/UX
- **Ionicons**: Biblioteca de ícones
- **React Native Components**: Componentes nativos do RN

## Estrutura de Pastas

```
src/
├── api/                    # Camada de comunicação com backend
│   ├── axios.js           # Configuração do Axios + interceptors
│   ├── posts.js           # Endpoints de posts
│   ├── teachers.js        # Endpoints de professores
│   └── students.js        # Endpoints de alunos
│
├── components/            # Componentes reutilizáveis
│   ├── Button.jsx         # Botão customizado com variants
│   ├── Input.jsx          # Input com label e validação
│   └── Loading.jsx        # Indicador de carregamento
│
├── contexts/              # Contextos globais
│   ├── AuthContext.js     # Contexto de autenticação
│   ├── AuthProvider.jsx   # Provider com lógica de auth
│   └── useAuth.js         # Hook customizado para auth
│
├── navigation/            # Configuração de rotas
│   └── AppNavigator.jsx   # Navigator principal com tabs e stack
│
├── screens/               # Telas da aplicação
│   ├── LoginScreen.jsx            # Tela de login
│   ├── HomeScreen.jsx             # Lista de posts
│   ├── PostReadScreen.jsx         # Visualização de post
│   ├── PostCreateScreen.jsx       # Criação de post
│   ├── PostEditScreen.jsx         # Edição de post
│   ├── AdminScreen.jsx            # Dashboard administrativo
│   ├── TeachersListScreen.jsx     # Lista de professores
│   ├── TeacherCreateScreen.jsx    # Cadastro de professor
│   ├── TeacherEditScreen.jsx      # Edição de professor
│   ├── StudentsListScreen.jsx     # Lista de alunos
│   ├── StudentCreateScreen.jsx    # Cadastro de aluno
│   └── StudentEditScreen.jsx      # Edição de aluno
│
├── styles/                # Estilos globais
│   └── theme.js           # Tema com cores, espaçamentos, etc
│
├── services/              # Serviços auxiliares (futuro)
└── utils/                 # Utilitários (futuro)
```

## Fluxo de Dados

### 1. Autenticação

```
LoginScreen
    ↓
  useAuth() hook
    ↓
AuthProvider (login method)
    ↓
  API POST /api/teachers/login
    ↓
SecureStore (salvar token)
    ↓
  Update Context State
    ↓
AppNavigator (redirect to Main)
```

### 2. Requisições Autenticadas

```
Screen Component
    ↓
API Service (ex: postsAPI.getAll())
    ↓
Axios Instance
    ↓
Request Interceptor (inject token)
    ↓
Backend API
    ↓
Response Interceptor (handle errors)
    ↓
Return data to Screen
```

## Padrões de Código

### Componentes

```javascript
// Padrão de componente funcional
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../styles/theme';

const Container = styled.View`
  // estilos usando theme
`;

const MyComponent = ({ navigation }) => {
  const [state, setState] = useState(initialValue);
  
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {/* conteúdo */}
      </Container>
    </ThemeProvider>
  );
};

export default MyComponent;
```

### Serviços de API

```javascript
// Padrão de serviço
import api from './axios';

export const resourceAPI = {
  getAll: async () => {
    const response = await api.get('/api/resource');
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/api/resource', data);
    return response.data;
  },
  
  // ... outros métodos
};
```

### Navegação

```javascript
// Navegação entre telas
navigation.navigate('ScreenName', { param: value });

// Voltar
navigation.goBack();

// Recarregar ao focar tela
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    loadData();
  });
  return unsubscribe;
}, [navigation]);
```

## Sistema de Autenticação

### Fluxo Completo

1. **Login**
   - Usuário insere credenciais
   - App envia POST para `/api/teachers/login`
   - Backend retorna token JWT + dados do usuário
   - Token salvo no SecureStore
   - Dados do usuário salvos no Context
   - Redirecionamento para telas autenticadas

2. **Requisições Subsequentes**
   - Interceptor do Axios adiciona header `Authorization: Bearer {token}`
   - Todas as requisições são autenticadas automaticamente

3. **Expiração de Token**
   - Se backend retorna 401
   - Response interceptor limpa SecureStore
   - Usuário é redirecionado para Login

4. **Logout**
   - Limpa SecureStore (token + dados)
   - Limpa Context
   - Redirecionamento automático para Login

## Styled Components e Tema

### Sistema de Tema

```javascript
// theme.js
export const theme = {
  colors: { primary, secondary, ... },
  spacing: { xs, sm, md, ... },
  borderRadius: { sm, md, lg, ... },
  fontSize: { xs, sm, md, ... },
  fontWeight: { normal, medium, bold, ... }
};
```

### Uso nos Componentes

```javascript
const StyledComponent = styled.View`
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md}px;
  border-radius: ${props => props.theme.borderRadius.md}px;
`;
```

## Performance e Otimizações

### Listas
- Uso de `FlatList` para renderização eficiente de listas
- `keyExtractor` para identificação única de itens
- Pull-to-refresh implementado com `RefreshControl`

### Navegação
- Lazy loading de telas (padrão do React Navigation)
- Listeners de foco para recarregar dados quando necessário

### Armazenamento
- SecureStore para dados sensíveis
- Context API para estado global mínimo

## Segurança

### Implementações

1. **Tokens JWT**
   - Armazenados no SecureStore (criptografado)
   - Nunca expostos no código-fonte

2. **HTTPS**
   - Todas as comunicações via HTTPS
   - URL base da API configurada

3. **Validação**
   - Validação de campos no cliente
   - Tratamento de erros de API

4. **Proteção de Rotas**
   - Rotas administrativas protegidas por autenticação
   - Redirecionamento automático se não autenticado

## Tratamento de Erros

### Níveis de Tratamento

1. **Network Level** (Axios Interceptors)
   ```javascript
   api.interceptors.response.use(
     response => response,
     error => {
       if (error.response?.status === 401) {
         // handle unauthorized
       }
       return Promise.reject(error);
     }
   );
   ```

2. **Service Level** (try-catch)
   ```javascript
   try {
     const data = await postsAPI.getAll();
     return data;
   } catch (error) {
     console.error(error);
     throw error;
   }
   ```

3. **Component Level** (Alert)
   ```javascript
   try {
     await handleAction();
   } catch (error) {
     Alert.alert('Erro', 'Mensagem amigável');
   }
   ```

## Integração com Backend

### URL Base
- Produção: `https://tech-challenge-edn9.onrender.com`
- Configurável em `src/api/axios.js`

### Endpoints
Ver documentação completa no README.md

### Formato de Resposta
```json
{
  "success": true,
  "data": {},
  "message": "Mensagem opcional"
}
```

## Testes (Futuro)

### Estratégia de Testes

1. **Unit Tests**
   - Componentes isolados
   - Hooks customizados
   - Utilitários

2. **Integration Tests**
   - Fluxos de navegação
   - Integração com Context
   - Chamadas de API

3. **E2E Tests**
   - Fluxos completos do usuário
   - Login → Ação → Logout

### Ferramentas Sugeridas
- Jest: Testes unitários
- React Native Testing Library: Testes de componentes
- Detox: Testes E2E

## Melhorias Futuras

### Funcionalidades
- [ ] Modo offline com sincronização
- [ ] Notificações push
- [ ] Upload de imagens em posts
- [ ] Sistema de comentários interativo
- [ ] Filtros avançados de busca
- [ ] Paginação infinita (scroll)

### Técnicas
- [ ] Implementar Redux ou Zustand
- [ ] Adicionar testes automatizados
- [ ] Implementar cache de requisições
- [ ] Adicionar animações com Reanimated
- [ ] Implementar deep linking
- [ ] Adicionar analytics

### UX/UI
- [ ] Dark mode
- [ ] Skeleton loaders
- [ ] Animações de transição
- [ ] Gestos avançados
- [ ] Acessibilidade melhorada

## Deployment

### Expo Application Services (EAS)

1. **Configurar EAS**
   ```bash
   npm install -g eas-cli
   eas login
   eas build:configure
   ```

2. **Build Android**
   ```bash
   eas build --platform android
   ```

3. **Build iOS**
   ```bash
   eas build --platform ios
   ```

4. **Submissão**
   ```bash
   eas submit --platform android
   eas submit --platform ios
   ```

## Troubleshooting Comum

Ver seção de Troubleshooting no README.md principal.

## Referências

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [Styled Components Docs](https://styled-components.com/)
- [Axios Docs](https://axios-http.com/)

---

**Versão da Documentação**: 1.0  
**Última Atualização**: Janeiro 2026
