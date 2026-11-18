import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import LinkedListNode from "./LinkedListNode";

export default function LinkedListCanvas({
  nodes,
  newNode,
  headIndex,
  highlightedIndex,
  targetIndex,
  action,
}) {
  return (
    <section
      aria-label="Linked List visual canvas"
      className="relative rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Memory Chain
          </p>
          <h2 className="mt-2 font-display text-3xl text-[#1F1B18]">
            {nodes.length} {nodes.length === 1 ? "Node" : "Nodes"}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4ECE3] px-3.5 py-1 text-xs font-semibold text-[#8B5A2B]">
            <Sparkles size={13} />
            Singly Linked List
          </span>
        </div>
      </div>

      {/* Floating Allocated New Node (During Insertion) */}
      <AnimatePresence>
        {newNode && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.8 }}
            className="mb-6 flex flex-col items-center rounded-2xl border-2 border-dashed border-[#A1764E]/50 bg-[#FDFBF7] p-4 text-center"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A1764E]">
              <span>Allocated Node in Memory</span>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-stretch overflow-hidden rounded-xl border-2 border-[#A1764E] bg-white shadow-md">
                <div className="px-4 py-2 font-mono text-lg font-bold text-[#1F1B18]">
                  {newNode.value}
                </div>
                <div className="border-l-2 border-[#A1764E] bg-[#F7F2EA] px-3 py-2 text-xs font-mono font-bold text-[#8B5A2B]">
                  next: {newNode.pointsToHead ? "HEAD" : newNode.pointsToSuccessor ? newNode.successorValue : "NULL"}
                </div>
              </div>
            </div>

            <p className="mt-2 text-xs text-[#8C837B]">
              Ready to wire into list via pointer assignment
            </p>
            <ArrowDown size={18} className="mt-1 text-[#A1764E] animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Linked List Horizontal Ribbon */}
      <div className="min-h-40 overflow-x-auto rounded-2xl border border-[#EEE5DB] bg-[#FCFBF8] p-6 pt-10">
        {nodes.length > 0 ? (
          <div className="flex min-w-max items-center justify-start gap-1 py-4">
            <AnimatePresence initial={false}>
              {nodes.map((node, index) => (
                <LinkedListNode
                  key={node.id}
                  node={node}
                  index={index}
                  isHead={index === headIndex}
                  isTail={index === nodes.length - 1}
                  isHighlighted={index === highlightedIndex}
                  isTarget={index === targetIndex}
                  action={action}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex min-h-28 flex-col items-center justify-center text-center">
            <p className="font-mono text-base font-semibold text-[#8C837B]">
              HEAD ➔ NULL
            </p>
            <p className="mt-1 text-xs text-[#A89F95]">
              The linked list is currently empty. Insert a node to begin.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
