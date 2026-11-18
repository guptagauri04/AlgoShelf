/**
 * Graph data structure, representation models, and traversal step generators (BFS & DFS).
 */

export const defaultGraphNodes = [
  { id: 0, label: "0", x: 140, y: 180 },
  { id: 1, label: "1", x: 280, y: 90 },
  { id: 2, label: "2", x: 280, y: 270 },
  { id: 3, label: "3", x: 440, y: 90 },
  { id: 4, label: "4", x: 440, y: 270 },
  { id: 5, label: "5", x: 580, y: 180 },
];

export const defaultGraphEdges = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 4 },
  { from: 3, to: 5 },
  { from: 4, to: 5 },
];

/**
 * Builds an Adjacency List map: { 0: [1, 2], 1: [0, 3], ... }
 */
export function buildAdjacencyList(nodes, edges) {
  const adj = {};
  nodes.forEach((n) => {
    adj[n.id] = [];
  });
  edges.forEach(({ from, to }) => {
    if (adj[from]) adj[from].push(to);
    if (adj[to]) adj[to].push(from);
  });
  // Sort neighbors for deterministic traversal
  Object.keys(adj).forEach((k) => adj[k].sort((a, b) => a - b));
  return adj;
}

/**
 * Builds an Adjacency Matrix (V x V 2D array)
 */
export function buildAdjacencyMatrix(nodes, edges) {
  const size = nodes.length;
  const matrix = Array.from({ length: size }, () => Array(size).fill(0));
  edges.forEach(({ from, to }) => {
    if (from < size && to < size) {
      matrix[from][to] = 1;
      matrix[to][from] = 1;
    }
  });
  return matrix;
}

/**
 * Generate step-by-step frames for BFS (Breadth-First Search)
 */
export function generateBfsSteps(nodes, edges, startNodeId = 0) {
  const steps = [];
  const adj = buildAdjacencyList(nodes, edges);

  const visited = new Set();
  const queue = [startNodeId];
  visited.add(startNodeId);

  // Step 1: Initial state
  steps.push({
    title: `Initialize BFS from Node ${startNodeId}`,
    explanation: `Mark start node ${startNodeId} as visited and enqueue it into the FIFO Queue.`,
    code: `visited.add(${startNodeId});\nqueue.push(${startNodeId});`,
    currentNode: startNodeId,
    activeNeighbor: null,
    visited: Array.from(visited),
    queueOrStack: [...queue],
    dataStructureType: "Queue (FIFO)",
    activeEdge: null,
    traversalOrder: [startNodeId],
  });

  const order = [startNodeId];

  while (queue.length > 0) {
    const curr = queue.shift();

    steps.push({
      title: `Dequeue Node ${curr}`,
      explanation: `Popped node ${curr} from front of Queue. Inspecting all its unvisited adjacent neighbors.`,
      code: `int curr = queue.front(); queue.pop();`,
      currentNode: curr,
      activeNeighbor: null,
      visited: Array.from(visited),
      queueOrStack: [...queue],
      dataStructureType: "Queue (FIFO)",
      activeEdge: null,
      traversalOrder: [...order],
    });

    const neighbors = adj[curr] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        order.push(neighbor);

        steps.push({
          title: `Discover Unvisited Neighbor: Node ${neighbor}`,
          explanation: `Discovered unvisited neighbor ${neighbor} via edge (${curr} ➔ ${neighbor}). Mark visited and enqueue.`,
          code: `visited.add(${neighbor});\nqueue.push(${neighbor});`,
          currentNode: curr,
          activeNeighbor: neighbor,
          visited: Array.from(visited),
          queueOrStack: [...queue],
          dataStructureType: "Queue (FIFO)",
          activeEdge: { from: curr, to: neighbor },
          traversalOrder: [...order],
        });
      }
    }
  }

  steps.push({
    title: "BFS Traversal Complete",
    explanation: `Queue is empty. All reachable vertices have been explored layer-by-layer in level order.`,
    code: "// BFS complete: Time O(V + E), Space O(V)",
    currentNode: null,
    activeNeighbor: null,
    visited: Array.from(visited),
    queueOrStack: [],
    dataStructureType: "Queue (FIFO)",
    activeEdge: null,
    traversalOrder: [...order],
  });

  return steps;
}

/**
 * Generate step-by-step frames for DFS (Depth-First Search)
 */
export function generateDfsSteps(nodes, edges, startNodeId = 0) {
  const steps = [];
  const adj = buildAdjacencyList(nodes, edges);

  const visited = new Set();
  const stack = [startNodeId];
  const order = [];

  // Step 1: Initialize
  steps.push({
    title: `Initialize DFS from Node ${startNodeId}`,
    explanation: `Push start node ${startNodeId} onto the LIFO Call Stack.`,
    code: `stack.push(${startNodeId});`,
    currentNode: startNodeId,
    activeNeighbor: null,
    visited: [],
    queueOrStack: [...stack],
    dataStructureType: "Call Stack (LIFO)",
    activeEdge: null,
    traversalOrder: [],
  });

  function dfs(u) {
    visited.add(u);
    order.push(u);

    steps.push({
      title: `Visit Node ${u}`,
      explanation: `Marked node ${u} as visited. Recursively exploring its deepest adjacent branch first.`,
      code: `void dfs(${u}) {\n  visited.insert(${u});`,
      currentNode: u,
      activeNeighbor: null,
      visited: Array.from(visited),
      queueOrStack: [...stack],
      dataStructureType: "Call Stack (LIFO)",
      activeEdge: null,
      traversalOrder: [...order],
    });

    const neighbors = adj[u] || [];
    for (const v of neighbors) {
      if (!visited.has(v)) {
        stack.push(v);
        steps.push({
          title: `Traverse Edge (${u} ➔ ${v})`,
          explanation: `Neighbor ${v} is unvisited. Advancing deeper down the path and pushing node ${v} onto stack.`,
          code: `  if (!visited[${v}]) dfs(${v});`,
          currentNode: u,
          activeNeighbor: v,
          visited: Array.from(visited),
          queueOrStack: [...stack],
          dataStructureType: "Call Stack (LIFO)",
          activeEdge: { from: u, to: v },
          traversalOrder: [...order],
        });

        dfs(v);
        stack.pop();

        steps.push({
          title: `Backtrack to Node ${u}`,
          explanation: `Branch under node ${v} fully explored. Backtracking back to node ${u}.`,
          code: `} // Return to caller`,
          currentNode: u,
          activeNeighbor: null,
          visited: Array.from(visited),
          queueOrStack: [...stack],
          dataStructureType: "Call Stack (LIFO)",
          activeEdge: null,
          traversalOrder: [...order],
        });
      }
    }
  }

  dfs(startNodeId);

  steps.push({
    title: "DFS Traversal Complete",
    explanation: `Recursion stack unwound completely. Explored depth-first path reaching all reachable vertices.`,
    code: "// DFS complete: Time O(V + E), Space O(V)",
    currentNode: null,
    activeNeighbor: null,
    visited: Array.from(visited),
    queueOrStack: [],
    dataStructureType: "Call Stack (LIFO)",
    activeEdge: null,
    traversalOrder: [...order],
  });

  return steps;
}
