import { Sparkles } from "lucide-react";

export default function GraphCanvas({
  nodes,
  edges,
  currentNode,
  activeNeighbor,
  visited = [],
  activeEdge,
}) {
  const visitedSet = new Set(visited);

  return (
    <section
      aria-label="Graph visual canvas"
      className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Topology View
          </p>
          <h2 className="mt-2 font-display text-3xl text-[#1F1B18]">
            {nodes.length} Vertices · {edges.length} Edges
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4ECE3] px-3.5 py-1 text-xs font-semibold text-[#8B5A2B]">
            <Sparkles size={13} />
            Undirected Graph
          </span>
        </div>
      </div>

      <div className="relative min-h-[360px] w-full overflow-x-auto rounded-2xl border border-[#EEE5DB] bg-[#FCFBF8] p-4">
        <div className="min-w-[680px]">
          <svg viewBox="0 0 720 360" className="h-[360px] w-full select-none">
            {/* Edges */}
            {edges.map((e, idx) => {
              const fromNode = nodes.find((n) => n.id === e.from);
              const toNode = nodes.find((n) => n.id === e.to);
              if (!fromNode || !toNode) return null;

              const isEdgeActive =
                activeEdge &&
                ((activeEdge.from === e.from && activeEdge.to === e.to) ||
                  (activeEdge.from === e.to && activeEdge.to === e.from));

              return (
                <line
                  key={`edge-${idx}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isEdgeActive ? "#A1764E" : "#D9C9B6"}
                  strokeWidth={isEdgeActive ? "4" : "2.5"}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Vertices */}
            {nodes.map((node) => {
              const isCurrent = node.id === currentNode;
              const isNeighbor = node.id === activeNeighbor;
              const isVisited = visitedSet.has(node.id);

              let fill = "#FFFFFF";
              let stroke = "#E8DDD1";
              let textFill = "#1F1B18";

              if (isCurrent) {
                fill = "#FFF8E1";
                stroke = "#FFA000";
                textFill = "#E65100";
              } else if (isNeighbor) {
                fill = "#E1F5FE";
                stroke = "#0288D1";
                textFill = "#01579B";
              } else if (isVisited) {
                fill = "#E8F5E9";
                stroke = "#4CAF50";
                textFill = "#2E7D32";
              }

              return (
                <g key={`node-${node.id}`} className="transition-all duration-300">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="24"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isCurrent || isNeighbor ? "3.5" : "2"}
                    filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.06))"
                  />
                  <text
                    x={node.x}
                    y={node.y + 6}
                    textAnchor="middle"
                    fill={textFill}
                    fontFamily="monospace"
                    fontSize="15"
                    fontWeight="bold"
                  >
                    {node.label}
                  </text>

                  {/* Top indicator badge */}
                  {isCurrent && (
                    <g>
                      <rect
                        x={node.x - 24}
                        y={node.y - 42}
                        width="48"
                        height="16"
                        rx="4"
                        fill="#FFA000"
                      />
                      <text
                        x={node.x}
                        y={node.y - 30}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="9"
                        fontFamily="sans-serif"
                        fontWeight="bold"
                      >
                        CURRENT
                      </text>
                    </g>
                  )}

                  {isNeighbor && (
                    <g>
                      <rect
                        x={node.x - 26}
                        y={node.y - 42}
                        width="52"
                        height="16"
                        rx="4"
                        fill="#0288D1"
                      />
                      <text
                        x={node.x}
                        y={node.y - 30}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="9"
                        fontFamily="sans-serif"
                        fontWeight="bold"
                      >
                        DISCOVER
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
