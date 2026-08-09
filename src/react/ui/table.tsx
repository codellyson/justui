"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { Skeleton } from "./skeleton.js";

export type { ColumnDef } from "@tanstack/react-table";

export interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  bordered?: { column?: boolean };
  isLoading?: boolean;
  loadingRows?: number;
  emptyMessage?: ReactNode;
  hideHeader?: boolean;
  onRowClick?: (row: T) => void;
  className?: string;
  tableClassName?: string;
  headerRowClassName?: string;
}

export function Table<T>({
  columns,
  data,
  bordered,
  isLoading = false,
  loadingRows = 5,
  emptyMessage = "No data",
  hideHeader = false,
  onRowClick,
  className,
  tableClassName,
  headerRowClassName,
}: TableProps<T>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  const rows = table.getRowModel().rows;
  const columnDividers = bordered?.column ? "divide-x divide-border" : undefined;

  return (
    <div
      data-justui="table"
      className={cn(
        "w-full overflow-x-auto",
        bordered && "rounded-lg border border-border",
        className,
      )}
    >
      <table className={cn("w-full table-auto border-collapse text-sm", tableClassName)}>
        {!hideHeader && (
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={cn("border-b border-border", columnDividers, headerRowClassName)}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    scope="col"
                    style={{ width: header.getSize() === 150 ? undefined : header.getSize() }}
                    className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-muted"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}

        <tbody className="divide-y divide-border">
          {isLoading ? (
            Array.from({ length: loadingRows }, (_, row) => (
              <tr key={`skeleton-${row}`} className={columnDividers}>
                {columns.map((_, cell) => (
                  <td key={`skeleton-${row}-${cell}`} className="px-3 py-3">
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))
          ) : rows.length === 0 ? (
            <tr>
              <td
                colSpan={Math.max(1, columns.length)}
                className="px-3 py-10 text-center text-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                className={cn(
                  "text-primary",
                  columnDividers,
                  onRowClick && "cursor-pointer hover:bg-bg-secondary",
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize() === 150 ? undefined : cell.column.getSize(),
                    }}
                    className="px-3 py-2.5 align-middle"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
