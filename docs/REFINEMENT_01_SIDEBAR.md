# Refinement 01 - Componente Sidebar

**Tempo Estimado**: 3-4 horas  
**Dificuldade**: ⭐⭐ Intermediário  
**Pré-requisitos**: Fase 1 (Types, componentes base e design system)  

---

## 🎯 Objetivo

Criar o componente `Sidebar` que funciona como o **formulário de entrada** para adicionar novos agendamentos, com organização de horários por período (Manhã, Tarde, Noite).

---

## 📋 Requisitos

O componente Sidebar deve ter:

✅ Input para data com ícone de calendário  
✅ Seleção de horários organizados por período (Manhã, Tarde, Noite)  
✅ Botões de horário com estado selecionado  
✅ Input para nome do cliente com ícone de usuário  
✅ Botão "Agendar" em destaque (amarelo)  
✅ Estados visuais (hover, selected, disabled)  
✅ Validação básica de formulário  
✅ Callback para quando agendamento é criado  
✅ Tipagem TypeScript forte com CVA (Class Variance Authority)

---

## 🏗️ Arquitetura

### Estrutura de Pastas
```
src/components/Sidebar/
├── sidebar.tsx              // Componente principal
└── components/
    ├── button-default.tsx   // Botão "Agendar"
    ├── button-time.tsx      // Botão de horário
    ├── input-date.tsx       // Input de data
    └── input-text.tsx       // Input de cliente
```

---

## 💻 Código de Implementação

### Types (em `src/types/index.ts`)

```typescript
export interface Schedule {
  id: string | number
  date: string    // YYYY-MM-DD
  time: string    // HH:mm
  clientName: string
}

export interface SidebarProps {
  onAddSchedule: (schedule: Schedule) => void
}

// Estrutura de horários por período
export interface HorarioPeriodo {
  periodo: 'Manhã' | 'Tarde' | 'Noite'
  horarios: string[]
}
```

---

### 1️⃣ ButtonDefault Component

```tsx
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva("font-sans text-gray-400", {
  variants: {
    intent: {
      "default": "rounded-lg text-gray-900 text-md text-center p-3",
    },
    variant: {
      "default": "bg-yellow",
      "hover": "bg-yellow/80 hover:bg-yellow-light transition-colors",
      "disabled": "bg-yellow-dark cursor-not-allowed",
    }
  },
  defaultVariants: {
    variant: "default", 
    intent: "default"
  }
})

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode; 
  value?: string;
}

export default function ButtonDefault({
  as = 'button', 
  variant,
  className, 
  children, 
  value,
  ...props
}: ButtonProps) {
  return React.createElement(
    as, 
    {
      className: buttonVariants({ variant, className }),
      ...props
    },
    children,
  )
}
```

---

### 2️⃣ ButtonTime Component

Botão para seleção de horário com estado `selected` quando clicado.

```tsx
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva("font-sans text-gray-400", {
  variants: {
    intent: {
      "default": "rounded-lg text-base text-md text-center p-2 w-20",
    },
    variant: {
      "default": "text-gray-100 bg-gray-600",
      "hover": "text-gray-100 bg-gray-600 hover:bg-gray-500 transition-colors",
      "selected": "text-yellow bg-gray-600 border border-b-yellow",
      disabled: "text-gray-500 bg-gray-700 border border-gray-600 cursor-not-allowed",
    }
  },
  defaultVariants: {
    variant: "default", 
    intent: "default"
  }
})

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode; 
  value?: string;
  disabled?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function ButtonTime({
  as = 'button', 
  variant = "default",
  className, 
  children,
  isSelected = false,
  disabled = false,
  ...props
}: ButtonProps) {
  // Determinar variante baseado no estado
  const finalVariant = isSelected ? "selected" : disabled ? "disabled" : "default";

  return React.createElement(
    as, 
    {
      className: buttonVariants({ variant: finalVariant, className }),
      disabled,
      ...props
    },
    children,
  )
}
```

---

### 3️⃣ InputDate Component

Input de data com ícone de calendário.

```tsx
import { CalendarBlankIcon, CaretDownIcon } from "@phosphor-icons/react";

interface InputDateProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function InputDate({ value, onChange }: InputDateProps) {
  return (
    <div className="flex items-center border border-gray-500 gap-1 p-2 rounded-lg w-max">
      <CalendarBlankIcon color="#B8952E" size={20} />
      <input 
        className="text-gray-100 bg-transparent outline-none" 
        type="date"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <CaretDownIcon color="#98959D" size={20} />
    </div>
  )
}
```

---

### 4️⃣ InputText Component

Input de nome do cliente com ícone de usuário.

