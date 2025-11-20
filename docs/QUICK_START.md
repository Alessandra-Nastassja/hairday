# 🚀 Quick Start - HairDay Challenge

**Desafio Oficial**: React 2025 - Rocketseat  
**Nível**: Iniciante / Intermediário  
**Tempo Estimado**: 22-30 horas  
**Status**: 🟢 Pronto para desenvolvimento

---

## 📖 O Que É Este Projeto?

**HairDay** é uma aplicação de agendamentos de um salão de beleza onde você pratica:

✅ **Conceitos React fundamentais**:
- Estados (useState)
- Imutabilidade
- Listas e renderização
- Propriedades (props)
- Componentização

✅ **Funcionalidades essenciais**:
- Criar agendamentos (data, hora, cliente)
- Exibir agendamentos agrupados por período
- Remover agendamentos
- Interface responsiva baseada em Figma

---

## 🎯 Objetivo Final

Construir uma aplicação React funcional onde o usuário pode:

1. **Agendar atendimentos** com data, hora e nome do cliente
2. **Visualizar agenda** organizada por períodos (Manhã, Tarde, Noite)
3. **Remover agendamentos** com um clique

---

## 📋 Tarefas Principais

Veja na imagem em anexo quais tarefas já foram concluídas (✅) e quais faltam:

```
✅ Criar projeto React com Vite + TypeScript
✅ Configurar estrutura inicial da aplicação
✅ Criar componentes principais (Input, Botão, Períodos)
⏳ Adicionar agendamento
⏳ Remover agendamento
⏳ Exibir mensagem de estado vazio
⏳ Exibir sidebar
⏳ Exibir listagem de agendamentos agrupados por período
```

---

## 🛣️ Roteiro de Implementação

### Fase 1: Estrutura Básica (4-6 horas)
```
📁 src/
├── components/
│   ├── Input/
│   │   ├── index.tsx
│   │   └── input.css ou tailwind
│   ├── Button/
│   │   ├── index.tsx
│   │   └── button.css ou tailwind
│   ├── Sidebar/
│   │   ├── index.tsx
│   │   └── sidebar.css
│   └── ScheduleList/
│       ├── index.tsx
│       └── schedulelist.css
├── types/
│   └── index.ts (types Schedule)
├── App.tsx
└── App.css
```

### Fase 2: Funcionalidades (10-14 horas)
- Gerenciar estado dos agendamentos
- Adicionar novo agendamento
- Remover agendamento
- Agrupar por período

### Fase 3: Interface & Polish (8-10 horas)
- Implementar layout do Figma
- Responsividade
- Mensagens de feedback
- Testes básicos

---

## 📚 Recursos

- **Figma**: [Layout da aplicação](link-figma)
- **Deploy**: [Solução de referência](link-deploy)
- **Fórum**: Rocketseat para dúvidas

---

## 🎓 Conceitos a Praticar

### React
- [ ] useState para gerenciar lista
- [ ] map() para renderizar
- [ ] filter() para remover
- [ ] Props tipadas com TypeScript
- [ ] Componentes reutilizáveis

### JavaScript
- [ ] Array methods (map, filter, reduce)
- [ ] Immutability patterns
- [ ] Template literals
- [ ] Destructuring

### TypeScript
- [ ] Interfaces para tipos
- [ ] Tipos genéricos
- [ ] Type annotations
- [ ] Union types

---

## 🚦 Como Começar

### 1. Setup Inicial
```bash
# Criar projeto
npm create vite@latest hairday -- --template react-ts
cd hairday
npm install
npm run dev
```

### 2. Estruturar Componentes
```bash
# Criar pasta estrutura
mkdir -p src/components/{Input,Button,Sidebar,ScheduleList}
mkdir src/types
```

### 3. Implementar Passo a Passo
1. Criar tipos (Schedule interface)
2. Criar componentes (Input, Button)
3. Criar componente Sidebar
4. Criar componente ScheduleList
5. Integrar em App.tsx

### 4. Testar
```bash
npm run dev
# Abrir http://localhost:5173
```

---

## 📖 Documentação Adicional

Para mais detalhes sobre cada etapa:

- **SUMMARY.md** - Resumo completo
- **REFINEMENT_01_SIDEBAR.md** - Componente de entrada
- **REFINEMENT_02_SCHEDULE_STATE.md** - Gerenciar estado
- **REFINEMENT_03_SCHEDULE_LIST.md** - Exibir agendamentos
- **REFINEMENT_04_DELETE_SCHEDULE.md** - Remover agendamentos
- **REFINEMENT_05_STYLING_POLISH.md** - Estilo e responsividade
- **ROADMAP_VISUAL.md** - Diagramas e arquitetura

---

## ✅ Checklist de Desenvolvimento

### Setup
- [ ] Projeto Vite + React + TypeScript criado
- [ ] Estrutura de pastas pronta
- [ ] npm install executado

### Componentes
- [ ] Input component criado
- [ ] Button component criado
- [ ] Sidebar component criado
- [ ] ScheduleList component criado

### Funcionalidades
- [ ] Adicionar agendamento funcionando
- [ ] Remover agendamento funcionando
- [ ] Agrupar por período funcionando
- [ ] Mensagem de estado vazio

### Interface
- [ ] Layout do Figma implementado
- [ ] Responsividade testada
- [ ] Cores corretas
- [ ] Icones funcionando

### Qualidade
- [ ] Código organizado
- [ ] TypeScript sem erros
- [ ] Sem console.errors
- [ ] Documentação lida

---

## 🎯 Critérios de Sucesso

✅ Aplicação funciona sem erros  
✅ Todas as tarefas concluídas  
✅ Interface igual ao Figma  
✅ Código limpo e organizado  
✅ TypeScript sem erros  
✅ Responsivo em mobile  

---

## 🆘 Dúvidas Frequentes

### Como criar um novo agendamento?
R: Use `useState` para gerenciar array de agendamentos e adicione novo objeto ao array.

### Como agrupar por período?
R: Use `filter()` para separar agendamentos por hora (9-12, 13-18, 19-21).

### Como remover agendamento?
R: Use `filter()` para criar novo array sem o agendamento removido.

### Devo usar Context API?
R: Para este desafio, useState é suficiente. Context API será em próximos desafios.

---

## 📞 Próximas Etapas

Após completar o desafio:

1. **Compartilhe no GitHub** - Envie URL do repositório
2. **Poste no LinkedIn** - Conte sua experiência
3. **Próximo Desafio** - Avance para o próximo nível

---

## 💡 Dicas de Ouro

✨ **Faça commit frequente** - Não espere terminar tudo  
✨ **Teste enquanto desenvolve** - npm run dev sempre aberto  
✨ **Consulte o Figma** - Verifique cores e espaçamento  
✨ **Use TypeScript** - Deixe erros de tipo explícitos  
✨ **Mantenha componentes simples** - Uma responsabilidade cada  

---

**Vamos começar? 🚀**

Abra o arquivo `SUMMARY.md` para uma visão geral completa!

---

🙏 Feito com 💜 por Rocketseat  
📅 Atualizado: 20 de novembro de 2025
