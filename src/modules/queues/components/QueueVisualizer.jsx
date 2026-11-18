import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function QueueVisualizer({
  buffer = [],
  capacity = 7,
  front = 0,
  rear = 0,
  size = 0,
  highlightIndices = {},
}) {
  return (
    <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEE5DB] pb-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-[#1F1B18]">
            Circular Array Buffer
          </h3>
          <p className="text-xs text-[#8C837B]">
            Indices 0 through {capacity - 1} · Front &amp; Rear modulo indexing
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 shadow-sm">
            <span className="text-[#8C837B]">Front: </span>
            <strong className="text-[#D97706]">{size > 0 ? front : "—"}</strong>
          </div>
          <div className="rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 shadow-sm">
            <span className="text-[#8C837B]">Rear: </span>
            <strong className="text-[#4B7754]">{size > 0 ? rear : "—"}</strong>
          </div>
          <div className="rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 shadow-sm">
            <span className="text-[#8C837B]">Occupancy: </span>
            <strong className="text-[#1F1B18]">
              {size} / {capacity}
            </strong>
          </div>
        </div>
      </div>

      {/* Main Buffer Visualization */}
      <div className="mt-8 flex flex-col items-center">
        <div className="relative flex w-full max-w-2xl items-end justify-center gap-2 overflow-x-auto pb-8 pt-10">
          {Array.from({ length: capacity }).map((_, idx) => {
            const val = buffer[idx];
            const isFront = size > 0 && idx === front;
            const isRear = size > 0 && idx === rear;
            const isHighlighted = highlightIndices[idx];

            let cellBg = "bg-white";
            let borderColor = "border-[#D8CDBD]";
            let textColor = "text-[#1F1B18]";

            if (isHighlighted === "enqueue") {
              cellBg = "bg-[#E6EFE6]";
              borderColor = "border-[#4B7754]";
              textColor = "text-[#2D4B34]";
            } else if (isHighlighted === "dequeue") {
              cellBg = "bg-[#FEE2E2]";
              borderColor = "border-[#DC2626]";
              textColor = "text-[#991B1B]";
            } else if (isHighlighted === "peek") {
              cellBg = "bg-[#FEF3C7]";
              borderColor = "border-[#D97706]";
              textColor = "text-[#92400E]";
            } else if (val !== null && val !== undefined) {
              cellBg = "bg-[#FAF7F2]";
              borderColor = "border-[#CBBBB0]";
            }

            return (
              <div key={`queue-slot-${idx}`} className="relative flex flex-col items-center">
                {/* Pointer Indicators (Top) */}
                <div className="absolute -top-10 flex h-8 flex-col items-center justify-end">
                  {isFront && (
                    <motion.div
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex flex-col items-center text-[#D97706]"
                    >
                      <span className="rounded bg-[#FEF3C7] px-1.5 py-0.2 font-mono text-[10px] font-bold text-[#B45309]">
                        FRONT
                      </span>
                      <ArrowDown size={14} className="stroke-[3]" />
                    </motion.div>
                  )}
                </div>

                {/* Queue Cell */}
                <motion.div
                  layout
                  className={`flex h-16 w-16 sm:h-20 sm:w-20 flex-col items-center justify-center rounded-2xl border-2 ${borderColor} ${cellBg} shadow-sm transition-colors duration-300`}
                >
                  <AnimatePresence mode="wait">
                    {val !== null && val !== undefined ? (
                      <motion.span
                        key={`cell-val-${val}-${idx}`}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        className={`font-mono text-base sm:text-xl font-bold ${textColor}`}
                      >
                        {val}
                      </motion.span>
                    ) : (
                      <span className="font-mono text-xs text-[#C5BDB3] italic select-none">
                        ø
                      </span>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Index & Rear Pointer (Bottom) */}
                <div className="mt-2 flex flex-col items-center">
                  <span className="font-mono text-xs text-[#8C837B]">[{idx}]</span>
                  {isRear && (
                    <motion.div
                      initial={{ y: 5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="mt-1 flex flex-col items-center text-[#4B7754]"
                    >
                      <ArrowUp size={14} className="stroke-[3]" />
                      <span className="rounded bg-[#E6EFE6] px-1.5 py-0.2 font-mono text-[10px] font-bold text-[#2D4B34]">
                        REAR
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Direction Flow Guide */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 rounded-xl border border-[#EEE5DB] bg-white p-3 text-xs text-[#6B5B4D]">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#D97706]" />
            <span>Front (Deletions exit here)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#4B7754]" />
            <span>Rear (Additions enter here)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-bold text-[#A1764E]">FIFO:</span>
            <span>First In, First Out order preserved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
