# �️ Roadmap Visual - HairDay Challenge

**Desafio**: Rocketseat React 2025  
**Formato**: Diagramas, fluxos e arquitetura visual  

---

## 📐 Arquitetura de Componentes

### Hierarquia Completa

```
┌─────────────────────────────────────────────────────────────┐
│                         App (Raiz)                          │
│   • Estado centralizado (schedules)                         │
│   • Callbacks (onAddSchedule, onDeleteSchedule)             │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        ↓                         ↓
┌──────────────────┐    ┌───────────────────────────┐
│   Sidebar        │    │   ScheduleList            │
│ • Inputs         │    │ • SchedulePeriod (3x)     │
│ • Validação      │    │ • Agrupar por período     │
│ • onAddSchedule  │    │ • Listar agendamentos     │
└──────────────────┘    └───────────┬───────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ↓               ↓               ↓
              ┌────────────┐  ┌────────────┐  ┌────────────┐
              │ Manhã      │  │ Tarde      │  │ Noite      │
              │ 9h-12h     │  │ 13h-18h    │  │ 19h-21h    │
              └────┬───────┘  └────┬───────┘  └────┬───────┘
                   │               │               │
             ┌─────┴─────┐    ┌────┴────┐    ┌────┴────┐
             ↓           ↓    ↓         ↓    ↓         ↓
        ┌─────────┐ ┌─────────┐ ┌─────────┐
        │ Schedule│ │ Schedule│ │ Schedule│ ...
        │ Item    │ │ Item    │ │ Item    │
        │ • Hora  │ │ • Hora  │ │ • Hora  │
        │ • Nome  │ │ • Nome  │ │ • Nome  │
        │ • Delete│ │ • Delete│ │ • Delete│
        └─────────┘ └─────────┘ └─────────┘
```
│ PROVIDERS       │ │ SCHEDULE        │ │ SCHEDULE LIST    │
│                 │ │ (Left Side)     │ │ (Right Side)     │
├─────────────────┤ ├─────────────────┤ ├──────────────────┤
│ • Schedule      │ │ • InputDate     │ │ • List Header    │
│   Provider      │ │ • InputText     │ │ • List Groups    │
│ • Toast         │ │ • ButtonTime    │ │ • List Items     │
│   Provider      │ │ • ButtonDefault │ │ • Edit Modal     │
└─────────────────┘ └─────────────────┘ └──────────────────┘
        ▲                  ▲                  ▲
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    ┌──────▼───────┐
                    │  localStorage │
                    │  (Persistência)│
                    └────────────────┘
```

---

## 📊 Fluxo de Dados Completo

```
USER INTERACTION (Criar Agendamento)
            │
            ▼
    ┌─────────────────┐
    │ Schedule Form   │
    │ (Validação)     │
    └────────┬────────┘
             │
        ✅ Válido
             │
             ▼
    ┌─────────────────────┐
    │ Context.addSchedule │
    └────────┬────────────┘
             │
             ▼
    ┌─────────────────┐
    │ Reducer Action  │
    │ ADD_SCHEDULE    │
    └────────┬────────┘
             │
             ▼
    ┌──────────────────────┐
    │ Estado Atualizado    │
    │ schedules[] +1       │
    └────────┬─────────────┘
             │
             ▼
    ┌──────────────────────┐
    │ useEffect monitora   │
    │ mudança no estado    │
    └────────┬─────────────┘
             │
             ▼
    ┌──────────────────────┐
    │ localStorage.setItem │
    │ (Persistência)       │
    └────────┬─────────────┘
             │
             ▼
    ┌──────────────────────┐
    │ Componentes consumers │
    │ re-renderizam        │
    └────────┬─────────────┘
             │
        ┌────┴────┐
        │          │
        ▼          ▼
    ┌────────┐ ┌──────────────┐
    │ Toast  │ │ ScheduleList │
    │Success │ │ Re-renderiza │
    └────────┘ └──────────────┘
```

---

## 🔄 Validação & Tratamento de Erros

```
INPUT FORM
    │
    ▼
┌─────────────────────────┐
│ User digita/seleciona   │
└────────────┬────────────┘
             │
        ┌────┴────────────────┐
        │                     │
        ▼                     ▼
    ┌────────────┐    ┌──────────────────┐
    │ onChange   │    │ onBlur (se toque)│
    └─────┬──────┘    └────────┬─────────┘
          │                    │
          ▼                    ▼
    ┌────────────────────────────────┐
    │ Sanitizar dados                │
    └────────┬───────────────────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Validar (se já visitado)       │
    ├────────────────────────────────┤
    │ • Nome válido?                 │
    │ • Data futura?                 │
    │ • Horário disponível?          │
    └────────┬───────────────────────┘
             │
    ┌────────┴──────────┐
    │                   │
    ▼                   ▼
