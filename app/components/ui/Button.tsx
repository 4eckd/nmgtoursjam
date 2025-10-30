import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
}

/**
 * Button Component
 *
 * A reusable button component using CSS variables for consistent theming.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Book Now</Button>
 * <Button variant="secondary" isLoading>Loading...</Button>
 * <Button variant="ghost" size="sm">Cancel</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles - consistent across all variants
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors duration-200 border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

    // Variant styles using CSS variables
    const variantStyles = {
      primary: 'bg-primary hover:bg-primary-hover active:bg-primary-active text-content-on-primary',
      secondary: 'border-2 border-primary text-primary hover:bg-primary hover:text-content-on-primary',
      ghost: 'bg-transparent text-content-primary hover:bg-surface-elevated',
      danger: 'bg-error hover:bg-error/90 text-content-primary',
    }

    // Size styles
    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    // Full width style
    const widthStyle = fullWidth ? 'w-full' : ''

    // Combine all styles
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`.trim()

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
