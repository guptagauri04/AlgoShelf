import { motion } from "framer-motion";

/**
 * Renders the array as a row of value chips sitting on top of bars.
 * The current index is pointed at, visited elements turn green — the same
 * color language the sorting visualizer uses for completed work.
 */
export default function TraversalArray({
  array,
  currentIndex = -1,
  visited = [],
}) {
  const values = array.length > 0 ? array : [0];

  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const barHeight = (value) => 48 + ((value - min) / range) * 140;

  return (
    <div className="flex h-full w-full items-end justify-center gap-2 sm:gap-3">
      {array.map((value, index) => {
        const isCurrent = index === currentIndex;
        const isVisited = visited.includes(index);

        let barStyle = "bg-gradient-to-t from-[#946B45] to-[#AF8358]";

        if (isVisited)
          barStyle = "bg-gradient-to-t from-[#5A7354] to-[#7E9A75]";

        if (isCurrent)
          barStyle = "bg-gradient-to-t from-[#6F4728] to-[#8A5A33]";

        return (
          <div
            key={index}
            className="flex min-w-0 flex-1 flex-col items-center"
          >
            {/* Pointer above the current element */}

            <div className="mb-2 flex h-7 items-center justify-center">
              {isCurrent && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-full bg-[#1F1B18] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white"
                >
                  i = {index}
                </motion.div>
              )}
            </div>

            {/* Value */}

            <motion.div
              animate={{
                scale: isCurrent ? 1.08 : 1,
                y: isCurrent ? -2 : 0,
              }}
              transition={{ duration: 0.25 }}
              className="mb-4 w-full max-w-[58px] truncate rounded-xl border border-[#E8DDD1] bg-white px-2 py-1.5 text-center text-sm font-semibold text-[#1F1B18] shadow-sm"
            >
              {value}
            </motion.div>

            {/* Bar */}

            <motion.div
              layout
              animate={{ height: barHeight(value) }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className={`w-full max-w-[58px] rounded-t-[26px] border-x border-t border-white/30 ${barStyle}`}
            />

            {/* Index label */}

            <div
              className={`
                mt-3 rounded-lg px-2 py-1 font-mono text-[11px] font-semibold
                ${
                  isCurrent
                    ? "bg-[#1F1B18] text-white"
                    : isVisited
                      ? "bg-[#E7EFE7] text-[#5A7354]"
                      : "bg-[#F4EFE8] text-[#8C837B]"
                }
              `}
            >
              [{index}]
            </div>
          </div>
        );
      })}
    </div>
  );
}
