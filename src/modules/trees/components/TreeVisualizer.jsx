import { GitBranch, Layers } from "lucide-react";
import {
  getTreeNodesList,
  getTreeEdges,
  getTreeHeight,
  countNodes,
} from "../utils/bstEngine";

export default function TreeVisualizer({
  root = null,
  activeNodeId = null,
  visitedIds = [],
  targetNodeId = null,
  operationType = null, // "search", "insert", "delete", "traversal"
  message = null,
}) {
  const nodes = getTreeNodesList(root);
  const edges = getTreeEdges(root);
  const totalNodes = countNodes(root);
  const height = getTreeHeight(root);

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Header Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Hierarchical Canvas
          </p>
          <h2 className="mt-1 font-display text-3xl text-[#1F1B18]">
            Binary Search Tree
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-mono text-xs font-semibold text-[#6B5B4D]">
            Nodes: {totalNodes}
          </span>
          <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-mono text-xs font-semibold text-[#6B5B4D]">
            Height: {height}
          </span>
          {totalNodes === 0 && (
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
              Empty Tree
            </span>
          )}
        </div>
      </div>

      {/* Message Banner */}
      {message && (
        <div
          className={`mb-6 rounded-2xl p-4 text-sm font-medium ${
            message.type === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : message.type === "success"
              ? "bg-[#EAF2E8] text-[#3D5A37] border border-[#5A7354]/20"
              : "bg-[#FEF9EE] text-[#8B5A2B] border border-[#D39B2A]/20"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Interactive SVG Tree Canvas */}
      <div className="relative min-h-[380px] w-full overflow-x-auto rounded-2xl border-2 border-[#E8DDD1] bg-[#FCFBF8] p-4 shadow-inner">
        {totalNodes > 0 ? (
          <svg
            viewBox="0 0 760 380"
            className="mx-auto block h-auto w-full min-w-[620px] max-w-full select-none"
          >
            {/* Tree Edges */}
            <g className="edges">
              {edges.map((edge) => {
                const isTraversed =
                  visitedIds.includes(edge.fromId) &&
                  visitedIds.includes(edge.toId);

                return (
                  <line
                    key={edge.id}
                    x1={edge.x1}
                    y1={edge.y1}
                    x2={edge.x2}
                    y2={edge.y2}
                    stroke={isTraversed ? "#A1764E" : "#D8C5B0"}
                    strokeWidth={isTraversed ? 3.5 : 2}
                    strokeLinecap="round"
                    className="transition-colors duration-300"
                  />
                );
              })}
            </g>

            {/* Tree Nodes */}
            <g className="nodes">
              {nodes.map((node) => {
                const isTarget = node.id === targetNodeId;
                const isActive = node.id === activeNodeId;
                const isVisited = visitedIds.includes(node.id);

                let fillColor = "#FFFFFF";
                let strokeColor = "#D8C5B0";
                let textColor = "#1F1B18";

                if (isTarget) {
                  if (operationType === "delete") {
                    fillColor = "#FDF2F0";
                    strokeColor = "#C87865";
                    textColor = "#8C3D2D";
                  } else {
                    fillColor = "#EAF2E8";
                    strokeColor = "#5A7354";
                    textColor = "#3D5A37";
                  }
                } else if (isActive) {
                  fillColor = "#FEF9EE";
                  strokeColor = "#D39B2A";
                  textColor = "#8B5A2B";
                } else if (isVisited) {
                  fillColor = "#FAF0E6";
                  strokeColor = "#A1764E";
                  textColor = "#5F452E";
                }

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="transition-transform duration-300"
                  >
                    {/* Active Pulse Ring */}
                    {isActive && (
                      <circle
                        r="28"
                        fill="none"
                        stroke="#D39B2A"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        opacity="0.8"
                      />
                    )}

                    {/* Node Circle */}
                    <circle
                      r="22"
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isTarget || isActive ? "3" : "2"}
                      className="shadow-sm transition-colors duration-300"
                    />

                    {/* Value */}
                    <text
                      textAnchor="middle"
                      dy="5"
                      fill={textColor}
                      fontSize="14"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {node.value}
                    </text>

                    {/* Level Tag */}
                    <text
                      textAnchor="middle"
                      dy="36"
                      fill="#8C837B"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      lvl {node.level}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        ) : (
          <div className="flex h-72 flex-col items-center justify-center text-center text-[#8C837B]">
            <GitBranch size={36} className="mb-2 text-[#D8C5B0]" />
            <p className="font-editorial text-lg italic">The tree is currently empty.</p>
            <p className="mt-1 text-xs">Insert values from the control panel to grow the tree.</p>
          </div>
        )}
      </div>

      {/* Legend & Stats */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#EEE5DB] pt-4 text-xs text-[#6B5B4D]">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-[#D8C5B0] bg-white" />
            <span>Regular Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-[#A1764E] bg-[#FAF0E6]" />
            <span>Visited Path</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-[#D39B2A] bg-[#FEF9EE]" />
            <span>Active / Target</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-[#5A7354] bg-[#EAF2E8]" />
            <span>Found / Inserted</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[#A1764E]">
          <Layers size={14} />
          <span>Ordering Rule: Left &lt; Root &lt; Right</span>
        </div>
      </div>
    </div>
  );
}