```tsx
import { UserRectangleIcon } from "@phosphor-icons/react";

interface InputTextProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function InputText({ 
  value, 
  onChange, 
  placeholder = "Digite o nome..." 
}: InputTextProps) {
  return (
    <div className="flex items-center border border-gray-500 gap-1 p-2 rounded-lg w-full">
      <UserRectangleIcon color="#B8952E" size={20} />
      <input 
        className="text-gray-200 bg-transparent outline-none flex-1" 
        type="text" 
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
```

---

### 5️⃣ Sidebar Component Principal

```tsx
import { useState } from 'react'
import Text from '../text'
import ButtonDefault from './components/button-default'
import ButtonTime from './components/button-time'
import InputDate from './components/input-date'
import InputText from './components/input-text'
import { Schedule, HorarioPeriodo } from '../../types'

interface SidebarProps {
  onAddSchedule?: (schedule: Schedule) => void
}

export default function Sidebar({ onAddSchedule }: SidebarProps) {
  // Estado do formulário
  const [date, setDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [clientName, setClientName] = useState<string>('')
  const [error, setError] = useState<string>('')

  // Dados de horários
  const horariosPeriodo: HorarioPeriodo[] = [
    {
      periodo: 'Manhã',
      horarios: ['09:00', '10:00', '11:00', '12:00']
    },
    {
      periodo: 'Tarde',
      horarios: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
    },
    {
      periodo: 'Noite',
      horarios: ['19:00', '20:00', '21:00', '22:00']
    }
  ]

  // Validação
  const isFormValid = () => {
    if (!date || !selectedTime || !clientName.trim()) {
      setError('Preencha todos os campos')
      return false
    }

    if (clientName.trim().length < 3) {
      setError('Nome deve ter pelo menos 3 caracteres')
      return false
    }

    return true
  }

  // Submeter agendamento
  const handleAddSchedule = () => {
    setError('')

    if (!isFormValid()) return

    const newSchedule: Schedule = {
      id: Date.now(),
      date,
      time: selectedTime,
      clientName: clientName.trim()
    }

    onAddSchedule?.(newSchedule)

    // Limpar formulário
    setDate('')
    setSelectedTime('')
    setClientName('')
  }

  return (
    <article className='content-schedule' style={{ width: '36%' }}>
      {/* Cabeçalho */}
      <div className='mb-6'>
        <h1 className='text-gray-100 font-bold text-3xl'>Agende um atendimento</h1>
        <p className='text-gray-300 text-sm'>
          Selecione data, horário e informe o nome do cliente para criar o agendamento
        </p>
      </div>

      {/* Input de Data */}
      <div className='flex flex-col'>
        <Text variant="body-md-bold">Data</Text>
        <InputDate 
          value={date}
          onChange={setDate}
        />
      </div>

      {/* Seleção de Horários */}
      <div className='flex flex-col mt-6'>
        <Text variant="body-md-bold">Horários</Text>
        
        {horariosPeriodo.map((item) => (
          <div key={item.periodo}>
            <label className='text-gray-300 leading-6'>{item.periodo}</label>

            <div className='content-buttons-time flex flex-wrap gap-2 mb-4'>
              {item.horarios.map((horario) => (
                <ButtonTime 
                  key={horario}
                  isSelected={selectedTime === horario}
                  onClick={() => setSelectedTime(horario)}
                >
                  {horario}
                </ButtonTime>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Input de Cliente */}
      <div className='flex flex-col mt-6'>
        <Text variant="body-md-bold">Cliente</Text>
        <InputText 
          value={clientName}
          onChange={setClientName}
        />
      </div>

      {/* Mensagem de Erro */}
      {error && (
        <p className='text-red-500 text-sm mt-4'>{error}</p>
      )}

      {/* Botão Agendar */}
      <ButtonDefault 
        className='w-full mt-4'
        onClick={handleAddSchedule}
      >
        Agendar
      </ButtonDefault>
    </article>
  )
}
```

---

## 🔗 Integração em App.tsx

```typescript
import { useState } from 'react'
import Sidebar from './components/Sidebar/sidebar'
import { Schedule } from './types'

function App() {
  const [schedules, setSchedules] = useState<Schedule[]>([])

  const handleAddSchedule = (schedule: Schedule) => {
    setSchedules(prev => [...prev, schedule])
    console.log('Novo agendamento:', schedule)
  }

  return (
    <div className="flex gap-6 p-6 bg-gray-900 min-h-screen">
      <Sidebar onAddSchedule={handleAddSchedule} />
      {/* ScheduleList virá no próximo refinement */}
    </div>
  )
}

export default App
```

---

## 🎨 Paleta de Cores (Tailwind)

Cores utilizadas no componente:

