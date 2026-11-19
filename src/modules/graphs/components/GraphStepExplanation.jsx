import { motion, AnimatePresence } from "framer-motion";
import { Info, Layers, CheckCircle2 } from "lucide-react";

export default function GraphStepExplanation({
  algorithm = "BFS",
  currentStep,
  traversalOrder = [],
}) {
  if (!currentStep) return null;

  const isBFS = algorithm === "BFS";
  const dataStructureItems = isBFS ? currentStep.queue || [] : currentStep.callStack || [];

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* Current Step Description Card */}
      <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-5 shadow-sm">
        <div className="flex items-center gap-2 text-[#A1764E]">
          <Info size={16} />
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#1F1B18]">
            Step Details
          </h4>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#4A3B32]">
          {currentStep.explanation}
        </p>

        {/* Visited Sequence */}
        <div className="mt-4 border-t border-[#EEE5DB] pt-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B5B4D]">
            <CheckCircle2 size={13} className="text-[#4B7754]" />
            <span>Visited Order ({traversalOrder.length}):</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {traversalOrder.length > 0 ? (
              traversalOrder.map((nodeId, idx) => (
                <div key={`visited-seq-${nodeId}-${idx}`} className="flex items-center gap-1">
                  <span className="rounded-md bg-[#E6EFE6] px-2 py-0.5 font-bold text-[#2D4B34] border border-[#C5DDC5]">
                    {nodeId}
                  </span>
                  {idx < traversalOrder.length - 1 && (
                    <span className="text-[#A89F95]">→</span>
                  )}
                </div>
              ))
            ) : (
              <span className="text-xs text-[#A89F95] italic">None yet</span>
            )}
          </div>
        </div>
      </div>

      {/* Auxiliary Data Structure Card (FIFO Queue or Call Stack) */}
      <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#A1764E]">
            <Layers size={16} />
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#1F1B18]">
              {isBFS ? "FIFO Queue" : "LIFO Call Stack"}
            </h4>
          </div>
          <span className="text-xs font-mono text-[#8C837B]">
            {isBFS ? "Front → Back" : "Top of Stack (Right)"}
          </span>
        </div>

        <div className="mt-4 min-h-[60px] rounded-xl border border-[#EEE5DB] bg-white p-3 flex items-center gap-2 overflow-x-auto">
          <AnimatePresence>
            {dataStructureItems.length > 0 ? (
              dataStructureItems.map((item, idx) => (
                <motion.div
                  key={`ds-${item}-${idx}`}
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold shadow-sm ${
                    idx === (isBFS ? 0 : dataStructureItems.length - 1)
                      ? "bg-[#D97706] text-white ring-2 ring-[#B45309]"
                      : "bg-[#F7F2EB] text-[#4A3B32] border border-[#E8DDD1]"
                  }`}
                >
                  {item}
                </motion.div>
              ))
            ) : (
              <span className="text-xs text-[#A89F95] italic mx-auto">
                {isBFS ? "Queue is empty" : "Call stack is empty"}
              </span>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-2 text-[11px] text-[#8C837B]">
          {isBFS
            ? "Nodes are processed in first-in, first-out order guaranteeing shortest unweighted path."
            : "Nodes are pushed on discovery and popped when recursive exploration terminates."}
        </p>
      </div>
    </div>
  );
}
