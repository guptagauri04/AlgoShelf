/**
 * Graph Representations and Traversal Operations (BFS & DFS)
 * AlgoShelf - Book V: Graphs & Networks
 */

export const GRAPH_PRESETS = {
  connectedCycle: {
    id: "connectedCycle",
    name: "Connected Cycle (Undirected)",
    description: "A connected undirected graph with multiple cycles and alternative paths.",
    isDirected: false,
    nodes: [
      { id: "A", label: "A", x: 180, y: 80 },
      { id: "B", label: "B", x: 380, y: 80 },
      { id: "C", label: "C", x: 480, y: 220 },
      { id: "D", label: "D", x: 380, y: 360 },
      { id: "E", label: "E", x: 180, y: 360 },
      { id: "F", label: "F", x: 80, y: 220 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "C", to: "D" },
      { id: "e4", from: "D", to: "E" },
      { id: "e5", from: "E", to: "F" },
      { id: "e6", from: "F", to: "A" },
      { id: "e7", from: "A", to: "D" },
      { id: "e8", from: "B", to: "E" },
    ],
    defaultStart: "A",
  },

  directedDAG: {
    id: "directedDAG",
    name: "Directed Acyclic Graph (DAG)",
    description: "A directed graph showing unidirectional dependencies and flows.",
    isDirected: true,
    nodes: [
      { id: "0", label: "0", x: 100, y: 220 },
      { id: "1", label: "1", x: 240, y: 100 },
      { id: "2", label: "2", x: 240, y: 340 },
      { id: "3", label: "3", x: 380, y: 100 },
      { id: "4", label: "4", x: 380, y: 340 },
      { id: "5", label: "5", x: 520, y: 220 },
    ],
    edges: [
      { id: "e1", from: "0", to: "1" },
      { id: "e2", from: "0", to: "2" },
      { id: "e3", from: "1", to: "3" },
      { id: "e4", from: "1", to: "4" },
      { id: "e5", from: "2", to: "4" },
      { id: "e6", from: "3", to: "5" },
      { id: "e7", from: "4", to: "5" },
    ],
    defaultStart: "0",
  },

  disconnected: {
    id: "disconnected",
    name: "Disconnected Graph (2 Components)",
    description: "A graph partitioned into two isolated components to test reachability.",
    isDirected: false,
    nodes: [
      { id: "A", label: "A", x: 140, y: 120 },
      { id: "B", label: "B", x: 280, y: 120 },
      { id: "C", label: "C", x: 280, y: 280 },
      { id: "D", label: "D", x: 140, y: 280 },
      { id: "E", label: "E", x: 440, y: 200 },
      { id: "F", label: "F", x: 540, y: 200 },
    ],
    edges: [
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C" },
      { id: "e3", from: "C", to: "D" },
      { id: "e4", from: "D", to: "A" },
      { id: "e5", from: "E", to: "F" },
    ],
    defaultStart: "A",
  },

  treeStar: {
    id: "treeStar",
    name: "Tree / Branching Hierarchy",
    description: "A tree structure demonstrating level-by-level (BFS) vs depth-first (DFS) search.",
    isDirected: false,
    nodes: [
      { id: "1", label: "1", x: 310, y: 70 },
      { id: "2", label: "2", x: 180, y: 180 },
      { id: "3", label: "3", x: 440, y: 180 },
      { id: "4", label: "4", x: 120, y: 310 },
      { id: "5", label: "5", x: 240, y: 310 },
      { id: "6", label: "6", x: 380, y: 310 },
      { id: "7", label: "7", x: 500, y: 310 },
    ],
    edges: [
      { id: "e1", from: "1", to: "2" },
      { id: "e2", from: "1", to: "3" },
      { id: "e3", from: "2", to: "4" },
      { id: "e4", from: "2", to: "5" },
      { id: "e5", from: "3", to: "6" },
      { id: "e6", from: "3", to: "7" },
    ],
    defaultStart: "1",
  },
};

/**
 * Builds Adjacency List representation.
 * Returns an object mapping each nodeId to sorted array of adjacent neighbor nodeIds.
 */
export function getAdjacencyList(nodes, edges, isDirected = false) {
  const adjList = {};
  for (const node of nodes) {
    adjList[node.id] = [];
  }

  for (const edge of edges) {
    if (adjList[edge.from] && !adjList[edge.from].includes(edge.to)) {
      adjList[edge.from].push(edge.to);
    }
    if (!isDirected) {
      if (adjList[edge.to] && !adjList[edge.to].includes(edge.from)) {
        adjList[edge.to].push(edge.from);
      }
    }
  }

  // Sort neighbors for deterministic traversal
  for (const id in adjList) {
    adjList[id].sort();
  }

  return adjList;
}

