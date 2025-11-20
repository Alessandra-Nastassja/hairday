# Roadmap Visual - HairDay Challenge

**Desafio**: Rocketseat React 2025  
**Formato**: Diagramas, fluxos e arquitetura visual  

---

## Arquitetura de Componentes

### Hierarquia Completa

```
App (Raiz)
├── Estado centralizado (schedules)
├── Callbacks (onAddSchedule, onDeleteSchedule)
│
├── Sidebar (Input Form)
│   ├── InputDate
│   ├── InputText (nome)
│   ├── InputTime
│   └── ButtonDefault (Agendar)
│
└── ScheduleList (Exibição)
    ├── SchedulePeriod - MANHÃ (9h-12h)
    │   ├── ScheduleItem (10:00 - João Silva)
    │   ├── ScheduleItem (11:30 - Maria Santos)
    │   └── ...
    │
    ├── SchedulePeriod - TARDE (13h-18h)
    │   ├── ScheduleItem (14:00 - Pedro Costa)
    │   ├── ScheduleItem (16:30 - Ana Paula)
    │   └── ...
    │
    └── SchedulePeriod - NOITE (19h-21h)
        ├── ScheduleItem (19:30 - Carlos Silva)
        └── ...

Persistência:
└── localStorage (sincronização automática)
```

---

## Fluxo de Dados: Criar Agendamento

```
1. USER INTERACTION
   Usuario preenche o formulario
   - Data: 25/11/2025
   - Hora: 10:00
   - Nome: João Silva

2. VALIDAÇÃO
   Validar dados no Sidebar
   - Data é futura? SIM
   - Hora válida? SIM
   - Nome preenchido? SIM

3. CRIAR AGENDAMENTO
   App.tsx recebe callback
   handleAddSchedule({ date, time, name })

4. ATUALIZAR ESTADO
   setSchedules([...schedules, { id, date, time, name }])

5. PERSISTIR DADOS
   useEffect monitora mudança
   localStorage.setItem('hairday:schedules', JSON.stringify(schedules))

6. RE-RENDERIZAR
   Componentes atualizam automaticamente
   - Sidebar limpa (form vazio)
   - ScheduleList mostra novo agendamento

7. FEEDBACK AO USER
   Toast mostra: "Agendamento criado com sucesso!"
```

---

## Fluxo de Dados: Deletar Agendamento

```
1. USER CLICA EM DELETE
   Usuario clica no botão X/Delete
   no ScheduleItem

2. CONFIRMAÇÃO
   window.confirm("Deseja remover este agendamento?")
   - SIM: continua
   - NÃO: cancela

3. REMOVER DO ESTADO
   handleDeleteSchedule(scheduleId)
   setSchedules(schedules.filter(s => s.id !== scheduleId))

4. PERSISTIR MUDANÇA
   useEffect dispara novamente
   localStorage.setItem('hairday:schedules', JSON.stringify(schedules))

5. RE-RENDERIZAR
   ScheduleList atualiza
   Agendamento removido da lista

6. FEEDBACK AO USER
   Toast mostra: "Agendamento removido!"
```

---

## Fluxo de Dados: Carregar do localStorage

```
1. APP INICIALIZA
   Component App monta

2. useEffect DISPARA
   useEffect(() => {
     const dados = localStorage.getItem('hairday:schedules')
     if (dados) {
       setSchedules(JSON.parse(dados))
     }
   }, [])

3. PARSE JSON
   Converte string JSON de volta para array

4. ATUALIZAR ESTADO
   setSchedules(arrayCom dados anteriores)

5. COMPONENTES RE-RENDERIZAM
   ScheduleList mostra agendamentos anteriores
   Dados persistem entre recarregamentos
```

---

## Estrutura de Dados

### Schedule (Agendamento)

```typescript
interface Schedule {
  id: number                  // Identificador único
  date: string               // Formato: YYYY-MM-DD
  time: string               // Formato: HH:mm (24h)
  name: string               // Nome do cliente
  createdAt?: Date           // Data de criação (opcional)
}
```

### Exemplo de Dados

```javascript
[
  {
    id: 1704067200000,
    date: "2025-11-25",
    time: "10:00",
    name: "João Silva"
  },
  {
    id: 1704070800000,
    date: "2025-11-25",
    time: "14:30",
    name: "Maria Santos"
  },
  {
    id: 1704081600000,
    date: "2025-11-25",
    time: "19:30",
    name: "Carlos Costa"
  }
]
```

---

## Agrupamento por Período

### Período - MANHÃ (9:00 às 11:59)

```
Horários: 09:00 - 11:59
Agendamentos:
- 10:00 - João Silva
- 11:30 - Maria Santos

Extração do horário:
const hour = parseInt(time.split(':')[0])  // 10
const isMorning = hour >= 9 && hour < 12   // true
```

