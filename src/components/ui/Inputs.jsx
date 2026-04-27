// ─────────────────────────────────────────────────────────────────────────────
//  Inputs.jsx  — Input, Select, Textarea, Toggle, Checkbox, NumberStepper
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { cn } from '../../utils/helpers.js';
import Icon from './Icon.jsx';

/* ── shared label / hint / error ─────────────────────────────────────────── */
function FieldWrapper({ label, hint, error, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="label-xs text-dark-100">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <span className="flex items-center gap-1.5 text-xs text-danger font-medium">
          <Icon name="alert" size={11} /> {error}
        </span>
      )}
      {hint && !error && (
        <span className="text-xs text-dark-100">{hint}</span>
      )}
    </div>
  );
}

/* ── Input ───────────────────────────────────────────────────────────────── */
export function Input({
  label, hint, error, required,
  icon, iconRight, onIconRightClick,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  const hasErr = Boolean(error);
  return (
    <FieldWrapper label={label} hint={hint} error={error} required={required}>
      <div className={cn('relative', wrapperClassName)}>
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-100 pointer-events-none">
            <Icon name={icon} size={15} />
          </span>
        )}
        <input
          {...props}
          className={cn(
            'input-base',
            icon        && 'pl-10',
            iconRight   && 'pr-10',
            hasErr      && 'border-danger focus:border-danger focus:ring-danger/20',
            className,
          )}
        />
        {iconRight && (
          <button
            type="button"
            onClick={onIconRightClick}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-100 hover:text-white transition-colors"
          >
            <Icon name={iconRight} size={15} />
          </button>
        )}
      </div>
    </FieldWrapper>
  );
}

/* ── Password Input (visibility toggle) ──────────────────────────────────── */
export function PasswordInput({ label, hint, error, required, className = '', ...props }) {
  const [show, setShow] = useState(false);
  return (
    <Input
      {...props}
      type={show ? 'text' : 'password'}
      label={label}
      hint={hint}
      error={error}
      required={required}
      icon="lock"
      iconRight={show ? 'eye-off' : 'eye'}
      onIconRightClick={() => setShow(s => !s)}
      className={className}
    />
  );
}

/* ── Select ──────────────────────────────────────────────────────────────── */
export function Select({
  label, hint, error, required,
  options = [],       // [{ value, label }] or strings
  placeholder,
  className = '',
  ...props
}) {
  const hasErr = Boolean(error);
  return (
    <FieldWrapper label={label} hint={hint} error={error} required={required}>
      <div className="relative">
        <select
          {...props}
          className={cn(
            'select-base pr-9',
            hasErr && 'border-danger focus:border-danger',
            className,
          )}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(opt => {
            const val   = typeof opt === 'string' ? opt : opt.value;
            const label = typeof opt === 'string' ? opt : opt.label;
            return <option key={val} value={val}>{label}</option>;
          })}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-dark-100">
          <Icon name="chevron-down" size={14} />
        </span>
      </div>
    </FieldWrapper>
  );
}

/* ── Textarea ────────────────────────────────────────────────────────────── */
export function Textarea({
  label, hint, error, required,
  rows = 4,
  className = '',
  ...props
}) {
  return (
    <FieldWrapper label={label} hint={hint} error={error} required={required}>
      <textarea
        rows={rows}
        {...props}
        className={cn(
          'input-base resize-none',
          error && 'border-danger focus:border-danger',
          className,
        )}
      />
    </FieldWrapper>
  );
}

