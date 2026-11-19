import { motion } from "framer-motion";

export default function GraphCanvas({
  nodes = [],
  edges = [],
  directed = false,
  currentNode = null,
  targetNode = null,
  visited = [],
  queueOrStack = [],
  activeTreeEdges = [],
  highlightEdge = null,
  startNode = null,
  onNodeClick = null,
}) {
  const NODE_RADIUS = 22;
  const visitedSet = new Set(visited);
  const queueOrStackSet = new Set(queueOrStack);
  const treeEdgeSet = new Set(activeTreeEdges);

  // SVG dimensions
  const width = 640;
  const height = 360;

  const nodeMap = {};
  nodes.forEach((n) => {
    nodeMap[n.id] = n;
  });

  const getEdgeKey = (from, to) => {
    return directed ? `${from}->${to}` : [from, to].sort().join("-");
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-3 shadow-inner">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none"
      >
        <defs>
          {/* Arrowhead marker for directed edges */}
          <marker
            id="arrowhead-default"
            markerWidth="10"
            markerHeight="7"
            refX="25"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#B3A290" />
          </marker>
          <marker
            id="arrowhead-active"
            markerWidth="10"
            markerHeight="7"
            refX="25"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#A1764E" />
          </marker>
          <marker
            id="arrowhead-tree"
            markerWidth="10"
            markerHeight="7"
            refX="25"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#4B7754" />
          </marker>
        </defs>

        {/* Draw Edges */}
        <g className="edges">
          {edges.map((edge, idx) => {
            const u = nodeMap[edge.from];
            const v = nodeMap[edge.to];
            if (!u || !v) return null;

            const edgeKey = getEdgeKey(edge.from, edge.to);
            const isTree = treeEdgeSet.has(edgeKey);

            const isHighlighted =
              highlightEdge &&
              ((highlightEdge.from === edge.from && highlightEdge.to === edge.to) ||
                (!directed &&
                  highlightEdge.from === edge.to &&
                  highlightEdge.to === edge.from));

            let strokeColor = "#D8CDBD";
            let strokeWidth = 2;
            let marker = directed ? "url(#arrowhead-default)" : undefined;

            if (isHighlighted) {
              strokeColor = highlightEdge.isBacktrack ? "#A1764E" : "#D97706";
              strokeWidth = 3.5;
              marker = directed ? "url(#arrowhead-active)" : undefined;
            } else if (isTree) {
              strokeColor = "#4B7754";
              strokeWidth = 3;
              marker = directed ? "url(#arrowhead-tree)" : undefined;
            }

            return (
              <g key={`edge-${idx}-${edge.from}-${edge.to}`}>
                <line
                  x1={u.x}
                  y1={u.y}
                  x2={v.x}
                  y2={v.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  markerEnd={marker}
                  className="transition-colors duration-300"
                />
              </g>
            );
          })}
        </g>

        {/* Draw Nodes */}
        <g className="nodes">
          {nodes.map((node) => {
            const isCurrent = currentNode === node.id;
            const isTarget = targetNode === node.id;
            const isVisited = visitedSet.has(node.id);
            const isInQueueStack = queueOrStackSet.has(node.id);
            const isStart = startNode === node.id;

            let bgColor = "#FFFFFF";
            let borderColor = "#D8CDBD";
            let textColor = "#2A2521";
            let scale = 1;

            if (isCurrent) {
              bgColor = "#D97706"; // Amber highlight for active node
              borderColor = "#92400E";
              textColor = "#FFFFFF";
              scale = 1.15;
            } else if (isTarget) {
              bgColor = "#FBBF24"; // Light amber inspecting
              borderColor = "#B45309";
              textColor = "#1F1B18";
              scale = 1.08;
            } else if (isVisited) {
              bgColor = "#4B7754"; // Green for visited
              borderColor = "#2D4B34";
              textColor = "#FFFFFF";
            } else if (isInQueueStack) {
              bgColor = "#EADCCB"; // Tan for in-queue/stack
              borderColor = "#A1764E";
              textColor = "#4A3B32";
            } else if (isStart) {
              borderColor = "#A1764E";
            }

            return (
              <motion.g
                key={`node-${node.id}`}
                transform={`translate(${node.x}, ${node.y})`}
                animate={{ scale }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="cursor-pointer"
                onClick={() => onNodeClick && onNodeClick(node.id)}
              >
                {/* Node Outer Circle */}
                <circle
                  r={NODE_RADIUS}
                  fill={bgColor}
                  stroke={borderColor}
                  strokeWidth={isCurrent || isVisited || isTarget ? 3 : 2}
                  className="transition-colors duration-300 shadow-sm"
                />

                {/* Node Text Label */}
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={textColor}
                  className="font-mono text-sm font-bold select-none pointer-events-none"
                >
                  {node.label || node.id}
                </text>

                {/* Small indicator badge if Start Node */}
                {isStart && !isCurrent && (
                  <circle
                    cx={NODE_RADIUS - 4}
                    cy={-NODE_RADIUS + 4}
                    r={5}
                    fill="#A1764E"
                    stroke="#FFF"
                    strokeWidth={1.5}
                  />
                )}
              </motion.g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
