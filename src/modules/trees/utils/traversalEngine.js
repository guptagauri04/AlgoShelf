/**
 * Step-by-Step Traversal Engine for Binary Trees
 * Supports:
 * - Inorder (Left → Root → Right)
 * - Preorder (Root → Left → Right)
 * - Postorder (Left → Right → Root)
 */

export const PSEUDOCODE = {
  inorder: [
    { line: 1, text: "function inorder(node):" },
    { line: 2, text: "    if node is null: return" },
    { line: 3, text: "    inorder(node.left)" },
    { line: 4, text: "    visit(node)  // Left → Root → Right" },
    { line: 5, text: "    inorder(node.right)" },
  ],
  preorder: [
    { line: 1, text: "function preorder(node):" },
    { line: 2, text: "    if node is null: return" },
    { line: 3, text: "    visit(node)  // Root → Left → Right" },
    { line: 4, text: "    preorder(node.left)" },
    { line: 5, text: "    preorder(node.right)" },
  ],
  postorder: [
    { line: 1, text: "function postorder(node):" },
    { line: 2, text: "    if node is null: return" },
    { line: 3, text: "    postorder(node.left)" },
    { line: 4, text: "    postorder(node.right)" },
    { line: 5, text: "    visit(node)  // Left → Right → Root" },
  ],
};

/**
 * Get simple array of values for a full traversal
 */
export function getTraversalValues(root, type) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    if (type === "preorder") result.push(node.val);
    traverse(node.left);
    if (type === "inorder") result.push(node.val);
    traverse(node.right);
    if (type === "postorder") result.push(node.val);
  }
  traverse(root);
  return result;
}

/**
 * Generate discrete animated steps for step-by-step playback
 */
