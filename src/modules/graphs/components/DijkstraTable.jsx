import { CheckCircle2, Navigation } from "lucide-react";

export default function DijkstraTable({
  nodes = [],
  distances = {},
  previous = {},
  visited = [],
  currentNode = null,
  activeNeighbor = null,
  shortestPath = [],
}) {
  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-4 flex items-center justify-between border-b border-[#EEE5DB] pb-4">
        <div className="flex items-center gap-2">
          <Navigation size={18} className="text-[#A1764E]" />
          <h4 className="font-display text-2xl text-[#1F1B18]">
            Distance &amp; Priority Table
          </h4>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8C837B]">
          Live Distance Vector
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#EEE5DB] font-mono text-xs uppercase tracking-wider text-[#8C837B]">
              <th className="py-2.5 px-3">Vertex</th>
              <th className="py-2.5 px-3">Shortest Distance</th>
              <th className="py-2.5 px-3">Predecessor</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4ECE3] font-mono text-xs">
            {nodes.map((node) => {
              const isSettled = visited.includes(node.id);
              const isCurrent = node.id === currentNode;
              const isNeighbor = node.id === activeNeighbor;
              const isPath = shortestPath.includes(node.id);
              const dist = distances[node.id];
              const prev = previous[node.id];

              let rowBg = "hover:bg-[#FAF8F5]";
              if (isPath) {
                rowBg = "bg-[#EAF2E8]/60 font-semibold";
              } else if (isCurrent) {
                rowBg = "bg-[#FEF9EE] font-semibold";
              } else if (isNeighbor) {
                rowBg = "bg-[#FBF4EA]";
              }

              return (
                <tr key={node.id} className={`transition-colors ${rowBg}`}>
                  <td className="py-3 px-3 font-bold text-sm text-[#1F1B18]">
                    {node.label}
                  </td>
                  <td className="py-3 px-3 text-[#1F1B18]">
                    {dist === Infinity || dist === undefined ? (
                      <span className="text-[#A69C93]">∞</span>
                    ) : (
                      <span className="font-bold text-[#A1764E]">{dist}</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-[#5F5952]">
                    {prev ? `Vertex ${prev}` : "--"}
                  </td>
                  <td className="py-3 px-3">
                    {isPath ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF2E8] px-2.5 py-0.5 text-[10px] font-bold text-[#3D5A37]">
                        <CheckCircle2 size={12} />
                        ON PATH
                      </span>
                    ) : isSettled ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#FAF8F5] px-2.5 py-0.5 text-[10px] font-semibold text-[#5A7354]">
                        Settled
                      </span>
                    ) : isCurrent ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF9EE] px-2.5 py-0.5 text-[10px] font-bold text-[#8B5A2B]">
                        Visiting
                      </span>
                    ) : isNeighbor ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#FBF4EA] px-2.5 py-0.5 text-[10px] font-semibold text-[#A1764E]">
                        Relaxing
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#A69C93]">Unvisited</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
