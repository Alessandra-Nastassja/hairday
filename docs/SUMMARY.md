# 📊 Summary - HairDay Challenge

**Formação**: React 2025 - Rocketseat  
**Desafio**: Aplicação de Agendamentos  
**Duração**: 22-30 horas  
**Nível**: Iniciante / Intermediário

---

## 🎯 Visão Geral

HairDay é um desafio prático onde você constrói uma **aplicação de agendamentos** para um salão de beleza, praticando conceitos fundamentais do React.

### Objetivo
Criar uma aplicação onde usuários podem:
- ✅ Agendar atendimentos (data, hora, cliente)
- ✅ Visualizar agenda organizada por período
- ✅ Remover agendamentos

### Conceitos Aprendidos
- Estados (useState)
- Imutabilidade
- Renderização de listas (map)
- Remoção de items (filter)
- Propriedades (props)
- Componentização

---

## 📋 Funcionalidades Obrigatórias

### 1️⃣ Adicionar Agendamento
**Requisitos:**
- ✅ Entrada de data
- ✅ Seleção de horário
- ✅ Entrada de nome do cliente
- ✅ Botão para agendar
- ✅ Validação básica

**O que acontece:**
```typescript
// Usuário preenche formulário
{
  id: 1,
  date: "2025-11-20",
  time: "10:00",
  name: "João Silva"
}

// Agendamento aparece na lista imediatamente
```

---

### 2️⃣ Visualizar Agenda
**Requisitos:**
- ✅ Listar todos os agendamentos
- ✅ Agrupar por período (Manhã, Tarde, Noite)
- ✅ Mostrar: hora, nome, botão de remover
- ✅ Mensagem quando sem agendamentos

**Períodos:**
```
🌅 Manhã:  9h  às 12h
🌤️  Tarde:  13h às 18h
🌙 Noite:  19h às 21h
```

---

### 3️⃣ Remover Agendamento
**Requisitos:**
- ✅ Botão de lixeira em cada agendamento
- ✅ Remover ao clicar
- ✅ Atualizar lista automaticamente

---

## 🗂️ Estrutura do Projeto

```
hairday/
├── src/
│   ├── components/
│   │   ├── Input/
│   │   │   ├── index.tsx          // Input component
│   │   │   └── input.css          // Estilos
│   │   ├── Button/
│   │   │   ├── index.tsx          // Button component
│   │   │   └── button.css         // Estilos
│   │   ├── Sidebar/
│   │   │   ├── index.tsx          // Formulário de entrada
│   │   │   └── sidebar.css        // Estilos
│   │   └── ScheduleList/
│   │       ├── index.tsx          // Lista de agendamentos
│   │       ├── SchedulePeriod.tsx // Um período
│   │       └── schedulelist.css    // Estilos
│   ├── types/
│   │   └── index.ts               // Types (Schedule, etc)
│   ├── App.tsx                    // App principal
│   ├── App.css                    // Estilos globais
│   └── main.tsx                   // Entry point
├── public/
│   └── images/                    // Logo, icones
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js (optional)
└── package.json
```

---

## 🏗️ Arquitetura de Componentes

### Hierarquia
```
App
├── Sidebar
│   ├── Input (data)
│   ├── Input (hora)
│   ├── Input (cliente)
│   └── Button (agendar)
└── ScheduleList
    ├── SchedulePeriod (Manhã)
    │   ├── ScheduleItem
    │   ├── ScheduleItem
    │   └── ScheduleItem
    ├── SchedulePeriod (Tarde)
    └── SchedulePeriod (Noite)
```

### Props Flow
```typescript
// App.tsx
const [schedules, setSchedules] = useState<Schedule[]>([])

// Sidebar recebe função para adicionar
<Sidebar onAddSchedule={(schedule) => setSchedules(...)} />

// ScheduleList recebe array e função para remover
<ScheduleList 
  schedules={schedules}
  onDeleteSchedule={(id) => setSchedules(...)}
/>
```

---

## 📝 Tipos de Dados

