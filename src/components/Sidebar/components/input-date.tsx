import { CalendarBlankIcon, CaretDownIcon } from "@phosphor-icons/react";

export interface InputDateProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function InputDate({value, onChange}: InputDateProps) {
  return (
    <div className="flex items-center border border-gray-500 gap-1 p-2 rounded-lg w-max">
      <CalendarBlankIcon color="#B8952E" size={20} />
      <input className="text-gray-100" type="date" value={value || ""} onChange={(e) => onChange?.(e.target.value)} />
      <CaretDownIcon color="#98959D" size={20} />
    </div>
  )
}