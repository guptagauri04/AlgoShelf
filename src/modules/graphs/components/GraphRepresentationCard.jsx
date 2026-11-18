import { FileText, Grid } from "lucide-react";

export default function GraphRepresentationCard({
  repTab,
  setRepTab,
  adjList,
  adjMatrix,
  nodes,
}) {
  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Tabs */}
      <div className="flex border-b border-[#EEE5DB] pb-3">
        <button
          type="button"
          onClick={() => setRepTab("list")}
          className={`flex items-center gap-2 border-b-2 px-5 py-2.5 text-sm font-semibold transition-all ${
            repTab === "list"
              ? "border-[#A1764E] text-[#8B5A2B]"
              : "border-transparent text-[#8C837B] hover:text-[#1F1B18]"
          }`}
        >
          <FileText size={16} />
          Adjacency List (O(V + E) space)
        </button>
        <button
          type="button"
          onClick={() => setRepTab("matrix")}
          className={`flex items-center gap-2 border-b-2 px-5 py-2.5 text-sm font-semibold transition-all ${
            repTab === "matrix"
              ? "border-[#A1764E] text-[#8B5A2B]"
              : "border-transparent text-[#8C837B] hover:text-[#1F1B18]"
          }`}
        >
          <Grid size={16} />
          Adjacency Matrix (O(V²) space)
        </button>
      </div>

      <div className="mt-5">
        {repTab === "list" ? (
          <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3">
            {nodes.map((node) => (
              <div
                key={`adj-list-${node.id}`}
                className="flex items-center gap-3 rounded-2xl border border-[#EEE5DB] bg-[#FCFBF8] p-3 shadow-xs"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#A1764E] font-mono text-sm font-bold text-white">
                  {node.id}
                </div>
                <div className="text-xs font-mono font-semibold text-[#6B5B4D]">
                  ➔ [{adjList[node.id]?.join(", ") || ""}]
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#EEE5DB] bg-[#FCFBF8] p-4">
            <table className="mx-auto border-collapse font-mono text-xs">
              <thead>
                <tr>
                  <th className="p-2 text-[#8C837B]">V</th>
                  {nodes.map((n) => (
                    <th key={`head-${n.id}`} className="p-2 font-bold text-[#A1764E]">
                      {n.id}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {adjMatrix.map((row, rIdx) => (
                  <tr key={`row-${rIdx}`} className="border-t border-[#EEE5DB]">
                    <td className="p-2 font-bold text-[#A1764E]">{rIdx}</td>
                    {row.map((val, cIdx) => (
                      <td
                        key={`cell-${rIdx}-${cIdx}`}
                        className={`p-2.5 text-center font-bold ${
                          val === 1
                            ? "bg-[#F4ECE3] text-[#8B5A2B]"
                            : "text-[#C5BCB3]"
                        }`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
