import type { ReactNode } from 'react';

type DetailFieldProps = {
  label: string;
  children: ReactNode;
};

export function DetailField({ label, children }: DetailFieldProps) {
  return (
    <div>
      <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">{label}</p>
      {children}
    </div>
  );
}
