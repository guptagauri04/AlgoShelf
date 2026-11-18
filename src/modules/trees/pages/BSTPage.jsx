import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import Footer from "../../../components/Footer";
import TreeVisualizer from "../components/TreeVisualizer";
import BSTControls from "../components/BSTControls";
import BSTStepExplanation from "../components/BSTStepExplanation";
import {
  buildBST,
  generateSearchSteps,
  generateInsertSteps,
  generateDeleteSteps,
  getTreeMetrics,
} from "../utils/bstEngine";
import { INITIAL_BST_KEYS } from "../data/treeData";

export default function BSTPage() {
  const [root, setRoot] = useState(() => buildBST(INITIAL_BST_KEYS));
  const [operationType, setOperationType] = useState("idle"); // 'search' | 'insert' | 'delete' | 'idle'
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isOperating, setIsOperating] = useState(false);

  const activeStep = steps[stepIndex] || null;
  const currentTree = activeStep?.tree ?? root;

  // Animation interval runner
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOperating && steps.length > 0) {
      timerRef.current = setInterval(() => {
        setStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsOperating(false);
            clearInterval(timerRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, 700);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isOperating, steps.length]);

  const handleSearch = (val) => {
    const searchSteps = generateSearchSteps(root, val);
    setOperationType("search");
    setSteps(searchSteps);
    setStepIndex(0);
    setIsOperating(true);
  };

  const handleInsert = (val) => {
    const { steps: insertSteps, updatedRoot } = generateInsertSteps(root, val);
    setOperationType("insert");
    setSteps(insertSteps);
    setStepIndex(0);
    setIsOperating(true);
    setRoot(updatedRoot);
  };

  const handleDelete = (val) => {
    const { steps: deleteSteps, updatedRoot } = generateDeleteSteps(root, val);
    setOperationType("delete");
    setSteps(deleteSteps);
    setStepIndex(0);
    setIsOperating(true);
    setRoot(updatedRoot);
  };

  const handleReset = () => {
    const initial = buildBST(INITIAL_BST_KEYS);
    setRoot(initial);
    setOperationType("idle");
    setSteps([]);
    setStepIndex(0);
    setIsOperating(false);
  };

  const handleRandomSample = () => {
    const randomKeys = [45, 25, 65, 15, 35, 55, 75, 10, 85];
    const newTree = buildBST(randomKeys);
    setRoot(newTree);
    setOperationType("idle");
    setSteps([]);
    setStepIndex(0);
    setIsOperating(false);
  };

  const metrics = getTreeMetrics(currentTree);

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 md:pt-14">
        {/* Navigation Breadcrumb */}
        <Link
          to="/learn/trees"
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B6A3C7]"
        >
          <ArrowLeft size={16} />
          Back to Trees Overview
        </Link>

        {/* Header */}
        <header className="mt-8 border-b border-[#E8DDD1] pb-8 md:mt-10">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#F0EBF7] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#6F5D86]">
              Book IV · Chapter I
            </span>
            <span className="text-xs text-[#8C837B]">Interactive Laboratory</span>
          </div>

          <h1 className="mt-4 font-display text-4xl leading-tight text-[#1F1B18] sm:text-5xl md:text-6xl">
            Binary Search Tree Operations
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#6B645D] md:text-lg">
            Observe the fundamental BST invariants in action. Insert new keys, search for target nodes
            via binary division, and trace deletion cases with inorder successor replacements.
          </p>
        </header>

        {/* Controls Bar */}
        <section className="mt-8">
          <BSTControls
            onInsert={handleInsert}
            onSearch={handleSearch}
            onDelete={handleDelete}
            onReset={handleReset}
            onRandomSample={handleRandomSample}
            isOperating={isOperating}
          />
        </section>

        {/* Tree Canvas */}
        <section className="mt-6">
          <div className="mb-2 flex items-center justify-between px-1 text-xs text-[#6B5B4D]">
            <span className="font-semibold uppercase tracking-wider">
              BST Canvas (Invariant: Left &lt; Root &lt; Right)
            </span>
            <span>Click any node to copy or test deletion</span>
          </div>

          <TreeVisualizer
            root={currentTree}
            currentNodeId={activeStep?.currentNodeId}
            visitedPath={activeStep?.visitedPath || []}
            highlightColor={
              operationType === "delete"
                ? "#DC2626"
                : operationType === "insert"
                ? "#4B7754"
                : "#D97706"
            }
            status={activeStep?.status || "idle"}
            onNodeClick={(val) => {
              if (!isOperating) handleSearch(val);
            }}
          />

          {/* Legend */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 rounded-xl border border-[#EEE5DB] bg-white p-3 text-xs text-[#6B5B4D]">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#D97706]" />
              <span>Comparing Node</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#4B7754]" />
              <span>Target Found / Inserted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#DC2626]" />
              <span>Deleted / Replaced</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#F7F2EB] border border-[#D97706]" />
              <span>Traversed Path</span>
            </div>
          </div>
        </section>

        {/* Step Explanation & Metrics */}
        <section className="mt-6">
          <BSTStepExplanation
            currentStep={activeStep}
            operationType={operationType}
            metrics={metrics}
          />
        </section>

        {/* Theoretical Reference */}
        <section className="mt-16 rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <Sparkles size={20} className="text-[#6F5D86]" />
            <h2 className="font-display text-2xl text-[#1F1B18]">
              BST Complexity &amp; Deletion Invariants
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[#EEE5DB] bg-white p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6F5D86]">
                Case 1: Leaf Deletion
              </span>
              <p className="mt-2 text-sm leading-6 text-[#6B645D]">
                If the node has no children (both left and right subtrees are null), the parent’s pointer is simply set to null.
              </p>
            </div>
            <div className="rounded-2xl border border-[#EEE5DB] bg-white p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6F5D86]">
                Case 2: Single Child
              </span>
              <p className="mt-2 text-sm leading-6 text-[#6B645D]">
                If the node has exactly one child, bypass the node by linking the parent pointer directly to the single child.
              </p>
            </div>
            <div className="rounded-2xl border border-[#EEE5DB] bg-white p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6F5D86]">
                Case 3: Two Children
              </span>
              <p className="mt-2 text-sm leading-6 text-[#6B645D]">
                Find the inorder successor (smallest in right subtree), copy its value into the target node, and recursively delete the successor from the right subtree.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
