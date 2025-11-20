# 💇‍♀️ HairDay - Sistema de Agendamentos de Salão

> Aplicação de agendamento para salão de beleza desenvolvida com **React 2025** - Desafio Rocketseat

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue)
![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📖 Sobre

**HairDay** é uma aplicação web desenvolvida como desafio da **Formação React 2025** da Rocketseat. 

O projeto permite que usuários agendem atendimentos em um salão de beleza, com funcionalidades como:
- ✅ Adicionar agendamentos (data, hora, nome do cliente)
- ✅ Visualizar agenda organizada por períodos (Manhã, Tarde, Noite)
- ✅ Remover agendamentos
- ✅ Persistência de dados em localStorage

---

## 🎯 Funcionalidades

### ✨ Implementadas
- [x] **Criar Agendamento** - Formulário com validação básica
- [x] **Visualizar Agenda** - Listagem organizada por período
- [x] **Remover Agendamento** - Com confirmação
- [x] **Persistência** - Dados salvos em localStorage
- [x] **Responsive Design** - Mobile, tablet e desktop

### 🚀 Em Desenvolvimento
- [ ] Editar agendamentos
- [ ] Exportar agenda
- [ ] Notificações
- [ ] Integração com backend

---

## 🏗️ Arquitetura

### Estrutura de Pastas

```
hairday/
├── docs/                              # 📚 Documentação completa
│   ├── QUICK_START.md                 # Comece aqui!
│   ├── SUMMARY.md                     # Resumo do projeto
│   ├── REFINEMENT_01_SIDEBAR.md       # Componente de entrada
│   ├── REFINEMENT_02_SCHEDULE_STATE.md # Gerenciar estado
│   ├── REFINEMENT_03_SCHEDULE_LIST.md  # Listar agendamentos
│   ├── REFINEMENT_04_DELETE_SCHEDULE.md # Remover agendamentos
│   ├── REFINEMENT_05_STYLING_POLISH.md  # Estilo e responsividade
│   └── ...                            # Mais documentação
│
├── src/
│   ├── components/                    # 🧩 Componentes React
│   │   ├── Sidebar/
│   │   │   ├── index.tsx
│   │   │   └── sidebar.css
│   │   └── ScheduleList/
│   │       ├── index.tsx
│   │       ├── SchedulePeriod.tsx
│   │       ├── ScheduleItem.tsx
│   │       └── schedulelist.css
│   │
│   ├── types/                         # 📋 Tipos TypeScript
│   │   └── index.ts
│   │
│   ├── utils/                         # 🔧 Utilitários
│   │   ├── id.ts
│   │   └── period.ts
│   │
│   ├── App.tsx                        # Componente raiz
│   ├── App.css                        # Estilos globais
│   ├── index.css                      # CSS base
│   └── main.tsx                       # Entry point
│
├── public/                            # 🖼️ Assets estáticos
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Fluxo de Dados

```
App (Estado Centralizado)
├── Sidebar (Entrada)
│   └── onAddSchedule() → App.tsx
└── ScheduleList (Visualização)
    ├── SchedulePeriod (3x)
    │   └── ScheduleItem (múltiplos)
    │       └── onDelete() → App.tsx
    └── localStorage (persist automático)
```

---

## 🚀 Como Começar

### Pré-requisitos

- **Node.js** 16+ 
- **npm** 7+ ou **pnpm** 7+
- **Git**

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Alessandra-Nastassja/hairday.git
cd hairday
```

2. **Instale as dependências**
```bash
npm install
# ou
pnpm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
pnpm dev
```

4. **Abra no navegador**
```
http://localhost:5173
```

---

## 📚 Documentação

A documentação completa está em `/docs`:

### Comece Por Aqui 👇
- **[docs/QUICK_START.md](./docs/QUICK_START.md)** - Guia rápido de início (5 min)
- **[docs/SUMMARY.md](./docs/SUMMARY.md)** - Resumo completo do projeto (15 min)
- **[docs/INDICE_NAVEGACAO.md](./docs/INDICE_NAVEGACAO.md)** - Navegação e índice

### Implemente Nesta Ordem 📋
1. **[Refinement 01: Sidebar](./docs/REFINEMENT_01_SIDEBAR.md)** (3-4h)
2. **[Refinement 02: State Management](./docs/REFINEMENT_02_SCHEDULE_STATE.md)** (4-6h)
3. **[Refinement 03: ScheduleList](./docs/REFINEMENT_03_SCHEDULE_LIST.md)** (4-6h)
4. **[Refinement 04: Delete Schedule](./docs/REFINEMENT_04_DELETE_SCHEDULE.md)** (3-4h)
5. **[Refinement 05: Styling & Polish](./docs/REFINEMENT_05_STYLING_POLISH.md)** (4-6h)

### Referência Técnica 🔧
- **[docs/ROADMAP_VISUAL.md](./docs/ROADMAP_VISUAL.md)** - Diagramas e arquitetura
- **[docs/REFINEMENTS_INDEX.md](./docs/REFINEMENTS_INDEX.md)** - Índice com dependências

---

## 💻 Desenvolvimento

### Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint com ESLint
npm run lint

# Executar testes (quando implementados)
npm run test
```

### Tecnologias

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| React | 19.1.1 | Biblioteca UI |
| TypeScript | 5.9.3 | Tipagem estática |
| Vite | 7.1.7 | Build tool e dev server |
| Tailwind CSS | 4.1.16 | Utility-first CSS (opcional) |
| Phosphor Icons | 2.1.10 | Biblioteca de ícones |

---

## 📱 Interface

### Layout Principal

```
┌─────────────────────────────────────────────────┐
│                    HairDay                      │
├──────────────────────┬──────────────────────────┤
│                      │                          │
│ 📝 Agende um        │ 📅 Sua Agenda           │
│    Atendimento      │                          │
│                      │ 🌅 Manhã (9h-12h)       │
│ Data: [  ]          │ • 10:00 - João Silva    │
│ Hora: [  ]          │ • 11:30 - Maria Santos  │
│ Nome: [  ]          │                          │
│ [Agendar]           │ 🌤️ Tarde (13h-18h)      │
│                      │ • 14:00 - Pedro Costa   │
│                      │                          │
│                      │ 🌙 Noite (19h-21h)     │
│                      │ Sem agendamentos        │
└──────────────────────┴──────────────────────────┘
```

### Responsividade

✅ **Desktop** (1200px+) - Layout 2 colunas  
✅ **Tablet** (768px-1024px) - Layout flexível  
✅ **Mobile** (<768px) - Layout 1 coluna  

---

## 🧪 Testes

### Executar Testes

```bash
npm run test
```

### Cobertura de Testes

```
Statements   : 85%+ cobertura
Branches     : 80%+ cobertura
Functions    : 85%+ cobertura
Lines        : 85%+ cobertura
```

### Tipos de Testes

- ✅ **Unit Tests** - Testes de componentes e funções
- ✅ **Integration Tests** - Testes de integração entre componentes
- ✅ **E2E Tests** - Testes de fluxo completo (opcional)

---

## 🎨 Design

### Paleta de Cores

```
Primary:     #B8952E (Ouro/Amarelo)
Primary Light: #D4AF6A
Primary Dark:  #8A6D2F
White:       #FFFFFF
Gray:        #F9F9F9 até #333333
Success:     #27AE60
Error:       #E74C3C
```

### Tipografia

- **Font Family**: Catamaran
- **Base Size**: 16px
- **Line Height**: 1.5

---

## 🚢 Deploy

### Vercel (Recomendado)

```bash
# 1. Push para GitHub
git add .
git commit -m "HairDay - Rocketseat Challenge"
git push origin main

# 2. Conecte no Vercel
# - Vá para vercel.com
# - Conecte seu GitHub
# - Selecione este repositório
# - Deploy automático!

# URL: https://hairday-[seu-username].vercel.app
```

### Netlify

```bash
# 1. Build
npm run build

# 2. Faça deploy da pasta 'dist'
# - Vá para netlify.com
# - Arraste a pasta 'dist'
# - Deploy instantâneo!
```

---

## 📝 Commits Semânticos

Siga o padrão de commits:

```bash
# Feature nova
git commit -m "feat: adicionar componente Sidebar"

# Bug fix
git commit -m "fix: corrigir validação de data"

# Melhoria
git commit -m "refactor: otimizar agrupamento de períodos"

# Documentação
git commit -m "docs: adicionar exemplos de uso"

# Testes
git commit -m "test: adicionar testes para ScheduleItem"
```

---

## ✅ Checklist de Desenvolvimento

### Fase 1: Setup (1-2h)
- [ ] Repositório clonado
- [ ] Dependências instaladas
- [ ] npm run dev funciona
- [ ] Estrutura de pastas criada

### Fase 2: Componentes (8-12h)
- [ ] Refinement 01: Sidebar (3-4h)
- [ ] Refinement 02: State Management (4-6h)
- [ ] Refinement 03: ScheduleList (4-6h)
- [ ] Refinement 04: Delete (3-4h)
- [ ] Refinement 05: Styling (4-6h)

### Fase 3: Qualidade (3-5h)
- [ ] Testes implementados
- [ ] TypeScript sem erros
- [ ] Lint sem problemas
- [ ] Build sem erros

### Fase 4: Deploy (1-2h)
- [ ] Build produção
- [ ] Deploy em Vercel/Netlify
- [ ] URL funcionando
- [ ] README atualizado

---

## 🎓 O Que Aprender

### Conceitos React
- ✅ React Hooks (useState, useEffect)
- ✅ Componentes funcionais
- ✅ Props e TypeScript
- ✅ Renderização condicional
- ✅ Listas com map()

### JavaScript/TypeScript
- ✅ Array methods (map, filter)
- ✅ Imutabilidade
- ✅ Interfaces e tipos
- ✅ Template literals
- ✅ Destructuring

### CSS
- ✅ CSS Grid responsivo
- ✅ Media queries
- ✅ Flex layout
- ✅ Animações CSS
- ✅ Accessibility

---

## 🤝 Contribuindo

Contribuições são bem-vindas! 

### Como Contribuir

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adicionar nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Diretrizes

- ✅ Siga o padrão de código existente
- ✅ Adicione testes para novas features
- ✅ Atualize a documentação
- ✅ Use commits semânticos

---

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma issue com:

1. **Descrição do problema**
2. **Steps to reproduce**
3. **Comportamento esperado**
4. **Screenshots** (se aplicável)

---

## 📞 Dúvidas & Suporte

### Recursos

- 📚 **Documentação**: `/docs`
- 🎥 **Rocketseat**: [rocketseat.com.br](https://rocketseat.com.br)
- 💬 **Fórum Rocketseat**: forum.rocketseat.com.br
- 📧 **Email**: support@rocketseat.com.br

### FAQ

**P: Como funciona o localStorage?**
R: Os agendamentos são salvos automaticamente no localStorage do navegador. Abra DevTools (F12) → Application → Local Storage para ver.

**P: Posso usar o Figma como referência?**
R: Sim! Verifique o link no `docs/QUICK_START.md`

**P: Como faço deploy?**
R: Siga a seção **Deploy** deste README.

**P: Preciso de backend?**
R: Não para este desafio. localStorage é suficiente.

**P: Posso adicionar novas funcionalidades?**
R: Claro! Mas primeiro complete o desafio base.

---

## 📊 Status do Projeto

| Etapa | Status | Progresso |
|-------|--------|-----------|
| Setup Inicial | ✅ Completo | 100% |
| Refinement 01 | ⏳ Pendente | 0% |
| Refinement 02 | ⏳ Pendente | 0% |
| Refinement 03 | ⏳ Pendente | 0% |
| Refinement 04 | ⏳ Pendente | 0% |
| Refinement 05 | ⏳ Pendente | 0% |
| Testes | ⏳ Pendente | 0% |
| Deploy | ⏳ Pendente | 0% |

---

## 📦 Dependências

### Produção
```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1"
}
```

### Desenvolvimento
```json
{
  "@vitejs/plugin-react": "^4.3.4",
  "typescript": "^5.9.3",
  "vite": "^7.1.7",
  "eslint": "^9.16.0"
}
```

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🙏 Agradecimentos

Projeto desenvolvido como parte da **Formação React 2025** da **Rocketseat** 💜

### Recursos Utilizados
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org)
- [Vite Guide](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)

---

## 📈 Roadmap Futuro

- [ ] Editar agendamentos existentes
- [ ] Exportar agenda (PDF/CSV)
- [ ] Notificações push
- [ ] Integração com backend (Node.js + PostgreSQL)
- [ ] App mobile com React Native
- [ ] Sistema de múltiplos usuários
- [ ] Dashboard administrativo

---

## 👨‍💻 Autor

**Alessandra Nastassja**
- GitHub: [@Alessandra-Nastassja](https://github.com/Alessandra-Nastassja)
- LinkedIn: [Seu LinkedIn]
- Email: seu.email@example.com

---

<div align="center">

### Desenvolvido com 💜 para a Formação React 2025 - Rocketseat

**[Comece Agora](./docs/QUICK_START.md)** • **[Documentação](./docs/)** • **[Deploy](https://hairday-[seu-username].vercel.app)**

![Rocketseat Logo](https://img.shields.io/badge/-Rocketseat-000000?style=for-the-badge&logo=rocketseat&logoColor=8257e6)

</div>

---

**Última atualização**: 20 de novembro de 2025  
**Versão**: 1.0.0  
**Status**: Em desenvolvimento ✨
