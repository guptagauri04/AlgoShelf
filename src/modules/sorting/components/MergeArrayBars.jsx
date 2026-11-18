import { motion } from "framer-motion";

export default function MergeArrayBars({
  array,
  comparing = [],
  sorted = [],
  phase = "divide",
  visibleSegments = [],
}) {
  const normalGap = 16;
  const segmentGap = phase === "divide" ? 40 : 20;

  return (
    <div className="flex h-[560px] items-end justify-center rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] px-10 pt-10 pb-0">
      {array.map((value, index) => {
        // ---------- Colors ----------
        let barStyle =
          phase === "merge"
            ? "bg-gradient-to-t from-[#728B68] to-[#95B287]"
            : "bg-gradient-to-t from-[#946B45] to-[#AF8358]";

        if (comparing.includes(index)) {
          barStyle =
            "bg-gradient-to-t from-[#6F4728] to-[#8A5A33]";
        }

        if (sorted.includes(index)) {
          barStyle =
            "bg-gradient-to-t from-[#5A7354] to-[#7E9A75]";
        }

        // ---------- Segment spacing ----------
        const isSegmentEnd = visibleSegments.some(
          ([, end]) => end === index
        );

        return (
          <motion.div
            key={index}
            layout
            transition={{
              duration: 0.45,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center"
            style={{
              marginRight:
                isSegmentEnd && index !== array.length - 1
                  ? segmentGap
                  : normalGap,
            }}
          >
            {/* Value */}
            <motion.div
              layout
              animate={{
                scale: comparing.includes(index) ? 1.08 : 1,
                y: comparing.includes(index) ? -4 : 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                mb-4
                min-w-[52px]
                rounded-xl
                border
                border-[#E8DDD1]
                bg-white
                px-3
                py-1.5
                text-center
                text-base
                font-semibold
                text-[#1F1B18]
                shadow-sm
              "
            >
              {value}
            </motion.div>

            {/* Bar */}
            <motion.div
              layout
              animate={{
                height: value * 5,
                scale: comparing.includes(index) ? 1.06 : 1,
              }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
              className={`
                w-[66px]
                rounded-t-[26px]
                border-x
                border-t
                border-white/30
                ${barStyle}
              `}
            />
          </motion.div>
        );
      })}
    </div>
  );
}