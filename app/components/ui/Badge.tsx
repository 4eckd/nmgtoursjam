import { HTMLAttributes } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'difficulty' | 'category' | 'featured' | 'success' | 'warning' | 'error' | 'info'
  difficulty?: 'EASY' | 'MODERATE' | 'CHALLENGING' | 'EXTREME'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Badge Component
 *
 * A versatile badge component for displaying difficulty levels, categories, and status indicators.
 * Uses CSS variables for consistent theming.
 *
 * @example
 * ```tsx
 * <Badge variant="difficulty" difficulty="EASY">Easy</Badge>
 * <Badge variant="category">Rafting Tours</Badge>
 * <Badge variant="featured">Featured</Badge>
 * <Badge variant="success">Confirmed</Badge>
 * ```
 */
export default function Badge({
  variant = 'category',
  difficulty,
  size = 'md',
  className = '',
  children,
  ...props
}: BadgeProps) {
  // Base styles
  const baseStyles = 'inline-block font-semibold rounded-full'

  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  }

  // Difficulty badge styles using CSS variables
  const difficultyStyles = {
    EASY: 'bg-difficulty-easy-bg text-difficulty-easy',
    MODERATE: 'bg-difficulty-moderate-bg text-difficulty-moderate',
    CHALLENGING: 'bg-difficulty-challenging-bg text-difficulty-challenging',
    EXTREME: 'bg-difficulty-extreme-bg text-difficulty-extreme',
  }

  // Get variant styles
  const getVariantStyles = () => {
    if (variant === 'difficulty' && difficulty) {
      return difficultyStyles[difficulty]
    }

    const variantStylesMap = {
      difficulty: '', // Handled above
      category: 'bg-surface-card backdrop-blur-sm text-content-primary border border-border-primary',
      featured: 'bg-primary hover:bg-primary-hover text-content-on-primary uppercase font-bold',
      success: 'bg-success-bg text-success border border-success/30',
      warning: 'bg-warning-bg text-warning border border-warning/30',
      error: 'bg-error-bg text-error border border-error/30',
      info: 'bg-info-bg text-info border border-info/30',
    }

    return variantStylesMap[variant]
  }

  // Combine all styles
  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${getVariantStyles()} ${className}`.trim()

  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  )
}

/**
 * DifficultyBadge - Specialized component for tour difficulty
 */
export function DifficultyBadge({
  difficulty,
  size = 'md',
  className = '',
}: {
  difficulty: 'EASY' | 'MODERATE' | 'CHALLENGING' | 'EXTREME'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const formattedDifficulty = difficulty.charAt(0) + difficulty.slice(1).toLowerCase()

  return (
    <Badge variant="difficulty" difficulty={difficulty} size={size} className={className}>
      {formattedDifficulty}
    </Badge>
  )
}

/**
 * CategoryBadge - Specialized component for tour categories
 */
export function CategoryBadge({
  category,
  size = 'md',
  className = '',
}: {
  category: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  return (
    <Badge variant="category" size={size} className={className}>
      {category}
    </Badge>
  )
}

/**
 * FeaturedBadge - Specialized component for featured items
 */
export function FeaturedBadge({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  return (
    <Badge variant="featured" size={size} className={className}>
      Featured
    </Badge>
  )
}
