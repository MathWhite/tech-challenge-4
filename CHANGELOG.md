# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2026-01-02

### ✨ Adicionado

#### Autenticação
- Sistema de login com JWT
- Armazenamento seguro de credenciais com SecureStore
- Logout com limpeza de dados
- Proteção de rotas baseada em autenticação
- Redirecionamento automático em caso de token inválido

#### Posts
- Listagem de posts com refresh pull-to-refresh
- Visualização completa de posts
- Sistema de busca por palavras-chave
- Criação de novos posts
- Edição de posts existentes
- Visualização de comentários

#### Professores
- Listagem paginada de professores
- Cadastro de novos professores
- Edição de dados de professores
- Exclusão de professores com confirmação
- Refresh automático após operações

#### Alunos
- Listagem paginada de alunos
- Cadastro de novos alunos
- Edição de dados de alunos
- Exclusão de alunos com confirmação
- Refresh automático após operações

#### Navegação
- Bottom Tab Navigator (Posts e Admin)
- Stack Navigator para todas as telas
- Navegação fluida entre telas
- Ícones intuitivos do Ionicons

#### UI/UX
- Design system com tema customizado
- Componentes reutilizáveis (Button, Input, Loading)
- Styled Components para estilização
- Interface responsiva
- Feedback visual em todas as ações
- Indicadores de carregamento
- Mensagens de erro amigáveis

#### Documentação
- README.md completo com setup e uso
- ARCHITECTURE.md com detalhes técnicos
- QUICKSTART.md para início rápido
- CONTRIBUTING.md com guidelines
- Comentários no código

#### Configuração
- Projeto Expo configurado
- Dependências instaladas e versionadas
- package.json otimizado
- app.json configurado
- .gitignore adequado
- Estrutura de pastas organizada

### 🔧 Técnico

#### Arquitetura
- Separação clara de responsabilidades
- Context API para estado global
- Hooks customizados (useAuth)
- Serviços de API organizados
- Interceptors do Axios configurados

#### APIs Integradas
- `POST /api/teachers/login` - Autenticação
- `GET /api/posts` - Listar posts
- `GET /api/posts/:id` - Buscar post
- `GET /api/posts/search` - Buscar posts
- `POST /api/posts` - Criar post
- `PUT /api/posts/:id` - Atualizar post
- `DELETE /api/posts/:id` - Deletar post
- `GET /api/teachers` - Listar professores
- `POST /api/teachers` - Criar professor
- `PUT /api/teachers/:id` - Atualizar professor
- `DELETE /api/teachers/:id` - Deletar professor
- `GET /api/students` - Listar alunos
- `POST /api/students` - Criar aluno
- `PUT /api/students/:id` - Atualizar aluno
- `DELETE /api/students/:id` - Deletar aluno

#### Dependências Principais
- expo ~54.0.30
- react 19.1.0
- react-native 0.81.5
- @react-navigation/native ^7.1.26
- styled-components ^6.1.19
- axios ^1.13.2
- expo-secure-store ^15.0.8

### 📝 Notas de Versão

Esta é a versão inicial do Tech Challenge 4, desenvolvida como aplicativo mobile complementar ao sistema web (TC3).

**Features Completas:**
- ✅ Todos os requisitos funcionais implementados
- ✅ Todos os requisitos técnicos atendidos
- ✅ Documentação completa
- ✅ Código organizado e comentado

**Testado em:**
- Expo Go (Android)
- Expo Go (iOS)
- Web Browser (funcionalidade limitada)

**Backend:**
- URL: https://tech-challenge-edn9.onrender.com
- Compatível com TC2 (Backend Node.js/MongoDB)

### 🔜 Próximas Versões

Funcionalidades planejadas para versões futuras:

#### [1.1.0] - Planejado
- [ ] Sistema completo de comentários em posts
- [ ] Upload de imagens em posts
- [ ] Avatar de usuário
- [ ] Modo offline com sincronização
- [ ] Cache de requisições

#### [1.2.0] - Planejado
- [ ] Notificações push
- [ ] Dark mode
- [ ] Filtros avançados
- [ ] Paginação infinita
- [ ] Skeleton loaders

#### [2.0.0] - Planejado
- [ ] Migração para TypeScript
- [ ] Testes automatizados (Jest)
- [ ] Redux ou Zustand para estado
- [ ] Animações com Reanimated
- [ ] Deep linking
- [ ] Analytics

---

## Formato do Changelog

### Tipos de Mudanças

- **Adicionado** para novas funcionalidades
- **Alterado** para mudanças em funcionalidades existentes
- **Depreciado** para funcionalidades que serão removidas
- **Removido** para funcionalidades removidas
- **Corrigido** para correções de bugs
- **Segurança** para vulnerabilidades corrigidas

### Versionamento

- **MAJOR**: Mudanças incompatíveis com versões anteriores
- **MINOR**: Novas funcionalidades compatíveis
- **PATCH**: Correções de bugs compatíveis

Exemplo: 1.2.3
- 1 = MAJOR
- 2 = MINOR
- 3 = PATCH

---

**Mantenedores:** Tech Challenge 4 Team  
**Data de Início:** Janeiro 2026
