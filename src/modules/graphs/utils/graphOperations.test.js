import { describe, it } from "node:test";
import assert from "node:assert";
import {
  GRAPH_PRESETS,
  getAdjacencyList,
  getAdjacencyMatrix,
  generateBFSSteps,
  generateDFSSteps,
  calculateEdgeEndpoints,
} from "./graphOperations.js";

describe("Graph Operations & Traversal", () => {
  it("computes adjacency list for undirected graph", () => {
    const nodes = [{ id: "A" }, { id: "B" }, { id: "C" }];
    const edges = [
      { id: "e1", from: "A", to: "B" },
      { id: "e2", from: "B", to: "C" },
    ];
    const adjList = getAdjacencyList(nodes, edges, false);
    assert.deepStrictEqual(adjList, {
      A: ["B"],
      B: ["A", "C"],
      C: ["B"],
    });
  });

  it("computes adjacency list for directed graph", () => {
    const nodes = [{ id: "0" }, { id: "1" }, { id: "2" }];
    const edges = [
      { id: "e1", from: "0", to: "1" },
      { id: "e2", from: "0", to: "2" },
    ];
    const adjList = getAdjacencyList(nodes, edges, true);
    assert.deepStrictEqual(adjList, {
      "0": ["1", "2"],
      "1": [],
      "2": [],
    });
  });

  it("computes adjacency matrix correctly", () => {
    const nodes = [{ id: "A" }, { id: "B" }, { id: "C" }];
    const edges = [{ id: "e1", from: "A", to: "B" }];
    const { nodeLabels, matrix } = getAdjacencyMatrix(nodes, edges, false);
    assert.deepStrictEqual(nodeLabels, ["A", "B", "C"]);
    assert.deepStrictEqual(matrix, [
      [0, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ]);
  });

  it("generates correct BFS steps and visits all connected nodes", () => {
    const preset = GRAPH_PRESETS.connectedCycle;
    const steps = generateBFSSteps(preset.nodes, preset.edges, "A", false);
    assert.ok(steps.length > 5);
    const finalStep = steps[steps.length - 1];
    assert.strictEqual(finalStep.isFinal, true);
    assert.strictEqual(finalStep.visited.length, 6);
    assert.strictEqual(finalStep.visited[0], "A");
  });

  it("handles disconnected graph in BFS", () => {
    const preset = GRAPH_PRESETS.disconnected;
    const steps = generateBFSSteps(preset.nodes, preset.edges, "A", false);
    const finalStep = steps[steps.length - 1];
    assert.strictEqual(finalStep.isFinal, true);
    assert.strictEqual(finalStep.visited.length, 4); // Only component 1 reached
    assert.ok(finalStep.description.includes("disconnected graph"));
  });

  it("generates correct DFS steps and backtracks cleanly", () => {
    const preset = GRAPH_PRESETS.treeStar;
    const steps = generateDFSSteps(preset.nodes, preset.edges, "1", false);
    assert.ok(steps.length > 5);
    const finalStep = steps[steps.length - 1];
    assert.strictEqual(finalStep.isFinal, true);
    assert.strictEqual(finalStep.visited.length, 7);
    assert.strictEqual(finalStep.stack.length, 0); // Stack should be empty at the end
  });

  it("calculates accurate edge offset endpoints for SVG markers", () => {
    const n1 = { x: 100, y: 100 };
    const n2 = { x: 200, y: 100 };
    const { x1, y1, x2, y2 } = calculateEdgeEndpoints(n1, n2, 20);
    assert.strictEqual(x1, 120);
    assert.strictEqual(y1, 100);
    assert.strictEqual(x2, 178);
    assert.strictEqual(y2, 100);
  });
});