┌──────────┐      ┌────────────┐
│ ✅ Válido│      │ ❌ Erro    │
└────┬─────┘      └──────┬─────┘
     │                   │
     ▼                   ▼
  Sem erro            Mostrar
  inline              mensagem

                      ao submeter
                    ┌─────┴──────┐
                    ▼            ▼
              Validar      Bloquear
              completo     submit
              todos campos
                │
           ┌────┴────┐
           │          │
        VÁLIDO    INVÁLIDO
           │          │
           ▼          ▼
        Enviar    Toast erro
```

---

## 🎨 Componentes & Responsabilidades

```
DESIGN SYSTEM BASE
├── Button (4 variantes)
│   ├── primary (amarelo)
│   ├── secondary (cinza)
│   ├── tertiary (transparente)
│   └── danger (vermelho)
│
├── Input
│   ├── com label
│   ├── com ícone
│   ├── com validação
│   └── com erro
│
├── Card (Header/Body/Footer)
│   ├── Container
│   ├── Header
│   ├── Body
│   └── Footer
│
├── Badge (5 cores)
├── Alert (4 tipos)
├── Text (3 variantes)
└── Modal (Genérico)
    ├── Overlay
    ├── Content (3 tamanhos)
    ├── Header
    ├── Body
    └── Footer

COMPONENTES ESPECÍFICOS
├── Schedule (Criar)
│   ├── InputDate
│   ├── InputText
│   ├── ButtonTime (períodos)
│   └── ButtonDefault
│
└── ScheduleList (Visualizar)
    ├── ListHeader (filtro)
    ├── ListGroup (período)
    │   ├── PeriodLabel
    │   └── ListItem
    │       ├── TimeInfo
    │       ├── ClientInfo
    │       └── ActionButtons
    └── EditModal
        ├── Form
        ├── Validação
        └── Ações
```

---

## 📈 Sprint Roadmap

```
SPRINT 1 (Semana 1)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├─ Design System Base
│  ├─ Tokens (cores, tipografia, espaçamento)
│  ├─ Componentes básicos (Button, Input, etc)
│  └─ Storybook
│
└─ State Management
   ├─ ScheduleContext
   ├─ Reducer
   └─ localStorage

