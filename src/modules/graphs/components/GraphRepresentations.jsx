import { useState } from "react";
import { ListFilter, Grid3X3, Info } from "lucide-react";

export default function GraphRepresentations({
  adjacencyList,
  adjacencyMatrix,
  currentFrame,
}) {
  const [activeTab, setActiveTab] = useState("both"); // "list" | "matrix" | "both"
  const activeNode = currentFrame?.currentNode;

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-6 shadow-sm">
      {/* Header with View Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECE3D8] pb-4">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-[#A07A56]">
            Data Structures
          </p>
          <h2 className="font-display mt-1 text-2xl text-[#202020]">
            Graph Representations
          </h2>
        </div>

        <div className="flex rounded-xl border border-[#E8DED2] bg-white p-1 text-xs shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("both")}
            className={`rounded-lg px-3 py-1.5 font-medium transition ${
              activeTab === "both"
                ? "bg-[#A65B38] text-white shadow-sm"
                : "text-[#6B5B4D] hover:bg-[#F7F2EB]"
            }`}
          >
            Side-by-Side
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("list")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition ${
              activeTab === "list"
                ? "bg-[#A65B38] text-white shadow-sm"
                : "text-[#6B5B4D] hover:bg-[#F7F2EB]"
            }`}
          >
            <ListFilter size={13} />
            Adjacency List
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("matrix")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition ${
              activeTab === "matrix"
                ? "bg-[#A65B38] text-white shadow-sm"
                : "text-[#6B5B4D] hover:bg-[#F7F2EB]"
            }`}
          >
            <Grid3X3 size={13} />
            Adjacency Matrix
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div
        className={`mt-6 grid gap-6 ${
          activeTab === "both" ? "lg:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {/* Adjacency List Panel */}
        {(activeTab === "both" || activeTab === "list") && (
          <div className="flex flex-col rounded-2xl border border-[#E8DED2] bg-white p-5">
            <div className="flex items-center justify-between border-b border-[#F0EBE4] pb-3">
              <div className="flex items-center gap-2">
                <ListFilter size={16} className="text-[#A65B38]" />
                <h3 className="font-display text-lg text-[#1F1B18]">
                  Adjacency List
                </h3>
              </div>
              <span className="font-mono text-xs rounded bg-[#F7F5F2] px-2 py-0.5 text-[#8C837B]">
                Space: O(V + E)
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-[#6B645D]">
              Maps each vertex to an array of its directly connected outgoing
              neighbors. Highly optimal for sparse graphs.
            </p>

            <div className="mt-4 flex flex-col gap-2 font-mono text-xs">
              {Object.entries(adjacencyList).map(([vertex, neighbors]) => {
                const isActive = vertex === activeNode;
                return (
                  <div
                    key={vertex}
                    className={`flex items-center gap-3 rounded-xl border p-2.5 transition-all ${
                      isActive
                        ? "border-[#A65B38] bg-[#FAEAE0] shadow-sm"
                        : "border-[#F0EBE4] bg-[#FCFAF7]"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-lg font-bold ${
                        isActive
                          ? "bg-[#A65B38] text-white"
                          : "bg-white text-[#1F1B18] border border-[#E8DED2]"
                      }`}
                    >
                      {vertex}
                    </span>
                    <span className="text-[#A07A56] font-sans font-bold">â†’</span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {neighbors.length === 0 ? (
                        <span className="italic text-[#A8A29E] font-sans">
                          [ empty ]
                        </span>
                      ) : (
                        neighbors.map((n) => (
                          <span
                            key={n}
                            className="rounded-md border border-[#E8DED2] bg-white px-2 py-0.5 font-bold text-[#6B5B4D]"
                          >
                            {n}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Adjacency Matrix Panel */}
        {(activeTab === "both" || activeTab === "matrix") && (
          <div className="flex flex-col rounded-2xl border border-[#E8DED2] bg-white p-5">
            <div className="flex items-center justify-between border-b border-[#F0EBE4] pb-3">
              <div className="flex items-center gap-2">
                <Grid3X3 size={16} className="text-[#A65B38]" />
                <h3 className="font-display text-lg text-[#1F1B18]">
                  Adjacency Matrix
                </h3>
              </div>
              <span className="font-mono text-xs rounded bg-[#F7F5F2] px-2 py-0.5 text-[#8C837B]">
                Space: O(VÂ²)
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-[#6B645D]">
              A 2D binary grid where cell [u][v] = 1 indicates an edge from u to
              v. Allows O(1) instantaneous edge existence queries.
            </p>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse font-mono text-xs">
                <thead>
                  <tr>
                    <th className="p-2 text-center text-[#A07A56] font-bold">
                      \
                    </th>
                    {adjacencyMatrix.nodeLabels.map((lbl) => (
                      <th
                        key={lbl}
                        className={`p-2 text-center font-bold ${
                          lbl === activeNode
                            ? "text-[#A65B38] underline"
                            : "text-[#6B5B4D]"
                        }`}
                      >
                        {lbl}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {adjacencyMatrix.nodeLabels.map((rowLbl, rowIdx) => {
                    const isRowActive = rowLbl === activeNode;
                    return (
                      <tr
                        key={rowLbl}
                        className={`border-t border-[#F0EBE4] ${
                          isRowActive ? "bg-[#FAEAE0]" : "hover:bg-[#FAF8F5]"
                        }`}
                      >
                        <td
                          className={`p-2 text-center font-bold ${
                            isRowActive ? "text-[#A65B38]" : "text-[#6B5B4D]"
                          }`}
                        >
                          {rowLbl}
                        </td>
                        {adjacencyMatrix.matrix[rowIdx].map((val, colIdx) => {
                          const colLbl = adjacencyMatrix.nodeLabels[colIdx];
                          const isEdge = val === 1;
                          return (
                            <td
                              key={`${rowLbl}-${colLbl}`}
                              className="p-2 text-center"
                            >
                              <span
                                className={`inline-block min-w-5 rounded py-0.5 text-center font-bold ${
                                  isEdge
                                    ? isRowActive
                                      ? "bg-[#A65B38] text-white"
                                      : "bg-[#567156] text-white"
                                    : "text-[#C5B29D]"
                                }`}
                              >
                                {val}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#F7F2EB] p-2.5 text-xs text-[#6B5B4D]">
              <Info size={14} className="text-[#A65B38] shrink-0" />
              <span>
                Row represents Source vertex (u); Column represents Target (v).
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
