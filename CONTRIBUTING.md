# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o Tech Challenge 4!

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Padrões de Código](#padrões-de-código)
- [Estrutura de Commits](#estrutura-de-commits)
- [Pull Requests](#pull-requests)

## 📜 Código de Conduta

Este projeto segue os padrões éticos e de conduta da FIAP. Seja respeitoso e colaborativo.

## 🚀 Como Contribuir

### 1. Fork o Projeto

```bash
git clone <url-do-seu-fork>
cd tech-challenge-4
```

### 2. Crie uma Branch

```bash
git checkout -b feature/nova-funcionalidade
# ou
git checkout -b fix/correcao-bug
```

### 3. Faça suas Alterações

Siga os [padrões de código](#padrões-de-código).

### 4. Teste suas Alterações

```bash
npm start
# Teste manualmente todas as funcionalidades afetadas
```

### 5. Commit

```bash
git add .
git commit -m "feat: adiciona nova funcionalidade"
```

### 6. Push

```bash
git push origin feature/nova-funcionalidade
```

### 7. Abra um Pull Request

Descreva claramente as mudanças e o problema que resolvem.

## 📝 Padrões de Código

### Nomenclatura

**Componentes:**
```javascript
// PascalCase para componentes
const MyComponent = () => { ... }
export default MyComponent;
```

**Funções:**
```javascript
// camelCase para funções
const handleSubmit = () => { ... }
```

**Constantes:**
```javascript
// UPPER_CASE para constantes
const API_BASE_URL = '...';
```

### Estrutura de Arquivos

```
ComponentName/
  ├── ComponentName.jsx     # Componente principal
  ├── styles.js             # Estilos (se separado)
  └── index.js              # Re-export (opcional)
```

### Styled Components

```javascript
// Use styled components para estilização
const Container = styled.View`
  // Use o theme
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md}px;
`;

// Sempre envolva com ThemeProvider
<ThemeProvider theme={theme}>
  <Container />
</ThemeProvider>
```

### Importações

```javascript
// Ordem de importações:
// 1. React
import React, { useState, useEffect } from 'react';

// 2. Bibliotecas externas
import styled from 'styled-components/native';
import { View, Text } from 'react-native';

// 3. Navegação
import { useNavigation } from '@react-navigation/native';

// 4. APIs/Serviços
import { postsAPI } from '../api/posts';

// 5. Hooks customizados
import { useAuth } from '../contexts/useAuth';

// 6. Componentes locais
import Button from '../components/Button';

// 7. Estilos/Temas
import { theme } from '../styles/theme';
```

### Props

```javascript
// Sempre defina PropTypes ou TypeScript
const MyComponent = ({ 
  title, 
  onPress, 
  variant = 'primary',  // valores default
  disabled = false 
}) => {
  // ...
};
```

### Tratamento de Erros

```javascript
// Sempre use try-catch em async functions
try {
  const data = await api.get('/endpoint');
  // sucesso
} catch (error) {
  console.error('Contexto do erro:', error);
  Alert.alert('Erro', 'Mensagem amigável para o usuário');
}
```

### Comentários

```javascript
// Use comentários para lógica complexa
// ✅ BOM
// Calcula a média ponderada dos últimos 3 meses
const average = calculateWeightedAverage(data);

// ❌ RUIM
// loop pelos items
items.forEach(item => { ... });
```

## 📦 Estrutura de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

### Tipos

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação (não afeta código)
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

### Exemplos

```bash
feat: adiciona funcionalidade de comentários em posts
fix: corrige erro ao deletar professor
docs: atualiza README com instruções de deploy
style: formata código com prettier
refactor: reorganiza estrutura de pastas
test: adiciona testes para AuthContext
chore: atualiza dependências
```

### Formato Completo

```
tipo(escopo): descrição curta

Descrição mais detalhada (opcional)

Refs: #123 (issue relacionada)
```

## 🔍 Pull Requests

### Checklist

Antes de abrir um PR, verifique:

- [ ] Código segue os padrões do projeto
- [ ] Funcionalidade foi testada manualmente
- [ ] Documentação foi atualizada (se necessário)
- [ ] Commits seguem o padrão
- [ ] Não há conflitos com a branch main
- [ ] PR tem descrição clara

### Template de PR

```markdown
## Descrição
Breve descrição das mudanças

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. Passo 1
2. Passo 2
3. ...

## Screenshots (se aplicável)
[Adicione screenshots]

## Checklist
- [ ] Código testado
- [ ] Documentação atualizada
- [ ] Segue padrões do projeto
```

## 🧪 Testes

### Testes Manuais

Sempre teste:
1. Login/Logout
2. Navegação entre telas
3. Criação/Edição/Exclusão
4. Casos de erro
5. Responsividade

### Testes Automatizados (Futuro)

```bash
npm test
```

## 🎨 UI/UX

### Princípios

- **Consistência**: Use componentes do tema
- **Feedback**: Sempre dê feedback ao usuário
- **Acessibilidade**: Labels, contraste, tamanho de toque
- **Performance**: Listas otimizadas, lazy loading

### Componentes

Use os componentes base sempre que possível:
- `Button` em vez de `TouchableOpacity` direto
- `Input` em vez de `TextInput` direto
- `Loading` para estados de carregamento

## 📚 Recursos

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Styled Components](https://styled-components.com/)

## ❓ Dúvidas

Se tiver dúvidas:
1. Consulte a documentação do projeto
2. Veja exemplos no código existente
3. Abra uma issue para discussão

## 🙏 Obrigado!

Sua contribuição é valiosa! 💙

---

**Mantenedores:** [Seu nome/grupo]