```typescript
// Gray Scale
text-gray-100   // Titles (branco/claro)
text-gray-200   // Inputs
text-gray-300   // Labels
text-gray-400   // Default
text-gray-500   // Disabled
text-gray-600   // Button Time (default)
bg-gray-600     // Button Time background
bg-gray-700     // Button Time disabled
text-gray-900   // Button text

// Yellow (Accent)
bg-yellow       // Button Agendar
text-yellow     // Button Time selected
#B8952E         // Icon color (decimal: 184, 149, 46)

// Structure
bg-gray-900     // Main background
border-gray-500 // Input border
rounded-lg      // Border radius
```

---

## 🧪 Testes

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import Sidebar from './sidebar'

describe('Sidebar Component', () => {
  it('deve renderizar o formulário completo', () => {
    render(<Sidebar />)
    
    expect(screen.getByText('Agende um atendimento')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()
    expect(screen.getByText('Horários')).toBeInTheDocument()
    expect(screen.getByText('Manhã')).toBeInTheDocument()
    expect(screen.getByText('Tarde')).toBeInTheDocument()
    expect(screen.getByText('Noite')).toBeInTheDocument()
    expect(screen.getByText('Cliente')).toBeInTheDocument()
    expect(screen.getByText('Agendar')).toBeInTheDocument()
  })

  it('deve exibir erro quando tentar agendar sem preencher campos', () => {
    render(<Sidebar />)
    
    const botaoAgendar = screen.getByText('Agendar')
    fireEvent.click(botaoAgendar)
    
    expect(screen.getByText('Preencha todos os campos')).toBeInTheDocument()
  })

  it('deve exibir erro quando nome tem menos de 3 caracteres', () => {
    const { container } = render(<Sidebar />)
    
    const inputDate = container.querySelector('input[type="date"]') as HTMLInputElement
    const inputText = container.querySelector('input[type="text"]') as HTMLInputElement
    const botaoHorario = screen.getByText('09:00') as HTMLButtonElement
    
    fireEvent.change(inputDate, { target: { value: '2025-11-20' } })
    fireEvent.click(botaoHorario)
    fireEvent.change(inputText, { target: { value: 'Jo' } })
    
    const botaoAgendar = screen.getByText('Agendar')
    fireEvent.click(botaoAgendar)
    
    expect(screen.getByText('Nome deve ter pelo menos 3 caracteres')).toBeInTheDocument()
  })

  it('deve chamar callback quando agendamento é válido', () => {
    const mockCallback = jest.fn()
    const { container } = render(<Sidebar onAddSchedule={mockCallback} />)
    
    const inputDate = container.querySelector('input[type="date"]') as HTMLInputElement
    const inputText = container.querySelector('input[type="text"]') as HTMLInputElement
    const botaoHorario = screen.getByText('09:00') as HTMLButtonElement
    
    fireEvent.change(inputDate, { target: { value: '2025-11-20' } })
    fireEvent.click(botaoHorario)
    fireEvent.change(inputText, { target: { value: 'Helena Souza' } })
    
    const botaoAgendar = screen.getByText('Agendar')
    fireEvent.click(botaoAgendar)
    
    expect(mockCallback).toHaveBeenCalledWith(
      expect.objectContaining({
        date: '2025-11-20',
        time: '09:00',
        clientName: 'Helena Souza'
      })
    )
  })

  it('deve selecionar e desselecionar horário ao clicar', () => {
    render(<Sidebar />)
    
    const botaoHorario = screen.getByText('09:00') as HTMLButtonElement
    
    // Inicialmente não está selecionado
    expect(botaoHorario).not.toHaveClass('border-b-yellow')
    
    // Clica para selecionar
    fireEvent.click(botaoHorario)
    expect(botaoHorario).toHaveClass('border-b-yellow')
    
    // Clica em outro horário
    const botaoHorario2 = screen.getByText('10:00') as HTMLButtonElement
    fireEvent.click(botaoHorario2)
    
    expect(botaoHorario).not.toHaveClass('border-b-yellow')
    expect(botaoHorario2).toHaveClass('border-b-yellow')
  })

  it('deve limpar formulário após agendamento bem-sucedido', () => {
    const { container } = render(<Sidebar onAddSchedule={() => {}} />)
    
    const inputDate = container.querySelector('input[type="date"]') as HTMLInputElement
    const inputText = container.querySelector('input[type="text"]') as HTMLInputElement
    const botaoHorario = screen.getByText('09:00') as HTMLButtonElement
    
    fireEvent.change(inputDate, { target: { value: '2025-11-20' } })
    fireEvent.click(botaoHorario)
    fireEvent.change(inputText, { target: { value: 'Helena Souza' } })
    
    expect(inputDate.value).toBe('2025-11-20')
    expect(inputText.value).toBe('Helena Souza')
    
    fireEvent.click(screen.getByText('Agendar'))
    
    // Verifica se campos foram limpos
    expect(inputDate.value).toBe('')
    expect(inputText.value).toBe('')
  })
})
```

---

## 🎯 Critérios de Aceitação

### Renderização
- [ ] Componente renderiza com layout correto (36% de largura)
- [ ] Título e descrição aparecem
- [ ] Input de data com ícone de calendário
- [ ] Botões de horário organizados por período (Manhã, Tarde, Noite)
- [ ] Input de cliente com ícone de usuário
- [ ] Botão "Agendar" em amarelo

### Funcionalidade de Horários
- [ ] Horários renderizam em 3 períodos
- [ ] Ao clicar em um horário, ele fica selecionado (classe `selected`)
- [ ] Ao clicar em outro horário, o anterior é deselecionado
- [ ] Apenas um horário fica selecionado por vez
- [ ] Horário selecionado tem borda amarela

### Validação
- [ ] Erro aparece quando tenta agendar sem data
- [ ] Erro aparece quando tenta agendar sem horário
- [ ] Erro aparece quando tenta agendar sem nome de cliente
- [ ] Erro aparece quando nome tem menos de 3 caracteres
- [ ] Erro desaparece ao preencher corretamente

### Lógica de Agendamento
- [ ] Callback é chamado com `Schedule` correto
- [ ] Schedule contém: `id`, `date`, `time`, `clientName`
- [ ] Após agendamento bem-sucedido, campos são limpos
- [ ] Data fica vazia
- [ ] Horário fica deselecionado
- [ ] Nome do cliente fica vazio
- [ ] Mensagem de erro desaparece

### Estilos
- [ ] Cores seguem design (amarelo, cinza)
- [ ] Estados visuais funcionam (hover, focus, selected)
- [ ] Ícones aparecem com cor correta (#B8952E)
- [ ] Layout responsivo em mobile
- [ ] Inputs têm `outline-none` e `bg-transparent`

### Tipagem
- [ ] Component exportado com tipagem correta
- [ ] Props interface define `onAddSchedule`
- [ ] Schedule interface tem todos os campos
- [ ] Sem erros de TypeScript

---

## 📝 Checklist de Desenvolvimento

### Estrutura
- [ ] Pasta `src/components/Sidebar/` existe
- [ ] `sidebar.tsx` criado
- [ ] `components/button-default.tsx` criado
- [ ] `components/button-time.tsx` criado
- [ ] `components/input-date.tsx` criado
- [ ] `components/input-text.tsx` criado

### Funcionalidade
- [ ] Estados (date, selectedTime, clientName, error) funcionam
- [ ] Validação básica funciona
- [ ] Callback é disparado com dados corretos
- [ ] Campos limpam após submit
- [ ] Apenas um horário pode ser selecionado

### Integração
- [ ] Importado em App.tsx
- [ ] Props tipadas corretamente
- [ ] Callback conectado
- [ ] Component renderiza sem erros

### Teste
- [ ] Testes passam (renderização)
- [ ] Testes passam (validação)
- [ ] Testes passam (callback)
- [ ] Testes passam (seleção de horário)
- [ ] Testes passam (limpeza de formulário)

---

## 🚀 Próximo Passo

Após completar este refinement, avance para:
**Refinement 02 - Estado e Gerenciamento de Agendamentos**

---

## 📐 Paleta de Cores Tailwind

| Elemento | Classe | HEX |
|----------|--------|-----|
| Título | `text-gray-100` | #F3F4F6 |
| Label | `text-gray-300` | #D1D5DB |
| Borda Input | `border-gray-500` | #6B7280 |
| Botão Horário (default) | `bg-gray-600` | #4B5563 |
| Botão Horário (selected) | `text-yellow` | #D4A574 |
| Botão Agendar | `bg-yellow` | #D4A574 |
| Fundo Geral | `bg-gray-900` | #111827 |
| Ícones | Inline color | #B8952E |

---

## 🔗 Dependências

- ✅ React 18+
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ class-variance-authority (CVA)
- ✅ @phosphor-icons/react

Instalar se necessário:
```bash
pnpm add class-variance-authority @phosphor-icons/react
```

---

🎓 **Dicas Importantes**:
1. Use CVA (Class Variance Authority) para gerenciar variantes de componentes
2. Mantenha os inputs com `bg-transparent` para melhor integração
3. Sempre use `outline-none` em inputs focados no Tailwind
4. Estados do ButtonTime devem ser gerenciados pelo Sidebar pai
5. Limpe sempre o `error` junto com os campos

---

🙏 Feito com 💜 pela comunidade HairDay  
📅 Refinement 01 - 20 de novembro de 2025
