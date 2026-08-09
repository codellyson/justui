"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  createContext,
  useContext,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";
import { Skeleton } from "./skeleton.js";

export type { ColumnDef } from "@tanstack/react-table";

export interface TableBordered {
  column?: boolean;
}

const TableStyle = createContext<{ columnDividers: boolean }>({ columnDividers: false });

export interface TableRootProps extends ComponentPropsWithoutRef<"table"> {
  bordered?: TableBordered;
  wrapperClassName?: string;
}

function TableRoot({ bordered, className, wrapperClassName, children, ...props }: TableRootProps) {
  return (
    <TableStyle.Provider value={{ columnDividers: !!bordered?.column }}>
      <div
        data-justui="table"
        className={cn(
          "w-full overflow-x-auto",
          bordered && "rounded-lg border border-border",
          wrapperClassName,
        )}
      >
        <table className={cn("w-full table-auto border-collapse text-sm", className)} {...props}>
          {children}
        </table>
      </div>
    </TableStyle.Provider>
  );
}

function TableHeader({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead
      data-justui="table-header"
      className={cn("[&_tr]:border-b [&_tr]:border-border", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: ComponentPropsWithoutRef<"tbody">) {
  return (
    <tbody
      data-justui="table-body"
      className={cn("divide-y divide-border", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: ComponentPropsWithoutRef<"tfoot">) {
  return (
    <tfoot
      data-justui="table-footer"
      className={cn("border-t border-border font-medium", className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: ComponentPropsWithoutRef<"tr">) {
  const { columnDividers } = useContext(TableStyle);
  return (
    <tr
      data-justui="table-row"
      className={cn("text-primary", columnDividers && "divide-x divide-border", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      scope="col"
      data-justui="table-head"
      className={cn(
        "px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-muted",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      data-justui="table-cell"
      className={cn("px-3 py-2.5 align-middle", className)}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: ComponentPropsWithoutRef<"caption">) {
  return (
    <caption
      data-justui="table-caption"
      className={cn("caption-bottom px-3 py-2 text-left text-xs text-muted", className)}
      {...props}
    />
  );
}

export interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  bordered?: TableBordered;
  isLoading?: boolean;
  loadingRows?: number;
  emptyMessage?: ReactNode;
  hideHeader?: boolean;
  onRowClick?: (row: T) => void;
  className?: string;
  tableClassName?: string;
  headerRowClassName?: string;
}

function DataTable<T>({
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
  const sized = (size: number) => (size === 150 ? undefined : size);

  return (
    <TableRoot bordered={bordered} wrapperClassName={className} className={tableClassName}>
      {!hideHeader && (
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className={headerRowClassName}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: sized(header.getSize()) }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      )}

      <TableBody>
        {isLoading ? (
          Array.from({ length: loadingRows }, (_, row) => (
            <TableRow key={`skeleton-${row}`}>
              {columns.map((_, cell) => (
                <TableCell key={`skeleton-${row}-${cell}`} className="py-3">
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={Math.max(1, columns.length)} className="py-10 text-center text-muted">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={onRowClick ? () => onRowClick(row.original) : undefined}
              className={cn(onRowClick && "cursor-pointer hover:bg-bg-secondary")}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} style={{ width: sized(cell.column.getSize()) }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </TableRoot>
  );
}

DataTable.displayName = "Table";
TableRoot.displayName = "Table.Root";
TableHeader.displayName = "Table.Header";
TableBody.displayName = "Table.Body";
TableFooter.displayName = "Table.Footer";
TableRow.displayName = "Table.Row";
TableHead.displayName = "Table.Head";
TableCell.displayName = "Table.Cell";
TableCaption.displayName = "Table.Caption";

export {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
};

export const Table = Object.assign(DataTable, {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
});
