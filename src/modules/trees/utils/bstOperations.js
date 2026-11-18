/**
 * Binary Search Tree Operations & Animation Frame Generator
 * Generates discrete step-by-step frames for Insert, Search, and Delete operations.
 */

export class BSTNode {
  constructor(value, id = null) {
    this.value = value;
    this.id = id || `node-${value}-${Math.random().toString(36).substr(2, 6)}`;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
  }
}

/**
 * Deep clone a BST structure
 */
export function cloneBST(root) {
  if (!root) return null;
  const copy = new BSTNode(root.value, root.id);
  copy.x = root.x;
  copy.y = root.y;
  copy.left = cloneBST(root.left);
  copy.right = cloneBST(root.right);
  return copy;
}

/**
 * Compute neat (x, y) coordinates for all nodes in the tree.
 * Uses in-order x-spacing and depth-based y-spacing to ensure zero overlaps.
 */
export function layoutBST(root, svgWidth = 800) {
  if (!root) return null;

  const levelHeight = 75;
  const topMargin = 50;

  // 1. Calculate subtree size / inorder index for horizontal spacing
  let index = 0;
  function assignInorderIndex(node, depth = 0) {
    if (!node) return;
    assignInorderIndex(node.left, depth + 1);
    node._inorder = index++;
    node._depth = depth;
    assignInorderIndex(node.right, depth + 1);
  }

  assignInorderIndex(root, 0);

  const totalNodes = Math.max(1, index);
  const horizontalPadding = 60;
  const availableWidth = svgWidth - horizontalPadding * 2;
  const xStep = totalNodes > 1 ? availableWidth / (totalNodes - 1) : availableWidth / 2;

  function assignPositions(node) {
    if (!node) return;
    node.x = totalNodes > 1 ? horizontalPadding + node._inorder * xStep : svgWidth / 2;
    node.y = topMargin + node._depth * levelHeight;
    assignPositions(node.left);
    assignPositions(node.right);
  }

  assignPositions(root);
  return root;
}

/**
 * Convert tree to a flat list of nodes and edges for SVG rendering
 */
export function flattenBST(root) {
  const nodes = [];
  const edges = [];

  function traverse(node) {
    if (!node) return;
    nodes.push({
      id: node.id,
      value: node.value,
      x: node.x,
      y: node.y,
    });

    if (node.left) {
      edges.push({
        id: `${node.id}-${node.left.id}`,
        from: { x: node.x, y: node.y },
        to: { x: node.left.x, y: node.left.y },
        targetId: node.left.id,
      });
      traverse(node.left);
    }

    if (node.right) {
      edges.push({
        id: `${node.id}-${node.right.id}`,
        from: { x: node.x, y: node.y },
        to: { x: node.right.x, y: node.right.y },
        targetId: node.right.id,
      });
      traverse(node.right);
    }
  }

  traverse(root);
  return { nodes, edges };
}

/**
 * Generate step frames for Inserting a value into BST
 */
export function generateInsertFrames(initialRoot, value) {
  const frames = [];
  const root = cloneBST(initialRoot);
  layoutBST(root);

  if (!root) {
    const newRoot = new BSTNode(value);
    layoutBST(newRoot);
    const { nodes, edges } = flattenBST(newRoot);
    frames.push({
      tree: newRoot,
      nodes,
      edges,
      highlightedNodeId: newRoot.id,
      status: "inserted",
      title: "Create Root Node",
      description: `Tree is empty. Inserted ${value} as the root node.`,
      codeLine: 2,
    });
    return frames;
  }

  let curr = root;
  const visited = [];

  while (curr) {
    visited.push(curr.id);

    if (value === curr.value) {
      const { nodes, edges } = flattenBST(root);
      frames.push({
        tree: cloneBST(root),
        nodes,
        edges,
        highlightedNodeId: curr.id,
        status: "duplicate",
        title: "Duplicate Value",
        description: `Value ${value} already exists in the BST. Duplicate insertions are skipped.`,
        codeLine: 4,
      });
      return frames;
    }

    if (value < curr.value) {
      const { nodes, edges } = flattenBST(root);
      frames.push({
        tree: cloneBST(root),
        nodes,
        edges,
        highlightedNodeId: curr.id,
        status: "compare-left",
        title: `Compare: ${value} < ${curr.value}`,
        description: `${value} is less than ${curr.value}. Moving to the left subtree.`,
        codeLine: 6,
      });

      if (!curr.left) {
        curr.left = new BSTNode(value);
        layoutBST(root);
        const updated = flattenBST(root);
        frames.push({
          tree: cloneBST(root),
          nodes: updated.nodes,
          edges: updated.edges,
          highlightedNodeId: curr.left.id,
          status: "inserted",
          title: `Inserted ${value}`,
          description: `Found empty spot on the left of ${curr.value}. Inserted ${value}.`,
          codeLine: 7,
          isFinal: true,
        });
        break;
      }
      curr = curr.left;
    } else {
      const { nodes, edges } = flattenBST(root);
      frames.push({
        tree: cloneBST(root),
        nodes,
        edges,
        highlightedNodeId: curr.id,
        status: "compare-right",
        title: `Compare: ${value} > ${curr.value}`,
        description: `${value} is greater than ${curr.value}. Moving to the right subtree.`,
        codeLine: 9,
      });

      if (!curr.right) {
        curr.right = new BSTNode(value);
        layoutBST(root);
        const updated = flattenBST(root);
        frames.push({
          tree: cloneBST(root),
          nodes: updated.nodes,
          edges: updated.edges,
          highlightedNodeId: curr.right.id,
          status: "inserted",
          title: `Inserted ${value}`,
          description: `Found empty spot on the right of ${curr.value}. Inserted ${value}.`,
          codeLine: 10,
          isFinal: true,
        });
        break;
      }
      curr = curr.right;
    }
  }

  return frames;
}

