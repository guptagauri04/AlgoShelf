export const DEFAULT_NODES = [
  { id: "A", label: "A", x: 130, y: 190 },
  { id: "B", label: "B", x: 290, y: 80 },
  { id: "C", label: "C", x: 290, y: 300 },
  { id: "D", label: "D", x: 470, y: 80 },
  { id: "E", label: "E", x: 470, y: 300 },
  { id: "F", label: "F", x: 630, y: 190 },
];

export const DEFAULT_UNWEIGHTED_EDGES = [
  { from: "A", to: "B", weight: 1 },
  { from: "A", to: "C", weight: 1 },
  { from: "B", to: "D", weight: 1 },
  { from: "B", to: "E", weight: 1 },
  { from: "C", to: "E", weight: 1 },
  { from: "D", to: "F", weight: 1 },
  { from: "E", to: "F", weight: 1 },
];

export const DEFAULT_WEIGHTED_EDGES = [
  { from: "A", to: "B", weight: 4 },
  { from: "A", to: "C", weight: 2 },
  { from: "C", to: "B", weight: 1 },
  { from: "B", to: "D", weight: 5 },
  { from: "C", to: "E", weight: 8 },
  { from: "B", to: "E", weight: 3 },
  { from: "D", to: "F", weight: 6 },
  { from: "E", to: "D", weight: 2 },
  { from: "E", to: "F", weight: 4 },
];

export function buildAdjacencyList(nodes, edges, isDirected = false) {
  const list = {};
  nodes.forEach((n) => {
    list[n.id] = [];
  });

  edges.forEach((edge) => {
    list[edge.from]?.push({ to: edge.to, weight: edge.weight || 1 });
    if (!isDirected) {
      list[edge.to]?.push({ to: edge.from, weight: edge.weight || 1 });
    }
  });

  // Sort neighbors by ID for deterministic, readable traversals
  Object.keys(list).forEach((k) => {
    list[k].sort((a, b) => a.to.localeCompare(b.to));
  });

  return list;
}

export function buildAdjacencyMatrix(nodes, edges, isDirected = false) {
  const nodeIds = nodes.map((n) => n.id);
  const matrix = {};

  nodeIds.forEach((row) => {
    matrix[row] = {};
    nodeIds.forEach((col) => {
      matrix[row][col] = 0;
    });
  });

  edges.forEach((edge) => {
    if (matrix[edge.from] && matrix[edge.from][edge.to] !== undefined) {
      matrix[edge.from][edge.to] = edge.weight || 1;
    }
    if (!isDirected) {
      if (matrix[edge.to] && matrix[edge.to][edge.from] !== undefined) {
        matrix[edge.to][edge.from] = edge.weight || 1;
      }
    }
  });

  return matrix;
}

export function generateBFSSteps(nodes, edges, startId = "A", isDirected = false) {
  const adj = buildAdjacencyList(nodes, edges, isDirected);
  const steps = [];
  const queue = [startId];
  const visited = new Set([startId]);
  const traversalOrder = [];
  const activeEdges = [];

  steps.push({
    activeNodeId: startId,
    visitedIds: [startId],
    traversalOrder: [],
    queueOrStack: [...queue],
    activeEdges: [],
    description: `Initialized BFS: Enqueued starting vertex ${startId} and marked as discovered.`,
  });

  while (queue.length > 0) {
    const curr = queue.shift();
    traversalOrder.push(curr);

    steps.push({
      activeNodeId: curr,
      visitedIds: Array.from(visited),
      traversalOrder: [...traversalOrder],
      queueOrStack: [...queue],
      activeEdges: [...activeEdges],
      description: `Dequeued vertex ${curr}. Visiting and expanding its outgoing edges.`,
    });

    const neighbors = adj[curr] || [];
    for (const neighbor of neighbors) {
      const edgeKey = `${curr}->${neighbor.to}`;
      if (!visited.has(neighbor.to)) {
        visited.add(neighbor.to);
        queue.push(neighbor.to);
        activeEdges.push(edgeKey);

        steps.push({
          activeNodeId: curr,
          candidateNodeId: neighbor.to,
          visitedIds: Array.from(visited),
          traversalOrder: [...traversalOrder],
          queueOrStack: [...queue],
          activeEdges: [...activeEdges],
          description: `Discovered unvisited neighbor ${neighbor.to} via edge (${curr} → ${neighbor.to}). Added to FIFO Queue.`,
        });
      }
    }
  }

  steps.push({
    activeNodeId: null,
    visitedIds: Array.from(visited),
    traversalOrder: [...traversalOrder],
    queueOrStack: [],
    activeEdges: [...activeEdges],
    description: `BFS traversal completed. All ${traversalOrder.length} reachable vertices explored.`,
  });

  return steps;
}

