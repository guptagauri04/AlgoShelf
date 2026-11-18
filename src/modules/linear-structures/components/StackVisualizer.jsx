import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUp, Layers, AlertCircle } from "lucide-react";

export default function StackVisualizer({
  stack = [],
  capacity = 6,
  peekIndex = -1,
}) {
  const isFull = stack.length >= capacity;
  const isEmpty = stack.length === 0;

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Header Info */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-[#A1764E]" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
              Stack Container (LIFO)
            </p>
          </div>
          <h2 className="mt-1 font-display text-3xl text-[#1F1B18]">
            {stack.length} / {capacity} Elements
          </h2>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2">
            <span className="text-xs uppercase tracking-wider text-[#8C837B]">Top Index:</span>
            <span className="font-mono text-base font-bold text-[#1F1B18]">
              {isEmpty ? "-1 (Empty)" : stack.length - 1}
            </span>
          </div>

          {isFull && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#FEF3EB] px-3.5 py-1.5 text-xs font-semibold text-[#A64A25]">
              <AlertCircle size={14} />
              Full (Overflow on Push)
            </div>
          )}
          {isEmpty && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#F4ECE3] px-3.5 py-1.5 text-xs font-semibold text-[#8C6D53]">
              Empty (Underflow on Pop)
            </div>
          )}
        </div>
      </div>

      {/* Main Stack Chamber */}
      <div className="flex flex-col items-center justify-center py-6">
        {/* Open Top Indicator with Insertion Arrow */}
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
          <ArrowUp size={16} className="animate-bounce" />
          <span>Top of Stack (Push / Pop Access Point)</span>
        </div>

        {/* Stack Cylinder / Chamber */}
        <div className="relative w-full max-w-md rounded-b-3xl border-b-4 border-l-4 border-r-4 border-[#BCA592] bg-[#FAF8F5] p-5 shadow-inner">
          <div className="flex flex-col-reverse gap-3 min-h-[320px] justify-start">
            {/* Render Empty and Filled Slots */}
            {Array.from({ length: capacity }).map((_, slotIndex) => {
              const hasElement = slotIndex < stack.length;
              const value = hasElement ? stack[slotIndex] : null;
              const isTop = slotIndex === stack.length - 1;
              const isPeeked = slotIndex === peekIndex;

              let plateStyle = "border-dashed border-[#DDD2C6] bg-white/40 text-[#B5A99D]";
              if (hasElement) {
                if (isPeeked) {
                  plateStyle =
                    "border-[#5A7354] bg-[#EAF2E8] text-[#3D5A37] shadow-md ring-2 ring-[#5A7354]/40";
                } else if (isTop) {
                  plateStyle =
                    "border-[#D39B2A] bg-[#FEF9EE] text-[#8B5A2B] shadow-md ring-2 ring-[#D39B2A]/40";
                } else {
                  plateStyle =
                    "border-[#D8C7B5] bg-white text-[#1F1B18] shadow-sm";
                }
              }

              return (
                <div key={slotIndex} className="relative flex items-center gap-4">
                  {/* Slot Number */}
                  <span className="w-12 font-mono text-xs font-medium text-[#A69C93]">
                    [{slotIndex}]
                  </span>

                  {/* Element Block */}
                  <div className="flex-1">
                    <AnimatePresence mode="popLayout">
                      {hasElement ? (
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: -40, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -40, scale: 0.8 }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className={`flex h-12 items-center justify-between rounded-xl border px-5 font-mono font-bold text-lg transition-all ${plateStyle}`}
                        >
                          <span>{value}</span>
                          <span className="text-xs font-normal tracking-wide text-[#8C837B]">
                            {isTop ? "TOP ITEM" : isPeeked ? "PEEKED" : `Depth: ${stack.length - 1 - slotIndex}`}
                          </span>
                        </motion.div>
                      ) : (
                        <div
                          className={`flex h-12 items-center justify-center rounded-xl border border-dashed border-[#E3D7C9] bg-[#FCFBF8]/60 text-xs font-mono text-[#C4B7AA]`}
                        >
                          Empty Slot
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Top Pointer Badge */}
                  <div className="w-28 flex items-center">
                    {isTop && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-1.5 rounded-full bg-[#1F1B18] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm"
                      >
                        <ArrowLeft size={13} className="text-[#E8DED2]" />
                        <span>TOP</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Solid Base Plate */}
          <div className="mt-4 flex items-center justify-center border-t-2 border-[#D8C7B5] pt-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A69C93]">
              Closed Base of Stack (No Access)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
