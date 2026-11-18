import test from "node:test";
import assert from "node:assert/strict";
import {
  BSTNode,
  cloneBST,
  layoutBST,
  flattenBST,
  generateInsertFrames,
  generateSearchFrames,
  generateDeleteFrames,
  getSampleTree,
} from "../src/modules/trees/utils/bstOperations.js";

test("BSTNode creates valid node with defaults", () => {
  const node = new BSTNode(42);
  assert.equal(node.value, 42);
  assert.equal(node.left, null);
  assert.equal(node.right, null);
  assert.ok(node.id.startsWith("node-42-"));
});

test("cloneBST deep copies tree without reference leakage", () => {
  const root = new BSTNode(50);
  root.left = new BSTNode(25);
  root.right = new BSTNode(75);

  const clone = cloneBST(root);
  assert.equal(clone.value, 50);
  assert.equal(clone.left.value, 25);
  assert.equal(clone.right.value, 75);

  clone.left.value = 999;
  assert.equal(root.left.value, 25, "Original root must not be mutated");
});

test("layoutBST assigns distinct coordinates preventing overlap", () => {
  const root = getSampleTree("balanced");
  layoutBST(root);
  const { nodes, edges } = flattenBST(root);

  assert.equal(nodes.length, 7);
  assert.equal(edges.length, 6);

  // Check unique coordinates
  const positions = new Set(nodes.map((n) => `${n.x},${n.y}`));
  assert.equal(positions.size, nodes.length, "All nodes must have unique (x, y) coordinates");
});

test("generateInsertFrames respects BST invariant (left < root < right)", () => {
  let root = null;
  const values = [50, 30, 70, 20];
  for (const v of values) {
    const frames = generateInsertFrames(root, v);
    assert.ok(frames.length > 0);
    const lastFrame = frames[frames.length - 1];
    root = lastFrame.tree;
  }

  assert.equal(root.value, 50);
  assert.equal(root.left.value, 30);
  assert.equal(root.right.value, 70);
  assert.equal(root.left.left.value, 20);
});

test("generateInsertFrames detects and skips duplicates", () => {
  const root = getSampleTree("simple");
  const frames = generateInsertFrames(root, 45); // 45 is the root
  const lastFrame = frames[frames.length - 1];
  assert.equal(lastFrame.status, "duplicate");
});

test("generateSearchFrames finds existing value with step path", () => {
  const root = getSampleTree("balanced"); // [50, 30, 70, 20, 40, 60, 80]
  const frames = generateSearchFrames(root, 40);
  assert.ok(frames.length > 1);

  const lastFrame = frames[frames.length - 1];
  assert.equal(lastFrame.status, "found");
  assert.equal(lastFrame.isFinal, true);
});

test("generateSearchFrames returns not-found when target is missing", () => {
  const root = getSampleTree("balanced");
  const frames = generateSearchFrames(root, 99);
  const lastFrame = frames[frames.length - 1];
  assert.equal(lastFrame.status, "not-found");
  assert.equal(lastFrame.isFinal, true);
});

test("generateDeleteFrames handles Case 1: Leaf node deletion", () => {
  const root = getSampleTree("balanced"); // 20 is a leaf
  const frames = generateDeleteFrames(root, 20);
  const lastFrame = frames[frames.length - 1];
  assert.equal(lastFrame.status, "delete-complete");

  // Verify 20 is gone
  const searchFrames = generateSearchFrames(lastFrame.tree, 20);
  assert.equal(searchFrames[searchFrames.length - 1].status, "not-found");
});

test("generateDeleteFrames handles Case 2: Node with single child", () => {
  const root = new BSTNode(50);
  root.left = new BSTNode(30);
  root.left.left = new BSTNode(20); // 30 has only left child 20

  const frames = generateDeleteFrames(root, 30);
  const lastFrame = frames[frames.length - 1];
  assert.equal(lastFrame.tree.left.value, 20, "20 should replace 30");
});

test("generateDeleteFrames handles Case 3: Node with two children (in-order successor)", () => {
  const root = getSampleTree("balanced"); // 50 has two children: left 30, right 70 (in-order successor is 60)
  const frames = generateDeleteFrames(root, 50);
  const lastFrame = frames[frames.length - 1];
  assert.equal(lastFrame.status, "delete-complete");
  assert.equal(lastFrame.tree.value, 60, "Root should be replaced by successor 60");
});
