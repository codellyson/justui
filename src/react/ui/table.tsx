"use client";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type Row,
  type RowSelectionState,
  type SortingState,
  type Updater,
} from "@tanstack/react-table";
import { createContext, useContext, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from "../lib/icons.js";
import { Checkbox } from "./checkbox.js";
import { Skeleton } from "./skeleton.js";

export type { ColumnDef, Row, RowSelectionState, SortingState } from "@tanstack/react-table";

export interface TableBorderedOptions {
  column?: boolean;
}

export type TableBordered = boolean | TableBorderedOptions;

const isFramed = (bordered?: TableBordered) => bordered !== undefined && bordered !== false;
const hasColumnDividers = (bordered?: TableBordered) =>
  typeof bordered === "object" && bordered.column === true;

const TableStyle = createContext<{ columnDividers: boolean }>({ columnDividers: false });

export interface TableRootProps extends ComponentPropsWithoutRef<"table"> {
  bordered?: TableBordered;
  wrapperClassName?: string;
}

function TableRoot({ bordered, className, wrapperClassName, children, ...props }: TableRootProps) {
  return (
    <TableStyle.Provider value={{ columnDividers: hasColumnDividers(bordered) }}>
      <div
        data-justui="table"
        className={cn(
          "w-full overflow-x-auto",
          isFramed(bordered) && "rounded-lg border border-border",
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

export type SortDirection = "asc" | "desc";

export interface TableHeadProps extends ComponentPropsWithoutRef<"th"> {
  sortDirection?: SortDirection | false;
  onSort?: ComponentPropsWithoutRef<"button">["onClick"];
}

function TableHead({ className, children, sortDirection, onSort, ...props }: TableHeadProps) {
  const sortable = sortDirection !== undefined;
  const SortIcon =
    sortDirection === "asc"
      ? ChevronUpIcon
      : sortDirection === "desc"
        ? ChevronDownIcon
        : ChevronUpDownIcon;

  return (
    <th
      scope="col"
      data-justui="table-head"
      aria-sort={
        sortable
          ? sortDirection === "asc"
            ? "ascending"
            : sortDirection === "desc"
              ? "descending"
              : "none"
          : undefined
      }
      className={cn(
        "px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-muted",
        className,
      )}
      {...props}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className={cn(
            "-mx-1 inline-flex items-center gap-1 rounded px-1 uppercase tracking-wider hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent",
            sortDirection && "text-primary",
          )}
        >
          {children}
          <SortIcon
            className={cn("h-3.5 w-3.5 shrink-0", !sortDirection && "opacity-50")}
            aria-hidden="true"
          />
        </button>
      ) : (
        children
      )}
    </th>
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
  sortable?: boolean;
  defaultSorting?: SortingState;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  manualSorting?: boolean;
  enableRowSelection?: boolean | ((row: Row<T>) => boolean);
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  defaultRowSelection?: RowSelectionState;
  getRowId?: (row: T, index: number) => string;
  selectionLabel?: (row: T) => string;
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
  sortable = false,
  defaultSorting,
  sorting,
  onSortingChange,
  manualSorting = false,
  enableRowSelection = false,
  rowSelection,
  onRowSelectionChange,
  defaultRowSelection,
  getRowId,
  selectionLabel,
  isLoading = false,
  loadingRows = 5,
  emptyMessage = "No data",
  hideHeader = false,
  onRowClick,
  className,
  tableClassName,
  headerRowClassName,
}: TableProps<T>) {
  const selectable = enableRowSelection !== false;

  // One merged state / initialState: two conditional spreads would each carry
  // their own object and the later one would drop the earlier feature's slice.
  const controlled = {
    ...(sorting ? { sorting } : {}),
    ...(rowSelection ? { rowSelection } : {}),
  };
  const initial = {
    ...(!sorting && defaultSorting ? { sorting: defaultSorting } : {}),
    ...(!rowSelection && defaultRowSelection ? { rowSelection: defaultRowSelection } : {}),
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId,
    ...(selectable ? { enableRowSelection } : {}),
    ...(sortable ? { getSortedRowModel: getSortedRowModel(), manualSorting } : {}),
    ...(Object.keys(controlled).length ? { state: controlled } : {}),
    ...(Object.keys(initial).length ? { initialState: initial } : {}),
    // Spread the change handlers conditionally too: an explicit `undefined`
    // replaces TanStack's own state updater and freezes the feature.
    ...(sorting
      ? {
          onSortingChange: (updater: Updater<SortingState>) =>
            onSortingChange?.(typeof updater === "function" ? updater(sorting) : updater),
        }
      : {}),
    ...(rowSelection
      ? {
          onRowSelectionChange: (updater: Updater<RowSelectionState>) =>
            onRowSelectionChange?.(typeof updater === "function" ? updater(rowSelection) : updater),
        }
      : {}),
  });
  const rows = table.getRowModel().rows;
  const sized = (size: number) => (size === 150 ? undefined : size);
  const columnCount = Math.max(1, columns.length) + (selectable ? 1 : 0);

  return (
    <TableRoot bordered={bordered} wrapperClassName={className} className={tableClassName}>
      {!hideHeader && (
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className={headerRowClassName}>
              {selectable && (
                <TableHead className="w-0 pr-0">
                  <Checkbox
                    aria-label="Select all rows"
                    checked={
                      table.getIsAllRowsSelected()
                        ? true
                        : table.getIsSomeRowsSelected()
                          ? "indeterminate"
                          : false
                    }
                    onChange={(next) => table.toggleAllRowsSelected(next === true)}
                  />
                </TableHead>
              )}
              {headerGroup.headers.map((header) => {
                const canSort = sortable && header.column.getCanSort();
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: sized(header.getSize()) }}
                    sortDirection={canSort ? header.column.getIsSorted() : undefined}
                    onSort={canSort ? header.column.getToggleSortingHandler() : undefined}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
      )}

      <TableBody>
        {isLoading ? (
          Array.from({ length: loadingRows }, (_, row) => (
            <TableRow key={`skeleton-${row}`}>
              {selectable && (
                <TableCell className="w-0 pr-0">
                  <Skeleton className="h-4 w-4" />
                </TableCell>
              )}
              {columns.map((_, cell) => (
                <TableCell key={`skeleton-${row}-${cell}`} className="py-3">
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columnCount} className="py-10 text-center text-muted">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => {
            const selected = row.getIsSelected();
            return (
              <TableRow
                key={row.id}
                data-selected={selected || undefined}
                onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                className={cn(
                  onRowClick && "cursor-pointer hover:bg-bg-secondary",
                  selected && "bg-accent/10",
                )}
              >
                {selectable && (
                  <TableCell
                    className="w-0 pr-0"
                    // Stop a row-level onClick from firing when the box is hit.
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Checkbox
                      aria-label={
                        selectionLabel
                          ? selectionLabel(row.original)
                          : `Select row ${row.index + 1}`
                      }
                      checked={selected}
                      disabled={!row.getCanSelect()}
                      onChange={(next) => row.toggleSelected(next === true)}
                    />
                  </TableCell>
                )}
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={{ width: sized(cell.column.getSize()) }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })
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
