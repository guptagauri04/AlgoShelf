export const graphContent = {
  id: "graphs",
  title: "Graphs & Networks",
  bookNumber: "Book V",
  subtitle:
    "Non-linear networks of interconnected vertices and edges modeling complex real-world relationships.",
  quote:
    "“The shortest path between two points is not always a straight line — in a graph, it is the path of least resistance.”",
  overview: {
    heading: "What is a Graph?",
    description:
      "A graph G = (V, E) is a mathematical structure consisting of a set of Vertices (nodes) connected by Edges (links). Unlike trees which enforce strict single-parent hierarchies, graphs allow arbitrary interconnected topologies, cyclical pathways, and directed or weighted transitions. Graphs model social networks, transportation grids, dependency resolvers, and the World Wide Web.",
  },
  takeaways: [
    "Vertices (Nodes) store data entities; Edges represent relationships or paths.",
    "Graphs can be Directed (one-way arrows) or Undirected (two-way links).",
    "Edges can be Weighted (associated with cost, distance, or latency) or Unweighted.",
    "Adjacency Lists are space-efficient O(V + E) for sparse graphs.",
    "Adjacency Matrices provide instant O(1) edge lookup at the cost of O(V²) memory.",
  ],
  representations: {
    title: "Graph Representations",
    subtitle:
      "Different data structures balance memory footprint against edge lookup performance.",
    types: [
      {
        id: "adjList",
        name: "Adjacency List",
        spaceComplexity: "O(V + E)",
        lookupComplexity: "O(degree(V))",
        desc: "Each vertex maintains an array or linked list of its direct neighbors. Optimal for sparse graphs where |E| << |V|².",
      },
      {
        id: "adjMatrix",
        name: "Adjacency Matrix",
        spaceComplexity: "O(V²)",
        lookupComplexity: "O(1)",
        desc: "A 2D V × V grid where cell [u][v] stores 1 (or edge weight) if an edge connects u to v. Ideal for dense graphs.",
      },
    ],
  },
  traversals: {
    title: "Graph Traversals: BFS & DFS",
    subtitle:
      "Systematically explore all reachable vertices from a chosen starting origin.",
    algorithms: [
      {
        id: "bfs",
        name: "Breadth-First Search (BFS)",
        dataStructure: "Queue (FIFO)",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        desc: "Explores neighbor-by-neighbor in concentric radial waves. Finds the shortest path in unweighted graphs.",
        pseudocode:
          "function BFS(start):\n  queue = [start]\n  visited = {start}\n  while queue is not empty:\n    curr = queue.dequeue()\n    visit(curr)\n    for neighbor in adj[curr]:\n      if neighbor not in visited:\n        visited.add(neighbor)\n        queue.enqueue(neighbor)",
      },
      {
        id: "dfs",
        name: "Depth-First Search (DFS)",
        dataStructure: "Stack / Recursion (LIFO)",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        desc: "Dives deep along each branch until dead ends or cycles are reached before backtracking. Ideal for cycle detection and topological sorting.",
        pseudocode:
          "function DFS(start):\n  stack = [start]\n  visited = {}\n  while stack is not empty:\n    curr = stack.pop()\n    if curr not in visited:\n      visited.add(curr)\n      visit(curr)\n      for neighbor in adj[curr].reversed():\n        if neighbor not in visited:\n          stack.push(neighbor)",
      },
    ],
  },
  dijkstra: {
    title: "Dijkstra's Shortest Path Algorithm",
    subtitle:
      "Find the optimal path with minimum total weight from a source vertex to all other reachable nodes.",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    relaxationRule:
      "If distance[u] + weight(u, v) < distance[v]:\n  distance[v] = distance[u] + weight(u, v)\n  previous[v] = u",
    desc: "A greedy algorithm invented by Edsger W. Dijkstra in 1956. Uses a priority queue to iteratively expand the vertex with the lowest known tentative distance, relaxing neighbor edges until target or full coverage is achieved.",
    pseudocode:
      "function Dijkstra(graph, source, target):\n  dist = {v: Infinity for v in V}; dist[source] = 0\n  pq = PriorityQueue([(0, source)])\n  prev = {}\n\n  while pq is not empty:\n    (d, u) = pq.pop_min()\n    if u == target: break\n    if d > dist[u]: continue\n\n    for (v, weight) in graph.neighbors(u):\n      newDist = dist[u] + weight\n      if newDist < dist[v]:\n        dist[v] = newDist\n        prev[v] = u\n        pq.push((newDist, v))\n\n  return reconstructPath(prev, target)",
  },
};
