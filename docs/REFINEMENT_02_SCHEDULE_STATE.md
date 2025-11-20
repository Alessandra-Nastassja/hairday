# Refinement 02 - Gerenciamento de Estado

**Tempo Estimado**: 4-6 horas  
**Dificuldade**: ⭐⭐⭐ Intermediário/Avançado  
**Pré-requisitos**: Refinement 01 (Sidebar)  

---

## 🎯 Objetivo

Implementar **gerenciamento centralizado de estado** dos agendamentos em `App.tsx` com operações CRUD (Create, Read, Update, Delete).

---

## 📋 Requisitos

✅ Centralizar estado em App.tsx com useState  
✅ Adicionar novo agendamento (Create)  
✅ Listar agendamentos (Read)  
✅ Remover agendamento (Delete)  
✅ Gerar IDs únicos para cada agendamento  
✅ Persistência em localStorage (opcional)  

---

## 🏗️ Arquitetura

### State Flow
```
App.tsx (estado centralizado)
    ↓
├── Sidebar (recebe onAddSchedule)
└── ScheduleList (recebe schedules e onDeleteSchedule)
```

### Operações de Estado

```typescript
// CREATE - Adicionar novo agendamento
const addSchedule = (schedule: Omit<Schedule, 'id'>) => {
  const newSchedule = { ...schedule, id: generateId() }
  setSchedules([...schedules, newSchedule])
}

// READ - Ler agendamentos (já feito com schedules)
// Lista está sempre disponível via estado

// DELETE - Remover agendamento
const deleteSchedule = (id: string | number) => {
  setSchedules(schedules.filter(s => s.id !== id))
}
```

---

## 💻 Código de Exemplo

### Utility para gerar IDs

```typescript
// src/utils/id.ts
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Alternativa mais simples
export const generateSimpleId = (): number => {
  return Date.now()
}
```

---

### App.tsx Completo

```typescript
import React, { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { ScheduleList } from './components/ScheduleList'
import { Schedule } from './types'
import { generateId } from './utils/id'
import './App.css'

export function App() {
  const [schedules, setSchedules] = useState<Schedule[]>([])

  // Carregar dados do localStorage ao montar
  useEffect(() => {
    const savedSchedules = localStorage.getItem('hairday:schedules')
    if (savedSchedules) {
      try {
        setSchedules(JSON.parse(savedSchedules))
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error)
      }
    }
  }, [])

  // Salvar em localStorage sempre que schedules muda
  useEffect(() => {
    localStorage.setItem('hairday:schedules', JSON.stringify(schedules))
  }, [schedules])

  // Adicionar novo agendamento
  const handleAddSchedule = (scheduleData: Omit<Schedule, 'id'>) => {
    const newSchedule: Schedule = {
      ...scheduleData,
      id: generateId()
    }
    setSchedules([...schedules, newSchedule])
  }

  // Remover agendamento
  const handleDeleteSchedule = (id: string | number) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>HairDay</h1>
        <p>Agendamentos de beleza</p>
      </header>

      <main className="app-main">
        <Sidebar onAddSchedule={handleAddSchedule} />
        <ScheduleList 
          schedules={schedules}
          onDeleteSchedule={handleDeleteSchedule}
        />
      </main>
    </div>
  )
}
```

---

### Types Atualizados

```typescript
// src/types/index.ts
export interface Schedule {
  id: string | number
  date: string          // YYYY-MM-DD
  time: string          // HH:mm
  name: string
}

export interface SidebarProps {
  onAddSchedule: (schedule: Omit<Schedule, 'id'>) => void
}

export interface ScheduleListProps {
  schedules: Schedule[]
  onDeleteSchedule: (id: string | number) => void
}

export interface SchedulePeriodProps {
  period: 'morning' | 'afternoon' | 'night'
  schedules: Schedule[]
  onDeleteSchedule: (id: string | number) => void
}

export interface ScheduleItemProps {
  schedule: Schedule
  onDelete: (id: string | number) => void
}
```

---

## 💾 LocalStorage Estratégia

### Salvar Automaticamente

```typescript
// useEffect hook para sincronizar com localStorage
useEffect(() => {
  const key = 'hairday:schedules'
  localStorage.setItem(key, JSON.stringify(schedules))
}, [schedules])
```

### Carregar na Inicialização

```typescript
// useEffect hook na primeira renderização
useEffect(() => {
  const key = 'hairday:schedules'
  const saved = localStorage.getItem(key)
  
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      setSchedules(parsed)
    } catch (error) {
      console.error('Erro ao carregar:', error)
    }
  }
}, [])
```

### Hook Customizado (Avançado)

```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}

// Uso em App.tsx
const [schedules, setSchedules] = useLocalStorage<Schedule[]>('hairday:schedules', [])
```

---

## 🔄 Fluxo Completo

