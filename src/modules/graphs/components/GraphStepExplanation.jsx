import { CheckCircle2, Layers, ListOrdered, ArrowRight } from "lucide-react";

export default function GraphStepExplanation({
  currentFrame,
  currentStep,
  stepCount,
  algorithm,
}) {
  if (!currentFrame) return null;

  const isDfs = algorithm === "dfs";
  const bufferItems = isDfs
    ? currentFrame.stack || []
    : currentFrame.queue || [];
  const visitedOrder = currentFrame.visited || [];

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-6 shadow-sm">
      {/* Top Banner: Step Title and Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECE3D8] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#FAEAE0] px-3 py-1 font-mono text-xs font-bold text-[#A65B38]">
              {isDfs ? "DFS Recursion" : "BFS Level-Order"}
            </span>
            <span className="text-xs text-[#8C837B]">
              Step {currentStep + 1} of {stepCount}
            </span>
          </div>
          <h3 className="font-display mt-2 text-2xl text-[#1F1B18]">
            {currentFrame.title}
          </h3>
        </div>

        {currentFrame.isFinal && (
          <div className="flex items-center gap-1.5 rounded-full bg-[#E7EFE7] px-3.5 py-1.5 text-xs font-semibold text-[#567156]">
            <CheckCircle2 size={15} />
            <span>Traversal Complete</span>
          </div>
        )}
      </div>

      {/* Description Body */}
      <p className="text-base leading-relaxed text-[#555]">
        {currentFrame.description}
      </p>

      {/* Live State Monitors */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Dynamic Queue or Stack Monitor */}
        <div className="flex flex-col rounded-2xl border border-[#E8DED2] bg-white p-4">
          <div className="flex items-center justify-between border-b border-[#F0EBE4] pb-2 text-xs">
            <div className="flex items-center gap-2 font-semibold text-[#1F1B18]">
              <Layers size={14} className="text-[#A65B38]" />
              <span>{isDfs ? "Call Stack (LIFO)" : "FIFO Queue"}</span>
            </div>
            <span className="text-[11px] text-[#8C837B]">
              {isDfs ? "Top â†’ Bottom" : "Front â†’ Rear"}
            </span>
          </div>

          <div className="mt-3 flex min-h-10 flex-wrap items-center gap-2 font-mono text-xs">
            {bufferItems.length === 0 ? (
              <span className="italic text-[#A8A29E] font-sans">
                {isDfs ? "Stack is empty" : "Queue is empty"}
              </span>
            ) : (
              bufferItems.map((item, idx) => {
                const isHead = idx === 0;
                const isTail = idx === bufferItems.length - 1;
                return (
                  <span
                    key={`${item}-${idx}`}
                    className={`flex items-center gap-1 rounded-lg border px-2.5 py-1 font-bold ${
                      (isDfs && isTail) || (!isDfs && isHead)
                        ? "border-[#A65B38] bg-[#FAEAE0] text-[#A65B38]"
                        : "border-[#E8DED2] bg-[#FCFAF7] text-[#6B5B4D]"
                    }`}
                  >
                    <span>{item}</span>
                    {isDfs && isTail && (
                      <span className="text-[9px] uppercase tracking-wider text-[#A65B38]">
                        (Top)
                      </span>
                    )}
                    {!isDfs && isHead && (
                      <span className="text-[9px] uppercase tracking-wider text-[#A65B38]">
                        (Front)
                      </span>
                    )}
                  </span>
                );
              })
            )}
          </div>
        </div>

        {/* Visited Sequence Monitor */}
        <div className="flex flex-col rounded-2xl border border-[#E8DED2] bg-white p-4">
          <div className="flex items-center justify-between border-b border-[#F0EBE4] pb-2 text-xs">
            <div className="flex items-center gap-2 font-semibold text-[#1F1B18]">
              <ListOrdered size={14} className="text-[#567156]" />
              <span>Visited Order Sequence</span>
            </div>
            <span className="text-[11px] font-mono text-[#8C837B]">
              {visitedOrder.length} vertices
            </span>
          </div>

          <div className="mt-3 flex min-h-10 flex-wrap items-center gap-1.5 font-mono text-xs">
            {visitedOrder.length === 0 ? (
              <span className="italic text-[#A8A29E] font-sans">
                No vertices visited yet
              </span>
            ) : (
              visitedOrder.map((v, i) => (
                <div key={v} className="flex items-center gap-1.5">
                  <span className="rounded-lg bg-[#567156] px-2.5 py-1 font-bold text-white shadow-xs">
                    {v}
                  </span>
                  {i < visitedOrder.length - 1 && (
                    <ArrowRight size={12} className="text-[#A07A56]" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