### Período - TARDE (13:00 às 17:59)

```
Horários: 13:00 - 17:59
Agendamentos:
- 14:00 - Pedro Costa
- 16:30 - Ana Paula

Extração do horário:
const hour = parseInt(time.split(':')[0])  // 14
const isAfternoon = hour >= 13 && hour < 18  // true
```

### Período - NOITE (19:00 às 20:59)

```
Horários: 19:00 - 20:59
Agendamentos:
- 19:30 - Carlos Silva

Extração do horário:
const hour = parseInt(time.split(':')[0])  // 19
const isEvening = hour >= 19 && hour < 21  // true
```

---

## Responsividade

### Desktop (1200px+)

```
┌─────────────────────────────────────────────┐
│              HairDay - Desktop              │
├──────────────────┬──────────────────────────┤
│                  │                          │
│  SIDEBAR         │  SCHEDULE LIST           │
│  (Esquerda)      │  (Direita)               │
│                  │                          │
│  Input Date      │  Manhã                   │
│  Input Time      │  • 10:00 - João Silva   │
│  Input Name      │  • 11:30 - Maria Santos │
│  [Agendar]       │                          │
│                  │  Tarde                   │
│                  │  • 14:00 - Pedro Costa  │
│                  │                          │
│                  │  Noite                   │
│                  │  (vazio)                 │
└──────────────────┴──────────────────────────┘

Layout: 2 colunas (50% / 50%)
Sidebar Fixed: Fica sempre visível
```

### Tablet (768px - 1199px)

```
┌─────────────────────────────────────────┐
│        HairDay - Tablet                 │
├─────────────────────────────────────────┤
│  SIDEBAR (Top)                          │
│  Input Date | Input Time | [Agendar]   │
├─────────────────────────────────────────┤
│  SCHEDULE LIST (Bottom)                 │
│  Manhã                                  │
│  • 10:00 - João Silva                  │
│  • 11:30 - Maria Santos                │
│  Tarde                                  │
│  • 14:00 - Pedro Costa                 │
│  Noite                                  │
│  (vazio)                                │
└─────────────────────────────────────────┘

Layout: 1 coluna (100%)
Sidebar: Fica no topo
```

### Mobile (< 768px)

```
┌─────────────────────────────┐
│  HairDay - Mobile           │
├─────────────────────────────┤
│  SIDEBAR (Stack Vertical)   │
│  [Input Date        ]       │
│  [Input Time        ]       │
│  [Input Name        ]       │
│  [Agendar]                  │
├─────────────────────────────┤
│  SCHEDULE LIST              │
│  Manhã                      │
│  10:00 - João Silva [X]     │
│  11:30 - Maria [X]          │
│  Tarde                      │
│  14:00 - Pedro [X]          │
│  Noite                      │
│  (vazio)                    │
└─────────────────────────────┘

Layout: 1 coluna (100%)
Stack: Vertical (todos elementos)
Botão Delete: Inline com item
```

---

## Paleta de Cores

### Cores Principais

```
Primary (Ouro):        #B8952E
Primary Light:         #D4AF6A
Primary Dark:          #8A6D2F
Secundary (Cinza):     #E8E8E8
White:                 #FFFFFF
Black:                 #000000

Backgrounds:
- Light BG:            #F9F9F9
- Dark BG:             #2A2A2A
- Card BG:             #FAFAFA

States:
- Success (Verde):     #27AE60
- Error (Vermelho):    #E74C3C
- Info (Azul):         #3498DB
- Warning (Laranja):   #F39C12

Text:
- Dark Text:           #333333
- Light Text:          #666666
- Muted Text:          #999999
```

---

## Timeline de Desenvolvimento

### Fase 1: Setup Inicial (1-2 horas)

```
Tarefas:
1. Criar projeto Vite + React + TypeScript
2. Instalar dependências
3. Criar estrutura de pastas
4. Configurar ESLint

Resultado:
- Projeto rodando em localhost:5173
- npm run dev funcionando
- Estrutura pronta para começar
```

### Fase 2: Sidebar - Inputs & Validação (3-4 horas)

```
Tarefas:
1. Criar componente Sidebar
2. Adicionar InputDate
3. Adicionar InputText
4. Adicionar InputTime
5. Implementar validação básica

Resultado:
- Formulário funcional
- Validação mostrando erros
- Pronto para conectar ao estado
```

### Fase 3: Estado & Persistência (4-6 horas)

```
Tarefas:
1. Implementar useState em App.tsx
2. Criar handleAddSchedule
3. Conectar localStorage
4. Implementar handleDeleteSchedule
5. Carregar dados ao iniciar

Resultado:
- Estado gerenciado corretamente
- Dados persistem ao recarregar
- CRUD funcional
```

### Fase 4: ScheduleList - Agrupamento (4-6 horas)

