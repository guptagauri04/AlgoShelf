import { motion, AnimatePresence } from "framer-motion";
import { ListOrdered, CheckCircle2, ArrowRight } from "lucide-react";

export default function TraversalSequenceTape({
  visitedValues = [],
  totalNodes = 0,
  traversalType = "inorder",
  isFinished = false,
}) {
  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F4ECE3] text-[#A1764E]">
            <ListOrdered size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
              Output Tape
            </p>
            <h3 className="font-display text-2xl text-[#1F1B18]">
              Traversal Sequence
            </h3>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-[#E8DDD1] bg-[#FAF7F2] px-3.5 py-1.5 text-xs font-medium text-[#6B645D]">
            Visited:{" "}
            <strong className="text-[#1F1B18]">{visitedValues.length}</strong> /{" "}
            {totalNodes} nodes
          </span>
          {isFinished && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              <CheckCircle2 size={13} /> Complete
            </span>
          )}
        </div>
      </div>

      {/* Sequence Ribbon */}
      <div className="mt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-2">
          {visitedValues.length === 0 ? (
            <div className="flex w-full items-center justify-center rounded-2xl border border-dashed border-[#DDD2C6] bg-[#FCFBF8] py-8 text-center text-sm text-[#8C837B]">
              <span>
                Start the traversal or click <strong>Play</strong> to see nodes
                emitted into the sequence step by step.
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <AnimatePresence>
                {visitedValues.map((val, idx) => {
                  const isLatest = idx === visitedValues.length - 1;
                  return (
                    <motion.div
                      key={`seq-${idx}-${val}`}
                      initial={{ opacity: 0, scale: 0.6, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 22,
                      }}
                      className="flex items-center gap-2.5"
                    >
                      <div
                        className={`group relative flex flex-col items-center justify-center rounded-2xl border px-4 py-3 shadow-xs transition-all ${
                          isLatest
                            ? "border-[#4D7C57] bg-[#7E9A75] text-white shadow-md ring-2 ring-[#4D7C57]/40"
                            : "border-[#E8DED2] bg-[#FCFAF7] text-[#1F1B18]"
                        }`}
                      >
                        <span
                          className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                            isLatest ? "text-white/80" : "text-[#A1764E]"
                          }`}
                        >
                          #{idx + 1}
                        </span>
                        <span className="font-mono text-2xl font-bold leading-tight">
                          {val}
                        </span>
                      </div>

                      {/* Direction arrow between nodes */}
                      {idx < totalNodes - 1 && (
                        <ArrowRight
                          size={15}
                          className={`transition-colors ${
                            idx < visitedValues.length - 1
                              ? "text-[#A1764E]"
                              : "text-[#D5C7B7]"
                          }`}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Placeholder slots for remaining nodes */}
              {Array.from({
                length: Math.max(0, totalNodes - visitedValues.length),
              }).map((_, i) => (
                <div key={`placeholder-${i}`} className="flex items-center gap-2.5">
                  <div className="flex h-[68px] w-[56px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#DDD2C6] bg-[#FCFBF8]/60 text-xs text-[#B5A99D]">
                    <span>#{visitedValues.length + i + 1}</span>
                    <span className="text-sm font-semibold">?</span>
                  </div>
                  {i < totalNodes - visitedValues.length - 1 && (
                    <ArrowRight size={15} className="text-[#E0D5C7]" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Formatted Text Sequence */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#EDE3D7] bg-[#FCFBF8] px-4 py-3 text-xs">
        <div className="flex items-center gap-2 font-mono">
          <span className="font-semibold text-[#8C837B]">Array Format:</span>
          <span className="font-bold text-[#1F1B18]">
            [{visitedValues.join(", ")}]
          </span>
        </div>
        <div className="text-[#8C837B]">
          Traversal Type:{" "}
          <span className="font-semibold uppercase text-[#A1764E]">
            {traversalType}
          </span>
        </div>
      </div>
    </div>
  );
}
