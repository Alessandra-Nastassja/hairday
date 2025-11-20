import { CalendarBlankIcon, CaretDownIcon } from "@phosphor-icons/react";

export default function InputDate() {
  return (
    <div className="flex items-center border border-gray-500 gap-1 p-2 rounded-lg w-max">
      <CalendarBlankIcon color="#B8952E" size={20} />
      <input className="text-gray-100" type="date" />
      <CaretDownIcon color="#98959D" size={20} />
    </div>
  )
}