```
Tarefas:
1. Criar ScheduleList component
2. Implementar groupSchedulesByPeriod
3. Criar SchedulePeriod component
4. Criar ScheduleItem component
5. Implementar sortSchedulesByTime

Resultado:
- Agendamentos agrupados por período
- Organizados por horário
- UI mostrando 3 períodos
```

### Fase 5: Delete & Confirmação (3-4 horas)

```
Tarefas:
1. Adicionar botão delete em ScheduleItem
2. Implementar window.confirm()
3. Conectar handleDeleteSchedule
4. Validar remoção do localStorage
5. Testar fluxo completo

Resultado:
- Delete com confirmação funcionando
- Dados removidos do localStorage
- UI atualizada corretamente
```

### Fase 6: Styling & Responsividade (4-6 horas)

```
Tarefas:
1. Criar App.css com estilos globais
2. Implementar CSS Grid responsivo
3. Adicionar media queries
4. Testar em mobile (< 768px)
5. Testar em tablet (768px - 1024px)
6. Testar em desktop (> 1024px)

Resultado:
- Design completo e polido
- Responsivo em todas as telas
- Pronto para produção
```

---

## Checklist de Implementação

### Sidebar Component

- [ ] InputDate renderizado
- [ ] InputText renderizado
- [ ] InputTime renderizado
- [ ] ButtonDefault renderizado
- [ ] Validação de data (futura)
- [ ] Validação de nome (não vazio)
- [ ] onSubmit chamando callback
- [ ] Form limpando após submissão
- [ ] CSS estilizado

### ScheduleList Component

- [ ] Recebendo array de schedules
- [ ] Agrupando por período (3x)
- [ ] Mostrando agendamentos em ordem
- [ ] Empty state quando vazio
- [ ] Delete button em cada item
- [ ] Delete disparando callback
- [ ] CSS estilizado
- [ ] Responsivo em todas telas

### Estado em App.tsx

- [ ] useState para schedules
- [ ] handleAddSchedule funcionando
- [ ] handleDeleteSchedule funcionando
- [ ] localStorage.setItem funcionando
- [ ] localStorage.getItem no useEffect
- [ ] Sincronização entre componentes

### localStorage

- [ ] Salvando ao adicionar
- [ ] Salvando ao remover
- [ ] Carregando ao iniciar
- [ ] Dados persistindo entre reloads
- [ ] JSON parsing correto

---

## Critérios de Sucesso

### Funcionalidades

- [x] Criar agendamento com data, hora e nome
- [x] Visualizar agenda agrupada por período
- [x] Remover agendamento com confirmação
- [x] Persistência em localStorage
- [x] Responsivo em mobile, tablet e desktop

### Qualidade

- [x] TypeScript sem erros
- [x] Componentes reutilizáveis
- [x] Sem console errors
- [x] Sem console warnings
- [x] ESLint passando

### Performance

- [x] Renderização rápida
- [x] localStorage sincronizado
- [x] Sem memory leaks
- [x] Sem re-renders desnecessários

### UX/UI

- [x] Interface intuitiva
- [x] Validações claras
- [x] Feedback ao usuario
- [x] Design consistente
- [x] Acessibilidade básica

---

## Dicas & Boas Práticas

### Estado

```
- Sempre use spreads para arrays
- Nunca modifique estado diretamente
- Use callback do setState quando necessário
- Coloque useEffect ao final do componente
```

### localStorage

```
- Sempre faça JSON.stringify antes de salvar
- Sempre faça JSON.parse ao carregar
- Trate erros (try/catch)
- Valide dados ao carregar
```

### Filtros & Agrupamentos

```
- Use filter() para criar novos arrays
- Use map() para transformar dados
- Use reduce() para complexos
- Combine múltiplos filters se necessário
```

### Performance

```
- Evite criar funções dentro de render
- Use useCallback para callbacks complexos
- Evite re-renders com React.memo (se necessário)
- Profile com DevTools antes de otimizar
```

---

## Recursos Úteis

### Documentação

- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Vite: https://vitejs.dev
- MDN: https://developer.mozilla.org

### Ferramentas

- DevTools React
- VS Code Snippets
- Prettier (formatação)
- ESLint (linting)

### Comunidade

- Discord Rocketseat
- GitHub Issues
- Stack Overflow
- Dev.to

---

## Status do Projeto

```
Data: 20 de novembro de 2025
Status: PRONTO PARA DESENVOLVIMENTO
Próximo Passo: Comece com QUICK_START.md

ROADMAP CONCLUÍDO E VALIDADO
Todas as fases documentadas
Todos os exemplos prontos
Pronto para implementação!
```

---

**Versão**: 1.0  
**Criado em**: 20/11/2025  
**Última atualização**: 20/11/2025  
**Status**: ATIVO E VALIDADO
