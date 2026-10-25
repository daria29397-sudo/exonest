import { cn } from '@/lib/utils'

export const inputClass =
  'h-12 w-full rounded-xl border border-input bg-cream px-4 text-sm text-foreground placeholder:text-muted-foreground aria-[invalid=true]:border-destructive'

export const textareaClass =
  'min-h-28 w-full rounded-xl border border-input bg-cream px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground aria-[invalid=true]:border-destructive'

export function FormField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optional ? <span className="ml-1 font-normal text-muted-foreground">(необов’язково)</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export const fieldAria = (id: string, error?: string) => ({
  id,
  'aria-invalid': error ? true : undefined,
  'aria-describedby': error ? `${id}-error` : undefined,
})
