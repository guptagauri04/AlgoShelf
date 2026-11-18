import { GitBranch, Sparkles } from "lucide-react";

export default function BstTreeCanvas({ layout, highlightedId, foundId, comparison }) {
  const { nodes, edges } = layout;

  return (
    <section
      aria-label="Binary Search Tree Canvas"
      className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            2D Tree Topology
          </p>
          <h2 className="mt-2 font-display text-3xl text-[#1F1B18]">
            {nodes.length} {nodes.length === 1 ? "Node" : "Nodes"}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4ECE3] px-3.5 py-1 text-xs font-semibold text-[#8B5A2B]">
            <Sparkles size={13} />
            BST Property: Left &lt; Root &lt; Right
          </span>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative min-h-[380px] w-full overflow-x-auto rounded-2xl border border-[#EEE5DB] bg-[#FCFBF8] p-4">
        {nodes.length > 0 ? (
          <div className="min-w-[700px]">
            <svg
              viewBox="0 0 800 380"
              className="h-[380px] w-full select-none"
            >
              {/* Connecting Edges */}
              {edges.map((edge) => (
                <line
                  key={edge.id}
                  x1={edge.fromX}
                  y1={edge.fromY}
                  x2={edge.toX}
                  y2={edge.toY}
                  stroke="#D9C9B6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              ))}

              {/* Tree Nodes */}
              {nodes.map((node) => {
                const isHighlighted = node.id === highlightedId;
                const isFound = node.id === foundId;

                let fill = "#FFFFFF";
                let stroke = "#E8DDD1";
                let textFill = "#1F1B18";

                if (isFound && comparison === "equal") {
                  fill = "#E8F5E9";
                  stroke = "#4CAF50";
                  textFill = "#2E7D32";
                } else if (isFound && comparison === "delete") {
                  fill = "#FFEBEE";
                  stroke = "#E53935";
                  textFill = "#C62828";
                } else if (isHighlighted) {
                  fill = "#FFF8E1";
                  stroke = "#FFA000";
                  textFill = "#E65100";
                }

                return (
                  <g key={node.id} className="transition-all duration-300">
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="22"
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={isHighlighted || isFound ? "3" : "2"}
                      filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.06))"
                    />
                    <text
                      x={node.x}
                      y={node.y + 5}
                      textAnchor="middle"
                      fill={textFill}
                      fontFamily="monospace"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      {node.value}
                    </text>

                    {/* Comparison badge if currently visited */}
                    {isHighlighted && comparison && (
                      <g>
                        <rect
                          x={node.x - 22}
                          y={node.y - 38}
                          width="44"
                          height="16"
                          rx="4"
                          fill="#A1764E"
                        />
                        <text
                          x={node.x}
                          y={node.y - 26}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="9"
                          fontFamily="sans-serif"
                          fontWeight="bold"
                        >
                          {comparison === "left"
                            ? "< LEFT"
                            : comparison === "right"
                            ? "> RIGHT"
                            : comparison.toUpperCase()}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        ) : (
          <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
            <GitBranch size={32} className="text-[#A89F95]" />
            <p className="mt-3 font-mono text-base font-semibold text-[#8C837B]">
              Tree is Empty
            </p>
            <p className="mt-1 text-xs text-[#A89F95]">
              Insert a node value below to plant the root.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
