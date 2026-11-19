import { ArrowRight, Link2, PlusCircle, Trash2 } from "lucide-react";

export default function SinglyLinkedListVisualizer({
  list = [],
  highlightIndex = -1,
  relinkIndex = -1,
  newNode = null,
  deletedNodeId = null,
  message = null,
}) {
  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Sequential Memory Chain
          </p>
          <h2 className="mt-1 font-display text-3xl text-[#1F1B18]">
            Singly Linked List
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-mono text-xs font-semibold text-[#6B5B4D]">
            Length: {list.length}
          </span>
          <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-mono text-xs font-semibold text-[#6B5B4D]">
            Head: {list.length > 0 ? list[0].value : "NULL"}
          </span>
        </div>
      </div>

      {/* Message Banner */}
      {message && (
        <div
          className={`mb-6 rounded-2xl p-4 text-sm font-medium ${
            message.type === "error"
              ? "border border-red-200 bg-red-50 text-red-700"
              : message.type === "success"
              ? "border border-[#5A7354]/20 bg-[#EAF2E8] text-[#3D5A37]"
              : "border border-[#D39B2A]/20 bg-[#FEF9EE] text-[#8B5A2B]"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Floating New Node (Staged for Insertion) */}
      {newNode && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[#D39B2A]/40 bg-[#FEF9EE] p-4">
          <PlusCircle size={20} className="text-[#D39B2A]" />
          <div>
            <span className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#8B5A2B]">
              New Node Allocated in Heap
            </span>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center overflow-hidden rounded-xl border-2 border-[#D39B2A] bg-white font-mono text-sm shadow-sm">
                <span className="bg-[#FAF0E6] px-3 py-1 font-bold text-[#1F1B18]">
                  {newNode.value}
                </span>
                <span className="border-l border-[#D39B2A] px-2.5 py-1 text-xs text-[#8C837B]">
                  next &bull;
                </span>
              </div>
              <span className="font-sans text-xs text-[#8B5A2B]">
                &larr; Pointer is currently resolving its target link
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Linked List Visual Chain */}
      <div
        className="relative min-h-[160px] w-full overflow-x-auto rounded-2xl border-2 border-[#E8DDD1] bg-[#FCFBF8] p-6 shadow-inner"
        role="region"
        aria-label="Interactive Linked List Chain"
      >
        {list.length > 0 ? (
          <div
            className="flex min-w-max items-center gap-3 py-4"
            role="list"
            aria-label="Linked List Nodes"
          >
            {/* Head Indicator Badge */}
            <div className="flex flex-col items-center pr-2" aria-hidden="true">
              <span className="rounded-full bg-[#A1764E] px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm">
                HEAD
              </span>
              <div className="mt-1 h-4 w-0.5 bg-[#A1764E]" />
            </div>

            {list.map((node, index) => {
              const isHighlight = index === highlightIndex;
              const isRelink = index === relinkIndex;
              const isDeleted = node.id === deletedNodeId;
              const isFirst = index === 0;
              const isLast = index === list.length - 1;

              return (
                <div
                  key={node.id}
                  className="flex items-center gap-3"
                  role="listitem"
                  aria-label={`Node at index ${index} with value ${node.value}${
                    isDeleted ? ", marked for deletion" : ""
                  }${isFirst ? ", Head of list" : ""}${
                    isLast ? ", Tail pointing to NULL" : ""
                  }`}
                >
                  {/* Node Box */}
                  <div className="flex flex-col items-center">
                    {/* Index & Role Label */}
                    <div className="mb-1 flex items-center gap-1 font-mono text-[10px] text-[#8C837B]">
                      <span>[{index}]</span>
                      {isDeleted && (
                        <span className="rounded bg-red-100 px-1 font-bold text-red-600">
                          DELETING
                        </span>
                      )}
                      {!isDeleted && isFirst && (
                        <span className="font-bold text-[#A1764E]">First</span>
                      )}
                      {!isDeleted && isLast && (
                        <span className="font-bold text-[#3D5A37]">Tail</span>
                      )}
                    </div>

                    {/* Node Structure: [ Data | Next ] */}
                    <div
                      className={`flex items-center overflow-hidden rounded-2xl border-2 shadow-sm transition-all duration-300 ${
                        isDeleted
                          ? "scale-95 border-red-500 bg-red-100 text-red-800 ring-4 ring-red-400/40 animate-pulse"
                          : isHighlight
                          ? "scale-105 border-[#D39B2A] bg-[#FEF9EE] ring-4 ring-[#D39B2A]/20"
                          : isRelink
                          ? "border-[#5A7354] bg-[#EAF2E8] ring-2 ring-[#5A7354]/20"
                          : "border-[#D8C5B0] bg-white text-[#1F1B18]"
                      }`}
                    >
                      {/* Data Payload Compartment */}
                      <div className="flex min-w-[54px] items-center justify-center px-4 py-2.5 font-mono text-base font-bold">
                        {node.value}
                      </div>

                      {/* Next Pointer Compartment */}
                      <div
                        className={`flex items-center gap-1 border-l px-3 py-2.5 font-mono text-xs ${
                          isDeleted
                            ? "border-red-300 bg-red-50 text-red-700"
                            : isRelink
                            ? "border-[#5A7354] bg-[#5A7354]/10 text-[#3D5A37]"
                            : "border-[#D8C5B0] bg-[#FAF7F2] text-[#8C837B]"
                        }`}
                      >
                        <span className="text-[11px]">next</span>
                        <div
                          className={`h-2 w-2 rounded-full ${
                            isDeleted
                              ? "bg-red-500"
                              : isRelink
                              ? "bg-[#3D5A37]"
                              : "bg-[#A1764E]"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pointer Arrow Connecting to Next Node */}
                  <div
                    className="flex items-center px-1 text-[#A1764E]"
                    aria-hidden="true"
                  >
                    <div
                      className={`h-0.5 w-6 transition-colors duration-300 ${
                        isDeleted
                          ? "bg-red-400"
                          : isRelink
                          ? "bg-[#3D5A37]"
                          : "bg-[#D8C5B0]"
                      }`}
                    />
                    <ArrowRight
                      size={18}
                      className={
                        isDeleted
                          ? "text-red-500"
                          : isRelink
                          ? "text-[#3D5A37]"
                          : isHighlight
                          ? "text-[#D39B2A]"
                          : "text-[#C8B59E]"
                      }
                    />
                  </div>
                </div>
              );
            })}

            {/* NULL Terminator */}
            <div className="flex flex-col items-center pl-1" aria-hidden="true">
              <span className="mb-1 font-mono text-[10px] text-[#8C837B]">
                &empty;
              </span>
              <div className="rounded-xl border border-dashed border-[#D8C5B0] bg-[#FAF7F2] px-3 py-2 font-mono text-xs font-bold text-[#8C837B]">
                NULL
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-36 flex-col items-center justify-center text-center text-[#8C837B]">
            <Link2 size={32} className="mb-2 text-[#D8C5B0]" />
            <p className="font-editorial text-lg italic">
              Linked list is currently empty.
            </p>
            <p className="mt-1 text-xs">
              Use the Insertion panel to add nodes to the list.
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#EEE5DB] pt-4 text-xs text-[#6B5B4D]">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-md border border-[#D8C5B0] bg-white" />
            <span>Regular Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-md border border-[#D39B2A] bg-[#FEF9EE]" />
            <span>Traversing / Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-md border border-[#5A7354] bg-[#EAF2E8]" />
            <span>Pointer Relink</span>
          </div>
          <div className="flex items-center gap-2">
            <Trash2 size={12} className="text-red-500" />
            <span>Deleted Node</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[#A1764E]">
          <Link2 size={14} />
          <span>Singly Linked Memory Pointers</span>
        </div>
      </div>
    </div>
  );
}
