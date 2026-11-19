import { useState } from "react";
import { List, Grid } from "lucide-react";
import { buildAdjacencyList, buildAdjacencyMatrix } from "../utils/graphTraversals";

export default function GraphRepresentationView({
  nodes = [],
  edges = [],
  directed = false,
  currentNode = null,
  visited = [],
}) {
  const [activeTab, setActiveTab] = useState("list"); // 'list' | 'matrix'
  const visitedSet = new Set(visited);

  const adjList = buildAdjacencyList(nodes, edges, directed);
  const { nodeIds, matrix } = buildAdjacencyMatrix(nodes, edges, directed);

  return (
    <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-5 shadow-sm">
      {/* Header and Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEE5DB] pb-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-[#1F1B18]">
            Graph Representations
          </h3>
          <p className="text-xs text-[#8C837B]">
            Interactive data structures reflecting the current graph topology
          </p>
        </div>

        <div className="flex items-center rounded-xl border border-[#E8DED2] bg-[#F7F2EB] p-1">
          <button
            type="button"
            onClick={() => setActiveTab("list")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeTab === "list"
                ? "bg-white text-[#1F1B18] shadow-sm"
                : "text-[#6B5B4D] hover:text-[#1F1B18]"
            }`}
          >
            <List size={14} />
            <span>Adjacency List</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("matrix")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeTab === "matrix"
                ? "bg-white text-[#1F1B18] shadow-sm"
                : "text-[#6B5B4D] hover:text-[#1F1B18]"
            }`}
          >
            <Grid size={14} />
            <span>Adjacency Matrix</span>
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="mt-4">
        {activeTab === "list" ? (
          <div>
            <div className="mb-3 flex items-center justify-between text-xs text-[#6B5B4D]">
              <span>Space Complexity: <strong className="font-mono text-[#1F1B18]">O(V + E)</strong></span>
              <span>Degree count &amp; neighbors</span>
            </div>
            <div className="grid gap-2 max-h-64 overflow-y-auto pr-1">
              {nodes.map((node) => {
                const isCurrent = currentNode === node.id;
                const isVisited = visitedSet.has(node.id);
                const neighbors = adjList[node.id] || [];

                return (
                  <div
                    key={`adj-list-${node.id}`}
                    className={`flex items-center justify-between rounded-xl border p-2.5 font-mono text-xs transition ${
                      isCurrent
                        ? "border-[#D97706] bg-[#FEF3C7]"
                        : isVisited
                        ? "border-[#D1E2D3] bg-[#F4F9F4]"
                        : "border-[#EEE5DB] bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-lg font-bold ${
                          isCurrent
                            ? "bg-[#D97706] text-white"
                            : isVisited
                            ? "bg-[#4B7754] text-white"
                            : "bg-[#F7F2EB] text-[#A1764E]"
                        }`}
                      >
                        {node.id}
                      </span>
                      <span className="text-[#8C837B]">→</span>
                      <div className="flex flex-wrap gap-1.5">
                        {neighbors.length > 0 ? (
                          neighbors.map((nb) => (
                            <span
                              key={nb}
                              className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                                visitedSet.has(nb)
                                  ? "bg-[#E6EFE6] text-[#2D4B34] border border-[#C5DDC5]"
                                  : "bg-[#F7F5F2] text-[#4A3B32] border border-[#E8DDD1]"
                              }`}
                            >
                              {nb}
                            </span>
                          ))
                        ) : (
                          <span className="text-[#A89F95] italic">ø (empty)</span>
                        )}
                      </div>
                    </div>
                    <span className="text-[11px] text-[#A07A56]">
                      deg: {neighbors.length}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-3 flex items-center justify-between text-xs text-[#6B5B4D]">
              <span>Space Complexity: <strong className="font-mono text-[#1F1B18]">O(V²)</strong></span>
              <span>Cell [u][v] = 1 if edge exists</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse font-mono text-xs">
                <thead>
                  <tr>
                    <th className="p-2 border border-[#EEE5DB] bg-[#F7F2EB] text-[#8C837B]"></th>
                    {nodeIds.map((id) => (
                      <th
                        key={`col-${id}`}
                        className={`p-2 border border-[#EEE5DB] font-bold ${
                          currentNode === id ? "bg-[#FEF3C7] text-[#D97706]" : "bg-[#F7F2EB] text-[#1F1B18]"
                        }`}
                      >
                        {id}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {nodeIds.map((rowId, rIdx) => {
                    const isRowCurrent = currentNode === rowId;
                    return (
                      <tr key={`row-${rowId}`}>
                        <th
                          className={`p-2 border border-[#EEE5DB] font-bold ${
                            isRowCurrent ? "bg-[#FEF3C7] text-[#D97706]" : "bg-[#F7F2EB] text-[#1F1B18]"
                          }`}
                        >
                          {rowId}
                        </th>
                        {matrix[rIdx].map((val, cIdx) => {
                          const colId = nodeIds[cIdx];
                          const hasEdge = val === 1;
                          const isHighlighted = isRowCurrent && hasEdge;

                          return (
                            <td
                              key={`cell-${rowId}-${colId}`}
                              className={`p-2 text-center border border-[#EEE5DB] transition ${
                                isHighlighted
                                  ? "bg-[#FEF3C7] font-bold text-[#D97706]"
                                  : hasEdge
                                  ? "bg-[#F4F9F4] font-semibold text-[#4B7754]"
                                  : "text-[#C5BDB3]"
                              }`}
                            >
                              {val}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
