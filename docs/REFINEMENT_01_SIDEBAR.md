# Refinement 01 - Componente Sidebar

**Tempo Estimado**: 3-4 horas  
**Dificuldade**: ⭐⭐ Intermediário  
**Pré-requisitos**: Fase 1 (Types e componentes base)  

---

## 🎯 Objetivo

Criar o componente `Sidebar` que funciona como o **formulário de entrada** para adicionar novos agendamentos.

---

## 📋 Requisitos

O componente Sidebar deve ter:

✅ Input para data (type="date")  
✅ Select/Input para horário (time input ou select)  
✅ Input para nome do cliente  
✅ Botão "Agendar"  
✅ Validação básica  
✅ Callback para quando agendamento é criado  

---

## 🏗️ Arquitetura

### Estrutura de Pastas
```
src/components/Sidebar/
├── index.tsx           // Component principal
├── sidebar.module.css  // Estilos
└── sidebar.css        // ou css regular
```

---

## 💻 Código de Exemplo

### Types (atualizar em `src/types/index.ts`)

```typescript
export interface Schedule {
  id: string | number
  date: string   // YYYY-MM-DD
  time: string   // HH:mm
  name: string
}

export interface SidebarProps {
  onAddSchedule: (schedule: Schedule) => void
}
```

---

### Sidebar Component

```typescript
import React, { useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { Schedule, SidebarProps } from '../../types'
import './sidebar.css'

export const Sidebar: React.FC<SidebarProps> = ({ onAddSchedule }) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleAddSchedule = () => {
    // Validação básica
    if (!date || !time || !name.trim()) {
      setError('Preencha todos os campos')
      return
    }

    if (name.trim().length < 3) {
      setError('Nome deve ter pelo menos 3 caracteres')
      return
    }

    // Criar novo agendamento
    const newSchedule: Schedule = {
      id: Date.now(), // ID simples baseado em timestamp
      date,
      time,
      name: name.trim()
    }

    // Callback para App.tsx
    onAddSchedule(newSchedule)

    // Limpar campos
    setDate('')
    setTime('')
    setName('')
    setError('')
  }

  // Alternativamente, usar Enter para submeter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSchedule()
    }
  }

  return (
    <aside className="sidebar">
      <h2>Agende um atendimento</h2>

      <div className="form-group">
        <label htmlFor="date">Data</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="form-group">
        <label htmlFor="time">Horário</label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Nome do Cliente</label>
        <input
          id="name"
          type="text"
          placeholder="Digite o nome..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button
        className="button-schedule"
        onClick={handleAddSchedule}
      >
        Agendar
      </button>
    </aside>
  )
}
```

---

### CSS (sidebar.css)

```css
.sidebar {
  width: 100%;
  max-width: 360px;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #555;
}

.form-group input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #b8952e;
  box-shadow: 0 0 0 3px rgba(184, 149, 46, 0.1);
}

.error-message {
  color: #e74c3c;
  font-size: 12px;
  margin-bottom: 12px;
}

.button-schedule {
  width: 100%;
  padding: 12px;
  background-color: #b8952e;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-schedule:hover {
  background-color: #a0823a;
}

.button-schedule:active {
  background-color: #8a6d2f;
}

@media (max-width: 768px) {
  .sidebar {
    max-width: 100%;
    padding: 16px;
  }
}
```

---

## 🔗 Integração em App.tsx

```typescript
import { Sidebar } from './components/Sidebar'
import { Schedule } from './types'

export function App() {
  const [schedules, setSchedules] = useState<Schedule[]>([])

  const handleAddSchedule = (schedule: Schedule) => {
    setSchedules([...schedules, schedule])
  }

  return (
    <div className="app">
      <Sidebar onAddSchedule={handleAddSchedule} />
      {/* ScheduleList virá no próximo refinement */}
    </div>
  )
}
```

---

## 🧪 Testes

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Sidebar } from './index'

describe('Sidebar', () => {
  it('deve renderizar formulário corretamente', () => {
    const mockCallback = jest.fn()
    render(<Sidebar onAddSchedule={mockCallback} />)
    
    expect(screen.getByText('Agende um atendimento')).toBeInTheDocument()
    expect(screen.getByLabelText('Data')).toBeInTheDocument()
    expect(screen.getByLabelText('Horário')).toBeInTheDocument()
    expect(screen.getByLabelText('Nome do Cliente')).toBeInTheDocument()
  })

  it('deve mostrar erro quando campos vazios', () => {
    const mockCallback = jest.fn()
    render(<Sidebar onAddSchedule={mockCallback} />)
    
    const button = screen.getByText('Agendar')
    fireEvent.click(button)
    
    expect(screen.getByText('Preencha todos os campos')).toBeInTheDocument()
    expect(mockCallback).not.toHaveBeenCalled()
  })

  it('deve chamar callback com dados corretos', () => {
    const mockCallback = jest.fn()
    render(<Sidebar onAddSchedule={mockCallback} />)
    
    fireEvent.change(screen.getByLabelText('Data'), { target: { value: '2025-11-20' } })
    fireEvent.change(screen.getByLabelText('Horário'), { target: { value: '10:00' } })
    fireEvent.change(screen.getByLabelText('Nome do Cliente'), { target: { value: 'João Silva' } })
    
    fireEvent.click(screen.getByText('Agendar'))
    
    expect(mockCallback).toHaveBeenCalledWith(
      expect.objectContaining({
        date: '2025-11-20',
        time: '10:00',
        name: 'João Silva'
      })
    )
  })
})
```

---

## 🎯 Critérios de Aceitação

- [ ] Componente renderiza com todos os inputs
- [ ] Validação funciona (campos vazios)
- [ ] Validação de nome mínimo (3 caracteres)
- [ ] Callback é chamado com dados corretos
- [ ] Campos limpam após submissão
- [ ] Enter dispara submit
- [ ] Mensagem de erro aparece
- [ ] Estilos seguem Figma
- [ ] Responsivo em mobile

---

## 📝 Checklist de Desenvolvimento

### Estrutura
- [ ] Pasta `src/components/Sidebar/` criada
- [ ] `index.tsx` com component
- [ ] `sidebar.css` com estilos

### Funcionalidade
- [ ] Estados (date, time, name, error) funcionam
- [ ] Validação básica funciona
- [ ] Callback é disparado
- [ ] Campos limpam após submit

### Estilo
- [ ] Layout segue Figma
- [ ] Cores corretas
- [ ] Focus states funcionam
- [ ] Responsivo

### Integração
- [ ] Importado em App.tsx
- [ ] Props tipadas
- [ ] Callback conectado

---

## 🚀 Próximo Passo

Após completar este refinement, avance para:
**Refinement 02 - Estado e Gerenciamento**

---

🎓 **Dica**: Certifique-se de que os tipos estão corretos antes de seguir para o próximo refinement!

---

🙏 Feito com 💜 por Rocketseat  
📅 Refinement 01 - 20 de novembro de 2025
