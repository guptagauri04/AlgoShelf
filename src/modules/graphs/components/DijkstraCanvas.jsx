import { motion } from "framer-motion";
import { getEdgeKey } from "../utils/dijkstraOperations";

export default function DijkstraCanvas({
  nodes = [],
  edges = [],
  sourceId = "A",
  destId = "F",
  currentNode = null,
  activeNeighbor = null,
  activeEdge = null,
  visited = [],
  distances = {},
  shortestPath = [],
  shortestPathEdges = [],
}) {
  const nodeMap = {};
  nodes.forEach((n) => {
    nodeMap[n.id] = n;
  });

  return (
    <div className="relative rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Canvas Top Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Interactive Weighted Topology
          </p>
          <div className="mt-1 flex items-center gap-3">
            <h2 className="font-display text-2xl text-[#1F1B18]">
              Pathfinder Canvas
            </h2>
            <span className="rounded-full bg-[#FAF8F5] px-3 py-1 font-mono text-xs font-semibold text-[#8C837B]">
              Source: {sourceId} → Destination: {destId}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#3D5A37]" />
            <span className="text-[#6B5B4D]">Shortest Path</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#EAF2E8] ring-1 ring-[#5A7354]" />
            <span className="text-[#6B5B4D]">Settled</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#FEF9EE] ring-2 ring-[#D39B2A]" />
            <span className="text-[#6B5B4D]">Visiting</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-white ring-1 ring-[#D8C7B5]" />
            <span className="text-[#6B5B4D]">Unvisited</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative overflow-hidden rounded-2xl border border-[#EEE5DB] bg-[#FAF8F5]">
        <svg
          viewBox="0 0 680 380"
          className="h-auto w-full select-none"
          style={{ minHeight: "340px" }}
        >
          {/* Edges Layer */}
          <g>
            {edges.map(({ u, v, weight }) => {
              const from = nodeMap[u];
              const to = nodeMap[v];
              if (!from || !to) return null;

              const edgeKey = getEdgeKey(u, v);
              const isPath = shortestPathEdges.includes(edgeKey);
              const isActive = activeEdge && activeEdge.edgeKey === edgeKey;

              let stroke = "#D8C7B5";
              let strokeWidth = 2.5;

              if (isPath) {
                stroke = "#3D5A37";
                strokeWidth = 5;
              } else if (isActive) {
                stroke = "#D39B2A";
                strokeWidth = 4;
              }

              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2;

              return (
                <g key={edgeKey}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    className="transition-colors duration-300"
                  />
                  {/* Weight Pill Badge */}
                  <rect
                    x={midX - 16}
                    y={midY - 11}
                    width={32}
                    height={22}
                    rx={7}
                    fill={isPath ? "#EAF2E8" : isActive ? "#FEF9EE" : "#FFFFFF"}
                    stroke={isPath ? "#5A7354" : isActive ? "#D39B2A" : "#D8C7B5"}
                    strokeWidth={1.5}
                    className="shadow-sm"
                  />
                  <text
                    x={midX}
                    y={midY + 4}
                    textAnchor="middle"
                    className={`font-mono text-xs font-bold ${
                      isPath ? "fill-[#3D5A37]" : isActive ? "fill-[#8B5A2B]" : "fill-[#6B5B4D]"
                    }`}
                  >
                    {weight}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Nodes Layer */}
          <g>
            {nodes.map((node) => {
              const isSource = node.id === sourceId;
              const isDest = node.id === destId;
              const isCurrent = node.id === currentNode;
              const isNeighbor = node.id === activeNeighbor;
              const isSettled = visited.includes(node.id);
              const isPath = shortestPath.includes(node.id);
              const dist = distances[node.id];
              const distText = dist === Infinity || dist === undefined ? "∞" : dist;

              let fill = "#FFFFFF";
              let stroke = "#D8C7B5";
              let textColor = "#1F1B18";

              if (isPath) {
                fill = "#3D5A37";
                stroke = "#2A4025";
                textColor = "#FFFFFF";
              } else if (isCurrent) {
                fill = "#FEF9EE";
                stroke = "#D39B2A";
                textColor = "#8B5A2B";
              } else if (isNeighbor) {
                fill = "#FBF4EA";
                stroke = "#C4883A";
                textColor = "#8B5A2B";
              } else if (isSettled) {
                fill = "#EAF2E8";
                stroke = "#5A7354";
                textColor = "#3D5A37";
              }

              return (
                <g key={node.id} className="transition-transform duration-300">
                  {/* Outer Pulsing Glow on Current Node */}
                  {isCurrent && (
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={36}
                      fill="none"
                      stroke="#D39B2A"
                      strokeWidth={2}
                      initial={{ scale: 0.9, opacity: 0.8 }}
                      animate={{ scale: 1.15, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 1.4 }}
                    />
                  )}

                  {/* Node Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={26}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isCurrent || isPath ? 3.5 : 2}
                    className="shadow-sm transition-all duration-300"
                  />

                  {/* Node Letter */}
                  <text
                    x={node.x}
                    y={node.y + 6}
                    textAnchor="middle"
                    className="font-display text-base font-bold select-none"
                    fill={textColor}
                  >
                    {node.label}
                  </text>

                  {/* Role Tag (SRC / DEST) */}
                  {isSource && (
                    <g transform={`translate(${node.x - 16}, ${node.y - 42})`}>
                      <rect width={32} height={16} rx={5} fill="#1F1B18" />
                      <text x={16} y={11} textAnchor="middle" fill="#FFFFFF" className="font-mono text-[9px] font-bold">
                        SRC
                      </text>
                    </g>
                  )}
                  {isDest && (
                    <g transform={`translate(${node.x - 18}, ${node.y - 42})`}>
                      <rect width={36} height={16} rx={5} fill="#A64A25" />
                      <text x={18} y={11} textAnchor="middle" fill="#FFFFFF" className="font-mono text-[9px] font-bold">
                        DEST
                      </text>
                    </g>
                  )}

                  {/* Tentative Distance Subtitle Badge */}
                  <g transform={`translate(${node.x - 22}, ${node.y + 34})`}>
                    <rect
                      width={44}
                      height={18}
                      rx={6}
                      fill="#FFFFFF"
                      stroke={isPath ? "#5A7354" : isSettled ? "#9BB896" : "#E3D7C9"}
                      strokeWidth={1}
                    />
                    <text
                      x={22}
                      y={12}
                      textAnchor="middle"
                      className={`font-mono text-[10px] font-bold ${
                        isPath ? "fill-[#3D5A37]" : isSettled ? "fill-[#5A7354]" : "fill-[#8C837B]"
                      }`}
                    >
                      d: {distText}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
