/**
 * Helper algorithms and data structures for Graph Representations and Traversals (BFS & DFS)
 */

export function buildAdjacencyList(nodes, edges, directed = false) {
  const list = {};
  nodes.forEach((n) => {
    list[n.id] = [];
  });

  edges.forEach((e) => {
    if (list[e.from]) {
      list[e.from].push(e.to);
    }
    if (!directed && list[e.to]) {
      list[e.to].push(e.from);
    }
  });

  // Sort neighbors alphabetically for predictable traversal order
  Object.keys(list).forEach((key) => {
    list[key].sort();
  });

  return list;
}

export function buildAdjacencyMatrix(nodes, edges, directed = false) {
  const nodeIds = nodes.map((n) => n.id);
  const size = nodeIds.length;
  const matrix = Array.from({ length: size }, () => Array(size).fill(0));
  const idToIndex = {};
  nodeIds.forEach((id, idx) => {
    idToIndex[id] = idx;
  });

  edges.forEach((e) => {
    const u = idToIndex[e.from];
    const v = idToIndex[e.to];
    if (u !== undefined && v !== undefined) {
      matrix[u][v] = 1;
      if (!directed) {
        matrix[v][u] = 1;
      }
    }
  });

  return { nodeIds, matrix };
}

/**
 * Generate discrete animated steps for Breadth-First Search (BFS)
 */
export function generateBFSSteps(nodes, edges, startNodeId, directed = false) {
  const adj = buildAdjacencyList(nodes, edges, directed);
  const steps = [];

  const visited = new Set();
  const queue = [startNodeId];
  visited.add(startNodeId);

  const traversalOrder = [];
  const activeTreeEdges = new Set();

  steps.push({
    type: "start",
    currentNode: startNodeId,
    queue: [...queue],
    visited: Array.from(visited),
    traversalOrder: [...traversalOrder],
    activeTreeEdges: Array.from(activeTreeEdges),
    highlightEdge: null,
    explanation: `Initialize BFS from source vertex "${startNodeId}". Marked as visited and enqueued into FIFO Queue.`,
  });

  while (queue.length > 0) {
    const current = queue.shift();
    traversalOrder.push(current);

    steps.push({
      type: "dequeue",
      currentNode: current,
      queue: [...queue],
      visited: Array.from(visited),
      traversalOrder: [...traversalOrder],
      activeTreeEdges: Array.from(activeTreeEdges),
      highlightEdge: null,
      explanation: `Dequeued vertex "${current}". Inspecting its immediate outgoing neighbors in the adjacency list.`,
    });

    const neighbors = adj[current] || [];
    for (const neighbor of neighbors) {
      const edgeKey = directed ? `${current}->${neighbor}` : [current, neighbor].sort().join("-");

      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        activeTreeEdges.add(edgeKey);

        steps.push({
          type: "discover",
          currentNode: current,
          targetNode: neighbor,
          queue: [...queue],
          visited: Array.from(visited),
          traversalOrder: [...traversalOrder],
          activeTreeEdges: Array.from(activeTreeEdges),
          highlightEdge: { from: current, to: neighbor, isTree: true },
          explanation: `Discovered unvisited neighbor "${neighbor}" via edge (${current} → ${neighbor}). Marked visited and added to queue.`,
        });
      } else {
        steps.push({
          type: "already_visited",
          currentNode: current,
          targetNode: neighbor,
          queue: [...queue],
          visited: Array.from(visited),
          traversalOrder: [...traversalOrder],
          activeTreeEdges: Array.from(activeTreeEdges),
          highlightEdge: { from: current, to: neighbor, isTree: false },
          explanation: `Neighbor "${neighbor}" is already visited. Skipping enqueuing.`,
        });
      }
    }
  }

  steps.push({
    type: "complete",
    currentNode: null,
    queue: [],
    visited: Array.from(visited),
    traversalOrder: [...traversalOrder],
    activeTreeEdges: Array.from(activeTreeEdges),
    highlightEdge: null,
    explanation: `BFS Traversal complete! Visited ${traversalOrder.length} reachable vertices: [${traversalOrder.join(" → ")}].`,
  });

  return steps;
}

/**
 * Generate discrete animated steps for Depth-First Search (DFS)
 */
export function generateDFSSteps(nodes, edges, startNodeId, directed = false) {
  const adj = buildAdjacencyList(nodes, edges, directed);
  const steps = [];

  const visited = new Set();
  const callStack = [startNodeId];
  const traversalOrder = [];
  const activeTreeEdges = new Set();

  steps.push({
    type: "start",
    currentNode: startNodeId,
    callStack: [...callStack],
    visited: [],
    traversalOrder: [...traversalOrder],
    activeTreeEdges: Array.from(activeTreeEdges),
    highlightEdge: null,
    explanation: `Begin DFS from source vertex "${startNodeId}". Pushed to call stack.`,
  });

  function dfsRecursive(u, parent = null) {
    visited.add(u);
    traversalOrder.push(u);

    steps.push({
      type: "visit",
      currentNode: u,
      callStack: [...callStack],
      visited: Array.from(visited),
      traversalOrder: [...traversalOrder],
      activeTreeEdges: Array.from(activeTreeEdges),
      highlightEdge: parent ? { from: parent, to: u, isTree: true } : null,
      explanation: `Visiting vertex "${u}". Added to traversal sequence.`,
    });

    const neighbors = adj[u] || [];
    for (const v of neighbors) {
      const edgeKey = directed ? `${u}->${v}` : [u, v].sort().join("-");

      if (!visited.has(v)) {
        activeTreeEdges.add(edgeKey);
        callStack.push(v);

        steps.push({
          type: "traverse_edge",
          currentNode: u,
          targetNode: v,
          callStack: [...callStack],
          visited: Array.from(visited),
          traversalOrder: [...traversalOrder],
          activeTreeEdges: Array.from(activeTreeEdges),
          highlightEdge: { from: u, to: v, isTree: true },
          explanation: `Exploring deeper along edge (${u} → ${v}). Pushing "${v}" to call stack.`,
        });

        dfsRecursive(v, u);

        callStack.pop();
        steps.push({
          type: "backtrack",
          currentNode: u,
          targetNode: v,
          callStack: [...callStack],
          visited: Array.from(visited),
          traversalOrder: [...traversalOrder],
          activeTreeEdges: Array.from(activeTreeEdges),
          highlightEdge: { from: v, to: u, isBacktrack: true },
          explanation: `Finished exploring subtree at "${v}". Backtracking to vertex "${u}".`,
        });
      } else if (v !== parent || directed) {
        steps.push({
          type: "skip_visited",
          currentNode: u,
          targetNode: v,
          callStack: [...callStack],
          visited: Array.from(visited),
          traversalOrder: [...traversalOrder],
          activeTreeEdges: Array.from(activeTreeEdges),
          highlightEdge: { from: u, to: v, isTree: false },
          explanation: `Edge (${u} → ${v}) leads to already visited vertex "${v}". Skipping.`,
        });
      }
    }
  }

  dfsRecursive(startNodeId);

  steps.push({
    type: "complete",
    currentNode: null,
    callStack: [],
    visited: Array.from(visited),
    traversalOrder: [...traversalOrder],
    activeTreeEdges: Array.from(activeTreeEdges),
    highlightEdge: null,
    explanation: `DFS Traversal complete! Traversed order: [${traversalOrder.join(" → ")}].`,
  });

  return steps;
}
