# Refinement 04 - Remover Agendamento

**Tempo Estimado**: 3-4 horas  
**Dificuldade**: ⭐⭐ Intermediário  
**Pré-requisitos**: Refinement 01, 02 e 03  

---

## 🎯 Objetivo

Implementar a funcionalidade de **remover agendamentos** com confirmação e feedback visual ao usuário.

> Nota de atualização: o projeto atualmente possui `ScheduleItem` e `ScheduleList` esperados em `src/components/ScheduleList/`.
> - A interface do agendamento utiliza `clientName` em vez de `name`.
> - O fluxo de deleção permanece o mesmo; o componente `ScheduleItem` pode usar `window.confirm()` ou um `ConfirmDialog` customizado.

---

## 📋 Requisitos

✅ Botão de lixeira em cada agendamento  
✅ Confirmação antes de deletar  
✅ Remover do estado (array)  
✅ Atualizar localStorage  
✅ Feedback visual  
✅ Sem erros no console  

---

## 🏗️ Arquitetura

### Fluxo de Remoção

```
Usuário clica lixeira
    ↓
Confirmação (dialog)
    ↓
Se "Sim" → handleDeleteSchedule(id)
    ↓
setSchedules(filter por id)
    ↓
localStorage atualiza automaticamente
    ↓
UI re-renderiza
```

---

## 💻 Código de Exemplo

### ScheduleItem com Delete

