import { SunHorizonIcon } from "@phosphor-icons/react";

export default function ScheduleList() {
  return (
    <section className='content-agenda'>
      <header>
        <h2 className="text-gray-100 font-bold text-3xl leading-8">Sua Agenda</h2>
        <p className="text-gray-300">Consulte os seus cortes de cabelo agendados por dia</p>
        <input type="date" />
      </header>

      <article>
        <div className="flex flex-row justify-between items-center mb-4 border border-gray-600 rounded-lg p-4">
          <div className="flex flex-row items-center gap-2">
            <SunHorizonIcon color="#846F2E" size={20} />
            <p className="text-gray-300">Manhã</p>
          </div>
          <p className="text-gray-400">09h-12h</p>
        </div>
      </article>

    </section>
  )
}