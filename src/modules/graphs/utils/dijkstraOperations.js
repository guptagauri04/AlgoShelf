export const DEFAULT_GRAPH = {
  id: "standard",
  name: "Standard Transit Network (6 Nodes)",
  nodes: [
    { id: "A", label: "A", x: 90, y: 190 },
    { id: "B", label: "B", x: 230, y: 80 },
    { id: "C", label: "C", x: 230, y: 300 },
    { id: "D", label: "D", x: 430, y: 80 },
    { id: "E", label: "E", x: 430, y: 300 },
    { id: "F", label: "F", x: 580, y: 190 },
  ],
  edges: [
    { u: "A", v: "B", weight: 4 },
    { u: "A", v: "C", weight: 2 },
    { u: "B", v: "C", weight: 1 },
    { u: "B", v: "D", weight: 5 },
    { u: "C", v: "D", weight: 8 },
    { u: "C", v: "E", weight: 10 },
    { u: "D", v: "E", weight: 2 },
    { u: "D", v: "F", weight: 6 },
    { u: "E", v: "F", weight: 3 },
  ],
};

export const DISCONNECTED_GRAPH = {
  id: "disconnected",
  name: "Disconnected Island Network (6 Nodes)",
  nodes: [
    { id: "A", label: "A", x: 90, y: 190 },
    { id: "B", label: "B", x: 230, y: 110 },
    { id: "C", label: "C", x: 230, y: 270 },
    { id: "D", label: "D", x: 410, y: 190 },
    { id: "E", label: "E", x: 550, y: 110 },
    { id: "F", label: "F", x: 550, y: 270 },
  ],
  edges: [
    { u: "A", v: "B", weight: 3 },
    { u: "A", v: "C", weight: 6 },
    { u: "B", v: "C", weight: 2 },
    { u: "B", v: "D", weight: 7 },
    { u: "E", v: "F", weight: 4 }, // Disconnected cluster E - F
  ],
};

export function getEdgeKey(u, v) {
  return u < v ? `${u}-${v}` : `${v}-${u}`;
}

