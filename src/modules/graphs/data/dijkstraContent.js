export const dijkstraContent = {
  id: "dijkstra",
  chapter: "Chapter I",
  title: "Dijkstra's Algorithm",
  subtitle: "Greedy shortest paths. One vertex at a time.",

  overview: {
    heading: "What is Dijkstra's Algorithm?",
    description:
      "Dijkstra's Algorithm, published by Edsger W. Dijkstra in 1956, finds the shortest path between vertices in a weighted graph with non-negative edge weights. It greedily selects the unvisited vertex with the smallest known distance, relaxes its edges, and repeats until the destination is reached or all vertices are finalized.",
  },

  takeaways: [
    "Greedily processes the unvisited node with the smallest tentative distance at each step.",
    "Only valid for graphs with non-negative edge weights.",
    "Produces both shortest distances and a recoverable path via predecessor pointers.",
  ],

  pseudocode: [
    "function dijkstra(graph, source):",
    "    dist[source] = 0; dist[v] = ∞ for all v ≠ source",
    "    PQ = all vertices (min-priority queue by dist)",
    "    while PQ is not empty:",
    "        u = vertex in PQ with min dist[u]",
    "        remove u from PQ",
    "        for each neighbor v of u:",
    "            newDist = dist[u] + weight(u, v)",
    "            if newDist < dist[v]:",
    "                dist[v] = newDist",
    "                prev[v] = u",
    "    return dist, prev",
  ],

  complexity: {
    best: "O(E log V)",
    average: "O(E log V)",
    worst: "O(V²)",
    space: "O(V + E)",
  },

  applications: [
    "GPS navigation and mapping (Google Maps, Waze)",
    "Network routing protocols (OSPF, IS-IS)",
    "Game pathfinding for NPCs and AI agents",
    "Social network shortest-connection queries",
  ],

  advantages: [
    "Optimal for non-negative edge weights",
    "Produces all shortest distances from source in one pass",
    "Path reconstruction via predecessor pointers is O(V)",
    "Runs efficiently with a binary heap or Fibonacci heap",
  ],

  disadvantages: [
    "Fails with negative edge weights (use Bellman-Ford instead)",
    "O(V²) with a simple array; needs a priority queue for large graphs",
    "Not suitable for graphs with very large or dynamic weight updates",
  ],
};
