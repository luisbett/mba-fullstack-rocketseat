export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  placeholder: string
}

export function TextArea({ label, placeholder, ...props }: TextAreaProps) {
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
    </>
  )
}
