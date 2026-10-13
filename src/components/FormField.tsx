interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  error?: string;
  multiline?: boolean;
  type?: string;
  autoComplete?: string;
}

const inputBase =
  "w-full bg-transparent border-b outline-none pb-3 pt-1 font-sans text-sm text-foreground placeholder:text-muted-fg/40 transition-colors duration-200 resize-none";

const FormField = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  multiline,
  type = "text",
  autoComplete,
}: Props) => {
  const errorId = `${id}-error`;
  const className = `${inputBase} ${
    error ? "border-red-400" : "border-border focus:border-accent"
  }`;
  const shared = {
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    className,
    "aria-invalid": !!error,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="font-mono text-[11px] text-muted-fg block tracking-wider uppercase"
      >
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={4} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}
      {error && (
        <p id={errorId} role="alert" className="font-mono text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