/**
 * Builds Adjacency Matrix representation.
 * Returns { nodeLabels: string[], matrix: number[][] }
 */
export function getAdjacencyMatrix(nodes, edges, isDirected = false) {
  const nodeLabels = nodes.map((n) => n.id);
  const indexMap = new Map();
  nodeLabels.forEach((id, idx) => indexMap.set(id, idx));

  const size = nodeLabels.length;
  const matrix = Array.from({ length: size }, () => Array(size).fill(0));

  for (const edge of edges) {
    const fromIdx = indexMap.get(edge.from);
    const toIdx = indexMap.get(edge.to);
    if (fromIdx !== undefined && toIdx !== undefined) {
      matrix[fromIdx][toIdx] = 1;
      if (!isDirected) {
        matrix[toIdx][fromIdx] = 1;
      }
    }
  }

  return { nodeLabels, matrix };
}

/**
 * Generates discrete step-by-step frames for Breadth-First Search (BFS).
 */
export function generateBFSSteps(nodes, edges, startNodeId, isDirected = false) {
  const adjList = getAdjacencyList(nodes, edges, isDirected);
  const steps = [];

  if (!nodes.find((n) => n.id === startNodeId)) {
    return [
      {
        title: "Error",
        description: `Start node ${startNodeId} not found in graph.`,
        currentNode: null,
        queue: [],
        visited: [],
        activeEdge: null,
        traversalEdges: [],
        isFinal: true,
      },
    ];
  }

  const visitedSet = new Set();
  const visitedOrder = [];
  const queue = [startNodeId];
  const inQueueSet = new Set([startNodeId]);
  const traversalEdges = [];

  // Step 0: Initial state
  steps.push({
    title: "BFS Initialization",
    description: `Initialize BFS from start vertex '${startNodeId}'. Push '${startNodeId}' into the FIFO Queue and mark as discovered.`,
    currentNode: startNodeId,
    queue: [...queue],
    visited: [],
    activeEdge: null,
    traversalEdges: [],
    isFinal: false,
  });

  while (queue.length > 0) {
    // Dequeue front vertex
    const u = queue.shift();
    visitedSet.add(u);
    visitedOrder.push(u);

    steps.push({
      title: `Dequeue & Visit Vertex '${u}'`,
      description: `Removed '${u}' from the front of the queue. Mark '${u}' as visited (${visitedOrder.length} of ${nodes.length} reached).`,
      currentNode: u,
      queue: [...queue],
      visited: [...visitedOrder],
      activeEdge: null,
      traversalEdges: [...traversalEdges],
      isFinal: false,
    });

    const neighbors = adjList[u] || [];

    if (neighbors.length === 0) {
      steps.push({
        title: `No Outgoing Neighbors for '${u}'`,
        description: `Vertex '${u}' has no adjacent unvisited vertices.`,
        currentNode: u,
        queue: [...queue],
        visited: [...visitedOrder],
        activeEdge: null,
        traversalEdges: [...traversalEdges],
        isFinal: false,
      });
    }

    for (const v of neighbors) {
      const edge = { from: u, to: v };

      if (!visitedSet.has(v) && !inQueueSet.has(v)) {
        // Discovered new unvisited neighbor
        inQueueSet.add(v);
        queue.push(v);
        traversalEdges.push(edge);

        steps.push({
          title: `Discover & Enqueue '${v}'`,
          description: `Exploring edge (${u} â†’ ${v}): Neighbor '${v}' is unvisited. Add '${v}' to queue rear and record traversal tree edge.`,
          currentNode: u,
          queue: [...queue],
          visited: [...visitedOrder],
          activeEdge: edge,
          traversalEdges: [...traversalEdges],
          isFinal: false,
        });
      } else {
        // Already visited or in queue
        const status = visitedSet.has(v) ? "already visited" : "already in queue";
        steps.push({
          title: `Skip Neighbor '${v}' (${status})`,
          description: `Inspecting edge (${u} â†’ ${v}): Vertex '${v}' is ${status}. Skipping redundant branch.`,
          currentNode: u,
          queue: [...queue],
          visited: [...visitedOrder],
          activeEdge: edge,
          traversalEdges: [...traversalEdges],
          isFinal: false,
        });
      }
    }
  }

  // Final summary step
  const unreached = nodes.filter((n) => !visitedSet.has(n.id)).map((n) => n.id);
  const completionText =
    unreached.length > 0
      ? `BFS completed for component. Note: Vertices [${unreached.join(", ")}] were unreachable from start node '${startNodeId}' (disconnected graph).`
      : `BFS completed! All ${visitedOrder.length} vertices were successfully discovered in order: ${visitedOrder.join(" â†’ ")}.`;

  steps.push({
    title: "BFS Traversal Complete",
    description: completionText,
    currentNode: null,
    queue: [],
    visited: [...visitedOrder],
    activeEdge: null,
    traversalEdges: [...traversalEdges],
    isFinal: true,
  });

  return steps;
}

