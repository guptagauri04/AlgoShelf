import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowDown, GitCommit, AlertCircle } from "lucide-react";

export default function QueueVisualizer({
  queue = [],
  capacity = 7,
  peekIndex = -1,
}) {
  const isFull = queue.length >= capacity;
  const isEmpty = queue.length === 0;

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Header Info */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <GitCommit size={18} className="text-[#A1764E]" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
              Queue Pipeline (FIFO)
            </p>
          </div>
          <h2 className="mt-1 font-display text-3xl text-[#1F1B18]">
            {queue.length} / {capacity} Elements
          </h2>
        </div>

        {/* Status Indicators */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2">
            <span className="text-xs uppercase tracking-wider text-[#8C837B]">Front:</span>
            <span className="font-mono text-base font-bold text-[#1F1B18]">
              {isEmpty ? "--" : `[0] = ${queue[0]}`}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2">
            <span className="text-xs uppercase tracking-wider text-[#8C837B]">Rear:</span>
            <span className="font-mono text-base font-bold text-[#1F1B18]">
              {isEmpty ? "--" : `[${queue.length - 1}] = ${queue[queue.length - 1]}`}
            </span>
          </div>

          {isFull && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#FEF3EB] px-3.5 py-1.5 text-xs font-semibold text-[#A64A25]">
              <AlertCircle size={14} />
              Full (Overflow)
            </div>
          )}
          {isEmpty && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#F4ECE3] px-3.5 py-1.5 text-xs font-semibold text-[#8C6D53]">
              Empty (Underflow)
            </div>
          )}
        </div>
      </div>

      {/* Direction & Flow Markers */}
      <div className="mb-4 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-wider text-[#8C837B]">
        <div className="flex items-center gap-1.5 text-[#5A7354]">
          <ArrowLeft size={16} />
          <span>Exit: Dequeue from Front</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#A1764E]">
          <span>Entrance: Enqueue at Rear</span>
          <ArrowRight size={16} />
        </div>
      </div>

      {/* Main Horizontal Pipeline */}
      <div className="min-h-52 overflow-x-auto rounded-3xl border-2 border-[#D8C7B5] bg-[#FAF8F5] p-6 shadow-inner">
        <div className="flex min-w-max items-center justify-start gap-4">
          <AnimatePresence mode="popLayout">
            {queue.map((value, index) => {
              const isFront = index === 0;
              const isRear = index === queue.length - 1;
              const isPeeked = index === peekIndex;

              let cardStyle = "border-[#D8C7B5] bg-white text-[#1F1B18] shadow-sm";
              if (isPeeked) {
                cardStyle =
                  "border-[#5A7354] bg-[#EAF2E8] text-[#3D5A37] shadow-md ring-2 ring-[#5A7354]/40";
              } else if (isFront) {
                cardStyle =
                  "border-[#D39B2A] bg-[#FEF9EE] text-[#8B5A2B] shadow-md ring-2 ring-[#D39B2A]/40";
              } else if (isRear) {
                cardStyle =
                  "border-[#8B5A2B] bg-[#FCFBF8] text-[#1F1B18] shadow-sm ring-1 ring-[#8B5A2B]/20";
              }

              return (
                <motion.div
                  key={`${index}-${value}`}
                  layout
                  initial={{ opacity: 0, x: 60, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -60, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="flex flex-col items-center gap-2"
                >
                  {/* Pointer Above Element */}
                  <div className="h-7 flex items-center justify-center">
                    {isFront && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 rounded-full bg-[#1F1B18] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                      >
                        <ArrowDown size={10} />
                        FRONT
                      </motion.div>
                    )}
                    {!isFront && isRear && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 rounded-full bg-[#8B5A2B] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                      >
                        <ArrowDown size={10} />
                        REAR
                      </motion.div>
                    )}
                    {isPeeked && !isFront && !isRear && (
                      <div className="rounded-full bg-[#5A7354] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        PEEKED
                      </div>
                    )}
                  </div>

                  {/* Number Block */}
                  <div
                    className={`flex h-20 w-18 items-center justify-center rounded-2xl border font-mono text-2xl font-bold transition-all duration-300 ${cardStyle}`}
                  >
                    {value}
                  </div>

                  {/* Index and Position Subtitle */}
                  <span className="font-mono text-xs font-semibold text-[#8C837B]">
                    [{index}]
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Render remaining empty slots up to capacity */}
          {Array.from({ length: Math.max(0, capacity - queue.length) }).map((_, emptyIdx) => {
            const actualSlot = queue.length + emptyIdx;
            return (
              <div
                key={`empty-${actualSlot}`}
                className="flex flex-col items-center gap-2 opacity-50"
              >
                <div className="h-7" />
                <div className="flex h-20 w-18 items-center justify-center rounded-2xl border-2 border-dashed border-[#DDD2C6] bg-white/40 font-mono text-xs text-[#C4B7AA]">
                  Empty
                </div>
                <span className="font-mono text-xs text-[#C4B7AA]">[{actualSlot}]</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
