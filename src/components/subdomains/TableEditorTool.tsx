"use client";

import { Columns, Download, Plus, Rows, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { cn } from "@/lib/cn";

type Grid = string[][];

const DEFAULT_ROWS = 4;
const DEFAULT_COLS = 4;

function emptyGrid(rows: number, cols: number): Grid {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ""),
  );
}

function gridToCsv(grid: Grid): string {
  return grid
    .map((row) =>
      row
        .map((cell) => {
          const value = cell.replace(/"/g, '""');
          return /[",\n]/.test(value) ? `"${value}"` : value;
        })
        .join(","),
    )
    .join("\n");
}

export function TableEditorTool() {
  const [grid, setGrid] = useState<Grid>(() =>
    emptyGrid(DEFAULT_ROWS, DEFAULT_COLS),
  );

  const setCell = useCallback((row: number, col: number, value: string) => {
    setGrid((prev) =>
      prev.map((r, ri) =>
        ri === row ? r.map((c, ci) => (ci === col ? value : c)) : r,
      ),
    );
  }, []);

  const addRow = useCallback(() => {
    setGrid((prev) => [...prev, Array.from({ length: prev[0]?.length ?? 1 }, () => "")]);
  }, []);

  const addCol = useCallback(() => {
    setGrid((prev) => prev.map((row) => [...row, ""]));
  }, []);

  const removeRow = useCallback(() => {
    setGrid((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const removeCol = useCallback(() => {
    setGrid((prev) =>
      prev[0]?.length > 1 ? prev.map((row) => row.slice(0, -1)) : prev,
    );
  }, []);

  const colCount = grid[0]?.length ?? 0;

  const downloadCsv = useCallback(() => {
    const blob = new Blob([gridToCsv(grid)], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "table.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }, [grid]);

  const toolbarBtn =
    "inline-flex touch-manipulation items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-gray-200 transition hover:bg-white/10";

  const tableSummary = useMemo(
    () => `${grid.length}×${colCount}`,
    [grid.length, colCount],
  );

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button type="button" className={toolbarBtn} onClick={addRow}>
          <Rows className="h-3.5 w-3.5" aria-hidden />
          Add row
        </button>
        <button type="button" className={toolbarBtn} onClick={addCol}>
          <Columns className="h-3.5 w-3.5" aria-hidden />
          Add column
        </button>
        <button type="button" className={toolbarBtn} onClick={removeRow}>
          <Trash2 className="h-3.5 w-3.5" aria-hidden />
          Remove row
        </button>
        <button type="button" className={toolbarBtn} onClick={removeCol}>
          <Trash2 className="h-3.5 w-3.5" aria-hidden />
          Remove column
        </button>
        <button
          type="button"
          className={cn(toolbarBtn, "border-cyan-500/30 bg-cyan-500/10 text-cyan-100")}
          onClick={downloadCsv}
        >
          <Download className="h-3.5 w-3.5" aria-hidden />
          Export CSV
        </button>
        <span className="ml-auto self-center text-xs text-gray-500">
          {tableSummary}
        </span>
      </div>

      <div className="glass-card overflow-x-auto rounded-2xl border border-white/10 p-3 sm:p-4">
        <table className="w-full min-w-[20rem] border-collapse text-sm">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-white/10 p-0 align-top"
                  >
                    <input
                      value={cell}
                      onChange={(e) =>
                        setCell(rowIndex, colIndex, e.target.value)
                      }
                      className="w-full min-w-[5rem] bg-transparent px-2 py-2 text-gray-100 outline-none placeholder:text-gray-600 focus:bg-white/5"
                      placeholder={`R${rowIndex + 1}C${colIndex + 1}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}