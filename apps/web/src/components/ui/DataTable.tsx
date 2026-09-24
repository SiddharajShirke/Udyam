import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No data available.",
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="py-12 text-center text-body text-gov-text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-body">
        <thead>
          <tr className="border-b border-gov-border-light">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left font-semibold text-gov-text-secondary text-caption uppercase tracking-wider ${col.className ?? ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gov-border-light">
          {data.map((row) => (
            <tr key={keyExtractor(row)} className="hover:bg-gov-surface/50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3 ${col.className ?? ""}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
