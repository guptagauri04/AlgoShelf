import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function StackVisualizer({
  items = [],
  capacity = 7,
  highlightTop = null,
}) {
  const topIndex = items.length - 1;

  // We display slot indices from capacity - 1 down to 0 (vertical stack)
  const slots = Array.from({ length: capacity }, (_, i) => capacity - 1 - i);

  return (
    <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEE5DB] pb-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-[#1F1B18]">
            Vertical Stack Frame
          </h3>
          <p className="text-xs text-[#8C837B]">
            Bottom index [0] to top index [{capacity - 1}] · Single boundary access
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 shadow-sm">
            <span className="text-[#8C837B]">Top Index: </span>
            <strong className="text-[#D97706]">{topIndex >= 0 ? `[${topIndex}]` : "Empty (-1)"}</strong>
          </div>
          <div className="rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 shadow-sm">
            <span className="text-[#8C837B]">Current Top: </span>
            <strong className="text-[#4B7754]">{topIndex >= 0 ? items[topIndex] : "—"}</strong>
          </div>
          <div className="rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 shadow-sm">
            <span className="text-[#8C837B]">Occupancy: </span>
            <strong className="text-[#1F1B18]">{items.length} / {capacity}</strong>
          </div>
        </div>
      </div>

      {/* Main Vertical Stack Chamber */}
      <div className="mt-8 flex flex-col items-center">
        <div className="relative flex flex-col items-center rounded-b-2xl border-b-4 border-l-4 border-r-4 border-[#C5B7A5] bg-[#FAF8F5] p-4 shadow-inner">
          <div className="flex flex-col gap-2">
            {slots.map((slotIdx) => {
              const hasItem = slotIdx < items.length;
              const val = hasItem ? items[slotIdx] : null;
              const isTop = slotIdx === topIndex;

              let cellBg;
              let borderColor;
              let textColor = "text-[#1F1B18]";

              if (isTop && highlightTop === "push") {
                cellBg = "bg-[#E6EFE6]";
                borderColor = "border-[#4B7754]";
                textColor = "text-[#2D4B34]";
              } else if (isTop && highlightTop === "pop") {
                cellBg = "bg-[#FEE2E2]";
                borderColor = "border-[#DC2626]";
                textColor = "text-[#991B1B]";
              } else if (isTop && highlightTop === "peek") {
                cellBg = "bg-[#FEF3C7]";
                borderColor = "border-[#D97706]";
                textColor = "text-[#92400E]";
              } else if (hasItem) {
                cellBg = "bg-white";
                borderColor = "border-[#CBBBB0]";
              } else {
                cellBg = "bg-transparent";
                borderColor = "border-dashed border-[#E0D7CC]";
              }

              return (
                <div key={`stack-slot-${slotIdx}`} className="relative flex items-center gap-3">
                  {/* Slot Index Label */}
                  <span className="w-8 text-right font-mono text-xs text-[#8C837B]">
                    [{slotIdx}]
                  </span>

                  {/* Element Block */}
                  <motion.div
                    layout
                    className={`flex h-12 w-48 sm:w-64 items-center justify-center rounded-xl border-2 ${borderColor} ${cellBg} shadow-sm transition-colors duration-300`}
                  >
                    <AnimatePresence mode="wait">
                      {val !== null ? (
                        <motion.span
                          key={`val-${val}-${slotIdx}`}
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          className={`font-mono text-base font-bold ${textColor}`}
                        >
                          {val}
                        </motion.span>
                      ) : (
                        <span className="font-mono text-xs text-[#DDD5CB] italic select-none">
                          Empty Slot
                        </span>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* TOP Pointer Indicator */}
                  <div className="w-24">
                    {isTop && (
                      <motion.div
                        initial={{ x: 5, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex items-center gap-1 font-mono text-xs font-bold text-[#D97706]"
                      >
                        <ArrowLeft size={16} className="stroke-[3]" />
                        <span className="rounded bg-[#FEF3C7] px-1.5 py-0.5 text-[10px] text-[#B45309]">
                          TOP
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 rounded-xl border border-[#EEE5DB] bg-white p-3 text-xs text-[#6B5B4D]">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#D97706]" />
            <span>TOP (Only accessible boundary)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-bold text-[#A1764E]">LIFO:</span>
            <span>Last In, First Out order strictly preserved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-bold text-[#4B7754]">Time:</span>
            <span>O(1) Push, Pop &amp; Peek</span>
          </div>
        </div>
      </div>
    </div>
  );
}
