
const LinkedListVisualizer = ({
  nodes = [],
  currentNode = null,
  currentNodeIndex = null,
  traversalSteps = [],
  currentStep = -1,
  status = "idle",
}) => {
  // Find all nodes that have already been visited
  const visitedNodeIndexes = new Set(
    traversalSteps
      .slice(0, currentStep + 1)
      .filter((step) => step.type === "visit")
      .map((step) => step.index)
  );

  // Empty linked list
  if (nodes.length === 0) {
    return (
      <div className="w-full rounded-xl border border-dashed border-[#A1764E]/40 bg-white p-10 text-center">
        <p className="text-lg font-semibold text-[#1F1B18]">
          Your linked list is empty
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Add some nodes to start visualizing the linked list.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Linked list heading */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-[#1F1B18]">
          Singly Linked List
        </h2>

        <span className="rounded-full bg-[#A1764E]/10 px-3 py-1 text-sm text-[#A1764E]">
          {nodes.length} {nodes.length === 1 ? "Node" : "Nodes"}
        </span>
      </div>

      {/* Nodes and pointer connections */}
      <div className="w-full overflow-x-auto rounded-xl border border-[#E8E1D9] bg-[#F7F5F2] p-6">
        <div className="flex min-w-max items-center gap-3">
          {/* HEAD label */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-[#A1764E]">
              HEAD
            </span>
            <div className="h-1 w-1 rounded-full bg-[#A1764E]" />
          </div>

          {nodes.map((node, index) => {
            const isCurrent = currentNodeIndex === node.id;
            const isVisited = visitedNodeIndexes.has(node.id);

            return (
              <div key={node.id} className="flex items-center gap-3">
                {/* Node card */}
                <div
                  className={`relative flex min-w-[130px] flex-col overflow-hidden rounded-xl border-2 bg-white shadow-sm transition-all duration-300 ${
                    isCurrent
                      ? "scale-105 border-[#A1764E] shadow-lg"
                      : isVisited
                      ? "border-green-500"
                      : "border-[#E8E1D9]"
                  }`}
                >
                  {/* Node title */}
                  <div
                    className={`px-3 py-2 text-center text-xs font-semibold ${
                      isCurrent
                        ? "bg-[#A1764E] text-white"
                        : isVisited
                        ? "bg-green-100 text-green-800"
                        : "bg-[#EEE8E1] text-[#1F1B18]"
                    }`}
                  >
                    NODE {index}
                    {isCurrent && " • CURRENT"}
                    {!isCurrent && isVisited && " • VISITED"}
                  </div>

                  {/* Data and next pointer */}
                  <div className="grid grid-cols-2 divide-x divide-[#E8E1D9]">
                    <div className="p-3 text-center">
                      <p className="text-xs text-gray-500">DATA</p>
                      <p className="mt-1 text-lg font-bold text-[#1F1B18]">
                        {node.data}
                      </p>
                    </div>

                    <div className="p-3 text-center">
                      <p className="text-xs text-gray-500">NEXT</p>
                      <p className="mt-1 text-sm font-semibold text-[#A1764E]">
                        {node.next === null ? "NULL" : `Node ${node.next}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pointer arrow */}
                {node.next !== null && (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-500">
                      next
                    </span>
                    <span className="text-2xl text-[#A1764E]">→</span>
                  </div>
                )}

                {/* NULL pointer */}
                {node.next === null && (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold text-red-500">
                      NULL
                    </span>
                    <span className="text-sm text-red-500">∅</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current node information */}
      <div className="rounded-xl border border-[#E8E1D9] bg-white p-4">
        <h3 className="font-semibold text-[#1F1B18]">
          Traversal Status
        </h3>

        {status === "idle" && (
          <p className="mt-2 text-sm text-gray-500">
            Start traversal to see how each node is visited.
          </p>
        )}

        {status === "running" && currentNode && (
          <p className="mt-2 text-sm text-[#A1764E]">
            Currently visiting Node {currentNode.id} with data:{" "}
            <strong>{currentNode.data}</strong>
          </p>
        )}

        {status === "completed" && (
          <p className="mt-2 text-sm font-medium text-green-700">
            Traversal completed! The last node points to NULL.
          </p>
        )}
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
