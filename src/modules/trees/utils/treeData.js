/**
 * Tree Presets and Layout Computation for Binary Tree Visualizer
 */

export const TREE_PRESETS = {
  balanced: {
    id: "balanced",
    name: "Classic Balanced Tree",
    description: "A complete 3-level binary tree with 7 nodes.",
    root: {
      id: "1",
      val: "1",
      left: {
        id: "2",
        val: "2",
        left: { id: "4", val: "4", left: null, right: null },
        right: { id: "5", val: "5", left: null, right: null },
      },
      right: {
        id: "3",
        val: "3",
        left: { id: "6", val: "6", left: null, right: null },
        right: { id: "7", val: "7", left: null, right: null },
      },
    },
  },
  bst: {
    id: "bst",
    name: "Binary Search Tree (BST)",
    description: "Sorted BST: Left < Root < Right. Notice how Inorder traversal produces sorted output!",
    root: {
      id: "40",
      val: "40",
      left: {
        id: "20",
        val: "20",
        left: { id: "10", val: "10", left: null, right: null },
        right: { id: "30", val: "30", left: null, right: null },
      },
      right: {
        id: "60",
        val: "60",
        left: { id: "50", val: "50", left: null, right: null },
        right: { id: "70", val: "70", left: null, right: null },
      },
    },
  },
  expression: {
    id: "expression",
    name: "Expression Tree",
    description: "Mathematical expression (+, ×, ÷). Inorder gives infix, Preorder gives prefix, Postorder gives postfix!",
    root: {
      id: "plus",
      val: "+",
      left: {
        id: "mul",
        val: "×",
        left: { id: "3", val: "3", left: null, right: null },
        right: { id: "4", val: "4", left: null, right: null },
      },
      right: {
        id: "div",
        val: "÷",
        left: { id: "8", val: "8", left: null, right: null },
        right: { id: "2", val: "2", left: null, right: null },
      },
    },
  },
  skewed: {
    id: "skewed",
    name: "Asymmetric / Skewed Tree",
    description: "Unbalanced tree illustrating non-uniform depth and single-child branches.",
    root: {
      id: "A",
      val: "A",
      left: {
        id: "B",
        val: "B",
        left: {
          id: "D",
          val: "D",
          left: null,
          right: { id: "F", val: "F", left: null, right: null },
        },
        right: null,
      },
      right: {
        id: "C",
        val: "C",
        left: { id: "E", val: "E", left: null, right: null },
        right: { id: "G", val: "G", left: null, right: null },
      },
    },
  },
  small: {
    id: "small",
    name: "Compact 5-Node Tree",
    description: "A compact tree ideal for step-by-step beginners.",
    root: {
      id: "50",
      val: "50",
      left: {
        id: "25",
        val: "25",
        left: { id: "12", val: "12", left: null, right: null },
        right: null,
      },
      right: {
        id: "75",
        val: "75",
        left: null,
        right: { id: "90", val: "90", left: null, right: null },
      },
    },
  },
};

/**
 * Calculates SVG node coordinates and edges for any binary tree.
 * Uses subtree-bounding-box approach to guarantee non-overlapping nodes.
 */
export function computeTreeLayout(root, width = 740, height = 360) {
  if (!root) return { nodes: [], edges: [], maxDepth: 0 };

  const nodes = [];
  const edges = [];

  // Determine tree depth
  function getDepth(node) {
    if (!node) return 0;
    return 1 + Math.max(getDepth(node.left), getDepth(node.right));
  }
  const maxDepth = getDepth(root);

  const topPadding = 50;
  const bottomPadding = 45;
  const availableHeight = height - topPadding - bottomPadding;
  const levelHeight = maxDepth > 1 ? availableHeight / (maxDepth - 1) : 0;

  // Recursive placement with dynamic horizontal bounds [minX, maxX]
  function layoutNode(node, depth, minX, maxX, parentPos = null, edgeType = null) {
    if (!node) return;

    const x = (minX + maxX) / 2;
    const y = topPadding + (depth - 1) * Math.min(levelHeight, 95);

    const nodePos = { id: node.id, val: node.val, x, y, depth };
    nodes.push(nodePos);

    if (parentPos) {
      edges.push({
        id: `${parentPos.id}->${node.id}`,
        from: parentPos.id,
        to: node.id,
        fromPos: { x: parentPos.x, y: parentPos.y },
        toPos: { x, y },
        type: edgeType,
      });
    }

    if (node.left) {
      layoutNode(node.left, depth + 1, minX, x, nodePos, "left");
    }
    if (node.right) {
      layoutNode(node.right, depth + 1, x, maxX, nodePos, "right");
    }
  }

  layoutNode(root, 1, 30, width - 30);

  return { nodes, edges, maxDepth };
}
