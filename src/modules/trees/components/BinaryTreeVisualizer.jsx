import { motion } from "framer-motion";

export default function BinaryTreeVisualizer({
  layout,
  currentFrame,
  traversalType,
}) {
  const { nodes, edges } = layout;
  const activeNodeId = currentFrame?.activeNodeId;
  const activeEdge = currentFrame?.activeEdge;
  const visitedNodeIds = currentFrame?.visitedNodeIds || [];
  const visitOrderMap = currentFrame?.visitOrderMap || {};
  const justVisitedId = currentFrame?.justVisitedId;

  const nodeRadius = 26;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#E8DDD1] bg-[#FCFAF7] p-4 shadow-sm md:p-6">
      {/* Visualizer Header / Legend */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE5DB] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold uppercase tracking-wider text-[#A1764E]">
            Binary Tree Canvas
          </span>
          <span className="text-[#8C837B]">·</span>
          <span className="text-[#6B645D]">
            {nodes.length} Nodes · Height {layout.maxDepth}
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-3.5 w-3.5 rounded-full border border-[#D5C7B7] bg-[#F7F2EA]" />
            <span className="text-[#6B645D]">Unvisited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-3.5 w-3.5 rounded-full border border-[#B88746] bg-[#F3C56D]" />
            <span className="text-[#6B645D]">Active / Exploring</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-3.5 w-3.5 rounded-full border border-[#4D7C57] bg-[#7E9A75]" />
            <span className="text-[#6B645D]">Visited (In Sequence)</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="flex w-full justify-center overflow-x-auto py-2">
        <svg
          viewBox="0 0 740 370"
          className="h-auto max-h-[420px] w-full max-w-[760px] select-none"
        >
          <defs>
            {/* Glow filters for active node */}
            <filter id="active-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="4"
                floodColor="#C68A4C"
                floodOpacity="0.4"
              />
            </filter>
            <filter id="visited-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodColor="#4D7C57"
                floodOpacity="0.3"
              />
            </filter>
          </defs>

          {/* Edges */}
          {edges.map((edge) => {
            const isEdgeActive =
              activeEdge &&
              ((activeEdge.from === edge.from && activeEdge.to === edge.to) ||
                (activeEdge.from === edge.to && activeEdge.to === edge.from));

            const isConnectedToVisited =
              visitedNodeIds.includes(edge.to) && visitedNodeIds.includes(edge.from);

            return (
              <g key={edge.id}>
                {/* Edge line */}
                <motion.line
                  x1={edge.fromPos.x}
                  y1={edge.fromPos.y}
                  x2={edge.toPos.x}
                  y2={edge.toPos.y}
                  stroke={
                    isEdgeActive
                      ? "#C68A4C"
                      : isConnectedToVisited
                      ? "#A3B89E"
                      : "#DDD2C5"
                  }
                  strokeWidth={isEdgeActive ? "3.5" : "2"}
                  strokeDasharray={isEdgeActive ? "5,3" : "none"}
                  animate={{
                    stroke: isEdgeActive
                      ? "#C68A4C"
                      : isConnectedToVisited
                      ? "#8EAA88"
                      : "#DDD2C5",
                  }}
                  transition={{ duration: 0.25 }}
                />

                {/* Left/Right branch badge */}
                <text
                  x={(edge.fromPos.x + edge.toPos.x) / 2 + (edge.type === "left" ? -12 : 12)}
                  y={(edge.fromPos.y + edge.toPos.y) / 2}
                  fontSize="11"
                  fontWeight="600"
                  fill="#A89B8C"
                  textAnchor="middle"
                >
                  {edge.type === "left" ? "L" : "R"}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isVisited = visitedNodeIds.includes(node.id);
            const isActive = activeNodeId === node.id;
            const isJustVisited = justVisitedId === node.id;
            const order = visitOrderMap[node.id];

            // Color scheme based on state
            let fill = "#FCF9F3";
            let stroke = "#D3C5B4";
            let textColor = "#2A241E";
            let filter = "none";

            if (isVisited) {
              fill = "#6C8F63";
              stroke = "#4D7344";
              textColor = "#FFFFFF";
              filter = "url(#visited-glow)";
            }

            if (isActive) {
              fill = "#E5A958";
              stroke = "#B27A2A";
              textColor = "#FFFFFF";
              filter = "url(#active-glow)";
            }

            if (isJustVisited) {
              fill = "#568750";
              stroke = "#3C6637";
              textColor = "#FFFFFF";
            }

            return (
              <motion.g
                key={node.id}
                animate={{
                  scale: isActive ? 1.15 : isJustVisited ? 1.12 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                }}
                className="cursor-pointer"
              >
                {/* Node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeRadius}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isActive ? "3" : "2"}
                  filter={filter}
                />

                {/* Node Value */}
                <text
                  x={node.x}
                  y={node.y + 6}
                  textAnchor="middle"
                  fontSize="16"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                  fill={textColor}
                >
                  {node.val}
                </text>

                {/* Visit Order Badge */}
                {isVisited && order && (
                  <g>
                    <circle
                      cx={node.x + 19}
                      cy={node.y - 19}
                      r="10.5"
                      fill="#22201D"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    <text
                      x={node.x + 19}
                      y={node.y - 15.5}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#FFFFFF"
                    >
                      {order}
                    </text>
                  </g>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Traversal Formula Bar at Bottom */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#EDE2D5] bg-[#F7F2EB] px-4 py-2.5 text-xs text-[#5C534A]">
        <div className="flex items-center gap-2">
          <span className="font-semibold uppercase tracking-wider text-[#A1764E]">
            Order Rule:
          </span>
          <span className="font-mono font-bold text-[#1F1B18]">
            {traversalType === "inorder" && "Left Subtree → Root → Right Subtree"}
            {traversalType === "preorder" && "Root → Left Subtree → Right Subtree"}
            {traversalType === "postorder" && "Left Subtree → Right Subtree → Root"}
          </span>
        </div>

        <div className="text-[#7A6F64]">
          {currentFrame?.justVisitedId ? (
            <span className="font-medium text-[#4D7C57]">
              ✓ Emitted "{currentFrame.activeNodeVal}" into sequence!
            </span>
          ) : activeNodeId ? (
            <span>
              Navigating: Node{" "}
              <strong className="text-[#A1764E]">"{currentFrame.activeNodeVal}"</strong>
            </span>
          ) : (
            <span>Traversal Complete</span>
          )}
        </div>
      </div>
    </div>
  );
}
