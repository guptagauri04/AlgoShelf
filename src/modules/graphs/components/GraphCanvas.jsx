import { Network } from "lucide-react";

export default function GraphCanvas({
  nodes = [],
  edges = [],
  isDirected = false,
  showWeights = false,
  activeNodeId = null,
  candidateNodeId = null,
  visitedIds = [],
  activeEdges = [],
  shortestPathEdges = [],
  finalPath = [],
  distances = null,
  message = null,
}) {
  const nodeMap = {};
  nodes.forEach((n) => {
    nodeMap[n.id] = n;
  });

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Canvas Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Topological Canvas
          </p>
          <h2 className="mt-1 font-display text-3xl text-[#1F1B18]">
            Interactive Graph Visualizer
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-mono text-xs font-semibold text-[#6B5B4D]">
            Vertices: {nodes.length}
          </span>
          <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-mono text-xs font-semibold text-[#6B5B4D]">
            Edges: {edges.length}
          </span>
          <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-mono text-xs font-semibold text-[#6B5B4D]">
            {isDirected ? "Directed" : "Undirected"}
          </span>
        </div>
      </div>

      {/* Message Banner */}
      {message && (
        <div
          className={`mb-6 rounded-2xl p-4 text-sm font-medium ${
            message.type === "error"
              ? "border border-red-200 bg-red-50 text-red-700"
              : message.type === "success"
              ? "border border-[#5A7354]/20 bg-[#EAF2E8] text-[#3D5A37]"
              : "border border-[#D39B2A]/20 bg-[#FEF9EE] text-[#8B5A2B]"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* SVG Canvas */}
      <div className="relative min-h-[400px] w-full overflow-x-auto rounded-2xl border-2 border-[#E8DDD1] bg-[#FCFBF8] p-4 shadow-inner">
        <svg
          viewBox="0 0 760 380"
          className="mx-auto block h-auto w-full min-w-[620px] max-w-full select-none"
        >
          <defs>
            {/* Standard Arrow Marker */}
            <marker
              id="graph-arrow"
              viewBox="0 0 10 10"
              refX="28"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#C8B59E" />
            </marker>

            {/* Active Highlight Arrow Marker */}
            <marker
              id="graph-arrow-active"
              viewBox="0 0 10 10"
              refX="28"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#A1764E" />
            </marker>

            {/* Shortest Path Arrow Marker */}
            <marker
              id="graph-arrow-path"
              viewBox="0 0 10 10"
              refX="28"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#3D5A37" />
            </marker>
          </defs>

          {/* Edges Layer */}
          <g className="edges">
            {edges.map((edge, idx) => {
              const u = nodeMap[edge.from];
              const v = nodeMap[edge.to];
              if (!u || !v) return null;

              const forwardKey = `${edge.from}->${edge.to}`;
              const backwardKey = `${edge.to}->${edge.from}`;

              const isShortestPath =
                shortestPathEdges.includes(forwardKey) ||
                (!isDirected && shortestPathEdges.includes(backwardKey));

              const isActiveEdge =
                activeEdges.includes(forwardKey) ||
                (!isDirected && activeEdges.includes(backwardKey));

              let strokeColor = "#D8C5B0";
              let strokeWidth = 2;
              let markerEnd = isDirected ? "url(#graph-arrow)" : undefined;

              if (isShortestPath) {
                strokeColor = "#3D5A37";
                strokeWidth = 4;
                markerEnd = isDirected ? "url(#graph-arrow-path)" : undefined;
              } else if (isActiveEdge) {
                strokeColor = "#A1764E";
                strokeWidth = 3.5;
                markerEnd = isDirected ? "url(#graph-arrow-active)" : undefined;
              }

              const midX = (u.x + v.x) / 2;
              const midY = (u.y + v.y) / 2;

              return (
                <g key={`edge-${edge.from}-${edge.to}-${idx}`}>
                  <line
                    x1={u.x}
                    y1={u.y}
                    x2={v.x}
                    y2={v.y}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    markerEnd={markerEnd}
                    className="transition-colors duration-300"
                  />

                  {/* Edge Weight Badge */}
                  {showWeights && edge.weight !== undefined && (
                    <g transform={`translate(${midX}, ${midY})`}>
                      <circle
                        r="11"
                        fill="#FFFFFF"
                        stroke={isShortestPath ? "#3D5A37" : "#D8C5B0"}
                        strokeWidth="1.5"
                      />
                      <text
                        textAnchor="middle"
                        dy="3.5"
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="JetBrains Mono, monospace"
                        fill={isShortestPath ? "#3D5A37" : "#6B5B4D"}
                      >
                        {edge.weight}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* Nodes Layer */}
          <g className="nodes">
            {nodes.map((node) => {
              const isActive = node.id === activeNodeId;
              const isCandidate = node.id === candidateNodeId;
              const isVisited = visitedIds.includes(node.id);
              const isPath = finalPath.includes(node.id);

              let fillColor = "#FFFFFF";
              let strokeColor = "#D8C5B0";
              let textColor = "#1F1B18";

              if (isPath) {
                fillColor = "#EAF2E8";
                strokeColor = "#3D5A37";
                textColor = "#3D5A37";
              } else if (isActive) {
                fillColor = "#FEF9EE";
                strokeColor = "#D39B2A";
                textColor = "#8B5A2B";
              } else if (isCandidate) {
                fillColor = "#F0F4FA";
                strokeColor = "#4A709C";
                textColor = "#2D4C70";
              } else if (isVisited) {
                fillColor = "#FAF0E6";
                strokeColor = "#A1764E";
                textColor = "#5F452E";
              }

              const distVal = distances ? distances[node.id] : null;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="transition-transform duration-300"
                >
                  {/* Active Pulse Ring */}
                  {isActive && (
                    <circle
                      r="32"
                      fill="none"
                      stroke="#D39B2A"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                      className="animate-pulse"
                    />
                  )}

                  {/* Node Circle */}
                  <circle
                    r="22"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isActive || isPath ? "3" : "2"}
                    className="shadow-sm transition-colors duration-300"
                  />

                  {/* Node Label */}
                  <text
                    textAnchor="middle"
                    dy="5"
                    fill={textColor}
                    fontSize="14"
                    fontWeight="bold"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {node.label || node.id}
                  </text>

                  {/* Distance Badge for Dijkstra */}
                  {distances && (
                    <g transform="translate(0, 36)">
                      <rect
                        x="-20"
                        y="-10"
                        width="40"
                        height="18"
                        rx="9"
                        fill="#FFFFFF"
                        stroke="#D8C5B0"
                        strokeWidth="1"
                      />
                      <text
                        textAnchor="middle"
                        dy="3"
                        fill="#6B5B4D"
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {distVal === Infinity ? "∞" : distVal}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#EEE5DB] pt-4 text-xs text-[#6B5B4D]">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-[#D8C5B0] bg-white" />
            <span>Unvisited</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-[#D39B2A] bg-[#FEF9EE]" />
            <span>Active Vertex</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-[#A1764E] bg-[#FAF0E6]" />
            <span>Visited / Discovered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-[#3D5A37] bg-[#EAF2E8]" />
            <span>Shortest Path</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[#A1764E]">
          <Network size={14} />
          <span>Graph Theory Canvas</span>
        </div>
      </div>
    </div>
  );
}
