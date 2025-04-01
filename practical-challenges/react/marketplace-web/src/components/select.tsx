import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { IconSvgElement } from 'node_modules/@hugeicons/react/dist/types/create-hugeicon-singleton'
import React, { useState } from 'react'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  icon?: IconSvgElement
  id: string
  options: {
    key: string
    value: string
  }[]
}

export function Select({ label, icon, id, options, ...props }: SelectProps) {
  const [selectedOption, setSelectedOption] = useState('')

  function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = e.target.value
    setSelectedOption(selectedValue)
  }
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
          onChange={handleOnChange}
          value={selectedOption}
          {...props}
        >
          {options.map((option) => (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          ))}
        </select>
        {selectedOption && (
          <div className="bg-shape flex h-6 w-6 items-center justify-center rounded-full p-1">
            <HugeiconsIcon
              icon={Cancel01Icon}
              className="cursor-pointer text-gray-300"
              onClick={() => setSelectedOption('')}
            />
          </div>
        )}
      </div>
    </>
  )
}
