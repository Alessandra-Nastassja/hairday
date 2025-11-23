import { UserRectangleIcon } from "@phosphor-icons/react";

export interface InputTextProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function InputText({ value, onChange, placeholder }: InputTextProps) {
  return (
    <div className="flex items-center border border-gray-500 gap-1 p-2 rounded-lg w-max">
      <UserRectangleIcon color="#B8952E" size={20} />
      <input className="text-gray-200" type="text" 
      value={value || ""} 
      onChange={(e) => onChange?.(e.target.value)} 
      placeholder={placeholder} />
    </div>
  )
}