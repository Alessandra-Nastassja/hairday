# Refinement 03 - Componente ScheduleList

**Tempo Estimado**: 4-6 horas  
**Dificuldade**: ⭐⭐⭐ Intermediário/Avançado  
**Pré-requisitos**: Refinement 01 e 02  

---

## 🎯 Objetivo

Criar o componente `ScheduleList` que **exibe agendamentos agrupados por período** (Manhã, Tarde, Noite) com suporte a remoção.

> Nota de atualização: ajustes aplicados para refletir a implementação real do projeto.
> - Estrutura de componentes prevista em `src/components/ScheduleList/`.
> - Os agendamentos usam o campo `clientName` para o nome do cliente.
> - Os estilos no projeto usam Tailwind e arquivos CSS utilitários; adapte as classes conforme necessário.

---

## 📋 Requisitos

✅ Exibir agendamentos por período  
✅ Manhã: 9h-12h  
✅ Tarde: 13h-18h  
✅ Noite: 19h-21h  
✅ Mostrar mensagem vazia quando sem agendamentos  
✅ Botão de remover em cada agendamento  
✅ Usar map() e filter() corretamente  

---

## 🏗️ Arquitetura

### Estrutura de Pastas
```
src/components/ScheduleList/
├── index.tsx              // Component principal
├── SchedulePeriod.tsx     // Componente de período
├── ScheduleItem.tsx       // Componente de item
└── schedulelist.css       // Estilos
```

### Hierarquia de Componentes
```
ScheduleList
├── SchedulePeriod (Manhã)
│   ├── ScheduleItem
│   ├── ScheduleItem
│   └── ScheduleItem
├── SchedulePeriod (Tarde)
│   ├── ScheduleItem
│   └── ScheduleItem
└── SchedulePeriod (Noite)
    └── "Você ainda não tem agendamentos..."
```

---

## 💻 Código de Exemplo

### Utils para agrupar por período

```typescript
// src/utils/period.ts
import { Schedule } from '../types'

export type Period = 'morning' | 'afternoon' | 'night'

export interface SchedulesByPeriod {
  morning: Schedule[]
  afternoon: Schedule[]
  night: Schedule[]
}

// Extrair hora do agendamento
const getHour = (time: string): number => {
  return parseInt(time.split(':')[0], 10)
}

// Determinar período baseado na hora
const getPeriod = (time: string): Period => {
  const hour = getHour(time)
  
  if (hour >= 9 && hour < 12) return 'morning'
  if (hour >= 13 && hour < 18) return 'afternoon'
  if (hour >= 19 && hour < 21) return 'night'
  
  throw new Error('Horário fora do expediente')
}

// Agrupar agendamentos por período
export const groupSchedulesByPeriod = (schedules: Schedule[]): SchedulesByPeriod => {
  return {
    morning: schedules.filter(s => getPeriod(s.time) === 'morning'),
    afternoon: schedules.filter(s => getPeriod(s.time) === 'afternoon'),
    night: schedules.filter(s => getPeriod(s.time) === 'night')
  }
}

// Ordenar agendamentos por hora
export const sortSchedulesByTime = (schedules: Schedule[]): Schedule[] => {
  return [...schedules].sort((a, b) => a.time.localeCompare(b.time))
}
```

---

### ScheduleItem Component

```typescript
// src/components/ScheduleList/ScheduleItem.tsx
import React from 'react'
import { Schedule, ScheduleItemProps } from '../../types'
import './schedulelist.css'

export const ScheduleItem: React.FC<ScheduleItemProps> = ({ schedule, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Remover agendamento de ${schedule.name}?`)) {
      onDelete(schedule.id)
    }
  }

  return (
    <div className="schedule-item">
      <div className="schedule-info">
        <span className="schedule-time">{schedule.time}</span>
        <span className="schedule-name">{schedule.name}</span>
      </div>
      <button
        className="delete-button"
        onClick={handleDelete}
        aria-label={`Deletar agendamento de ${schedule.name}`}
        title="Deletar"
      >
        🗑️
      </button>
    </div>
  )
}
```

---

### SchedulePeriod Component

```typescript
// src/components/ScheduleList/SchedulePeriod.tsx
import React from 'react'
import { Schedule, SchedulePeriodProps } from '../../types'
import { ScheduleItem } from './ScheduleItem'
import { sortSchedulesByTime } from '../../utils/period'
import './schedulelist.css'

