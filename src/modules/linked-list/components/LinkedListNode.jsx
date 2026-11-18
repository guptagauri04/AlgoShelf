import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function LinkedListNode({
  node,
  index,
  isHead,
  isTail,
  isHighlighted,
  isTarget,
  action,
}) {
  let badgeText = null;
  let badgeColor = "bg-[#8B5A2B] text-white";

  if (isHead) {
    badgeText = "HEAD";
    badgeColor = "bg-[#A1764E] text-white";
  } else if (isHighlighted && action === "found-prev") {
    badgeText = "PREV";
    badgeColor = "bg-[#C27803] text-white";
  } else if (isTarget && action === "mark-delete") {
    badgeText = "DELETE";
    badgeColor = "bg-[#C84B31] text-white";
  } else if (isHighlighted) {
    badgeText = `IDX ${index}`;
    badgeColor = "bg-[#6A5D52] text-white";
  }

  // Node container styling
  let borderBgClass = "border-[#E8DDD1] bg-white text-[#1F1B18]";
  if (isTarget && action === "mark-delete") {
    borderBgClass = "border-[#C84B31] bg-[#FDF2F0] text-[#9E2A2B] shadow-md ring-2 ring-[#C84B31]/30";
  } else if (isHighlighted) {
    borderBgClass = "border-[#A1764E] bg-[#FDF9F5] text-[#8B5A2B] shadow-md ring-2 ring-[#A1764E]/40";
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: -20 }}
      transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
      className="relative flex items-center shrink-0"
    >
      {/* Top Pointer Badge */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex gap-1">
        {badgeText && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm transition-all ${badgeColor}`}
          >
            {badgeText}
          </span>
        )}
      </div>

      {/* Node Capsule: [ Value | Next ] */}
      <div
        className={`flex items-stretch overflow-hidden rounded-2xl border-2 transition-all duration-300 shadow-sm ${borderBgClass}`}
      >
        {/* Value Box */}
        <div className="flex min-w-[54px] items-center justify-center px-4 py-3 font-mono text-lg font-bold">
          {node.value}
        </div>

        {/* Next Pointer Box */}
        <div className="flex items-center justify-center border-l-2 border-inherit bg-[#F7F2EA]/60 px-3 text-[11px] font-mono font-semibold text-[#8C837B]">
          next
        </div>
      </div>

      {/* Arrow / Pointer to Next or NULL */}
      <div className="flex items-center px-2 text-[#A1764E]">
        <ArrowRight size={20} className="stroke-[2.5]" />
      </div>

      {/* Show NULL badge on the very last node */}
      {isTail && (
        <div className="ml-1 flex items-center rounded-lg border border-[#E8DDD1] bg-[#F4ECE3] px-2.5 py-1.5 font-mono text-xs font-bold text-[#8C837B] shadow-xs">
          NULL
        </div>
      )}
    </motion.div>
  );
}
