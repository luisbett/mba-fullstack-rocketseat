import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { IconSvgElement } from 'node_modules/@hugeicons/react/dist/types/create-hugeicon-singleton'
import { useState } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  type: string
  placeholder: string
  icon?: IconSvgElement
}

export function Input({
  label,
  type,
  placeholder,
  icon,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <label className="group-focus-within:text-orange-base text-xs font-medium text-gray-300">
        {label.toLocaleUpperCase()}
      </label>
      <div className="flex gap-2 border-b-1 border-gray-200 py-3.5">
        {icon && (
          <HugeiconsIcon
            icon={icon}
            className="group-focus-within:text-orange-base group-has-[input:not(:placeholder-shown)]:text-orange-base h-6 w-6 text-gray-200"
          />
        )}
        <input
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          className="caret-orange-base w-full outline-0 focus:placeholder:text-transparent"
          {...props}
        />
        {type === 'password' && (
          <HugeiconsIcon
            icon={showPassword ? ViewOffIcon : ViewIcon}
            onClick={() => setShowPassword((state) => !state)}
            className="h-6 w-6 cursor-pointer text-gray-300"
          />
        )}
      </div>
    </>
  )
}
