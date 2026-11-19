import { motion } from "framer-motion";
import { ArrowLeft, Layers } from "lucide-react";

export default function StackVisualizer({
  buffer = [],
  top = -1,
  maxCapacity = 6,
  highlightTop = false,
  message = null,
}) {
  const currentSize = top + 1;

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Pointer-Based Memory
          </p>
          <h2 className="mt-1 font-display text-3xl text-[#1F1B18]">
            Stack Canister (Top Pointer)
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-mono text-xs font-semibold text-[#6B5B4D]">
            Size: {currentSize} / {maxCapacity}
          </span>
          {currentSize === maxCapacity && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
              Full
            </span>
          )}
          {currentSize === 0 && (
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
              Empty (Top = -1)
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

      {/* Canister Container */}
      <div className="flex justify-center py-6">
        <div className="relative flex w-full max-w-sm flex-col items-center">
          {/* Top Entry Indicator */}
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
            <span>Push / Pop Access Point</span>
            <Layers size={14} />
          </div>

          {/* Vertical Canister Wall */}
          <div className="relative flex min-h-[380px] w-64 flex-col-reverse items-center justify-start rounded-b-3xl border-x-4 border-b-4 border-[#C8B8A6] bg-[#FCFBF8] p-4 shadow-inner gap-2">
            {buffer.map((slot, index) => {
              const isTop = index === top;
              const isOccupied = slot !== null && slot !== undefined;

              return (
                <motion.div
                  key={index}
                  layout
                  animate={{
                    scale: isTop && highlightTop ? 1.05 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 24,
                  }}
                  className={`relative flex h-12 w-full items-center justify-between rounded-xl border px-4 font-mono text-base font-bold shadow-sm transition-all duration-300 ${
                    isOccupied
                      ? isTop && highlightTop
                        ? "border-[#D39B2A] bg-[#FEF9EE] text-[#8B5A2B] ring-2 ring-[#D39B2A]/40 shadow-md"
                        : isTop
                        ? "border-[#A1764E] bg-white text-[#1F1B18]"
                        : "border-[#E8DDD1] bg-white text-[#5F5952]"
                      : "border-dashed border-[#DDD2C6] bg-transparent text-[#B5A89B]"
                  }`}
                >
                  <span className="text-xs text-[#8C837B]">[{index}]</span>
                  <span className="text-lg">{isOccupied ? slot.value : "—"}</span>
                  {isTop ? (
                    <span className="flex items-center gap-1 rounded bg-[#A1764E] px-1.5 py-0.5 text-[10px] font-bold text-white uppercase shadow-xs">
                      <ArrowLeft size={10} className="rotate-90" />
                      Top
                    </span>
                  ) : (
                    <span className="w-10" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Canister Base Indicator */}
          <div className="mt-3 text-center">
            <span className="font-mono text-xs text-[#8C837B]">
              Top Pointer Index: <strong className="text-[#A1764E]">{top}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Pointer State Metrics */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center border-t border-[#EEE5DB] pt-5">
        <div className="rounded-xl border border-[#EEE5DB] bg-[#FAF8F5] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8C837B]">Top Index</p>
          <p className="mt-1 font-mono text-lg font-bold text-[#A1764E]">{top}</p>
        </div>
        <div className="rounded-xl border border-[#EEE5DB] bg-[#FAF8F5] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8C837B]">Items Count</p>
          <p className="mt-1 font-mono text-lg font-bold text-[#1F1B18]">{currentSize}</p>
        </div>
        <div className="rounded-xl border border-[#EEE5DB] bg-[#FAF8F5] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8C837B]">Max Capacity</p>
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
