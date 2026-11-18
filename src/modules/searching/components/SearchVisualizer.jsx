import { motion } from "framer-motion";
import { Check, Search, X, ArrowDown } from "lucide-react";

export default function SearchVisualizer({
  array = [],
  currentIndex = -1,
  checkedIndices = [],
  foundIndex = -1,
  lowIndex = -1,
  highIndex = -1,
  midIndex = -1,
  eliminatedIndices = [],
  target = null,
  status = "idle",
  isBinary = false,
}) {
  // Helper to determine pointer label for binary search
  const getBinaryPointerLabel = (index) => {
    if (index === foundIndex) return "Match";
    const isL = index === lowIndex;
    const isM = index === midIndex;
    const isH = index === highIndex;

    if (isL && isM && isH) return "L / M / H";
    if (isL && isM) return "Low / Mid";
    if (isH && isM) return "Mid / High";
    if (isL && isH) return "Low / High";
    if (isM) return "Mid";
    if (isL) return "Low";
    if (isH) return "High";
    return null;
  };

  const getBinaryPointerColor = (index) => {
    if (index === foundIndex) return "bg-[#5A7354] text-white";
    if (index === midIndex) return "bg-[#C4883A] text-white";
    if (index === lowIndex || index === highIndex) return "bg-[#7A6352] text-white";
    return "bg-[#A1764E] text-white";
  };

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Header Info */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            {isBinary ? "Binary Search Space (Sorted)" : "Search Space"}
          </p>
          <div className="flex items-center gap-3">
            <h2 className="mt-1 font-display text-3xl text-[#1F1B18]">
              {array.length} Elements
            </h2>
            {isBinary && lowIndex >= 0 && highIndex >= 0 && (
              <span className="rounded-full border border-[#DDD2C6] bg-[#FCFBF8] px-3 py-1 font-mono text-xs font-medium text-[#7A6B5D]">
                Window: [{lowIndex}..{highIndex}]
              </span>
            )}
          </div>
        </div>

        {/* Target Badge & Live Status */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2">
            <Search size={16} className="text-[#A1764E]" />
            <span className="text-xs uppercase tracking-wider text-[#8C837B]">
              Target:
            </span>
            <span className="font-mono text-lg font-bold text-[#1F1B18]">
              {target !== null ? target : "--"}
            </span>
          </div>

          {/* Status Badge */}
          {status === "found" && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#EAF2E8] px-3.5 py-1.5 text-xs font-semibold text-[#3D5A37]">
              <Check size={14} />
              Found at index {foundIndex}
            </div>
          )}
          {status === "not_found" && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#FCEEEA] px-3.5 py-1.5 text-xs font-semibold text-[#A84533]">
              <X size={14} />
              Target not found
            </div>
          )}
          {status === "checking" && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#FEF9EE] px-3.5 py-1.5 text-xs font-semibold text-[#8B5A2B]">
              <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[#A1764E]" />
              {isBinary ? `Comparing Mid [${midIndex}] with Target` : `Inspecting Index ${currentIndex}`}
            </div>
          )}
          {status === "eliminating_left" && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#F5ECE3] px-3.5 py-1.5 text-xs font-semibold text-[#8B5A2B]">
              arr[mid] &lt; target → Discard left
            </div>
          )}
          {status === "eliminating_right" && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#F5ECE3] px-3.5 py-1.5 text-xs font-semibold text-[#8B5A2B]">
              arr[mid] &gt; target → Discard right
            </div>
          )}
        </div>
      </div>

      {/* Array Elements Container */}
      <div className="min-h-52 overflow-x-auto py-4">
        <div className="flex min-w-max items-center justify-center gap-4 px-4">
          {array.map((value, index) => {
            const isFound = index === foundIndex;
            const isCurrent = index === currentIndex || index === midIndex;
            const isCheckedLinear = checkedIndices.includes(index) && !isFound;
            const isEliminatedBinary =
              isBinary &&
              (eliminatedIndices.includes(index) ||
                (lowIndex !== -1 && highIndex !== -1 && (index < lowIndex || index > highIndex)));
            const isInActiveWindow =
              isBinary && lowIndex !== -1 && highIndex !== -1 && index >= lowIndex && index <= highIndex;

            let cardStyle =
              "border-[#E8DDD1] bg-[#FCFBF8] text-[#1F1B18] shadow-sm";

            if (isFound) {
              cardStyle =
                "border-[#5A7354] bg-[#EAF2E8] text-[#3D5A37] shadow-md ring-2 ring-[#5A7354]/40";
            } else if (isCurrent) {
              cardStyle =
                "border-[#D39B2A] bg-[#FEF9EE] text-[#8B5A2B] shadow-lg ring-2 ring-[#D39B2A]/40";
            } else if (isEliminatedBinary) {
              cardStyle =
                "border-dashed border-[#DDD2C6] bg-[#F7F5F2] text-[#A69C93] opacity-40";
            } else if (isCheckedLinear) {
              cardStyle = "border-[#E8E2D9] bg-[#F7F5F2] text-[#8C837B] opacity-60";
            } else if (isInActiveWindow) {
              cardStyle = "border-[#BCA592] bg-white text-[#1F1B18] shadow-sm";
            }

            const binaryPointer = isBinary ? getBinaryPointerLabel(index) : null;

            return (
              <motion.div
                key={index}
                layout
                animate={{
                  scale: isFound ? 1.08 : isCurrent ? 1.06 : 1,
                  y: isFound ? -8 : isCurrent ? -6 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 22,
                }}
                className="flex flex-col items-center gap-2"
              >
                {/* Pointer indicator above element */}
                <div className="h-7 flex items-center justify-center">
                  {!isBinary && isCurrent && !isFound && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 rounded-full bg-[#A1764E] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                    >
                      <ArrowDown size={10} />
                      Target Pointer
                    </motion.div>
                  )}
                  {!isBinary && isFound && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="rounded-full bg-[#5A7354] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                    >
                      Match
                    </motion.div>
                  )}

                  {isBinary && binaryPointer && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm ${getBinaryPointerColor(
                        index
                      )}`}
                    >
                      {binaryPointer}
                    </motion.div>
                  )}
                </div>

                {/* Number Box */}
                <div
                  className={`flex h-20 w-18 items-center justify-center rounded-2xl border font-mono text-2xl font-bold transition-all duration-300 ${cardStyle}`}
                >
                  {value}
                </div>

                {/* Index Subtitle */}
                <span
                  className={`font-mono text-xs font-medium ${
                    isFound
                      ? "text-[#5A7354] font-semibold"
                      : isCurrent
                      ? "text-[#A1764E] font-semibold"
                      : "text-[#8C837B]"
                  }`}
                >
                  [{index}]
                </span>

                {/* Active Range Line indicator for Binary Search */}
                {isBinary && isInActiveWindow && (
                  <div className="h-1 w-6 rounded-full bg-[#A1764E]/40" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
