import { useState, useRef } from "react";
import { ArrowLeft, Clock3, Eye, Plus, RotateCcw, Sparkles, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import TreeVisualizer from "../components/TreeVisualizer";
import { treeContent } from "../data/treeContent";
import {
  createInitialTree,
  insertBST,
  searchBST,
  deleteBST,
  countNodes,
} from "../utils/bstEngine";

export default function BSTPage() {
  const [root, setRoot] = useState(() => createInitialTree());
  const [insertVal, setInsertVal] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [deleteVal, setDeleteVal] = useState("");

  const [activeNodeId, setActiveNodeId] = useState(null);
  const [visitedIds, setVisitedIds] = useState([]);
  const [targetNodeId, setTargetNodeId] = useState(null);
  const [operationType, setOperationType] = useState(null);

  const [message, setMessage] = useState(null);
  const [stepLogs, setStepLogs] = useState([
    "Initialized default Binary Search Tree with balanced values [50, 30, 70, 20, 40, 60, 80].",
  ]);

  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const animatePath = (path, onComplete) => {
    clearTimer();
    setVisitedIds([]);
    setActiveNodeId(null);
    setTargetNodeId(null);

    let idx = 0;
    const currentVisited = [];

    timerRef.current = setInterval(() => {
      if (idx >= path.length) {
        clearTimer();
        if (onComplete) onComplete();
        return;
      }

      const step = path[idx];
      if (step.nodeId) {
        currentVisited.push(step.nodeId);
        setVisitedIds([...currentVisited]);
        setActiveNodeId(step.nodeId);
      }
      setStepLogs((prev) => [step.text, ...prev.slice(0, 7)]);
      idx++;
    }, 450);
  };

  const handleInsert = () => {
    const trimmed = insertVal.trim();
    const val = trimmed === "" ? Math.floor(Math.random() * 90) + 10 : Number(trimmed);

    if (!Number.isFinite(val)) {
      setMessage({ type: "error", text: "Please enter a valid numeric value to insert." });
      return;
    }

    if (countNodes(root) >= 20) {
      setMessage({
        type: "error",
        text: "Tree limit reached (20 nodes). Please delete some nodes or reset to maintain layout clarity.",
      });
      return;
    }

    setOperationType("insert");
    const result = insertBST(root, val);

    if (!result.success) {
      animatePath(result.path, () => {
        setMessage({ type: "error", text: result.message });
      });
      return;
    }

    setInsertVal("");
    animatePath(result.path, () => {
      setRoot(result.root);
      setTargetNodeId(result.path[result.path.length - 1]?.nodeId || null);
      setMessage({ type: "success", text: result.message });
    });
  };

  const handleSearch = () => {
    const trimmed = searchVal.trim();
    if (trimmed === "" || !Number.isFinite(Number(trimmed))) {
      setMessage({ type: "error", text: "Please enter a valid number to search." });
      return;
    }

    const val = Number(trimmed);
    setOperationType("search");
    const result = searchBST(root, val);

    animatePath(result.path, () => {
      if (result.found) {
        setTargetNodeId(result.targetId);
        setMessage({ type: "success", text: result.message });
      } else {
        setMessage({ type: "error", text: result.message });
      }
    });
  };

  const handleDelete = () => {
    const trimmed = deleteVal.trim();
    if (trimmed === "" || !Number.isFinite(Number(trimmed))) {
      setMessage({ type: "error", text: "Please enter a valid number to delete." });
      return;
    }

    const val = Number(trimmed);
    setOperationType("delete");
    const result = deleteBST(root, val);

    if (!result.success) {
      animatePath(result.path, () => {
        setMessage({ type: "error", text: result.message });
      });
      return;
    }

    setDeleteVal("");
    animatePath(result.path, () => {
      setRoot(result.root);
      setTargetNodeId(null);
      setMessage({ type: "success", text: result.message });
    });
  };

  const handleReset = () => {
    clearTimer();
    setRoot(createInitialTree());
    setActiveNodeId(null);
    setVisitedIds([]);
    setTargetNodeId(null);
    setMessage({ type: "info", text: "Reset tree to standard balanced template." });
    setStepLogs(["Reset BST to standard balanced values."]);
  };

  const handleClear = () => {
    clearTimer();
    setRoot(null);
    setActiveNodeId(null);
    setVisitedIds([]);
    setTargetNodeId(null);
    setMessage({ type: "info", text: "Cleared entire tree." });
    setStepLogs(["Cleared all nodes."]);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      {/* Editorial Chapter Header */}
      <header className="border-b border-[#ECE3D8] bg-[#F7F5F2]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          <Link
            to="/learn/trees"
            className="inline-flex items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white"
          >
            <ArrowLeft size={16} />
            Back to Trees
          </Link>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-[#D8C5B0]" />
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
                  Chapter I · Hierarchical Structures
                </p>
              </div>

              <h1 className="mt-6 font-display text-6xl leading-[0.95] text-[#1F1B18] sm:text-7xl">
                {treeContent.bst.title}
              </h1>

              <p className="mt-4 text-xl text-[#7A7068]">
                {treeContent.bst.subtitle}
              </p>

              <div className="mt-6 h-[2px] w-16 rounded-full bg-[#A1764E]" />

              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DDD1] bg-white px-3.5 py-1.5 font-medium text-[#6B5B4D]">
                  <Clock3 size={15} /> 10 min lesson
                </span>
                <span className="rounded-full bg-amber-100 px-3.5 py-1.5 font-medium text-amber-800">
                  Intermediate
                </span>
                <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-medium text-[#8C837B]">
                  BST Property: Left &lt; Root &lt; Right
                </span>
              </div>
            </div>

            {/* Invariant Card */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-7 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
                <Sparkles size={16} />
                The BST Invariant
              </div>
              <p className="mt-3 text-sm leading-7 text-[#5F5952]">
                For every node in a Binary Search Tree, all values in its left subtree are strictly smaller, and all values in its right subtree are strictly greater. This invariant enables divide-and-conquer searching in logarithmic time.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Laboratory */}
      <main className="mx-auto max-w-7xl px-6 py-14 md:px-8 space-y-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Visualizer Canvas */}
          <TreeVisualizer
            root={root}
            activeNodeId={activeNodeId}
            visitedIds={visitedIds}
            targetNodeId={targetNodeId}
            operationType={operationType}
            message={message}
          />

          {/* Controls & Operations Card */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
                  Operations
                </p>
                <h3 className="mt-1 font-display text-3xl text-[#1F1B18]">
                  BST Actions
                </h3>
              </div>

              {/* Insert Action */}
              <div>
                <label
                  htmlFor="bst-insert-val"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#514940]"
                >
                  Insert Value
                </label>
                <div className="flex gap-2.5">
                  <input
                    id="bst-insert-val"
                    type="number"
                    value={insertVal}
                    onChange={(e) => setInsertVal(e.target.value)}
                    placeholder="e.g. 55"
                    className="h-11 flex-1 rounded-xl border border-[#DDD2C6] bg-[#FCFBF8] px-4 font-mono text-sm outline-none transition focus:border-[#A1764E] focus:ring-2 focus:ring-[#A1764E]/20"
                  />
                  <button
                    type="button"
                    onClick={handleInsert}
                    className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-[#1F1B18] px-5 text-sm font-medium text-white transition hover:bg-[#342D28]"
                  >
                    <Plus size={16} />
                    Insert
                  </button>
                </div>
              </div>

              {/* Search Action */}
              <div>
                <label
                  htmlFor="bst-search-val"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#514940]"
                >
                  Search Value
                </label>
                <div className="flex gap-2.5">
                  <input
                    id="bst-search-val"
                    type="number"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="e.g. 40"
                    className="h-11 flex-1 rounded-xl border border-[#DDD2C6] bg-[#FCFBF8] px-4 font-mono text-sm outline-none transition focus:border-[#A1764E] focus:ring-2 focus:ring-[#A1764E]/20"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-[#DDD2C6] bg-white px-5 text-sm font-semibold text-[#514940] transition hover:border-[#A1764E] hover:bg-[#FCFAF7]"
                  >
                    <Eye size={16} />
                    Search
                  </button>
                </div>
              </div>

              {/* Delete Action */}
              <div>
                <label
                  htmlFor="bst-delete-val"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#514940]"
                >
                  Delete Value
                </label>
                <div className="flex gap-2.5">
                  <input
                    id="bst-delete-val"
                    type="number"
                    value={deleteVal}
                    onChange={(e) => setDeleteVal(e.target.value)}
                    placeholder="e.g. 30"
                    className="h-11 flex-1 rounded-xl border border-[#DDD2C6] bg-[#FCFBF8] px-4 font-mono text-sm outline-none transition focus:border-[#C87865] focus:ring-2 focus:ring-[#C87865]/20"
                  />
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-[#C87865] bg-[#FDF5F3] px-5 text-sm font-semibold text-[#8C3D2D] transition hover:bg-[#F9E8E3]"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>

              {/* Tree Quick Actions */}
              <div className="flex items-center justify-between border-t border-[#EEE5DB] pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#A1764E] hover:underline"
                >
                  <RotateCcw size={14} />
                  Reset Balanced Tree
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs font-medium text-[#8C837B] hover:text-[#A84533] transition"
                >
                  Clear all
                </button>
              </div>
            </div>

            {/* Step Trace Log Card */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
                Execution Log
              </p>
              <div className="mt-3 max-h-48 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
                {stepLogs.map((log, i) => (
                  <div
                    key={i}
                    className={`rounded-lg p-2.5 leading-relaxed ${
                      i === 0
                        ? "border border-[#E8DDD1] bg-[#FAF8F5] font-semibold text-[#1F1B18]"
                        : "text-[#7A7068]"
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Complexity Analysis Cards */}
        <section className="pt-8 border-t border-[#ECE3D8] space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
              Complexity Analysis
            </p>
            <h2 className="mt-2 font-display text-4xl text-[#1F1B18]">
              BST Performance
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {treeContent.bst.operations.map((op) => (
              <div key={op.name} className="rounded-2xl border border-[#E8DDD1] bg-white p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
                    {op.name}
                  </p>
                  <span className="rounded-full bg-[#EAF2E8] px-2.5 py-0.5 font-mono text-xs font-bold text-[#3D5A37]">
                    Avg: {op.complexity}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl font-bold text-[#1F1B18]">
                    {op.complexity}
                  </span>
                  <span className="font-mono text-xs text-[#8C837B]">
                    Worst: {op.worst}
                  </span>
                </div>
                <p className="text-xs leading-5 text-[#8C837B]">
                  {op.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Deep Insight Box */}
          <div className="rounded-2xl border border-[#E8DDD1] bg-[#FAF8F5] p-6 space-y-2">
            <h4 className="font-display text-lg text-[#1F1B18]">
              Why Self-Balancing Trees Exist (AVL &amp; Red-Black)
            </h4>
            <p className="text-sm leading-6 text-[#6B645D]">
              When items are inserted into a standard BST in already-sorted order (e.g. 10, 20, 30, 40, 50), the tree degenerates into a single long line, losing its logarithmic speed and taking <strong>O(n)</strong> worst-case time like a linked list. Self-balancing binary search trees (such as <strong>AVL Trees</strong> and <strong>Red-Black Trees</strong>) perform rotations during insertion and deletion to strictly maintain $O(\log n)$ height.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