/* ── Toggle ──────────────────────────────────────────────────────────────── */
export function Toggle({
  checked,
  onChange,
  label,
  sub,
  accent = 'green',   // 'green' | 'purple'
  disabled = false,
  className = '',
}) {
  const activeColor = accent === 'purple' ? 'bg-purple' : 'bg-green';
  return (
    <div className={cn('flex items-center justify-between py-2', className)}>
      {(label || sub) && (
        <div className="mr-4">
          {label && <div className="text-sm font-medium">{label}</div>}
          {sub   && <div className="text-xs text-dark-100 mt-0.5">{sub}</div>}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green/30',
          checked ? activeColor : 'dark:bg-dark-400 bg-light-300',
          disabled && 'opacity-40 cursor-not-allowed',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow transition-transform duration-200',
            checked ? 'translate-x-5 bg-black' : 'translate-x-0 dark:bg-dark-100 bg-white',
          )}
        />
      </button>
    </div>
  );
}

/* ── Checkbox ────────────────────────────────────────────────────────────── */
export function Checkbox({ checked, onChange, label, disabled = false, className = '' }) {
  return (
    <label className={cn('flex items-start gap-3 cursor-pointer group', disabled && 'opacity-40 cursor-not-allowed', className)}>
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'flex-shrink-0 w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center transition-all',
          checked
            ? 'bg-green border-green'
            : 'dark:bg-dark-600 bg-white border-dark-300 dark:group-hover:border-green/50 group-hover:border-green/50',
        )}
      >
        {checked && <Icon name="check" size={11} className="text-black" strokeWidth={3} />}
      </div>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}

/* ── Tag / chip multi-select ─────────────────────────────────────────────── */
export function TagSelect({
  label,
  options = [],
  selected = [],
  onChange,
  accent = 'green',
  className = '',
}) {
  const toggle = val =>
    selected.includes(val)
      ? onChange(selected.filter(s => s !== val))
      : onChange([...selected, val]);

  const activeCls = accent === 'purple'
    ? 'bg-purple/10 border-purple/40 text-purple-light'
    : 'bg-green/10 border-green/40 text-green';

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && <div className="label-xs text-dark-100">{label}</div>}
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const val   = typeof opt === 'string' ? opt : opt.value;
          const lbl   = typeof opt === 'string' ? opt : opt.label;
          const on    = selected.includes(val);
          return (
            <button
              key={val}
              type="button"
              onClick={() => toggle(val)}
              className={cn(
                'text-xs px-3 py-1.5 rounded-xl border font-semibold transition-all duration-150',
                on
                  ? activeCls
                  : 'dark:bg-dark-600 bg-light-50 dark:border-dark-400 border-light-200 dark:text-dark-100 text-dark-400 hover:dark:border-dark-300 hover:border-light-300',
              )}
            >
              {lbl}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Number Stepper ──────────────────────────────────────────────────────── */
export function NumberStepper({
  value, onChange,
  min = 1, max = 99, step = 1,
  label, sub,
  className = '',
}) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      {(label || sub) && (
        <div>
          {label && <div className="text-sm font-medium">{label}</div>}
          {sub   && <div className="text-xs text-dark-100 mt-0.5">{sub}</div>}
        </div>
      )}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - step))}
          disabled={value <= min}
          className="w-9 h-9 rounded-xl dark:bg-dark-500 bg-light-100 dark:border-dark-400 border-light-200 border
            flex items-center justify-center text-green font-bold text-lg
            disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:dark:bg-dark-400 hover:bg-light-200"
        >
          −
        </button>
        <span className="font-display text-xl font-bold min-w-[2rem] text-center">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + step))}
          disabled={value >= max}
          className="w-9 h-9 rounded-xl dark:bg-dark-500 bg-light-100 dark:border-dark-400 border-light-200 border
            flex items-center justify-center text-green font-bold text-lg
            disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:dark:bg-dark-400 hover:bg-light-200"
        >
          +
        </button>
      </div>
    </div>
  );
}

/* ── Search Input ────────────────────────────────────────────────────────── */
export function SearchInput({ placeholder = 'Search…', value, onChange, className = '', ...props }) {
  return (
    <div className={cn('relative', className)}>
      <Icon name="search" size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-100 pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-base pl-9"
        {...props}
      />
    </div>
  );
}
