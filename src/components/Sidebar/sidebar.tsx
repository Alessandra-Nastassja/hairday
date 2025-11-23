import Text from '../text'
import ButtonDefault from './components/button-default'
import ButtonTime from './components/button-time'
import InputDate from './components/input-date'
import InputText from './components/input-text'

export default function Sidebar() {
  const horariosPeriodo = [
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
  ];

  return (
    <article className='content-schedule' style={{ width: '36%' }}>
      <div className='mb-6'>
        <h1 className='text-gray-100 font-bold text-3xl leading-8'>Agende um atendimento</h1>
        <p className='text-gray-300 text-sm'>Selecione data, horário e informe o nome do cliente para criar o agendamento</p>
      </div>

      <div className='flex flex-col gap-2'>
        <Text variant="body-md-bold">Data</Text>
        <InputDate />
      </div>

      <div className='flex flex-col mt-6'>
        <Text variant="body-md-bold">Horários</Text>
        
        {horariosPeriodo.map((item) => (
          <div className='mt-2' key={item.periodo}>
            <label className='text-gray-300 leading-6'>{item.periodo}</label>

            <div className='content-buttons-time mt-2'>
              {item.horarios.map((horario, idx) => (
                <ButtonTime style={idx >= 0 ? { marginRight: '8px', ...(idx >= 4 ? { marginTop: '8px' } : {}) } : {}} key={horario}>
                  {horario}
                </ButtonTime>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-col mt-6 gap-2'>
        <Text variant="body-md-bold">Cliente</Text>
        <InputText />
      </div>

      <ButtonDefault className='mt-4'>Agendar</ButtonDefault>
    </article>
  )
}