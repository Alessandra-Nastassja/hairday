import { SunHorizonIcon, TrashIcon } from "@phosphor-icons/react";

export default function ScheduleList() {
  return (
    <section className='content-agenda'>
      <header>
        <h2 className="text-gray-100 font-bold text-3xl leading-8">Sua Agenda</h2>
        <p className="text-gray-300">Consulte os seus cortes de cabelo agendados por dia</p>
        <input type="date" />
      </header>

      <article className="border border-gray-600 rounded-lg overflow-hidden mt-4">
        <div className="flex items-center justify-between px-4 py-3 bg-transparent border-b border-gray-700">
          <div className="flex items-center gap-3">
            <SunHorizonIcon color="#846F2E" size={20} />
            <p className="text-gray-300">Manhã</p>
          </div>
          <p className="text-gray-400 text-sm">09h-12h</p>
        </div>

        <div className="flex items-center justify-between px-4 py-4 bg-transparent">
          <div className="flex items-center gap-6">
            <p className="text-gray-200 font-bold">11:00</p>
            <p className="text-gray-200">Alessandra Nastassja</p>
          </div>

          <button aria-label="Deletar agendamento" className="text-[#846F2E] hover:text-yellow-500 focus:outline-none">
            <TrashIcon color="#846F2E" size={20} />
          </button>
        </div>
      </article>
    </section>
  )
}