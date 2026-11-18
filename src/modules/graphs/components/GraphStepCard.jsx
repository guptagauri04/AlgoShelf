import { Clock, Database, Layers, Terminal } from "lucide-react";

export default function GraphStepCard({ frame, currentStepIndex, totalSteps }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      {/* Left: Step Details & Data Structure */}
      <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center justify-between border-b border-[#EEE5DB] pb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
            Step Execution Details
          </p>
          {totalSteps > 0 && (
            <span className="font-mono text-xs font-semibold text-[#8C837B]">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
          )}
        </div>

        <h3 className="mt-4 font-display text-2xl font-bold text-[#1F1B18]">
          {frame.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-[#6B645D]">
          {frame.explanation}
        </p>

        {/* Live Data Structure State: Queue or Stack */}
        <div className="mt-5 rounded-2xl border border-[#EEE5DB] bg-[#FCFBF8] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B5A2B]">
            <Layers size={15} />
            <span>Active {frame.dataStructureType}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {frame.queueOrStack && frame.queueOrStack.length > 0 ? (
              frame.queueOrStack.map((item, idx) => (
                <span
                  key={`ds-${idx}`}
                  className="rounded-xl border border-[#A1764E] bg-white px-3 py-1.5 font-mono text-xs font-bold text-[#1F1B18] shadow-xs"
                >
                  Node {item}
                </span>
              ))
            ) : (
              <span className="font-mono text-xs italic text-[#A89F95]">
                [Empty]
              </span>
            )}
          </div>
        </div>

        {/* Traversal Order Output */}
        {frame.traversalOrder && frame.traversalOrder.length > 0 && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#EEE5DB] bg-white p-4">
            <span className="text-xs font-semibold uppercase text-[#A1764E]">
              Visited Path:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs font-bold text-[#1F1B18]">
              {frame.traversalOrder.map((v, i) => (
                <span key={`path-${i}`} className="flex items-center gap-1.5">
                  <span className="rounded-lg bg-[#F4ECE3] px-2 py-0.5 text-[#8B5A2B]">
                    {v}
                  </span>
                  {i < frame.traversalOrder.length - 1 && (
                    <span className="text-[#A89F95]">➔</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {frame.code && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#2D2A26] bg-[#1E1C1A] p-4 text-[#E6E1DC]">
            <div className="flex items-center gap-2 border-b border-[#3E3A35] pb-2 text-[11px] font-mono text-[#A89F95]">
              <Terminal size={14} />
              <span>C++ / Traversal Pseudocode</span>
            </div>
            <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-[#EAD8C2]">
              <code>{frame.code}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Right: Complexity Cards */}
      <div className="flex flex-col gap-4">
        <div className="flex-1 rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
            <Clock size={16} />
            <span>Time Complexity</span>
          </div>
          <p className="mt-3 font-mono text-3xl font-bold text-[#1F1B18]">
            O(V + E)
          </p>
          <p className="mt-2 text-xs leading-relaxed text-[#8C837B]">
            Every vertex V is enqueued/visited once, and every edge E is examined when iterating through adjacency lists.
          </p>
        </div>

        <div className="flex-1 rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5A7354]">
            <Database size={16} />
            <span>Space Complexity</span>
          </div>
          <p className="mt-3 font-mono text-3xl font-bold text-[#1F1B18]">
            O(V)
          </p>
          <p className="mt-2 text-xs leading-relaxed text-[#8C837B]">
            O(V) auxiliary space to store the visited boolean array/set and the traversal Queue (BFS) or Call Stack (DFS).
          </p>
        </div>
      </div>
    </div>
  );
}