/**
 * Generate step frames for Searching a value in BST
 */
export function generateSearchFrames(root, value) {
  const frames = [];
  if (!root) {
    frames.push({
      tree: null,
      nodes: [],
      edges: [],
      highlightedNodeId: null,
      status: "not-found",
      title: "Tree is Empty",
      description: `Cannot search in an empty tree. ${value} not found.`,
      isFinal: true,
    });
    return frames;
  }

  let curr = root;
  while (curr) {
    const { nodes, edges } = flattenBST(root);

    if (curr.value === value) {
      frames.push({
        tree: cloneBST(root),
        nodes,
        edges,
        highlightedNodeId: curr.id,
        status: "found",
        title: `Value Found: ${value}`,
        description: `Target value ${value} matches node ${curr.value}! Search completed successfully.`,
        isFinal: true,
        codeLine: 3,
      });
      return frames;
    }

    if (value < curr.value) {
      frames.push({
        tree: cloneBST(root),
        nodes,
        edges,
        highlightedNodeId: curr.id,
        status: "compare-left",
        title: `Compare: ${value} < ${curr.value}`,
        description: `${value} is smaller than ${curr.value}. Branching into the left child.`,
        codeLine: 5,
      });
      curr = curr.left;
    } else {
      frames.push({
        tree: cloneBST(root),
        nodes,
        edges,
        highlightedNodeId: curr.id,
        status: "compare-right",
        title: `Compare: ${value} > ${curr.value}`,
        description: `${value} is greater than ${curr.value}. Branching into the right child.`,
        codeLine: 7,
      });
      curr = curr.right;
    }
  }

  // Not found
  const { nodes, edges } = flattenBST(root);
  frames.push({
    tree: cloneBST(root),
    nodes,
    edges,
    highlightedNodeId: null,
    status: "not-found",
    title: `Value ${value} Not Found`,
    description: `Reached null leaf branch. Value ${value} does not exist in this Binary Search Tree.`,
    isFinal: true,
    codeLine: 9,
  });

  return frames;
}

/**
 * Generate step frames for Deleting a value from BST
 */