```typescript
// Schedule - Agendamento
interface Schedule {
  id: string | number
  date: string        // YYYY-MM-DD
  time: string        // HH:mm
  name: string        // Nome do cliente
}

// Period - Período do dia
type Period = 'morning' | 'afternoon' | 'night'

// Período com agendamentos
interface SchedulePeriod {
  period: Period
  label: string       // "Manhã", "Tarde", "Noite"
  schedules: Schedule[]
}
```

---

## 🔄 Fluxos Principais

### Adicionar Agendamento
```
Usuário preenche Sidebar
         ↓
Clica em "Agendar"
         ↓
Validação básica
         ↓
setSchedules([...schedules, novoAgendamento])
         ↓
ScheduleList renderiza novo item
```

### Remover Agendamento
```
Usuário clica no ícone de lixeira
         ↓
onDeleteSchedule(id)
         ↓
setSchedules(schedules.filter(s => s.id !== id))
         ↓
UI atualiza automaticamente
```

### Agrupar por Período
```
const agruparPorPeriodo = (schedules: Schedule[]) => {
  const manhã = schedules.filter(s => {
    const hora = parseInt(s.time.split(':')[0])
    return hora >= 9 && hora < 12
  })
  
  const tarde = schedules.filter(s => {
    const hora = parseInt(s.time.split(':')[0])
    return hora >= 13 && hora < 18
  })
  
  const noite = schedules.filter(s => {
    const hora = parseInt(s.time.split(':')[0])
    return hora >= 19 && hora < 21
  })
}
```

---

## 🎨 Interface (Figma)

### Layout
```
┌────────────────────────────────────────┐
│ Logo                             HairDay│
├──────────────────┬──────────────────────┤
│                  │                      │
│ 🎯 Agende um     │ 📅 Sua Agenda       │
│   Atendimento    │                      │
│                  │ 🌅 MANHÃ            │
│ Data: [____]     │ ├─ 10:00 João       │
│ Hora: [____]     │ ├─ 11:00 Maria      │
│ Nome: [____]     │                      │
│ [AGENDAR]        │ 🌤️  TARDE           │
│                  │ ├─ 14:00 Pedro      │
│                  │                      │
│                  │ 🌙 NOITE            │
│                  │ Sem agendamentos    │
│                  │                      │
└──────────────────┴──────────────────────┘
```

---

## 🎓 Conceitos Praticados

### React
| Conceito | O Que É | Como Usar |
|----------|---------|-----------|
| **useState** | Hook para estado | `const [schedules, setSchedules] = useState([])` |
| **map()** | Renderizar listas | `schedules.map(s => <ScheduleItem />)` |
| **filter()** | Remover items | `schedules.filter(s => s.id !== idRemover)` |
| **Props** | Passar dados | `<Button label="Agendar" onClick={...} />` |
| **Componentes** | Blocos reutilizáveis | `<Sidebar />`, `<ScheduleList />` |

### JavaScript
| Conceito | Exemplo |
|----------|---------|
| **Imutabilidade** | `[...array, newItem]` em vez de `array.push()` |
| **Template literals** | `` `Olá ${name}` `` |
| **Destructuring** | `const { date, time } = schedule` |
| **Operador spread** | `[...schedules, novoAgendamento]` |

### TypeScript
| Conceito | Exemplo |
|----------|---------|
| **Interfaces** | `interface Schedule { id: number; name: string; }` |
| **Types** | `type Period = 'morning' \| 'afternoon' \| 'night'` |
| **Genéricos** | `React.FC<Props>` |
| **Union types** | `status: 'loading' \| 'error' \| 'success'` |

---

## 📊 Fases de Desenvolvimento

### Fase 1: Estrutura Básica (4-6h)
- [ ] Projeto Vite + React + TypeScript criado
- [ ] Estrutura de pastas pronta
- [ ] Componentes básicos criados (Input, Button)
- [ ] Types definidos

**Arquivos a criar:**
- `src/types/index.ts`
- `src/components/Input/index.tsx`
- `src/components/Button/index.tsx`