const periodLabels = {
  morning: { emoji: '🌅', label: 'Manhã' },
  afternoon: { emoji: '🌤️', label: 'Tarde' },
  night: { emoji: '🌙', label: 'Noite' }
}

export const SchedulePeriod: React.FC<SchedulePeriodProps> = ({
  period,
  schedules,
  onDeleteSchedule
}) => {
  const { emoji, label } = periodLabels[period]
  const sortedSchedules = sortSchedulesByTime(schedules)
  const isEmpty = schedules.length === 0

  return (
    <div className="period">
      <h3 className="period-title">
        <span className="period-emoji">{emoji}</span>
        {label}
      </h3>

      {isEmpty ? (
        <p className="empty-state">
          Você ainda não tem agendamentos cadastrados nesse período.
        </p>
      ) : (
        <div className="schedules">
          {sortedSchedules.map(schedule => (
            <ScheduleItem
              key={schedule.id}
              schedule={schedule}
              onDelete={onDeleteSchedule}
            />
          ))}
        </div>
      )}
    </div>
  )
}
```

---

### ScheduleList Component

```typescript
// src/components/ScheduleList/index.tsx
import React from 'react'
import { Schedule, ScheduleListProps } from '../../types'
import { SchedulePeriod } from './SchedulePeriod'
import { groupSchedulesByPeriod } from '../../utils/period'
import './schedulelist.css'

export const ScheduleList: React.FC<ScheduleListProps> = ({
  schedules,
  onDeleteSchedule
}) => {
  const grouped = groupSchedulesByPeriod(schedules)
  const hasAnySchedule = schedules.length > 0

  return (
    <section className="schedule-list">
      <h2>Sua Agenda</h2>

      {!hasAnySchedule && (
        <div className="no-schedules">
          <p>Nenhum agendamento cadastrado</p>
        </div>
      )}

      <div className="periods">
        <SchedulePeriod
          period="morning"
          schedules={grouped.morning}
          onDeleteSchedule={onDeleteSchedule}
        />
        <SchedulePeriod
          period="afternoon"
          schedules={grouped.afternoon}
          onDeleteSchedule={onDeleteSchedule}
        />
        <SchedulePeriod
          period="night"
          schedules={grouped.night}
          onDeleteSchedule={onDeleteSchedule}
        />
      </div>
    </section>
  )
}
```

---

### CSS (schedulelist.css)

```css
.schedule-list {
  flex: 1;
  padding: 24px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.schedule-list h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #333;
}

