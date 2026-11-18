import { motion } from "framer-motion";
import { computeTreeLayout } from "../utils/bstEngine";

export default function TreeVisualizer({
  root,
  currentNodeId = null,
  visitedPath = [],
  highlightColor = "#D97706",
  status = "idle",
  onNodeClick = null,
}) {
  const width = 640;
  const height = 360;
  const NODE_RADIUS = 20;

  const { nodes, edges } = computeTreeLayout(root, width, height);
  const visitedSet = new Set(visitedPath);

  if (!root || nodes.length === 0) {
    return (
      <div className="flex h-80 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#D8CDBD] bg-[#FCFBF8] p-6 text-center">
        <p className="font-display text-lg text-[#6B5B4D]">The Tree is Empty</p>
        <p className="mt-1 text-xs text-[#8C837B]">
          Insert a numeric node or reset to a sample tree to start visualizing BST operations.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-3 shadow-inner">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none"
      >
        {/* Draw Edges */}
        <g className="edges">
          {edges.map((edge) => {
            const isPathEdge =
              visitedSet.has(edge.from) && visitedSet.has(edge.to);

            return (
              <line
                key={`edge-${edge.from}-${edge.to}`}
                x1={edge.fromX}
                y1={edge.fromY}
                x2={edge.toX}
                y2={edge.toY}
                stroke={isPathEdge ? highlightColor : "#D8CDBD"}
                strokeWidth={isPathEdge ? 3 : 2}
                strokeLinecap="round"
                className="transition-colors duration-300"
              />
            );
          })}
        </g>

        {/* Draw Nodes */}
        <g className="nodes">
          {nodes.map((node) => {
            const isCurrent = currentNodeId === node.id;
            const isVisited = visitedSet.has(node.id);

            let fillColor = "#FFFFFF";
            let strokeColor = "#D8CDBD";
            let textColor = "#2A2521";
            let scale = 1;

            if (isCurrent) {
              if (status === "found" || status === "inserted") {
                fillColor = "#4B7754"; // Green for success
                strokeColor = "#2D4B34";
                textColor = "#FFFFFF";
              } else if (status === "deleting") {
                fillColor = "#DC2626"; // Red for deletion
                strokeColor = "#991B1B";
                textColor = "#FFFFFF";
              } else {
                fillColor = "#D97706"; // Amber for active comparison
                strokeColor = "#92400E";
                textColor = "#FFFFFF";
              }
              scale = 1.18;
            } else if (isVisited) {
              fillColor = "#F7F2EB";
              strokeColor = highlightColor;
              textColor = "#6B5B4D";
            }

            return (
              <motion.g
                key={`tree-node-${node.id}`}
                transform={`translate(${node.x}, ${node.y})`}
                animate={{ scale }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="cursor-pointer"
                onClick={() => onNodeClick && onNodeClick(node.value)}
              >
                {/* Outer Ring on active node */}
                {isCurrent && (
                  <circle
                    r={NODE_RADIUS + 5}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={2}
                    opacity={0.4}
                    className="animate-ping"
                  />
                )}

                {/* Node Circle */}
                <circle
                  r={NODE_RADIUS}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={isCurrent || isVisited ? 2.5 : 2}
                  className="transition-colors duration-300 shadow-sm"
                />

                {/* Node Value Label */}
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={textColor}
                  className="font-mono text-xs font-bold pointer-events-none select-none"
                >
                  {node.value}
                </text>
              </motion.g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
