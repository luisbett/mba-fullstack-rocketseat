import { AlertCircleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  placeholder: string
  error?: string
}

export function TextArea({
  label,
  placeholder,
  error,
  ...props
}: TextAreaProps) {
  return (
    <>
      <label className="group-focus-within:text-orange-base text-xs font-medium text-gray-300">
        {label.toLocaleUpperCase()}
      </label>
      <div className="border-b-1 border-gray-200 py-3.5">
        <textarea
          placeholder={placeholder}
          className="w-full outline-0"
          {...props}
        />
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
