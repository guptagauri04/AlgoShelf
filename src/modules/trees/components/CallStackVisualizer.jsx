import { Layers, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CallStackVisualizer({ callStack = [] }) {
  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F4ECE3] text-[#A1764E]">
            <Layers size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
              Recursion Engine
            </p>
            <h3 className="font-display text-2xl text-[#1F1B18]">
              Call Stack
            </h3>
          </div>
        </div>

        <div className="rounded-full border border-[#E8DDD1] bg-[#FAF7F2] px-3.5 py-1 text-xs font-medium text-[#6B645D]">
          Stack Depth:{" "}
          <strong className="font-mono text-[#1F1B18]">{callStack.length}</strong>
        </div>
      </div>

      {/* Stack Frames (Top of stack at top) */}
      <div className="mt-5 space-y-2.5">
        {callStack.length === 0 ? (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-[#DDD2C6] bg-[#FCFBF8] py-8 text-center text-xs text-[#8C837B]">
            Call stack is empty. Click Play to observe recursion frames.
          </div>
        ) : (
          <div className="flex flex-col-reverse gap-2">
            <AnimatePresence>
              {callStack.map((frame, index) => {
                const isTop = index === callStack.length - 1;
                return (
                  <motion.div
                    key={`frame-${index}-${frame.name}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all ${
                      isTop
                        ? "border-[#A1764E] bg-[#FAF5EE] shadow-xs ring-1 ring-[#A1764E]/30"
                        : "border-[#E8DED2] bg-[#FCFAF7] text-[#6B645D]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] font-semibold text-[#A1764E]">
                        depth {index + 1}
                      </span>
                      <span className="font-mono text-sm font-bold text-[#1F1B18]">
                        {frame.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                          isTop
                            ? "bg-[#A1764E] text-white"
                            : "bg-[#EFE8DF] text-[#7A6F64]"
                        }`}
                      >
                        {frame.phase}
                      </span>
                      {isTop && (
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#A1764E]">
                          [Active]
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-[#8C837B]">
        <ArrowDown size={14} className="text-[#A1764E]" />
        <span>Stack unwinds automatically as base cases are hit and subtrees return.</span>
      </div>
    </div>
  );
}