```
┌─────────────────────────────────────────────────────────┐
│ Usuário preenche Sidebar                                │
└──────────────────┬──────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────┐
│ Clica "Agendar"                                         │
│ onAddSchedule(scheduleData) é chamado                   │
└──────────────────┬──────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────┐
│ handleAddSchedule em App.tsx:                           │
│ 1. Gera ID único (generateId)                           │
│ 2. Cria objeto Schedule completo                        │
│ 3. setSchedules([...schedules, newSchedule])            │
└──────────────────┬──────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────┐
│ useEffect detecta mudança em schedules                  │
│ Salva em localStorage                                   │
└──────────────────┬──────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────┐
│ ScheduleList recebe novo array                          │
│ Re-renderiza com novo item                              │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 Testes

```typescript
// src/__tests__/App.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { App } from '../App'

describe('App - State Management', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('deve renderizar sem agendamentos inicialmente', () => {
    render(<App />)
    expect(screen.getByText('HairDay')).toBeInTheDocument()
  })

  it('deve adicionar agendamento quando Sidebar dispara callback', async () => {
    render(<App />)
    
    // Preencher formulário
    fireEvent.change(screen.getByLabelText('Data'), { 
      target: { value: '2025-11-20' } 
    })
    fireEvent.change(screen.getByLabelText('Horário'), { 
      target: { value: '10:00' } 
    })
    fireEvent.change(screen.getByLabelText('Nome do Cliente'), { 
      target: { value: 'João Silva' } 
    })
    
    // Clicar em agendar
    fireEvent.click(screen.getByText('Agendar'))
    
    // Verificar se agendamento apareceu
    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
    })
  })

  it('deve remover agendamento ao clicar em lixeira', async () => {
    render(<App />)
    
    // Adicionar agendamento
    fireEvent.change(screen.getByLabelText('Data'), { 
      target: { value: '2025-11-20' } 
    })
    fireEvent.change(screen.getByLabelText('Horário'), { 
      target: { value: '10:00' } 
    })
    fireEvent.change(screen.getByLabelText('Nome do Cliente'), { 
      target: { value: 'Maria' } 
    })
    fireEvent.click(screen.getByText('Agendar'))
    
    await waitFor(() => {
      expect(screen.getByText('Maria')).toBeInTheDocument()
    })
    
    // Remover
    const deleteButton = screen.getByLabelText('Deletar agendamento')
    fireEvent.click(deleteButton)
    
    // Verificar se foi removido
    expect(screen.queryByText('Maria')).not.toBeInTheDocument()
  })

  it('deve persistir agendamentos em localStorage', async () => {
    const { unmount } = render(<App />)
    
    // Adicionar agendamento
    fireEvent.change(screen.getByLabelText('Data'), { 
      target: { value: '2025-11-20' } 
    })
    fireEvent.change(screen.getByLabelText('Horário'), { 
      target: { value: '10:00' } 
    })
    fireEvent.change(screen.getByLabelText('Nome do Cliente'), { 
      target: { value: 'Pedro' } 
    })
    fireEvent.click(screen.getByText('Agendar'))
    
    await waitFor(() => {
      expect(screen.getByText('Pedro')).toBeInTheDocument()
    })
    
    // Desmontar e remontar
    unmount()
    render(<App />)
    
    // Verificar se dados foram restaurados
    await waitFor(() => {
      expect(screen.getByText('Pedro')).toBeInTheDocument()
    })
  })
})
```

---

## 🎯 Critérios de Aceitação

- [ ] Estado centralizado em App.tsx
- [ ] useState inicializado corretamente
- [ ] generateId() cria IDs únicos
- [ ] handleAddSchedule adiciona corretamente
- [ ] handleDeleteSchedule remove corretamente
- [ ] LocalStorage salva automaticamente
- [ ] LocalStorage carrega na inicialização
- [ ] Sem erros de TypeScript
- [ ] Testes passam

---

## 📝 Checklist de Desenvolvimento

### Código
- [ ] `src/utils/id.ts` criado
- [ ] `src/types/index.ts` atualizado
- [ ] `src/App.tsx` gerencia estado
- [ ] Hooks useEffect configurados

### Funcionalidade
- [ ] Adicionar agendamento funciona
- [ ] Remover agendamento funciona
- [ ] LocalStorage persiste dados
- [ ] Dados carregam ao iniciar

### Qualidade
- [ ] TypeScript sem erros
- [ ] Sem console.errors
- [ ] Código organizado
- [ ] Commits feitos

---

## 🚀 Próximo Passo

Após completar este refinement, avance para:
**Refinement 03 - Componente ScheduleList**

---

💡 **Dica**: Teste no DevTools se localStorage está salvando corretamente!

---

🙏 Feito com 💜 por Rocketseat  
📅 Refinement 02 - 20 de novembro de 2025
