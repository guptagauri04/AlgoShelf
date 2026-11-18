import { useState } from "react";
import { Plus, Search, Trash2, RotateCcw, Sparkles } from "lucide-react";

export default function BSTControls({
  onInsert,
  onSearch,
  onDelete,
  onReset,
  onRandomSample,
  isOperating = false,
}) {
  const [insertVal, setInsertVal] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [deleteVal, setDeleteVal] = useState("");

  const handleInsert = (e) => {
    e.preventDefault();
    const val = parseInt(insertVal, 10);
    if (!isNaN(val)) {
      onInsert(val);
      setInsertVal("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const val = parseInt(searchVal, 10);
    if (!isNaN(val)) {
      onSearch(val);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const val = parseInt(deleteVal, 10);
    if (!isNaN(val)) {
      onDelete(val);
      setDeleteVal("");
    }
  };

  return (
    <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-[#1F1B18]">
            BST Operations
          </h3>
          <p className="text-xs text-[#8C837B]">
            Insert, search, or delete nodes while maintaining BST ordering
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRandomSample}
            disabled={isOperating}
            className="flex items-center gap-1.5 rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 text-xs font-semibold text-[#6B5B4D] shadow-sm transition hover:bg-[#F7F3EE] disabled:opacity-50"
          >
            <Sparkles size={13} className="text-[#A1764E]" />
            <span>Sample Tree</span>
          </button>
          <button
            type="button"
            onClick={onReset}
            disabled={isOperating}
            className="flex items-center gap-1.5 rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 text-xs font-semibold text-[#6B5B4D] shadow-sm transition hover:bg-[#F7F3EE] disabled:opacity-50"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {/* Insert Form */}
        <form onSubmit={handleInsert} className="flex gap-2">
          <input
            type="number"
            placeholder="Value to insert"
            value={insertVal}
            onChange={(e) => setInsertVal(e.target.value)}
            disabled={isOperating}
            className="w-full rounded-xl border border-[#E8DED2] bg-white px-3 py-2 text-xs font-mono text-[#1F1B18] shadow-sm focus:border-[#4B7754] focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isOperating || !insertVal.trim()}
            className="flex shrink-0 items-center gap-1 rounded-xl bg-[#4B7754] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#3B5E42] disabled:opacity-40"
          >
            <Plus size={14} />
            <span>Insert</span>
          </button>
        </form>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="number"
            placeholder="Value to search"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            disabled={isOperating}
            className="w-full rounded-xl border border-[#E8DED2] bg-white px-3 py-2 text-xs font-mono text-[#1F1B18] shadow-sm focus:border-[#D97706] focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isOperating || !searchVal.trim()}
            className="flex shrink-0 items-center gap-1 rounded-xl bg-[#D97706] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#B45309] disabled:opacity-40"
          >
            <Search size={14} />
            <span>Search</span>
          </button>
        </form>

        {/* Delete Form */}
        <form onSubmit={handleDelete} className="flex gap-2">
          <input
            type="number"
            placeholder="Value to delete"
            value={deleteVal}
            onChange={(e) => setDeleteVal(e.target.value)}
            disabled={isOperating}
            className="w-full rounded-xl border border-[#E8DED2] bg-white px-3 py-2 text-xs font-mono text-[#1F1B18] shadow-sm focus:border-[#DC2626] focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isOperating || !deleteVal.trim()}
            className="flex shrink-0 items-center gap-1 rounded-xl bg-[#DC2626] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#B91C1C] disabled:opacity-40"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </form>
      </div>
    </div>
  );
}