export function generateTraversalSteps(root, type = "inorder") {
  if (!root) return [];

  const steps = [];
  const visitedValues = [];
  const visitedNodeIds = [];
  const visitOrderMap = {}; // { [nodeId]: 1-based order }

  // Initial step: Ready
  steps.push({
    activeNodeId: root.id,
    activeNodeVal: root.val,
    nodeStatus: "idle",
    activeEdge: null,
    visitedValues: [],
    visitedNodeIds: [],
    visitOrderMap: {},
    justVisitedId: null,
    callStack: [{ name: `${type}(${root.val})`, nodeId: root.id, phase: "Start" }],
    activeLine: 1,
    message: {
      title: `Starting ${capitalize(type)} Traversal`,
      description: `Beginning recursive traversal from root node "${root.val}". Rule: ${getRule(type)}.`,
      insight: getInitialInsight(type),
    },
  });

  const stack = [];

  function recordStep({
    activeNodeId,
    activeNodeVal,
    nodeStatus,
    activeEdge = null,
    justVisitedId = null,
    activeLine,
    title,
    description,
    insight,
  }) {
    steps.push({
      activeNodeId,
      activeNodeVal,
      nodeStatus,
      activeEdge,
      visitedValues: [...visitedValues],
      visitedNodeIds: [...visitedNodeIds],
      visitOrderMap: { ...visitOrderMap },
      justVisitedId,
      callStack: stack.map((frame) => ({ ...frame })),
      activeLine,
      message: {
        title,
        description,
        insight,
      },
    });
  }

  function runTraversal(node, parent = null) {
    if (!node) return;

    stack.push({
      name: `${type}(${node.val})`,
      nodeId: node.id,
      phase: "Entered",
    });

    // Enter node
    recordStep({
      activeNodeId: node.id,
      activeNodeVal: node.val,
      nodeStatus: "exploring",
      activeEdge: parent ? { from: parent.id, to: node.id } : null,
      activeLine: 2,
      title: `Enter Node "${node.val}"`,
      description: `Called ${type}(node "${node.val}"). Checking base case (node != null).`,
      insight: `Each recursive call pushes a new frame onto the call stack.`,
    });

    if (type === "preorder") {
      // PREORDER: Visit ROOT first
      visitedValues.push(node.val);
      visitedNodeIds.push(node.id);
      visitOrderMap[node.id] = visitedValues.length;

      stack[stack.length - 1].phase = "Visited";
      recordStep({
        activeNodeId: node.id,
        activeNodeVal: node.val,
        nodeStatus: "visited",
        justVisitedId: node.id,
        activeLine: 3,
        title: `Visit Node "${node.val}" (Preorder: Root First)`,
        description: `Processing node "${node.val}" and adding it to the traversal sequence (#${visitedValues.length}).`,
        insight: `Preorder visits the root node before exploring either of its subtrees.`,
      });

      // Recurse Left
      if (node.left) {
        stack[stack.length - 1].phase = "Recursing Left";
        recordStep({
          activeNodeId: node.id,
          activeNodeVal: node.val,
          nodeStatus: "exploring",
          activeEdge: { from: node.id, to: node.left.id },
          activeLine: 4,
          title: `Traverse Left Subtree of "${node.val}"`,
          description: `Descending left edge to node "${node.left.val}".`,
          insight: `The entire left subtree must finish preorder traversal before any right subtree begins.`,
        });
        runTraversal(node.left, node, "left");
      }

      // Recurse Right
      if (node.right) {
        stack[stack.length - 1].phase = "Recursing Right";
        recordStep({
          activeNodeId: node.id,
          activeNodeVal: node.val,
          nodeStatus: "exploring",
          activeEdge: { from: node.id, to: node.right.id },
          activeLine: 5,
          title: `Traverse Right Subtree of "${node.val}"`,
          description: `Descending right edge to node "${node.right.val}".`,
          insight: `With left subtree done, we proceed to explore the right subtree.`,
        });
        runTraversal(node.right, node, "right");
      }
    } else if (type === "inorder") {
      // INORDER: Traverse LEFT first
      if (node.left) {
        stack[stack.length - 1].phase = "Recursing Left";
        recordStep({
          activeNodeId: node.id,
          activeNodeVal: node.val,
          nodeStatus: "exploring",
          activeEdge: { from: node.id, to: node.left.id },
          activeLine: 3,
          title: `Traverse Left Subtree of "${node.val}"`,
          description: `Descending to left child "${node.left.val}" before visiting "${node.val}".`,
          insight: `Inorder waits for the entire left subtree to finish before visiting the current node.`,
        });
        runTraversal(node.left, node, "left");
      }

      // Visit ROOT
      visitedValues.push(node.val);
      visitedNodeIds.push(node.id);
      visitOrderMap[node.id] = visitedValues.length;

      stack[stack.length - 1].phase = "Visited";
      recordStep({
        activeNodeId: node.id,
        activeNodeVal: node.val,
        nodeStatus: "visited",
        justVisitedId: node.id,
        activeLine: 4,
        title: `Visit Node "${node.val}" (Inorder: Left → Root)`,
        description: `Left subtree is processed. Now visiting node "${node.val}" (#${visitedValues.length}).`,
        insight: `For a Binary Search Tree (BST), this step visits values in sorted numerical order!`,
      });

      // Recurse RIGHT
      if (node.right) {
        stack[stack.length - 1].phase = "Recursing Right";
        recordStep({
          activeNodeId: node.id,
          activeNodeVal: node.val,
          nodeStatus: "exploring",
          activeEdge: { from: node.id, to: node.right.id },
          activeLine: 5,
          title: `Traverse Right Subtree of "${node.val}"`,
          description: `Descending right edge to node "${node.right.val}".`,
          insight: `After visiting the node, we explore all nodes in its right subtree.`,
        });
        runTraversal(node.right, node, "right");
      }
    } else if (type === "postorder") {
      // POSTORDER: Traverse LEFT first
      if (node.left) {
        stack[stack.length - 1].phase = "Recursing Left";
        recordStep({
          activeNodeId: node.id,
          activeNodeVal: node.val,
          nodeStatus: "exploring",
          activeEdge: { from: node.id, to: node.left.id },
          activeLine: 3,
          title: `Traverse Left Subtree of "${node.val}"`,
          description: `Descending to left child "${node.left.val}".`,
          insight: `Postorder postpones visiting root until both left and right subtrees are completely done.`,
        });
        runTraversal(node.left, node, "left");
      }

      // Traverse RIGHT next
      if (node.right) {
        stack[stack.length - 1].phase = "Recursing Right";
        recordStep({
          activeNodeId: node.id,
          activeNodeVal: node.val,
          nodeStatus: "exploring",
          activeEdge: { from: node.id, to: node.right.id },
          activeLine: 4,
          title: `Traverse Right Subtree of "${node.val}"`,
          description: `Descending to right child "${node.right.val}".`,
          insight: `Both subtrees must complete before the current node is visited.`,
        });
        runTraversal(node.right, node, "right");
      }

      // Visit ROOT last
      visitedValues.push(node.val);
      visitedNodeIds.push(node.id);
      visitOrderMap[node.id] = visitedValues.length;

      stack[stack.length - 1].phase = "Visited";
      recordStep({
        activeNodeId: node.id,
        activeNodeVal: node.val,
        nodeStatus: "visited",
        justVisitedId: node.id,
        activeLine: 5,
        title: `Visit Node "${node.val}" (Postorder: Root Last)`,
        description: `Both subtrees are complete. Now visiting node "${node.val}" (#${visitedValues.length}).`,
        insight: `Postorder is ideal for bottom-up tasks like deleting trees or computing directory sizes.`,
      });
    }

    // Returning / Popping stack frame
    stack.pop();
    if (parent) {
      recordStep({
        activeNodeId: parent.id,
        activeNodeVal: parent.val,
        nodeStatus: "returning",
        activeEdge: { from: node.id, to: parent.id },
        activeLine: 1,
        title: `Backtrack to Parent "${parent.val}"`,
        description: `Completed branch at "${node.val}". Returning control to parent node "${parent.val}".`,
        insight: `The call frame for "${node.val}" pops off the call stack as execution unwinds.`,
      });
    }
  }

  runTraversal(root);

  // Final Complete Step
  steps.push({
    activeNodeId: null,
    activeNodeVal: null,
    nodeStatus: "completed",
    activeEdge: null,
    visitedValues: [...visitedValues],
    visitedNodeIds: [...visitedNodeIds],
    visitOrderMap: { ...visitOrderMap },
    justVisitedId: null,
    callStack: [],
    activeLine: 1,
    message: {
      title: `${capitalize(type)} Traversal Complete!`,
      description: `All nodes have been visited. Final sequence: [${visitedValues.join(", ")}].`,
      insight: `Total nodes visited: ${visitedValues.length}. Time Complexity: O(n), Space Complexity: O(h).`,
    },
  });

  return steps;
}

function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getRule(type) {
  switch (type) {
    case "inorder":
      return "Left Subtree → Root → Right Subtree";
    case "preorder":
      return "Root → Left Subtree → Right Subtree";
    case "postorder":
      return "Left Subtree → Right Subtree → Root";
    default:
      return "";
  }
}

function getInitialInsight(type) {
  switch (type) {
    case "inorder":
      return "Inorder processes nodes in symmetric order. On BSTs, this yields sorted ascending order.";
    case "preorder":
      return "Preorder visits each node before its children, making it ideal for cloning or serializing trees.";
    case "postorder":
      return "Postorder visits children before parents, making it perfect for bottom-up evaluations and memory deallocation.";
    default:
      return "";
  }
}
