export function Seg<K extends string>({
  opts,
  value,
  onChange,
  className = 'rounded-[9px] bg-muted p-[3px]',
  item = 'px-2.5 py-1 text-[13px]',
  on = 'bg-white font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.08)]',
  off = 'bg-transparent',
}: {
  opts: [K, string][]
  value: K
  onChange: (k: K) => void
  className?: string
  item?: string
  on?: string
  off?: string
}) {
  return (
    <div className={`flex ${className}`}>
      {opts.map(([k, l]) => (
        <button
          key={k}
          type="button"
          aria-pressed={value === k}
          onClick={() => onChange(k)}
          className={`cursor-pointer rounded-[7px] border-0 whitespace-nowrap ${item} ${value === k ? on : off}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
