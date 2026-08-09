"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useEffect, useMemo, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { cn } from "../lib/cn.js";
import { ChevronLeftIcon, ChevronRightIcon } from "../lib/icons.js";
import { Skeleton } from "./skeleton.js";

export type { ColumnDef } from "@tanstack/react-table";

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

interface TableBaseProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  loadingRows?: number;
  emptyMessage?: ReactNode;
  hideHeader?: boolean;
  onRowClick?: (row: T) => void;
  /** Extra identities that should rebuild the column memo. */
  columnDependencies?: Record<string, unknown>;
  className?: string;
  tableClassName?: string;
  headerRowClassName?: string;
}

interface ServerPaginatedTableProps<T> extends TableBaseProps<T> {
  isServerSidePagination: true;
  queryPageIndex: number;
  queryPageSize: number;
  setPaginationState: Dispatch<SetStateAction<PaginationState>>;
  totalItems: number;
  pageSize?: never;
}

interface ClientTableProps<T> extends TableBaseProps<T> {
  isServerSidePagination?: false;
  /** Paginate in the browser. Omit to render every row. */
  pageSize?: number;
  queryPageIndex?: never;
  queryPageSize?: never;
  setPaginationState?: never;
  totalItems?: never;
}

export type TableProps<T> = ServerPaginatedTableProps<T> | ClientTableProps<T>;

export function Table<T>({
  columns,
  data,
  isLoading = false,
  loadingRows = 5,
  emptyMessage = "No data",
  hideHeader = false,
  onRowClick,
  columnDependencies,
  className,
  tableClassName,
  headerRowClassName,
  ...rest
}: TableProps<T>) {
  const { isServerSidePagination, queryPageIndex, queryPageSize, setPaginationState, totalItems } =
    rest as ServerPaginatedTableProps<T>;
  const { pageSize: clientPageSize } = rest as ClientTableProps<T>;

  // columnDependencies is a memo hint, never the whole dependency list — the
  // reference drops `columns` here, so new columns never reach the table.
  const tableColumns = useMemo(() => columns, [columns, columnDependencies]);

  const serverPagination = useMemo(
    () => ({ pageIndex: queryPageIndex ?? 0, pageSize: queryPageSize ?? 10 }),
    [queryPageIndex, queryPageSize],
  );

  const paginated = isServerSidePagination || clientPageSize != null;

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    // The reference registers no pagination row model, so its client mode
    // renders every row however the page state is set.
    getPaginationRowModel: paginated ? getPaginationRowModel() : undefined,
    // Spread these only when they apply. An explicit `onPaginationChange:
    // undefined` wins the options merge and replaces TanStack's own state
    // updater, which silently kills setPageIndex in client mode.
    ...(isServerSidePagination
      ? {
          manualPagination: true,
          // rowCount alone is enough — getPageCount() derives from it.
          rowCount: totalItems,
          state: { pagination: serverPagination },
          onPaginationChange: setPaginationState,
        }
      : clientPageSize != null
        ? { initialState: { pagination: { pageSize: clientPageSize } } }
        : {}),
  });

  // initialState only lands on mount, so a later pageSize change needs pushing.
  useEffect(() => {
    if (clientPageSize != null) table.setPageSize(clientPageSize);
  }, [clientPageSize, table]);

  const rows = table.getRowModel().rows;
  const pageIndex = table.getState().pagination.pageIndex;
  const currentPageSize = table.getState().pagination.pageSize;
  const totalRows = isServerSidePagination ? (totalItems ?? 0) : data.length;
  const from = totalRows === 0 ? 0 : pageIndex * currentPageSize + 1;
  const to = Math.min((pageIndex + 1) * currentPageSize, totalRows);

  return (
    <div data-justui="table" className={cn("w-full", className)}>
      <div className="w-full overflow-x-auto">
        <table className={cn("w-full table-auto border-collapse text-sm", tableClassName)}>
          {!hideHeader && (
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className={cn("border-b border-border", headerRowClassName)}
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
                <tr key={`skeleton-${row}`}>
                  {tableColumns.map((_, cell) => (
                    <td key={`skeleton-${row}-${cell}`} className="px-3 py-3">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={Math.max(1, tableColumns.length)}
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

      {/* Stays mounted while loading — the reference hides it, so the control
          disappears under the cursor on every page change. */}
      {paginated && totalRows > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <p className="text-sm text-muted">
            Showing{" "}
            <span className="font-medium text-primary">
              {from}–{to}
            </span>{" "}
            of {totalRows}
          </p>
          <TablePagination
            currentPage={pageIndex + 1}
            totalPages={Math.max(1, table.getPageCount())}
            onPageChange={(page) => table.setPageIndex(page - 1)}
          />
        </div>
      )}
    </div>
  );
}

// Anchors the first two and last two pages plus a window around the current
// one, collapsing the gaps:
//   total=4            -> 1 2 3 4
//   total=6, current=1 -> 1 2 … 5 6
//   total=9, current=5 -> 1 2 … 4 5 6 … 8 9
export function buildPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 4) return Array.from({ length: total }, (_, i) => i + 1);

  const anchors = new Set<number>();
  for (const page of [1, 2, total - 1, total, current - 1, current, current + 1]) {
    if (page >= 1 && page <= total) anchors.add(page);
  }

  const sorted = [...anchors].sort((a, b) => a - b);
  const out: (number | "ellipsis")[] = [];
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) out.push("ellipsis");
    out.push(page);
  });
  return out;
}

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: TablePaginationProps) {
  if (totalPages <= 1) return null;

  const step =
    "inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-sm text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:text-muted disabled:hover:text-muted";

  return (
    <nav
      data-justui="table-pagination"
      aria-label="Pagination"
      className={cn("flex items-center gap-2", className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className={step}
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Previous
      </button>

      <div className="flex items-center gap-1">
        {buildPageList(currentPage, totalPages).map((page, i) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${i}`} aria-hidden="true" className="px-1 text-muted">
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => onPageChange(page)}
              className={cn(
                "h-8 min-w-8 rounded-md px-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                page === currentPage
                  ? "bg-accent text-bg"
                  : "text-secondary hover:bg-bg-secondary hover:text-primary",
              )}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className={step}
      >
        Next
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
