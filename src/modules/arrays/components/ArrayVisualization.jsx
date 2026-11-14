import { AnimatePresence, motion } from "framer-motion";

export default function ArrayVisualization({
  items,
  highlightedId,
  operationType,
  operationComplete,
}) {
  return (
    <section
      aria-label="Array visualization"
      className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Live array
          </p>
          <h2 className="mt-2 font-display text-3xl text-[#1F1B18]">
            {items.filter(Boolean).length}{" "}
            {items.filter(Boolean).length === 1 ? "element" : "elements"}
          </h2>
        </div>
        {operationType && (
          <span className="rounded-full bg-[#F4ECE3] px-3 py-1.5 text-xs font-semibold capitalize text-[#8B5A2B]">
            {operationType} {operationComplete ? "complete" : "in progress"}
          </span>
        )}
      </div>

      <div className="min-h-32 overflow-x-auto rounded-2xl border border-[#EEE5DB] bg-[#FCFBF8] p-4">
        {items.length > 0 ? (
          <div className="flex min-h-24 min-w-max items-end justify-start gap-3">
            <AnimatePresence initial={false}>
              {items.map((item, index) =>
                item ? (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: -12, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.78 }}
                    transition={{
                      layout: { duration: 0.45, ease: "easeInOut" },
                      opacity: { duration: 0.22 },
                      y: { duration: 0.3 },
                    }}
                    className="flex w-[76px] shrink-0 flex-col items-center gap-2"
                  >
                    <motion.div
                      animate={
                        item.id === highlightedId
                          ? { scale: [1, 1.08, 1], y: [0, -5, 0] }
                          : { scale: 1, y: 0 }
                      }
                      transition={{ duration: 0.55 }}
                      className={`flex min-h-[58px] w-full items-center justify-center break-all rounded-xl border px-2 py-3 font-mono text-base font-semibold shadow-sm ${
                        item.id === highlightedId
                          ? operationType === "delete"
                            ? "border-[#C87865] bg-[#F9E8E3] text-[#8C3D2D]"
                            : "border-[#78906F] bg-[#E8F0E5] text-[#3F5E3D]"
                          : "border-[#E8DDD1] bg-white text-[#1F1B18]"
                      }`}
                    >
                      {item.value}
                    </motion.div>
                    <span className="font-mono text-xs text-[#8C837B]">
                      index {index}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`empty-slot-${index}`}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex w-[76px] shrink-0 flex-col items-center gap-2"
                    aria-label={`Empty slot at index ${index}`}
                  >
                    <div className="flex min-h-[58px] w-full items-center justify-center rounded-xl border border-dashed border-[#CDBCA9] bg-[#F7F2EB] text-[#A1764E]">
                      <span aria-hidden="true">· · ·</span>
                    </div>
                    <span className="font-mono text-xs text-[#8C837B]">
                      index {index}
                    </span>
                  </motion.div>
                ),
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex min-h-24 items-center justify-center px-4 text-center text-sm text-[#7A7068]">
            This array is empty. Insert an element at index 0 to begin.
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-[#8C837B]">
        Scroll horizontally to view every element on smaller screens.
      </p>
    </section>
  );
}
