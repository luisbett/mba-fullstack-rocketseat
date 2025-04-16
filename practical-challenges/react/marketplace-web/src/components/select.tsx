import { AlertCircleIcon, Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { IconSvgElement } from 'node_modules/@hugeicons/react/dist/types/create-hugeicon-singleton'
import React from 'react'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  icon?: IconSvgElement
  error?: string
  id: string
  options: {
    id: string
    title: string
    slug: string
  }[]
  selectedOption: string
  clearSelection: () => void
}

export function Select({
  label,
  icon,
  id,
  options,
  error,
  selectedOption,
  clearSelection,
  ...props
}: SelectProps) {
  return (
    <>
      {label && (
        <label className="group-focus-within:text-orange-base text-xs font-medium text-gray-300">
          {label.toLocaleUpperCase()}
        </label>
      )}
      <div className="flex items-center gap-2 border-b-1 border-gray-200 py-3.5">
        {icon && (
          <HugeiconsIcon
            icon={icon}
            className="group-focus-within:text-orange-base group-has-[input:not(:placeholder-shown)]:text-orange-base h-6 w-6 text-gray-200"
          />
        )}
        <select
          name={id}
          id={id}
          className="w-full flex-1 text-gray-300 outline-0"
          {...props}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
        {selectedOption && (
          <div className="bg-shape flex h-6 w-6 items-center justify-center rounded-full p-1">
            <HugeiconsIcon
              icon={Cancel01Icon}
              className="cursor-pointer text-gray-300"
              onClick={() => clearSelection()}
            />
          </div>
        )}
      </div>
      {error && (
        <div className="text-danger flex items-center gap-1 py-2">
          <HugeiconsIcon icon={AlertCircleIcon} className="h-4 w-4" />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </>
  )
}