.periods {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.period {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.period-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.period-emoji {
  font-size: 20px;
}

.schedules {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.schedule-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 6px;
  border-left: 4px solid #b8952e;
  transition: background-color 0.2s;
}

.schedule-item:hover {
  background-color: #efefef;
}

.schedule-info {
  display: flex;
  gap: 12px;
  align-items: center;
  flex: 1;
}

.schedule-time {
  font-weight: 600;
  color: #b8952e;
  min-width: 50px;
  font-size: 14px;
}

.schedule-name {
  color: #555;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  transition: background-color 0.2s;
  border-radius: 4px;
}

.delete-button:hover {
  background-color: #ffe6e6;
}

.delete-button:active {
  background-color: #ffcccc;
}

.empty-state {
  color: #999;
  font-size: 14px;
  text-align: center;
  padding: 16px;
  font-style: italic;
}

.no-schedules {
  text-align: center;
  padding: 32px;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #999;
}

@media (max-width: 768px) {
  .schedule-list {
    padding: 16px;
  }

  .periods {
    gap: 16px;
  }

  .period {
    padding: 12px;
  }

  .schedule-item {
    flex-wrap: wrap;
  }
}
```

---

## 🧪 Testes

```typescript
// src/__tests__/ScheduleList.test.tsx
import { render, screen } from '@testing-library/react'
import { ScheduleList } from '../components/ScheduleList'
import { Schedule } from '../types'

describe('ScheduleList', () => {
  const mockDelete = jest.fn()

  const mockSchedules: Schedule[] = [
    { id: 1, date: '2025-11-20', time: '10:00', name: 'João Silva' },
    { id: 2, date: '2025-11-20', time: '14:00', name: 'Maria Santos' },
    { id: 3, date: '2025-11-20', time: '20:00', name: 'Pedro Costa' }
  ]

  it('deve renderizar todos os períodos', () => {
    render(
      <ScheduleList 
        schedules={mockSchedules}
        onDeleteSchedule={mockDelete}
      />
    )

    expect(screen.getByText('🌅')).toBeInTheDocument()
    expect(screen.getByText('Manhã')).toBeInTheDocument()
    expect(screen.getByText('🌤️')).toBeInTheDocument()
    expect(screen.getByText('Tarde')).toBeInTheDocument()
    expect(screen.getByText('🌙')).toBeInTheDocument()
    expect(screen.getByText('Noite')).toBeInTheDocument()
  })

  it('deve agrupar agendamentos por período', () => {
    render(
      <ScheduleList 
        schedules={mockSchedules}
        onDeleteSchedule={mockDelete}
      />
    )

    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
    expect(screen.getByText('Pedro Costa')).toBeInTheDocument()
  })

  it('deve exibir mensagem vazia para períodos sem agendamentos', () => {
    const morningOnly = [mockSchedules[0]]
    
    render(
      <ScheduleList 
        schedules={morningOnly}
        onDeleteSchedule={mockDelete}
      />
    )

    const emptyMessages = screen.getAllByText(
      'Você ainda não tem agendamentos cadastrados nesse período.'
    )
    expect(emptyMessages).toHaveLength(2) // Tarde e Noite vazias
  })

  it('deve ordenar agendamentos por hora', () => {
    const unordered = [
      { id: 1, date: '2025-11-20', time: '11:00', name: 'C' },
      { id: 2, date: '2025-11-20', time: '09:00', name: 'A' },
      { id: 3, date: '2025-11-20', time: '10:00', name: 'B' }
    ]

    render(
      <ScheduleList 
        schedules={unordered}
        onDeleteSchedule={mockDelete}
      />
    )

    const scheduleItems = screen.getAllByRole('button')
    // Verificar ordem
  })
})

// Tests para utils
import { groupSchedulesByPeriod, sortSchedulesByTime } from '../utils/period'

describe('Period Utils', () => {
  const schedules: Schedule[] = [
    { id: 1, date: '2025-11-20', time: '10:00', name: 'João' },
    { id: 2, date: '2025-11-20', time: '14:00', name: 'Maria' },
    { id: 3, date: '2025-11-20', time: '20:00', name: 'Pedro' }
  ]

  it('deve agrupar corretamente por período', () => {
    const grouped = groupSchedulesByPeriod(schedules)

    expect(grouped.morning).toHaveLength(1)
    expect(grouped.afternoon).toHaveLength(1)
    expect(grouped.night).toHaveLength(1)
  })

  it('deve ordenar agendamentos por hora', () => {
    const unordered = [
      { id: 1, date: '2025-11-20', time: '11:00', name: 'C' },
      { id: 2, date: '2025-11-20', time: '09:00', name: 'A' }
    ]

    const sorted = sortSchedulesByTime(unordered)

    expect(sorted[0].name).toBe('A')
    expect(sorted[1].name).toBe('C')
  })
})
```

---

## 🎯 Critérios de Aceitação

- [ ] ScheduleList renderiza com todos os períodos
- [ ] Agendamentos agrupados corretamente por período
- [ ] Horários dentro das faixas corretas
- [ ] Mensagem vazia aparece quando sem agendamentos
- [ ] Agendamentos ordenados por hora
- [ ] Botão de delete funciona
- [ ] Nomes e horas exibem corretamente
- [ ] Emojis aparecem

---

## 📝 Checklist de Desenvolvimento

### Arquivos
- [ ] `src/utils/period.ts` criado
- [ ] `src/components/ScheduleList/index.tsx` criado
- [ ] `src/components/ScheduleList/SchedulePeriod.tsx` criado
- [ ] `src/components/ScheduleList/ScheduleItem.tsx` criado
- [ ] `src/components/ScheduleList/schedulelist.css` criado

### Funcionalidade
- [ ] Agrupamento por período funciona
- [ ] Ordenação por hora funciona
- [ ] Mensagem vazia aparece
- [ ] Delete dispara callback
- [ ] Integrado em App.tsx

### Estilo
- [ ] Layout segue Figma
- [ ] Cores corretas
- [ ] Responsivo em mobile
- [ ] Emojis visíveis

---

## 🚀 Próximo Passo

Após completar este refinement, avance para:
**Refinement 04 - Remoção e Validações**

---

💡 **Dica**: Use `sortSchedulesByTime()` para manter agendamentos ordenados!

---

🙏 Feito com 💜 por Rocketseat  
📅 Refinement 03 - 20 de novembro de 2025
