import Agenda from "./components/agenda";

export default function ScheduleList() {
  return (
    <section className='content-agenda'>
      <header>
        <h2 className="text-gray-100 font-bold text-3xl leading-8">Sua Agenda</h2>
        <p className="text-gray-300">Consulte os seus cortes de cabelo agendados por dia</p>
        <input type="date" />
      </header>

      <Agenda />
    </section>
  )
}