/**
 * Generates discrete step-by-step frames for Depth-First Search (DFS).
 */
export function generateDFSSteps(nodes, edges, startNodeId, isDirected = false) {
  const adjList = getAdjacencyList(nodes, edges, isDirected);
  const steps = [];

  if (!nodes.find((n) => n.id === startNodeId)) {
    return [
      {
        title: "Error",
        description: `Start node ${startNodeId} not found in graph.`,
        currentNode: null,
        stack: [],
        visited: [],
        activeEdge: null,
        traversalEdges: [],
        isFinal: true,
      },
    ];
  }

  const visitedSet = new Set();
  const visitedOrder = [];
  const stack = [];
  const traversalEdges = [];

  // Step 0: Initialization
  steps.push({
    title: "DFS Initialization",
    description: `Initialize DFS recursion/call-stack starting at vertex '${startNodeId}'.`,
    currentNode: startNodeId,
    stack: [startNodeId],
    visited: [],
    activeEdge: null,
    traversalEdges: [],
    isFinal: false,
  });

  function dfsVisit(u, parent) {
    visitedSet.add(u);
    visitedOrder.push(u);
    stack.push(u);

    if (parent !== null) {
      const treeEdge = { from: parent, to: u };
      traversalEdges.push(treeEdge);
    }

    steps.push({
      title: `Visit Vertex '${u}' (Push to Call Stack)`,
      description: `Entering dfs('${u}'). Mark '${u}' as visited and push to active execution stack. (${visitedOrder.length} of ${nodes.length} visited).`,
      currentNode: u,
      stack: [...stack],
      visited: [...visitedOrder],
      activeEdge: parent !== null ? { from: parent, to: u } : null,
      traversalEdges: [...traversalEdges],
      isFinal: false,
    });

    const neighbors = adjList[u] || [];

    for (const v of neighbors) {
      const edge = { from: u, to: v };

      if (!visitedSet.has(v)) {
        steps.push({
          title: `Explore Edge (${u} â†’ ${v})`,
          description: `Neighbor '${v}' is unvisited. Recursing deeper along edge (${u} â†’ ${v}).`,
          currentNode: u,
          stack: [...stack],
          visited: [...visitedOrder],
          activeEdge: edge,
          traversalEdges: [...traversalEdges],
          isFinal: false,
        });

        dfsVisit(v, u);

        // Backtrack step
        steps.push({
          title: `Backtrack to Vertex '${u}'`,
          description: `Finished recursion branch from '${v}'. Backtracking call stack to vertex '${u}'.`,
          currentNode: u,
          stack: [...stack],
          visited: [...visitedOrder],
          activeEdge: edge,
          traversalEdges: [...traversalEdges],
          isFinal: false,
        });
      } else if (v !== parent) {
        steps.push({
          title: `Skip Visited Vertex '${v}'`,
          description: `Inspecting edge (${u} â†’ ${v}): Vertex '${v}' has already been visited. Skip to avoid cycle.`,
          currentNode: u,
          stack: [...stack],
          visited: [...visitedOrder],
          activeEdge: edge,
          traversalEdges: [...traversalEdges],
          isFinal: false,
        });
      }
    }

    stack.pop();
  }

  dfsVisit(startNodeId, null);

  const unreached = nodes.filter((n) => !visitedSet.has(n.id)).map((n) => n.id);
  const completionText =
    unreached.length > 0
      ? `DFS completed for component. Note: Vertices [${unreached.join(", ")}] were unreachable from start vertex '${startNodeId}' (disconnected graph).`
      : `DFS completed! Traversal order: ${visitedOrder.join(" â†’ ")}. Call stack is completely unwound.`;

  steps.push({
    title: "DFS Traversal Complete",
    description: completionText,
    currentNode: null,
    stack: [],
    visited: [...visitedOrder],
    activeEdge: null,
    traversalEdges: [...traversalEdges],
    isFinal: true,
  });

  return steps;
}

/**
 * Calculates shortened endpoint coordinates for edges so arrows stop
 * neatly at the perimeter of the target node circle (radius R).
 */
export function calculateEdgeEndpoints(source, target, nodeRadius = 24) {
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const dist = Math.hypot(dx, dy);

  if (dist === 0) return { x1: source.x, y1: source.y, x2: target.x, y2: target.y };

  const ux = dx / dist;
  const uy = dy / dist;

  return {
    x1: source.x + ux * nodeRadius,
    y1: source.y + uy * nodeRadius,
    x2: target.x - ux * (nodeRadius + 2),
    y2: target.y - uy * (nodeRadius + 2),
  };
}
