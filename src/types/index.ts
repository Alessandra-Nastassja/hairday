export interface Schedule {
  id: string | number
  date: string    // YYYY-MM-DD
  time: string    // HH:mm
  clientName: string
}

export interface SidebarProps {
  onAddSchedule: (schedule: Schedule) => void
}

export interface HorarioPeriodo {
  periodo: 'Manhã' | 'Tarde' | 'Noite'
  horarios: string[]
}