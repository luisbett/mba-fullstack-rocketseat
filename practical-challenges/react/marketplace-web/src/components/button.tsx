import clsx from 'clsx'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'big'
  centralized?: boolean
  disabled?: boolean
}

export function Button({
  variant = 'primary',
  size = 'big',
  type = 'button',
  centralized = false,
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = `flex cursor-pointer w-full items-center gap-2 rounded-[10px] px-4 py-3 font-medium transition-transform duration-100 hover:scale-95 ${centralized && 'justify-center'}`

  const variantStyles = {
    primary: 'bg-orange-base text-white disabled:bg-orange-dark/50',
    secondary:
      'bg-transparent text-orange-base border-orange-base border disabled:text-orange-base/50 disabled:border-orange-base/50',
  }

  const variantSizes = {
    small: 'h-10 text-sm',
    medium: 'h-12',
    big: 'h-14',
  }
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(baseStyles, variantStyles[variant], variantSizes[size])}
      {...props}
    >
      {props.children}
    </button>
  )
}
