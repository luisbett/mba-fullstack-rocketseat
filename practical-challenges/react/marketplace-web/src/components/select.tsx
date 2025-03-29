export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
}

export function Select({ label, ...props }: SelectProps) {
  return (
    <>
      <label className="group-focus-within:text-orange-base text-xs font-medium text-gray-300">
        {label.toLocaleUpperCase()}
      </label>
      <div className="border-b-1 border-gray-200 py-3.5">
        <select
          name="category"
          id="category"
          className="w-full text-gray-300 outline-0"
          {...props}
        >
          <option value="">Selecione</option>
          <option value="toy">Brinquedo</option>
          <option value="furniture">Móvel</option>
          <option value="stationary">Papelaria</option>
          <option value="health">Saúde & Beleza</option>
          <option value="utensil">Utensílio</option>
          <option value="clothing">Vestuário</option>
        </select>
      </div>
    </>
  )
}