export function generateDeleteFrames(initialRoot, value) {
  const frames = [];
  if (!initialRoot) {
    frames.push({
      tree: null,
      nodes: [],
      edges: [],
      highlightedNodeId: null,
      status: "not-found",
      title: "Empty Tree",
      description: "Cannot delete from an empty tree.",
      isFinal: true,
    });
    return frames;
  }

  const root = cloneBST(initialRoot);
  layoutBST(root);

  // Helper recursion that logs frames
  function deleteNode(node, val) {
    if (!node) {
      const { nodes, edges } = flattenBST(root);
      frames.push({
        tree: cloneBST(root),
        nodes,
        edges,
        highlightedNodeId: null,
        status: "not-found",
        title: `Value ${val} Not Found`,
        description: `Value ${val} was not found in the BST. No deletion performed.`,
        isFinal: true,
        codeLine: 1,
      });
      return null;
    }

    const { nodes, edges } = flattenBST(root);

    if (val < node.value) {
      frames.push({
        tree: cloneBST(root),
        nodes,
        edges,
        highlightedNodeId: node.id,
        status: "compare-left",
        title: `Search for Deletion: ${val} < ${node.value}`,
        description: `${val} < ${node.value}. Searching down the left branch.`,
        codeLine: 3,
      });
      node.left = deleteNode(node.left, val, node, true);
      return node;
    } else if (val > node.value) {
      frames.push({
        tree: cloneBST(root),
        nodes,
        edges,
        highlightedNodeId: node.id,
        status: "compare-right",
        title: `Search for Deletion: ${val} > ${node.value}`,
        description: `${val} > ${node.value}. Searching down the right branch.`,
        codeLine: 5,
      });
      node.right = deleteNode(node.right, val, node, false);
      return node;
    } else {
      // Node found!
      frames.push({
        tree: cloneBST(root),
        nodes,
        edges,
        highlightedNodeId: node.id,
        status: "target-found",
        title: `Target Node Located: ${val}`,
        description: `Found node ${val} to delete. Analyzing children cases.`,
        codeLine: 7,
      });

      // Case 1: Leaf node (no children)
      if (!node.left && !node.right) {
        frames.push({
          tree: cloneBST(root),
          nodes,
          edges,
          highlightedNodeId: node.id,
          status: "delete-leaf",
          title: `Case 1: Leaf Node Deletion`,
          description: `Node ${val} has no children. Removing it directly.`,
          codeLine: 9,
        });
        return null;
      }

      // Case 2: One child
      if (!node.left) {
        frames.push({
          tree: cloneBST(root),
          nodes,
          edges,
          highlightedNodeId: node.right.id,
          status: "replace-single-child",
          title: `Case 2: One Child (Right)`,
          description: `Node ${val} has only right child ${node.right.value}. Replacing ${val} with ${node.right.value}.`,
          codeLine: 11,
        });
        return node.right;
      }

      if (!node.right) {
        frames.push({
          tree: cloneBST(root),
          nodes,
          edges,
          highlightedNodeId: node.left.id,
          status: "replace-single-child",
          title: `Case 2: One Child (Left)`,
          description: `Node ${val} has only left child ${node.left.value}. Replacing ${val} with ${node.left.value}.`,
          codeLine: 13,
        });
        return node.left;
      }

      // Case 3: Two children -> find in-order successor (minimum in right subtree)
      let successorParent = node;
      let successor = node.right;
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      frames.push({
        tree: cloneBST(root),
        nodes,
        edges,
        highlightedNodeId: successor.id,
        status: "successor-found",
        title: `Case 3: In-Order Successor Found (${successor.value})`,
        description: `Node ${val} has two children. Smallest value in right subtree is ${successor.value}.`,
        codeLine: 15,
      });

      // Replace node's value with successor value
      node.value = successor.value;

      frames.push({
        tree: cloneBST(root),
        nodes,
        edges,
        highlightedNodeId: node.id,
        status: "successor-copied",
        title: `Replace Value with Successor`,
        description: `Copied successor value ${successor.value} into deleted node position. Now removing original successor.`,
        codeLine: 17,
      });

      // Delete the successor from right subtree
      if (successorParent === node) {
        node.right = successor.right;
      } else {
        successorParent.left = successor.right;
      }

      return node;
    }
  }

  const finalTree = deleteNode(root, value);
  layoutBST(finalTree);
  const finalLayout = flattenBST(finalTree);

  frames.push({
    tree: cloneBST(finalTree),
    nodes: finalLayout.nodes,
    edges: finalLayout.edges,
    highlightedNodeId: null,
    status: "delete-complete",
    title: `Deletion of ${value} Complete`,
    description: `Binary Search Tree structure and BST invariant preserved.`,
    isFinal: true,
    codeLine: 20,
  });

  return frames;
}

/**
 * Pre-configured sample BST trees for quick interactive demonstration
 */
export function getSampleTree(type = "balanced") {
  let values = [50, 30, 70, 20, 40, 60, 80];
  if (type === "skewed-right") {
    values = [20, 35, 50, 65, 80];
  } else if (type === "skewed-left") {
    values = [80, 65, 50, 35, 20];
  } else if (type === "simple") {
    values = [45, 25, 65, 15, 35, 75];
  }

  let root = null;
  for (const v of values) {
    if (!root) {
      root = new BSTNode(v);
    } else {
      let curr = root;
      while (true) {
        if (v < curr.value) {
          if (!curr.left) {
            curr.left = new BSTNode(v);
            break;
          }
          curr = curr.left;
        } else {
          if (!curr.right) {
            curr.right = new BSTNode(v);
            break;
          }
          curr = curr.right;
        }
      }
    }
  }

  layoutBST(root);
  return root;
}
