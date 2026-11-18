import { NODE_POSITIONS } from "../utils/dijkstraHelpers";
import { motion } from "framer-motion";

const NODE_R = 26;
const CANVAS_W = 640;
const CANVAS_H = 360;

function getEdgeKey(a, b) {
  return [a, b].sort().join("-");
}

export default function GraphVisualizer({
  graph,
  frame,
  source,
  destination,
}) {
  if (!graph) return null;

  const { nodes, edges } = graph;

  // When no frame yet (before algorithm starts), show idle graph
  const dist = frame?.dist ?? {};
  const visited = frame?.visited ?? new Set();
  const currentNode = frame?.currentNode ?? null;
  const relaxingEdge = frame?.relaxingEdge ?? null;
  const phase = frame?.phase ?? "idle";
  const pathEdgeSet = frame?.pathEdgeSet ?? new Set();

  // Determine edge style
  const getEdgeStyle = (edge) => {
    const key = getEdgeKey(edge.from, edge.to);
    const isRelaxing =
      relaxingEdge &&
      getEdgeKey(relaxingEdge.from, relaxingEdge.to) === key;
    const isPath = pathEdgeSet && pathEdgeSet.has(`${edge.from}-${edge.to}`);

    if (isPath && phase === "done") return { stroke: "#5A7354", strokeWidth: 3.5, opacity: 1 };
    if (isRelaxing && phase === "relax_update") return { stroke: "#5A7354", strokeWidth: 3, opacity: 1 };
    if (isRelaxing) return { stroke: "#D39B2A", strokeWidth: 3, opacity: 1 };
    return { stroke: "#D8C8B4", strokeWidth: 2, opacity: 0.7 };
  };

  // Determine node style
  const getNodeStyle = (n) => {
    const isSource = n === source;
    const isDestination = n === destination;
    const isCurrent = n === currentNode;
    const isVisited = visited && visited.has(n);
    const isOnPath = frame.finalPath && frame.finalPath.includes(n) && phase === "done";

    if (isOnPath) return { fill: "#5A7354", textColor: "#fff", ring: "#3D5A37" };
    if (isCurrent) return { fill: "#D39B2A", textColor: "#fff", ring: "#A1764E" };
    if (isSource) return { fill: "#1F1B18", textColor: "#fff", ring: "#1F1B18" };
    if (isDestination) return { fill: "#A1764E", textColor: "#fff", ring: "#7A5533" };
    if (isVisited) return { fill: "#E8DDD1", textColor: "#6B645D", ring: "#C8B8A4" };
    return { fill: "#FCFBF8", textColor: "#1F1B18", ring: "#D8C8B4" };
  };

  // Edge label midpoint
  const edgeLabelPos = (edge) => {
    const p1 = NODE_POSITIONS[edge.from];
    const p2 = NODE_POSITIONS[edge.to];
    return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  };

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] px-6 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Graph Visualization
          </p>
          <h2 className="mt-0.5 font-display text-2xl text-[#1F1B18]">
            {nodes.length} Nodes · {edges.length} Edges
          </h2>
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs font-medium text-[#6B645D]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[#1F1B18]" /> Source ({source})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[#A1764E]" /> Destination ({destination})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[#D39B2A]" /> Current
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[#5A7354]" /> Shortest Path
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full border border-[#D8C8B4] bg-[#E8DDD1]" /> Visited
          </span>
        </div>
      </div>

      {/* SVG Graph */}
      <div className="overflow-x-auto bg-[#FCFBF8] p-4">
        <svg
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          width="100%"
          style={{ minWidth: 400, maxHeight: 380 }}
          className="mx-auto block"
        >
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#D8C8B4" />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((edge, i) => {
            const p1 = NODE_POSITIONS[edge.from];
            const p2 = NODE_POSITIONS[edge.to];
            const style = getEdgeStyle(edge);
            const labelPos = edgeLabelPos(edge);
            const isRelaxing =
              relaxingEdge &&
              getEdgeKey(relaxingEdge.from, relaxingEdge.to) ===
                getEdgeKey(edge.from, edge.to);

            return (
              <g key={i}>
                <line
                  x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                  stroke={style.stroke}
                  strokeWidth={style.strokeWidth}
                  opacity={style.opacity}
                  strokeLinecap="round"
                />
                {/* Weight label */}
                <circle
                  cx={labelPos.x} cy={labelPos.y} r={12}
                  fill={isRelaxing ? "#FEF9EE" : "#FCFBF8"}
                  stroke={isRelaxing ? "#D39B2A" : "#E8DDD1"}
                  strokeWidth={isRelaxing ? 1.5 : 1}
                />
                <text
                  x={labelPos.x} y={labelPos.y}
                  textAnchor="middle" dominantBaseline="central"
                  fontSize={10} fontWeight="600"
                  fill={isRelaxing ? "#8B5A2B" : "#6B645D"}
                  fontFamily="monospace"
                >
                  {edge.weight}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((n) => {
            const pos = NODE_POSITIONS[n];
            const style = getNodeStyle(n);
            const d = dist[n];
            const distLabel = d === Infinity || d === undefined ? "∞" : d;
            const isCurrent = n === currentNode;

            return (
              <g key={n} transform={`translate(${pos.x},${pos.y})`}>
                {/* Pulse ring for current node */}
                {isCurrent && (
                  <circle r={NODE_R + 8} fill="none" stroke={style.ring} strokeWidth={2} opacity={0.35}
                    style={{ animation: "pulse 1.2s ease-in-out infinite" }}
                  />
                )}
                {/* Node circle */}
                <circle
                  r={NODE_R}
                  fill={style.fill}
                  stroke={style.ring}
                  strokeWidth={2}
                />
                {/* Node label */}
                <text textAnchor="middle" dominantBaseline="central" fontSize={15}
                  fontWeight="700" fill={style.textColor} fontFamily="monospace"
                >
                  {n}
                </text>
                {/* Distance badge above node */}
                <g transform={`translate(0, ${-NODE_R - 16})`}>
                  <rect x={-18} y={-10} width={36} height={20} rx={6}
                    fill={d === 0 ? "#1F1B18" : d === Infinity || d === undefined ? "#F7F5F2" : "#EAF2E8"}
                    stroke={d === 0 ? "#1F1B18" : d === Infinity || d === undefined ? "#E8DDD1" : "#5A7354"}
                    strokeWidth={1}
                  />
                  <text textAnchor="middle" dominantBaseline="central" fontSize={10}
                    fontWeight="700"
                    fill={d === 0 ? "#fff" : d === Infinity || d === undefined ? "#8C837B" : "#3D5A37"}
                    fontFamily="monospace"
                  >
                    {distLabel}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
