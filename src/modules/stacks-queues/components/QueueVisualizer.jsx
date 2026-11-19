import { motion } from "framer-motion";
import { CornerDownLeft, CornerDownRight, RotateCw } from "lucide-react";

export default function QueueVisualizer({
  buffer = [],
  front = 0,
  rear = 0,
  size = 0,
  maxCapacity = 6,
  highlightFront = false,
  message = null,
}) {
  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Circular Buffer Memory
          </p>
          <h2 className="mt-1 font-display text-3xl text-[#1F1B18]">
            Circular Queue (Ring Buffer)
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-mono text-xs font-semibold text-[#6B5B4D]">
            Size: {size} / {maxCapacity}
          </span>
          {size === maxCapacity && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
              Full
            </span>
          )}
          {size === 0 && (
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
              Empty
            </span>
          )}
        </div>
      </div>

      {/* Message Banner */}
      {message && (
        <div
          className={`mb-6 rounded-2xl p-4 text-sm font-medium ${
            message.type === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : message.type === "success"
              ? "bg-[#EAF2E8] text-[#3D5A37] border border-[#5A7354]/20"
              : "bg-[#FEF9EE] text-[#8B5A2B] border border-[#D39B2A]/20"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Circular Flow Indicator */}
      <div className="mb-4 flex flex-wrap items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#A1764E] px-4 gap-2">
        <div className="flex items-center gap-1.5 text-[#5A7354]">
          <CornerDownLeft size={16} />
          <span>Front Pointer (Exit/Dequeue)</span>
        </div>
        <div className="flex items-center gap-2 text-[#8C837B]">
          <RotateCw size={14} />
          <span>Modulo Wrap: (ptr + 1) % {maxCapacity}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#A1764E]">
          <span>Rear Pointer (Enter/Enqueue)</span>
          <CornerDownRight size={16} />
        </div>
      </div>

      {/* Fixed Pre-Allocated Slot Array */}
      <div className="min-h-48 overflow-x-auto rounded-2xl border-y-4 border-[#C8B8A6] bg-[#FCFBF8] p-6 shadow-inner">
        <div className="flex min-w-max items-center justify-center gap-3 md:gap-4 mx-auto">
          {buffer.map((slot, index) => {
            const isFront = size > 0 && index === front;
            const isRear = index === rear;
            const isOccupied = slot !== null && slot !== undefined;

            return (
              <div key={index} className="flex flex-col items-center gap-2">
                {/* Pointer Indicator */}
                <div className="h-6 flex items-center justify-center gap-1">
                  {isFront && (
                    <span className="rounded-full bg-[#5A7354] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                      Front
                    </span>
                  )}
                  {isRear && (
                    <span className="rounded-full bg-[#A1764E] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                      Rear
                    </span>
                  )}
                </div>

                {/* Slot Box */}
                <motion.div
                  layout
                  animate={{
                    scale: isFront && highlightFront ? 1.08 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className={`flex h-20 w-18 md:w-20 items-center justify-center rounded-2xl border font-mono text-2xl font-bold transition-all duration-300 ${
                    isOccupied
                      ? isFront && highlightFront
                        ? "border-[#D39B2A] bg-[#FEF9EE] text-[#8B5A2B] ring-2 ring-[#D39B2A]/40 shadow-lg"
                        : isFront
                        ? "border-[#5A7354] bg-[#EAF2E8] text-[#3D5A37] shadow-sm"
                        : "border-[#E8DDD1] bg-white text-[#1F1B18] shadow-sm"
                      : "border-dashed border-[#D8C7B5] bg-[#F7F3EE]/50 text-[#B3A69A]"
                  }`}
                >
                  {isOccupied ? slot.value : "—"}
                </motion.div>

                {/* Slot Memory Index */}
                <span className="font-mono text-xs text-[#8C837B]">
                  [{index}]
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pointer State Metrics */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="rounded-xl border border-[#EEE5DB] bg-[#FAF8F5] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8C837B]">Front Index</p>
          <p className="mt-1 font-mono text-lg font-bold text-[#5A7354]">{front}</p>
        </div>
        <div className="rounded-xl border border-[#EEE5DB] bg-[#FAF8F5] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8C837B]">Rear Index</p>
          <p className="mt-1 font-mono text-lg font-bold text-[#A1764E]">{rear}</p>
        </div>
        <div className="rounded-xl border border-[#EEE5DB] bg-[#FAF8F5] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8C837B]">Capacity</p>
          <p className="mt-1 font-mono text-lg font-bold text-[#1F1B18]">{maxCapacity}</p>
        </div>
        <div className="rounded-xl border border-[#EEE5DB] bg-[#FAF8F5] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8C837B]">Time Complexity</p>
          <p className="mt-1 font-mono text-lg font-bold text-[#5A7354]">O(1)</p>
        </div>
      </div>
    </div>
  );
}
