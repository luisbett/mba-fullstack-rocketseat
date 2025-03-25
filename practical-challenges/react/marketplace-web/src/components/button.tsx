import clsx from 'clsx'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'big'
  centralized?: boolean
}

export function Button({
  variant = 'primary',
  size = 'big',
  type = 'button',
  centralized = false,
  ...props
}: ButtonProps) {
  const baseStyles = `flex cursor-pointer items-center gap-2 rounded-[10px] px-4 py-3 font-medium transition-transform duration-100 hover:scale-95 ${centralized && 'justify-center'}`

  const variantStyles = {
    primary: 'bg-orange-base text-white',
    secondary: 'bg-transparent text-orange-base border-orange-base border',
  }

  const variantSizes = {
    small: 'h-10 text-sm',
    medium: 'h-12',
    big: 'h-14',
  }
  return (
    <button
      type={type}
      className={clsx(baseStyles, variantStyles[variant], variantSizes[size])}
      {...props}
    >
      {props.children}
    </button>
  )
}
