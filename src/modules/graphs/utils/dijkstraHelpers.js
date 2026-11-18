// Default graph: 7 nodes, weighted undirected edges
export const DEFAULT_GRAPH = {
  nodes: ["A", "B", "C", "D", "E", "F", "G"],
  edges: [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "C", weight: 2 },
    { from: "B", to: "C", weight: 5 },
    { from: "B", to: "D", weight: 10 },
    { from: "C", to: "E", weight: 3 },
    { from: "D", to: "F", weight: 11 },
    { from: "E", to: "D", weight: 4 },
    { from: "E", to: "F", weight: 2 },
    { from: "F", to: "G", weight: 1 },
    { from: "G", to: "D", weight: 3 },
  ],
};

// Fixed 2D positions for each node (for SVG canvas ~600x360)
export const NODE_POSITIONS = {
  A: { x: 80,  y: 180 },
  B: { x: 220, y: 80  },
  C: { x: 220, y: 280 },
  D: { x: 420, y: 80  },
  E: { x: 360, y: 240 },
  F: { x: 500, y: 240 },
  G: { x: 560, y: 130 },
};

/**
 * Build an adjacency map from edge list (undirected)
 */
function buildAdjacency(nodes, edges) {
  const adj = {};
  nodes.forEach((n) => (adj[n] = []));
  edges.forEach(({ from, to, weight }) => {
    adj[from].push({ node: to, weight });
    adj[to].push({ node: from, weight });
  });
  return adj;
}

/**
 * Run Dijkstra's algorithm and produce step-by-step animation frames.
 * Each frame describes the full state of the algorithm at that point.
 */
export function dijkstraSteps(graph, source, destination) {
  const { nodes, edges } = graph;
  const adj = buildAdjacency(nodes, edges);

  const INF = Infinity;
  const dist = {};
  const prev = {};
  const visited = new Set();
  nodes.forEach((n) => { dist[n] = INF; prev[n] = null; });
  dist[source] = 0;

  const steps = [];
  const priorityQueue = nodes.map((n) => n); // simple array-based min-heap simulation

  const getMin = () => {
    let minNode = null;
    priorityQueue.forEach((n) => {
      if (!visited.has(n)) {
        if (minNode === null || dist[n] < dist[minNode]) minNode = n;
      }
    });
    return minNode;
  };

  const getPath = (target) => {
    const path = [];
    let cur = target;
    while (cur !== null) { path.unshift(cur); cur = prev[cur]; }
    return path[0] === source ? path : [];
  };

  const getPathEdges = (path) => {
    const edgeSet = new Set();
    for (let i = 0; i < path.length - 1; i++) {
      edgeSet.add(`${path[i]}-${path[i + 1]}`);
      edgeSet.add(`${path[i + 1]}-${path[i]}`);
    }
    return edgeSet;
  };

  const snap = (currentNode, relaxingEdge, phase, extraMsg) => {
    const path = destination ? getPath(destination) : [];
    const pathEdgeSet = getPathEdges(path);
    steps.push({
      dist: { ...dist },
      prev: { ...prev },
      visited: new Set(visited),
      currentNode,
      relaxingEdge,   // { from, to, weight } or null
      phase,          // "init" | "select" | "relax" | "relax_update" | "skip" | "done"
      finalPath: path,
      pathEdgeSet,
      message: extraMsg,
    });
  };

  // Frame 0: initial state
  snap(null, null, "init", {
    title: "Initializing Dijkstra's Algorithm",
    description: `All distances set to ∞ except source ${source} = 0. Priority queue contains all nodes.`,
    insight: "We begin by setting the distance to the source node to 0 and all others to infinity.",
  });

  while (true) {
    const u = getMin();
    if (u === null || dist[u] === INF) break;

    // Select u
    snap(u, null, "select", {
      title: `Visiting Node ${u}`,
      description: `Node ${u} has the smallest tentative distance (${dist[u]}). Marking as visited and exploring its neighbors.`,
      insight: "Dijkstra always processes the unvisited node with the smallest known distance — the greedy choice.",
    });

    visited.add(u);

    if (u === destination) {
      snap(u, null, "done", {
        title: `Shortest Path Found!`,
        description: `Reached destination ${destination}. Total cost: ${dist[destination]}. Path: ${getPath(destination).join(" → ")}.`,
        insight: "Once we reach the destination node, we can reconstruct the shortest path by following the 'prev' pointers back to the source.",
      });
      break;
    }

    // Relax neighbors
    for (const { node: v, weight } of adj[u]) {
      if (visited.has(v)) {
        snap(u, { from: u, to: v, weight }, "skip", {
          title: `Skipping Node ${v}`,
          description: `Node ${v} has already been visited with confirmed shortest distance ${dist[v]}.`,
          insight: "Once a node is visited (finalized), its distance cannot be improved further.",
        });
        continue;
      }

      const newDist = dist[u] + weight;

      snap(u, { from: u, to: v, weight }, "relax", {
        title: `Relaxing Edge ${u} → ${v} (weight ${weight})`,
        description: `Current dist[${v}] = ${dist[v] === INF ? "∞" : dist[v]}. New candidate: dist[${u}] + ${weight} = ${newDist}.`,
        insight: "Edge relaxation checks if going through the current node gives a shorter path to the neighbor.",
      });

      if (newDist < dist[v]) {
        dist[v] = newDist;
        prev[v] = u;
        snap(u, { from: u, to: v, weight }, "relax_update", {
          title: `Updated dist[${v}] = ${newDist}`,
          description: `Found a shorter path to ${v}: ${getPath(v).join(" → ")} with total cost ${newDist}.`,
          insight: "We update the distance and record the previous node so we can reconstruct the path later.",
        });
      }
    }
  }

  // Final frame if destination was not explicitly set or not reached
  const lastStep = steps[steps.length - 1];
  if (!lastStep || lastStep.phase !== "done") {
    const path = destination ? getPath(destination) : [];
    const reachable = destination ? dist[destination] !== INF : false;
    snap(null, null, "done", {
      title: destination && reachable
        ? `Shortest Path Found!`
        : destination
        ? `${destination} is unreachable from ${source}`
        : "Algorithm Complete",
      description: destination && reachable
        ? `Shortest path from ${source} to ${destination}: ${path.join(" → ")} — Total cost: ${dist[destination]}`
        : destination
        ? `No path exists from ${source} to ${destination} in this graph.`
        : `All reachable nodes from ${source} have been processed.`,
      insight: "Dijkstra's algorithm guarantees the shortest path to all reachable vertices from the source.",
    });
  }

  return { steps, finalDist: dist, finalPath: destination ? getPath(destination) : [] };
}