---

### Fase 2: Componente Sidebar (3-4h)
- [ ] Sidebar component
- [ ] Inputs para data, hora, nome
- [ ] Validação básica
- [ ] Integração com App.tsx

**Arquivos a criar:**
- `src/components/Sidebar/index.tsx`

---

### Fase 3: State Management (4-6h)
- [ ] useState em App.tsx
- [ ] Função addSchedule
- [ ] Gerar IDs únicos
- [ ] Persistência (localStorage opcional)

**Atualizações:**
- `src/App.tsx`

---

### Fase 4: ScheduleList Component (4-6h)
- [ ] ScheduleList component
- [ ] SchedulePeriod component
- [ ] ScheduleItem component
- [ ] Agrupar por período
- [ ] Mensagem de estado vazio

**Arquivos a criar:**
- `src/components/ScheduleList/index.tsx`
- `src/components/ScheduleList/SchedulePeriod.tsx`
- `src/components/ScheduleList/ScheduleItem.tsx`

---

### Fase 5: Remover Agendamento (3-4h)
- [ ] Botão de lixeira
- [ ] Função onDeleteSchedule
- [ ] Integração com estado
- [ ] Feedback visual

**Atualizações:**
- `src/components/ScheduleList/ScheduleItem.tsx`
- `src/App.tsx`

---

### Fase 6: Styling & Polish (4-6h)
- [ ] Estilos globais
- [ ] Layout responsivo
- [ ] Cores do Figma
- [ ] Icones
- [ ] Testes

**Arquivos a criar/atualizar:**
- `src/App.css`
- `src/components/*/component.css`

---

## ✅ Checklist Completo

### Setup
- [ ] Node.js e npm instalados
- [ ] Projeto Vite criado
- [ ] React e TypeScript instalados
- [ ] npm install executado

### Estrutura
- [ ] Pastas organizadas
- [ ] Types definidos
- [ ] Componentes base prontos
- [ ] App.tsx estruturado

### Funcionalidades
- [ ] Adicionar agendamento
- [ ] Renderizar lista
- [ ] Agrupar por período
- [ ] Remover agendamento
- [ ] Mensagem vazia

### Interface
- [ ] Layout do Figma
- [ ] Cores corretas
- [ ] Espaçamento correto
- [ ] Icones funcionando
- [ ] Responsivo

### Qualidade
- [ ] TypeScript sem erros
- [ ] Sem console.errors
- [ ] Código organizado
- [ ] Commits no Git
- [ ] README atualizado

---

## 🎯 Critérios de Sucesso

✅ **Funcionalidade**: Todas as tarefas obrigatórias funcionam  
✅ **Interface**: Igual ao Figma com responsividade  
✅ **Código**: TypeScript sem erros, limpo e organizado  
✅ **Documentação**: README e código comentado  
✅ **Deploy**: Funcionando em produção  

---

## 📚 Recursos Extras

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/)
- [Array Methods MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

---

## 🚀 Próximos Passos Após Desafio

1. **Compartilhar no GitHub** - Envie URL do repositório
2. **Deploy** - Coloque em produção (Vercel, Netlify)
3. **Postar no LinkedIn** - Conte sua experiência
4. **Refatorar** - Adicione melhorias próprias
5. **Próximo Desafio** - Avance para React + Backend

---

## 🎓 Aprendizados Esperados

Após completar este desafio, você saberá:

✨ Criar e gerenciar estado em React  
✨ Renderizar listas com map()  
✨ Atualizar estado imutavelmente  
✨ Criar componentes reutilizáveis  
✨ Usar TypeScript em projetos React  
✨ Estruturar projetos profissionalmente  
✨ Trabalhar com formulários  
✨ Deletar items de listas  

---

**Pronto para começar? 🚀**

Abra o arquivo `QUICK_START.md` para instruções de como iniciar!

---

🙏 Feito com 💜 por Rocketseat  
📅 Atualizado: 20 de novembro de 2025