export function generateDFSSteps(nodes, edges, startId = "A", isDirected = false) {
  const adj = buildAdjacencyList(nodes, edges, isDirected);
  const steps = [];
  const visited = new Set();
  const traversalOrder = [];
  const activeEdges = [];

  steps.push({
    activeNodeId: startId,
    visitedIds: [],
    traversalOrder: [],
    queueOrStack: [startId],
    activeEdges: [],
    description: `Initialized DFS: Pushed starting vertex ${startId} onto call stack.`,
  });

  function dfsRecursive(curr, parent = null) {
    visited.add(curr);
    traversalOrder.push(curr);

    if (parent) {
      activeEdges.push(`${parent}->${curr}`);
    }

    steps.push({
      activeNodeId: curr,
      visitedIds: Array.from(visited),
      traversalOrder: [...traversalOrder],
      queueOrStack: [curr],
      activeEdges: [...activeEdges],
      description: parent
        ? `Advanced deep into vertex ${curr} from parent ${parent}.`
        : `Visiting root origin vertex ${curr}.`,
    });

    const neighbors = adj[curr] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.to)) {
        dfsRecursive(neighbor.to, curr);
      }
    }

    steps.push({
      activeNodeId: curr,
      visitedIds: Array.from(visited),
      traversalOrder: [...traversalOrder],
      queueOrStack: [],
      activeEdges: [...activeEdges],
      description: `Backtracking from vertex ${curr}: all child branches explored.`,
    });
  }

  dfsRecursive(startId);

  steps.push({
    activeNodeId: null,
    visitedIds: Array.from(visited),
    traversalOrder: [...traversalOrder],
    queueOrStack: [],
    activeEdges: [...activeEdges],
    description: `DFS traversal completed. Visited sequence: [${traversalOrder.join(" → ")}].`,
  });

  return steps;
}

export function generateDijkstraSteps(
  nodes,
  edges,
  startId = "A",
  targetId = "F",
  isDirected = true
) {
  const adj = buildAdjacencyList(nodes, edges, isDirected);
  const steps = [];

  const distances = {};
  const previous = {};
  const visited = new Set();

  nodes.forEach((n) => {
    distances[n.id] = Infinity;
    previous[n.id] = null;
  });
  distances[startId] = 0;

  // Unvisited set
  const unvisited = new Set(nodes.map((n) => n.id));

  steps.push({
    activeNodeId: startId,
    distances: { ...distances },
    previous: { ...previous },
    visitedIds: [],
    shortestPathEdges: [],
    description: `Initialized distances: Source ${startId} = 0, all other vertices set to ∞.`,
  });

  while (unvisited.size > 0) {
    // Pick unvisited node with smallest distance
    let current = null;
    let minDistance = Infinity;

    unvisited.forEach((nodeId) => {
      if (distances[nodeId] < minDistance) {
        minDistance = distances[nodeId];
        current = nodeId;
      }
    });

    if (!current || minDistance === Infinity) {
      break; // Remaining nodes are unreachable
    }

    unvisited.delete(current);
    visited.add(current);

    steps.push({
      activeNodeId: current,
      distances: { ...distances },
      previous: { ...previous },
      visitedIds: Array.from(visited),
      shortestPathEdges: buildPathEdges(previous),
      description: `Selected vertex ${current} with minimum tentative distance (${minDistance}). Marking as settled.`,
    });

    if (current === targetId) {
      steps.push({
        activeNodeId: current,
        distances: { ...distances },
        previous: { ...previous },
        visitedIds: Array.from(visited),
        shortestPathEdges: buildPathEdges(previous),
        description: `Target vertex ${targetId} reached! Shortest path settled with cost ${distances[targetId]}.`,
      });
      break;
    }

    const neighbors = adj[current] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.to)) {
        const alt = distances[current] + neighbor.weight;
        const currentDist = distances[neighbor.to];

        if (alt < currentDist) {
          distances[neighbor.to] = alt;
          previous[neighbor.to] = current;

          steps.push({
            activeNodeId: current,
            candidateNodeId: neighbor.to,
            distances: { ...distances },
            previous: { ...previous },
            visitedIds: Array.from(visited),
            shortestPathEdges: buildPathEdges(previous),
            description: `Relaxation: Found shorter path to ${neighbor.to} via ${current} (${distances[current]} + ${neighbor.weight} = ${alt} < ${
              currentDist === Infinity ? "∞" : currentDist
            }). Updated distance[${neighbor.to}] = ${alt}.`,
          });
        }
      }
    }
  }

  // Final Shortest Path reconstruction
  const finalPath = [];
  let curr = targetId;
  let reachable = false;

  if (distances[targetId] !== Infinity) {
    reachable = true;
    while (curr) {
      finalPath.unshift(curr);
      curr = previous[curr];
    }
  }

  const finalEdges = [];
  for (let i = 0; i < finalPath.length - 1; i++) {
    finalEdges.push(`${finalPath[i]}->${finalPath[i + 1]}`);
    if (!isDirected) {
      finalEdges.push(`${finalPath[i + 1]}->${finalPath[i]}`);
    }
  }

  steps.push({
    activeNodeId: reachable ? targetId : null,
    distances: { ...distances },
    previous: { ...previous },
    visitedIds: Array.from(visited),
    shortestPathEdges: finalEdges,
    finalPath,
    totalCost: distances[targetId],
    reachable,
    description: reachable
      ? `Shortest path from ${startId} to ${targetId}: [${finalPath.join(" → ")}] with total cost of ${distances[targetId]}.`
      : `No path exists from ${startId} to ${targetId}. Vertex is unreachable.`,
  });

  return steps;
}

function buildPathEdges(previous) {
  const edges = [];
  Object.entries(previous).forEach(([child, parent]) => {
    if (parent) {
      edges.push(`${parent}->${child}`);
    }
  });
  return edges;
}
