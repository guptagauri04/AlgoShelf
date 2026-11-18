import { motion } from "framer-motion";

export default function BSTVisualizer({
  nodes = [],
  edges = [],
  highlightedNodeId = null,
  status = "idle",
  emptyMessage = "Binary Search Tree is empty. Insert a value below to begin.",
}) {
  const width = 860;
  const height = 420;
  const radius = 22;

  // Determine node visual styling based on animation status
  function getNodeStyle(nodeId) {
    const isHighlighted = nodeId === highlightedNodeId;

    if (!isHighlighted) {
      return {
        fill: "#FAF6F0",
        stroke: "#B8A590",
        strokeWidth: 2,
        textColor: "#2B2520",
        scale: 1,
      };
    }

    switch (status) {
      case "inserted":
      case "found":
        return {
          fill: "#E6F4EA",
          stroke: "#1E7E34",
          strokeWidth: 3,
          textColor: "#135422",
          scale: 1.15,
        };
      case "target-found":
      case "delete-leaf":
      case "replace-single-child":
        return {
          fill: "#FCE8E6",
          stroke: "#D93025",
          strokeWidth: 3,
          textColor: "#A50E0E",
          scale: 1.15,
        };
      case "successor-found":
      case "successor-copied":
        return {
          fill: "#F0EBF7",
          stroke: "#6F5D86",
          strokeWidth: 3,
          textColor: "#4B3264",
          scale: 1.15,
        };
      case "duplicate":
        return {
          fill: "#FEF7E0",
          stroke: "#B06000",
          strokeWidth: 3,
          textColor: "#7C4300",
          scale: 1.1,
        };
      case "compare-left":
      case "compare-right":
      default:
        return {
          fill: "#FEF7E0",
          stroke: "#EA8600",
          strokeWidth: 3,
          textColor: "#7C4300",
          scale: 1.12,
        };
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E8DDD1] bg-white p-4 shadow-sm sm:p-6">
      {/* Legend & Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EAE1] pb-3 text-xs text-[#6B5B4D]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-3 w-3 rounded-full border border-[#B8A590] bg-[#FAF6F0]" />
            Node
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-3 w-3 rounded-full border border-[#EA8600] bg-[#FEF7E0]" />
            Comparing
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-3 w-3 rounded-full border border-[#1E7E34] bg-[#E6F4EA]" />
            Found / Inserted
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-3 w-3 rounded-full border border-[#D93025] bg-[#FCE8E6]" />
            Deleting
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-3 w-3 rounded-full border border-[#6F5D86] bg-[#F0EBF7]" />
            Successor
          </span>
        </div>
        <div className="text-right font-mono text-[11px] text-[#A1764E]">
          Total Nodes: {nodes.length}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="mt-3 flex min-h-[380px] items-center justify-center overflow-x-auto">
        {nodes.length === 0 ? (
          <div className="py-20 text-center text-[#8C7A6B]">
            <p className="font-serif text-lg">{emptyMessage}</p>
          </div>
        ) : (
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="max-w-full select-none"
          >
            {/* Tree Edges / Connecting Branches */}
            <g className="edges">
              {edges.map((edge) => {
                const isEdgeHighlighted =
                  edge.targetId === highlightedNodeId &&
                  (status === "compare-left" || status === "compare-right" || status === "inserted");

                return (
                  <line
                    key={edge.id}
                    x1={edge.from.x}
                    y1={edge.from.y}
                    x2={edge.to.x}
                    y2={edge.to.y}
                    stroke={isEdgeHighlighted ? "#EA8600" : "#DDD2C5"}
                    strokeWidth={isEdgeHighlighted ? "3" : "2"}
                    strokeDasharray={isEdgeHighlighted ? "4 2" : "none"}
                    className="transition-colors duration-300"
                  />
                );
              })}
            </g>

            {/* Tree Nodes */}
            <g className="nodes">
              {nodes.map((node) => {
                const style = getNodeStyle(node.id);
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-default"
                  >
                    <motion.circle
                      r={radius}
                      fill={style.fill}
                      stroke={style.stroke}
                      strokeWidth={style.strokeWidth}
                      initial={false}
                      animate={{
                        scale: style.scale,
                        fill: style.fill,
                        stroke: style.stroke,
                      }}
                      transition={{ duration: 0.25 }}
                    />
                    <text
                      textAnchor="middle"
                      dy="0.35em"
                      fill={style.textColor}
                      className="font-mono text-sm font-bold"
                    >
                      {node.value}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        )}
      </div>
    </div>
  );
}