export function dijkstraSteps(nodes, edges, sourceId, destId) {
  const steps = [];

  // Build adjacency list (undirected weighted graph)
  const adj = {};
  nodes.forEach((n) => {
    adj[n.id] = [];
  });
  edges.forEach(({ u, v, weight }) => {
    if (adj[u]) adj[u].push({ to: v, weight });
    if (adj[v]) adj[v].push({ to: u, weight });
  });

  const distances = {};
  const previous = {};
  const visited = new Set();

  nodes.forEach((n) => {
    distances[n.id] = Infinity;
    previous[n.id] = null;
  });
  distances[sourceId] = 0;

  // Frame 0: Initialization
  steps.push({
    currentNode: null,
    activeNeighbor: null,
    activeEdge: null,
    visited: [],
    distances: { ...distances },
    previous: { ...previous },
    shortestPath: [],
    shortestPathEdges: [],
    totalCost: null,
    status: "init",
    currentLine: 1,
    message: {
      title: "Initialize Dijkstra Frontier",
      description: `Starting from source vertex ${sourceId}. Initialized dist[${sourceId}] = 0, all other vertices set to ∞.`,
      insight:
        "Dijkstra begins with tentative infinite distances. The source vertex has a known distance of 0 to itself.",
    },
  });

  const unvisited = new Set(nodes.map((n) => n.id));

  while (unvisited.size > 0) {
    // Greedy selection: node in unvisited with smallest distance
    let u = null;
    let minDist = Infinity;
    unvisited.forEach((nodeId) => {
      if (distances[nodeId] < minDist) {
        minDist = distances[nodeId];
        u = nodeId;
      }
    });

    // If remaining nodes are unreachable
    if (u === null || minDist === Infinity) {
      steps.push({
        currentNode: null,
        activeNeighbor: null,
        activeEdge: null,
        visited: Array.from(visited),
        distances: { ...distances },
        previous: { ...previous },
        shortestPath: [],
        shortestPathEdges: [],
        totalCost: null,
        status: "unreachable",
        currentLine: 6,
        message: {
          title: "Unreachable Vertices Remaining",
          description: `All remaining unvisited vertices have tentative distance ∞ and cannot be reached from source ${sourceId}.`,
          insight:
            "In disconnected or partitioned graphs, vertices without an edge path from the source remain at infinite distance.",
        },
      });
      break;
    }

    // Step: Settling vertex u
    unvisited.delete(u);
    visited.add(u);

    steps.push({
      currentNode: u,
      activeNeighbor: null,
      activeEdge: null,
      visited: Array.from(visited),
      distances: { ...distances },
      previous: { ...previous },
      shortestPath: [],
      shortestPathEdges: [],
      totalCost: null,
      status: "visiting",
      currentLine: 8,
      message: {
        title: `Settling Vertex ${u} (Distance: ${distances[u]})`,
        description: `Greedily selected vertex ${u} with minimum tentative distance of ${distances[u]}. Its shortest path is now finalized.`,
        insight:
          "Because all edge weights are non-negative, any alternative path to vertex u would already have a greater total cost.",
      },
    });

    // Early termination if destination reached
    if (u === destId) {
      break;
    }

    // Relax all edges from u
    const neighbors = adj[u] || [];
    for (const { to: v, weight } of neighbors) {
      if (visited.has(v)) continue;

      const edgeKey = getEdgeKey(u, v);
      const alt = distances[u] + weight;

      if (alt < distances[v]) {
        const oldDist = distances[v];
        distances[v] = alt;
        previous[v] = u;

        steps.push({
          currentNode: u,
          activeNeighbor: v,
          activeEdge: { u, v, weight, edgeKey },
          visited: Array.from(visited),
          distances: { ...distances },
          previous: { ...previous },
          shortestPath: [],
          shortestPathEdges: [],
          totalCost: null,
          status: "updated",
          currentLine: 13,
          message: {
            title: `Relaxed Edge (${u} → ${v}): Updated Distance to ${alt}`,
            description: `Path through ${u} offers a shorter route: dist[${u}] (${distances[u]}) + weight (${weight}) = ${alt} < previous (${
              oldDist === Infinity ? "∞" : oldDist
            }). Updated dist[${v}] = ${alt}, prev[${v}] = ${u}.`,
            insight:
              "Relaxation checks if detouring through the current vertex lowers the tentative distance to an adjacent neighbor.",
          },
        });
      } else {
        steps.push({
          currentNode: u,
          activeNeighbor: v,
          activeEdge: { u, v, weight, edgeKey },
          visited: Array.from(visited),
          distances: { ...distances },
          previous: { ...previous },
          shortestPath: [],
          shortestPathEdges: [],
          totalCost: null,
          status: "relaxing_kept",
          currentLine: 12,
          message: {
            title: `Inspected Edge (${u} → ${v}): Kept Existing Distance`,
            description: `Path through ${u}: dist[${u}] (${distances[u]}) + weight (${weight}) = ${alt} ≥ current dist[${v}] (${distances[v]}). No distance update needed.`,
            insight:
              "If the newly calculated distance is not strictly less than the existing tentative distance, the edge is discarded.",
          },
        });
      }
    }
  }

  // Reconstruct shortest path from destId back to sourceId
  const path = [];
  const pathEdges = [];
  let curr = destId;

  if (distances[destId] !== Infinity) {
    while (curr) {
      path.unshift(curr);
      const prev = previous[curr];
      if (prev) {
        pathEdges.unshift(getEdgeKey(curr, prev));
      }
      curr = prev;
    }
  }

  const reached = distances[destId] !== Infinity && path[0] === sourceId;

  steps.push({
    currentNode: destId,
    activeNeighbor: null,
    activeEdge: null,
    visited: Array.from(visited),
    distances: { ...distances },
    previous: { ...previous },
    shortestPath: reached ? path : [],
    shortestPathEdges: reached ? pathEdges : [],
    totalCost: reached ? distances[destId] : null,
    status: reached ? "reached" : "unreachable",
    currentLine: 16,
    message: {
      title: reached ? `Shortest Path Found: ${path.join(" → ")}` : "Destination Unreachable",
      description: reached
        ? `Found optimal shortest path from ${sourceId} to ${destId} with total accumulated cost of ${distances[destId]}.`
        : `Vertex ${destId} is in a disconnected component and cannot be reached from source ${sourceId}.`,
      insight: reached
        ? `Backtracking via predecessor pointers (prev) reconstructs the exact sequence of vertices on the optimal path.`
        : "When the destination retains a distance of ∞, no valid connected path exists between source and destination.",
    },
  });

  return steps;
}
