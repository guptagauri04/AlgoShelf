export default function DijkstraDistanceTable({ nodes, frame }) {
  if (!frame) return null;

  const { dist, visited, prev, finalPath, phase } = frame;

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-5 shadow-sm">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
        Distance Table
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#EEE5DB]">
              <th className="pb-2 text-left font-semibold text-[#1F1B18] pr-4">Node</th>
              <th className="pb-2 text-center font-semibold text-[#1F1B18] pr-4">dist[]</th>
              <th className="pb-2 text-center font-semibold text-[#1F1B18] pr-4">prev[]</th>
              <th className="pb-2 text-center font-semibold text-[#1F1B18]">Status</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((n) => {
              const d = dist[n];
              const p = prev[n];
              const isVisited = visited && visited.has(n);
              const isCurrent = frame.currentNode === n;
              const isOnPath = finalPath && finalPath.includes(n) && phase === "done";

              let rowClass = "border-b border-[#F2EDE7]";
              if (isOnPath) rowClass += " bg-[#EAF2E8]";
              else if (isCurrent) rowClass += " bg-[#FEF9EE]";
              else if (isVisited) rowClass += " bg-[#F7F5F2]";

              return (
                <tr key={n} className={rowClass}>
                  <td className="py-2 pr-4">
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-sm font-bold ${
                      isOnPath ? "bg-[#5A7354] text-white"
                      : isCurrent ? "bg-[#D39B2A] text-white"
                      : "bg-[#EEE5DB] text-[#1F1B18]"
                    }`}>
                      {n}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-center font-mono text-sm font-semibold text-[#1F1B18]">
                    {d === Infinity || d === undefined ? "∞" : d}
                  </td>
                  <td className="py-2 pr-4 text-center font-mono text-sm text-[#6B645D]">
                    {p ?? "—"}
                  </td>
                  <td className="py-2 text-center">
                    {isOnPath && phase === "done" ? (
                      <span className="rounded-full bg-[#EAF2E8] px-2 py-0.5 text-xs font-semibold text-[#3D5A37]">On Path</span>
                    ) : isCurrent ? (
                      <span className="rounded-full bg-[#FEF9EE] px-2 py-0.5 text-xs font-semibold text-[#8B5A2B]">Active</span>
                    ) : isVisited ? (
                      <span className="rounded-full bg-[#EEE5DB] px-2 py-0.5 text-xs font-semibold text-[#6B645D]">Visited</span>
                    ) : (
                      <span className="rounded-full bg-[#F7F5F2] px-2 py-0.5 text-xs font-semibold text-[#8C837B]">Pending</span>
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
