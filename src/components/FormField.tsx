interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder: string;
  multiline?: boolean;
  type?: string;
  autoComplete?: string;
}

const inputBase =
  "w-full bg-transparent border-b border-border focus:border-accent outline-none pb-3 pt-1 font-sans text-sm text-foreground placeholder:text-muted-fg/40 transition-colors duration-200 resize-none";

const FormField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  multiline,
  type = "text",
  autoComplete,
}: Props) => (
  <div className="space-y-2">
    <label
      htmlFor={id}
      className="font-mono text-[11px] text-muted-fg block tracking-wider uppercase"
    >
      {label}
    </label>
    {multiline ? (
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        rows={4}
        className={inputBase}
      />
    ) : (
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={inputBase}
      />
    )}
  </div>
);

export default FormField;
