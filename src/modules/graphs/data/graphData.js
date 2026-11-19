// Preset graphs for traversal and representation demonstrations
export const PRESET_GRAPHS = {
  connected: {
    id: "connected",
    name: "Classic 6-Node Graph",
    description: "A connected undirected graph with cross edges and cycles, ideal for exploring BFS layers and DFS depth backtracking.",
    directed: false,
    nodes: [
      { id: "A", label: "A", x: 100, y: 180 },
      { id: "B", label: "B", x: 220, y: 70 },
      { id: "C", label: "C", x: 220, y: 290 },
      { id: "D", label: "D", x: 420, y: 70 },
      { id: "E", label: "E", x: 420, y: 290 },
      { id: "F", label: "F", x: 540, y: 180 },
    ],
    edges: [
      { from: "A", to: "B" },
      { from: "A", to: "C" },
      { from: "B", to: "C" },
      { from: "B", to: "D" },
      { from: "C", to: "E" },
      { from: "D", to: "E" },
      { from: "D", to: "F" },
      { from: "E", to: "F" },
    ],
  },
  directed_flow: {
    id: "directed_flow",
    name: "Directed DAG / Flow",
    description: "A directed acyclic flow graph showcasing one-way forward transitions, multiple branch paths, and topological flow.",
    directed: true,
    nodes: [
      { id: "A", label: "A", x: 90, y: 180 },
      { id: "B", label: "B", x: 230, y: 80 },
      { id: "C", label: "C", x: 230, y: 280 },
      { id: "D", label: "D", x: 410, y: 80 },
      { id: "E", label: "E", x: 410, y: 280 },
      { id: "F", label: "F", x: 550, y: 180 },
    ],
    edges: [
      { from: "A", to: "B" },
      { from: "A", to: "C" },
      { from: "B", to: "D" },
      { from: "B", to: "E" },
      { from: "C", to: "E" },
      { from: "D", to: "F" },
      { from: "E", to: "F" },
    ],
  },
  disconnected: {
    id: "disconnected",
    name: "Disconnected Graph (2 Components)",
    description: "Features 2 separate connected components (A-B-C-D and E-F) to test traversal reachability and disconnected boundaries.",
    directed: false,
    nodes: [
      { id: "A", label: "A", x: 110, y: 90 },
      { id: "B", label: "B", x: 260, y: 90 },
      { id: "C", label: "C", x: 110, y: 250 },
      { id: "D", label: "D", x: 260, y: 250 },
      { id: "E", label: "E", x: 460, y: 130 },
      { id: "F", label: "F", x: 550, y: 240 },
    ],
    edges: [
      { from: "A", to: "B" },
      { from: "A", to: "C" },
      { from: "B", to: "D" },
      { from: "C", to: "D" },
      { from: "E", to: "F" },
    ],
  },
  cyclic_directed: {
    id: "cyclic_directed",
    name: "Directed with Cycle",
    description: "Contains directed feedback loops (A -> B -> C -> A) and downstream branches to demonstrate visited-node cycle handling.",
    directed: true,
    nodes: [
      { id: "A", label: "A", x: 140, y: 100 },
      { id: "B", label: "B", x: 320, y: 100 },
      { id: "C", label: "C", x: 230, y: 260 },
      { id: "D", label: "D", x: 470, y: 100 },
      { id: "E", label: "E", x: 470, y: 260 },
    ],
    edges: [
      { from: "A", to: "B" },
      { from: "B", to: "C" },
      { from: "C", to: "A" },
      { from: "B", to: "D" },
      { from: "D", to: "E" },
      { from: "C", to: "E" },
    ],
  },
};

export const GRAPH_CONCEPTS = [
  {
    title: "Vertices & Edges",
    description:
      "A graph G = (V, E) is composed of a set of vertices (nodes) and pairs of vertices called edges representing connections or relationships between them.",
    example: "V = {A, B, C, D}, E = {(A,B), (A,C), (B,D), (C,D)}",
  },
  {
    title: "Adjacency List",
    description:
      "Stores an array or map of linked lists/arrays for every vertex u containing its immediate neighbors. Extremely space-efficient O(V + E) for sparse graphs.",
    example: "A: [B, C], B: [A, D], C: [A, D], D: [B, C]",
  },
  {
    title: "Adjacency Matrix",
    description:
      "A 2D array of size V × V where matrix[u][v] = 1 if an edge exists from u to v, otherwise 0. Provides O(1) instantaneous edge lookup at O(V²) space cost.",
    example: "Row A: [A:0, B:1, C:1, D:0]",
  },
  {
    title: "BFS (Breadth-First Search)",
    description:
      "Explores vertices radially layer by layer using a FIFO Queue. Visited nodes expand their unvisited neighbors into the queue. Finds shortest path in unweighted graphs.",
    example: "Queue order: Source → 1-hop neighbors → 2-hop neighbors...",
  },
  {
    title: "DFS (Depth-First Search)",
    description:
      "Dives as deep as possible down a path using a LIFO Stack or recursion before backtracking. Fundamental for cycle detection, topological sorting, and connected components.",
    example: "Stack order: Explores deeply along first neighbor branch until dead end, then backtracks.",
  },
];