SPRINT 2 (Semana 2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├─ Validações & Erros
│  ├─ Funções de validação
│  ├─ Sanitização
│  ├─ Toast/Alert
│  └─ Testes
│
└─ Modal de Edição
   ├─ Modal genérico
   ├─ EditModal específico
   └─ Integração

SPRINT 3 (Semana 3)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├─ Agenda (Integração Final)
│  ├─ ScheduleList
│  ├─ ListHeader
│  ├─ ListGroups
│  └─ Testes E2E
│
└─ Refinamentos
   ├─ Performance
   ├─ Acessibilidade
   ├─ Responsividade
   └─ Code review
```

---

## 📊 Matriz de Prioridade vs Complexidade

```
                      COMPLEXIDADE
              Baixa          Média          Alta
         ┌──────────────┬──────────────┬──────────────┐
    ALTA │ RÁPIDO       │ PLANEJADO    │ FUTURO       │
    ░░░░ │ GANHO        │              │              │
         │              │ ✅ Agenda    │              │
         │              │ ✅ State Mgmt│              │
         │              │              │              │
    PRIO ├──────────────┼──────────────┼──────────────┤
    MÉDIA│ ✅ Design Sys│ ✅ Validações│ ICEBOX       │
    ▒▒▒▒ │              │ ✅ Modal     │              │
         │              │              │              │
    BAIXA│ FUTURO       │ FUTURO       │ FUTURO       │
    ░░░░ │              │              │              │
         └──────────────┴──────────────┴──────────────┘

✅ = Planejado neste ciclo
⏳ = Próximo ciclo
🔮 = Futuro indeterminado
```

---

## 🔄 Ciclo de Vida de um Agendamento

```
┌──────────────────────┐
│  NOVO AGENDAMENTO    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  1. PREENCHER FORM   │
│  • Data              │
│  • Horário           │
│  • Cliente           │
└──────────┬───────────┘
           │
        Validar
           │
           ▼
┌──────────────────────┐
│  2. AGENDADO         │
│  ✅ Criado           │
│  📅 Na Lista         │
│  💾 Persistido       │
└──────────┬───────────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
  EDITAR    DELETAR
     │           │
     ▼           ▼
┌────────────┐ ┌──────────────┐
│ 3. EDITADO │ │ 3. DELETADO  │
│ • Abrirmodal│ │ • Confirmação│
│ • Alterar  │ │ • Remover    │
│ • Salvar   │ │ • Atualizar  │
└──────┬─────┘ └──────┬───────┘
       │               │
       ▼               ▼
    Atualizado      Removido
    na lista        da lista
```

---

## 🧪 Matriz de Testes

```
┌──────────────────┬────────────────┬─────────────┐
│ Tipo de Teste    │ Quantidade     │ Cobertura   │
├──────────────────┼────────────────┼─────────────┤
│ Unitários        │ ~30 testes     │ 80%+        │
│ Integração       │ ~15 testes     │ 90%+        │
│ E2E (Cypress)    │ ~10 testes     │ Críticos    │
│ Validação        │ ~20 testes     │ 100%        │
│ Acessibilidade   │ ~5 testes      │ WCAG AA     │
├──────────────────┼────────────────┼─────────────┤
│ TOTAL            │ ~80 testes     │ ≥85%        │
└──────────────────┴────────────────┴─────────────┘
```

---

## 📦 Estrutura de Pastas Final

```
hairday/
│
├── docs/
│   ├── REFINEMENTS_INDEX.md          ← Você está aqui
│   ├── REFINEMENT_01_AGENDA.md
│   ├── REFINEMENT_02_STATE_MANAGEMENT.md
│   ├── REFINEMENT_03_VALIDATIONS_ERRORS.md
│   ├── REFINEMENT_04_EDIT_MODAL.md
│   ├── REFINEMENT_05_DESIGN_SYSTEM.md
│   └── ROADMAP_VISUAL.md
│
├── src/
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Badge/
│   │   │   ├── Alert/
│   │   │   ├── Modal/
│   │   │   └── Text/
│   │   │
│   │   ├── Schedule/
│   │   │   ├── schedule.tsx
│   │   │   └── components/
│   │   │       ├── button-default.tsx
│   │   │       ├── button-time.tsx
│   │   │       ├── input-date.tsx
│   │   │       └── input-text.tsx
│   │   │
│   │   └── ScheduleList/
│   │       ├── schedule-list.tsx
│   │       ├── components/
│   │       │   ├── schedule-list-header.tsx
│   │       │   ├── schedule-list-group.tsx
│   │       │   ├── schedule-list-item.tsx
│   │       │   ├── period-label.tsx
│   │       │   ├── action-buttons.tsx
│   │       │   └── schedule-edit-modal.tsx
│   │
│   ├── contexts/
│   │   ├── ScheduleContext.tsx
│   │   ├── scheduleReducer.ts
│   │   ├── types.ts
│   │   └── __tests__/
│   │
│   ├── types/
│   │   └── schedule.ts
│   │
│   ├── utils/
│   │   ├── validations.ts
│   │   ├── sanitization.ts
│   │   └── __tests__/
│   │
│   ├── constants/
│   │   └── messages.ts
│   │
│   ├── styles/
│   │   ├── tokens.ts
│   │   ├── globals.css
│   │   └── animations.css
│   │
│   ├── App.tsx
│   └── main.tsx
│
└── README.md
```

---

## 🎯 Key Performance Indicators (KPI)

```
CODE QUALITY
├─ TypeScript Coverage: 100%
├─ Test Coverage: ≥85%
├─ ESLint: 0 errors
├─ Bundle Size: <150kb
└─ Lighthouse: >90

USER EXPERIENCE
├─ Page Load: <2s
├─ Interaction: <100ms
├─ Forms Validation: <50ms
├─ Modal Open: <300ms
└─ List Render: <500ms

MAINTENANCE
├─ Documentation: 100%
├─ Code Comments: Essential
├─ Commit Quality: Conventional
├─ PR Reviews: < 24h
└─ Deployment: Weekly
```

---

## 🚀 Success Criteria

```
✅ Funcionalidades Implementadas
   └─ Criar agendamento
   └─ Visualizar agenda
   └─ Editar agendamento
   └─ Deletar agendamento
   └─ Filtrar por data
   └─ Validações completas

✅ Qualidade de Código
   └─ TypeScript sem erros
   └─ Componentes reutilizáveis
   └─ Testes > 85%
   └─ Sem console errors

✅ Performance
   └─ Bundle < 150kb
   └─ Lighthouse > 90
   └─ Render < 500ms
   └─ localStorage sincronizado

✅ Documentação
   └─ Refinements.md completo
   └─ Storybook atualizado
   └─ Código comentado
   └─ README atualizado

✅ Acessibilidade
   └─ WCAG AA compliant
   └─ Navegação por teclado
   └─ Screen readers
   └─ Contraste adequado
```

---

## 📞 Contatos & Suporte

**Dúvidas sobre refinamentos?**

1. Consulte o arquivo específico do refinamento
2. Revise os exemplos de código
3. Verifique os critérios de aceitação
4. Consulte a documentação das bibliotecas

**Problemas durante desenvolvimento?**

1. Verifique o mapa de dependências
2. Valide as pré-condições
3. Consulte testes de exemplo
4. Abra issue no repositório

---

## 📊 Status Atual

```
┌─────────────────────────────────────┐
│ ROADMAP VISUAL - HAIRDAY            │
│ Data: 20 de novembro de 2025        │
│ Status: 🟢 PLANEJAMENTO CONCLUÍDO  │
│                                     │
│ Próxima Fase: DESENVOLVIMENTO       │
│ Início Previsto: Semana que vem     │
│ Duração: ~3 semanas (46h)           │
│ Time: 1 Desenvolvedor                │
└─────────────────────────────────────┘
```

---

**Versão**: 1.0  
**Criado em**: 20/11/2025  
**Atualização Prevista**: Semanal durante development  
**Status**: 🟢 Ativo e em implementação