```typescript
// src/components/ScheduleList/ScheduleItem.tsx
import React from 'react'
import { Schedule, ScheduleItemProps } from '../../types'
import './schedulelist.css'

export const ScheduleItem: React.FC<ScheduleItemProps> = ({ schedule, onDelete }) => {
  const handleDelete = () => {
    // Confirmação com dialog nativo
    const confirmed = window.confirm(
      `Tem certeza que deseja remover o agendamento de ${schedule.name}?`
    )

    if (confirmed) {
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

### App.tsx com handleDeleteSchedule

```typescript
// src/App.tsx (seção relevante)
export function App() {
  const [schedules, setSchedules] = useState<Schedule[]>([])

  // ... outros hooks ...

  const handleDeleteSchedule = (id: string | number) => {
    // Criar novo array sem o agendamento
    const updated = schedules.filter(schedule => schedule.id !== id)
    
    // Atualizar estado
    setSchedules(updated)
    
    // localStorage atualiza automaticamente via useEffect
  }

  return (
    <div className="app">
      <Sidebar onAddSchedule={handleAddSchedule} />
      <ScheduleList 
        schedules={schedules}
        onDeleteSchedule={handleDeleteSchedule}
      />
    </div>
  )
}
```

---

## 🎨 Alternativa: Modal Customizado

Para uma UX melhor, você pode criar um modal em vez de usar `window.confirm()`:

```typescript
// src/components/ConfirmDialog/index.tsx
import React from 'react'
import './confirmdialog.css'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  isDangerous?: boolean
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  isDangerous = false
}) => {
  if (!isOpen) return null

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <h2>{title}</h2>
        <p>{message}</p>
        
        <div className="confirm-dialog-buttons">
          <button
            className="confirm-dialog-cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className={`confirm-dialog-confirm ${isDangerous ? 'dangerous' : ''}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
```

### CSS para ConfirmDialog

```css
.confirm-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.confirm-dialog {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.confirm-dialog h2 {
  margin: 0 0 12px;
  font-size: 18px;
  color: #333;
}

.confirm-dialog p {
  margin: 0 0 24px;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.confirm-dialog-buttons {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.confirm-dialog-cancel,
.confirm-dialog-confirm {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.confirm-dialog-cancel {
  background-color: #e0e0e0;
  color: #333;
}

.confirm-dialog-cancel:hover {
  background-color: #d0d0d0;
}

.confirm-dialog-confirm {
  background-color: #b8952e;
  color: white;
}

.confirm-dialog-confirm:hover {
  background-color: #a0823a;
}

.confirm-dialog-confirm.dangerous {
  background-color: #e74c3c;
}

.confirm-dialog-confirm.dangerous:hover {
  background-color: #c0392b;
}
```

### Usar Modal em ScheduleItem

```typescript
// Versão com modal
const [showConfirm, setShowConfirm] = useState(false)

const handleDelete = () => {
  setShowConfirm(true)
}

const handleConfirmDelete = () => {
  onDelete(schedule.id)
  setShowConfirm(false)
}

return (
  <>
    <div className="schedule-item">
      {/* ... conteúdo ... */}
      <button onClick={handleDelete} className="delete-button">
        🗑️
      </button>
    </div>
    
    <ConfirmDialog
      isOpen={showConfirm}
      title="Remover agendamento?"
      message={`Você tem certeza que deseja remover o agendamento de ${schedule.name}?`}
      confirmText="Remover"
      cancelText="Cancelar"
      onConfirm={handleConfirmDelete}
      onCancel={() => setShowConfirm(false)}
      isDangerous
    />
  </>
)
```

---

## 🧪 Testes

```typescript
// src/__tests__/delete.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { App } from '../App'

describe('Delete Schedule', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('deve exibir confirmação ao clicar delete', async () => {
    render(<App />)

    // Adicionar agendamento
    fireEvent.change(screen.getByLabelText('Data'), { 
      target: { value: '2025-11-20' } 
    })
    fireEvent.change(screen.getByLabelText('Horário'), { 
      target: { value: '10:00' } 
    })
    fireEvent.change(screen.getByLabelText('Nome do Cliente'), { 
      target: { value: 'João' } 
    })
    fireEvent.click(screen.getByText('Agendar'))

    // Esperar agendamento aparecer
    await waitFor(() => {
      expect(screen.getByText('João')).toBeInTheDocument()
    })

    // Clicar delete - mock confirm
    window.confirm = jest.fn(() => true)
    const deleteButton = screen.getByLabelText('Deletar agendamento de João')
    fireEvent.click(deleteButton)

    // Verificar se confirm foi chamado
    expect(window.confirm).toHaveBeenCalled()
  })

  it('deve remover agendamento quando confirmado', async () => {
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

    // Mock confirm como true
    window.confirm = jest.fn(() => true)

    // Deletar
    const deleteButton = screen.getByLabelText('Deletar agendamento de Maria')
    fireEvent.click(deleteButton)

    // Verificar se foi removido
    await waitFor(() => {
      expect(screen.queryByText('Maria')).not.toBeInTheDocument()
    })
  })

  it('não deve remover se usuário cancelar', async () => {
    render(<App />)

    // Adicionar
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

    // Mock confirm como false
    window.confirm = jest.fn(() => false)

    // Tentar deletar
    const deleteButton = screen.getByLabelText('Deletar agendamento de Pedro')
    fireEvent.click(deleteButton)

    // Verificar que NOT foi removido
    expect(screen.getByText('Pedro')).toBeInTheDocument()
  })

  it('deve atualizar localStorage ao deletar', async () => {
    const { unmount } = render(<App />)

    // Adicionar
    fireEvent.change(screen.getByLabelText('Data'), { 
      target: { value: '2025-11-20' } 
    })
    fireEvent.change(screen.getByLabelText('Horário'), { 
      target: { value: '10:00' } 
    })
    fireEvent.change(screen.getByLabelText('Nome do Cliente'), { 
      target: { value: 'Ana' } 
    })
    fireEvent.click(screen.getByText('Agendar'))

    await waitFor(() => {
      expect(screen.getByText('Ana')).toBeInTheDocument()
    })

    // Deletar
    window.confirm = jest.fn(() => true)
    const deleteButton = screen.getByLabelText('Deletar agendamento de Ana')
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(screen.queryByText('Ana')).not.toBeInTheDocument()
    })

    // Desmontar
    unmount()

    // Remontar e verificar
    render(<App />)
    
    // Não deve ter agendamento
    expect(screen.queryByText('Ana')).not.toBeInTheDocument()
  })
})
```

---

## 🎯 Critérios de Aceitação

- [ ] Botão de lixeira aparece em cada agendamento
- [ ] Confirmação é solicitada antes de deletar
- [ ] Agendamento é removido quando confirmado
- [ ] Agendamento NÃO é removido se cancelado
- [ ] localStorage atualiza automaticamente
- [ ] UI atualiza imediatamente após delete
- [ ] Nenhum console.error
- [ ] Mensagem de confirmação clara

---

## 📝 Checklist de Desenvolvimento

### Funcionalidade
- [ ] handleDeleteSchedule implementado em App.tsx
- [ ] Callback passado para ScheduleList
- [ ] ScheduleItem dispara callback
- [ ] Confirmação funciona

### Testes
- [ ] Confirmação é exibida
- [ ] Delete remove agendamento
- [ ] Cancelar mantém agendamento
- [ ] localStorage atualiza

### UX
- [ ] Mensagem de confirmação clara
- [ ] Botão visível e acessível
- [ ] Feedback visual do botão
- [ ] Aria-labels corretos

---

## 🚀 Próximo Passo

Após completar este refinement, avance para:
**Refinement 05 - Estilo e Polish**

---

💡 **Dica**: Use `window.confirm()` para começar, depois melhore com modal customizado!

---

🙏 Feito com 💜 por Rocketseat  
📅 Refinement 04 - 20 de novembro de 2025
