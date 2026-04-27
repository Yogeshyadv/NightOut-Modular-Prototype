// ─────────────────────────────────────────────────────────────────────────────
//  Button.jsx
// ─────────────────────────────────────────────────────────────────────────────
import { cn } from '../../utils/helpers.js';
import Icon from './Icon.jsx';

const SIZE_CLS = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl',
};

const VARIANT_CLS = {
  primary:      'btn-primary',
  purple:       'btn-purple',
  ghost:        'btn-ghost',
  'ghost-dark': 'btn-ghost-dark',
  danger:       'btn-danger',
  success:      'btn-success',
  warning:      'btn-warning',
  outline:      'btn-outline',
};

/**
 * Button
 *
 * Props:
 *   variant  – primary | purple | ghost | ghost-dark | danger | success | warning | outline
 *   size     – xs | sm | md | lg | xl
 *   loading  – shows spinner, disables click
 *   disabled – greyed out
 *   fullWidth– w-full + justify-center
 *   leftIcon / rightIcon – Icon name string
 */
export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type     = 'button',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        SIZE_CLS[size]     ?? 'btn-md',
        VARIANT_CLS[variant] ?? 'btn-primary',
        fullWidth && 'w-full justify-center',
        className,
      )}
      {...rest}
    >
      {loading ? (
        <svg
          className="animate-spin"
          width={size === 'xs' || size === 'sm' ? 13 : 16}
          height={size === 'xs' || size === 'sm' ? 13 : 16}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"
            strokeDasharray="32" strokeLinecap="round" />
        </svg>
      ) : leftIcon ? (
        <Icon name={leftIcon} size={size === 'lg' || size === 'xl' ? 17 : 14} />
      ) : null}

      {children}

      {!loading && rightIcon && (
        <Icon name={rightIcon} size={size === 'lg' || size === 'xl' ? 17 : 14} />
      )}
    </button>
  );
}
