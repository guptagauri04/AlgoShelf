import { useMemo } from "react";
import { calculateEdgeEndpoints } from "../utils/graphOperations";

export default function GraphCanvas({
  nodes,
  edges,
  isDirected,
  currentFrame,
  startNodeId,
  onSelectStartNode,
  algorithm,
}) {
  const visitedSet = useMemo(
    () => new Set(currentFrame?.visited || []),
    [currentFrame?.visited]
  );

  const inBufferSet = useMemo(() => {
    if (algorithm === "dfs") {
      return new Set(currentFrame?.stack || []);
    }
    return new Set(currentFrame?.queue || []);
  }, [algorithm, currentFrame?.stack, currentFrame?.queue]);

  const activeNode = currentFrame?.currentNode;
  const activeEdge = currentFrame?.activeEdge;
  const traversalEdges = currentFrame?.traversalEdges || [];

  const nodeMap = useMemo(() => {
    const map = new Map();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [nodes]);

  // Checks if an edge is in the recorded discovery tree
  const isTraversalEdge = (from, to) => {
    return traversalEdges.some(
      (e) =>
        (e.from === from && e.to === to) ||
        (!isDirected && e.from === to && e.to === from)
    );
  };

  const isActiveEdge = (from, to) => {
    if (!activeEdge) return false;
    return (
      (activeEdge.from === from && activeEdge.to === to) ||
      (!isDirected && activeEdge.from === to && activeEdge.to === from)
    );
  };

  return (
    <div className="relative flex flex-col items-center rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-4 shadow-sm sm:p-6">
      {/* Legend & Hint */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 w-full border-b border-[#ECE3D8] pb-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full border border-[#D9C9B6] bg-white" />
            <span className="text-[#6B645D]">Unvisited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#E59866]" />
            <span className="text-[#6B645D]">
              {algorithm === "dfs" ? "In Stack" : "In Queue"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#A65B38] ring-2 ring-[#D39B7B]" />
            <span className="text-[#6B645D] font-semibold">Active Node</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#567156]" />
            <span className="text-[#6B645D]">Visited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-5 rounded-full bg-[#567156]" />
            <span className="text-[#6B645D]">Tree Edge</span>
          </div>
        </div>
        <p className="font-editorial text-xs italic text-[#A07A56]">
          Tip: Click any node to set it as the start vertex.
        </p>
      </div>

      {/* SVG Canvas */}
      <div className="w-full overflow-x-auto flex justify-center py-2">
        <svg
          viewBox="0 0 620 440"
          className="h-auto w-full max-w-[620px] select-none"
          role="img"
          aria-label="Graph representation canvas"
        >
          <defs>
            {/* Arrowhead marker for default edges */}
            <marker
              id="arrow-default"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#C5B29D" />
            </marker>

            {/* Arrowhead marker for active edge */}
            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#A65B38" />
            </marker>

            {/* Arrowhead marker for traversal tree edge */}
            <marker
              id="arrow-traversal"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#567156" />
            </marker>

            {/* Pulse Glow Filter */}
            <filter id="active-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#A65B38" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Edges */}
          <g className="edges-layer">
            {edges.map((edge) => {
              const src = nodeMap.get(edge.from);
              const tgt = nodeMap.get(edge.to);
              if (!src || !tgt) return null;

              const active = isActiveEdge(edge.from, edge.to);
              const inTree = isTraversalEdge(edge.from, edge.to);

              const { x1, y1, x2, y2 } = calculateEdgeEndpoints(
                src,
                tgt,
                isDirected ? 26 : 24
              );

              let stroke = "#D9C9B6";
              let strokeWidth = 2;
              let strokeDasharray = "none";
              let markerEnd = isDirected ? "url(#arrow-default)" : undefined;

              if (active) {
                stroke = "#A65B38";
                strokeWidth = 3.5;
                strokeDasharray = "5,4";
                markerEnd = isDirected ? "url(#arrow-active)" : undefined;
              } else if (inTree) {
                stroke = "#567156";
                strokeWidth = 3;
                markerEnd = isDirected ? "url(#arrow-traversal)" : undefined;
              }

              return (
                <line
                  key={edge.id}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  markerEnd={markerEnd}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              );
            })}
          </g>

          {/* Vertices / Nodes */}
          <g className="nodes-layer">
            {nodes.map((node) => {
              const isStart = node.id === startNodeId;
              const isActive = node.id === activeNode;
              const isVisited = visitedSet.has(node.id);
              const isInBuffer = inBufferSet.has(node.id);

              let fillColor = "#FFFFFF";
              let strokeColor = "#C5B29D";
              let textColor = "#1F1B18";
              let filter = undefined;

              if (isActive) {
                fillColor = "#A65B38";
                strokeColor = "#7B3D20";
                textColor = "#FFFFFF";
                filter = "url(#active-glow)";
              } else if (isVisited) {
                fillColor = "#567156";
                strokeColor = "#3E533E";
                textColor = "#FFFFFF";
              } else if (isInBuffer) {
                fillColor = "#E59866";
                strokeColor = "#C67D4B";
                textColor = "#FFFFFF";
              }

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer transition-transform duration-200 hover:scale-110"
                  onClick={() => onSelectStartNode(node.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Vertex ${node.label}${isStart ? " (Start Node)" : ""}${
                    isActive ? " (Active)" : isVisited ? " (Visited)" : ""
                  }`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectStartNode(node.id);
                    }
                  }}
                >
                  {/* Outer ring for start node */}
                  {isStart && (
                    <circle
                      r="31"
                      fill="none"
                      stroke="#A65B38"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                      className="animate-spin-slow opacity-80"
                    />
                  )}

                  {/* Main Circle */}
                  <circle
                    r="24"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth="2.5"
                    filter={filter}
                    className="transition-colors duration-300"
                  />

                  {/* Node Label */}
                  <text
                    textAnchor="middle"
                    dy="0.35em"
                    fill={textColor}
                    fontSize="14"
                    fontWeight="700"
                    fontFamily="ui-monospace, monospace"
                  >
                    {node.label}
                  </text>

                  {/* Start Node Badge */}
                  {isStart && (
                    <text
                      y="-33"
                      textAnchor="middle"
                      fill="#A65B38"
                      fontSize="10"
                      fontWeight="700"
                      className="uppercase tracking-wider"
                    >
                      Start
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
