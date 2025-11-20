import { UserRectangleIcon } from "@phosphor-icons/react";

export default function InputText() {
  return (
    <div className="flex items-center border border-gray-500 gap-1 p-2 rounded-lg w-max">
      <UserRectangleIcon color="#B8952E" size={20} />
      <input className="text-gray-200" type="text" value="Helena Souza" />
    </div>
  )
}