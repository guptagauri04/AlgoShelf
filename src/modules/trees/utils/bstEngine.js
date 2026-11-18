/**
 * BST Data Structure and Step Generation Engine
 */

export class BSTNode {
  constructor(value, id = null) {
    this.value = value;
    this.id = id || `node-${value}-${Math.random().toString(36).substr(2, 6)}`;
    this.left = null;
    this.right = null;
  }
}

/**
 * Deep clone tree structure
 */
export function cloneTree(root) {
  if (!root) return null;
  const newNode = new BSTNode(root.value, root.id);
  newNode.left = cloneTree(root.left);
  newNode.right = cloneTree(root.right);
  return newNode;
}

/**
 * Build initial tree from array of numbers
 */
export function buildBST(values) {
  let root = null;
  for (const val of values) {
    root = insertRaw(root, val);
  }
  return root;
}

function insertRaw(node, val) {
  if (!node) return new BSTNode(val);
  if (val < node.value) {
    node.left = insertRaw(node.left, val);
  } else if (val > node.value) {
    node.right = insertRaw(node.right, val);
  }
  return node;
}

/**
 * Compute tree coordinates for SVG layout
 */
export function computeTreeLayout(root, width = 640, height = 360) {
  if (!root) return { nodes: [], edges: [] };

  const nodes = [];
  const edges = [];

  // Determine tree depth to scale vertical spacing
  function getDepth(node) {
    if (!node) return 0;
    return 1 + Math.max(getDepth(node.left), getDepth(node.right));
  }

  const depth = getDepth(root);
  const verticalSpacing = Math.min(65, Math.floor((height - 80) / Math.max(depth, 1)));

  function traverse(node, x, y, spread) {
    if (!node) return;

    nodes.push({
      id: node.id,
      value: node.value,
      x,
      y,
    });

    const nextSpread = Math.max(28, spread * 0.52);

    if (node.left) {
      const childX = x - spread;
      const childY = y + verticalSpacing;
      edges.push({
        from: node.id,
        to: node.left.id,
        fromX: x,
        fromY: y,
        toX: childX,
        toY: childY,
      });
      traverse(node.left, childX, childY, nextSpread);
    }

    if (node.right) {
      const childX = x + spread;
      const childY = y + verticalSpacing;
      edges.push({
        from: node.id,
        to: node.right.id,
        fromX: x,
        fromY: y,
        toX: childX,
        toY: childY,
      });
      traverse(node.right, childX, childY, nextSpread);
    }
  }

  traverse(root, width / 2, 45, width * 0.24);
  return { nodes, edges };
}

/**
 * Generate step-by-step search frames
 */
export function generateSearchSteps(root, target) {
  const steps = [];
  const visitedPath = [];

  if (!root) {
    steps.push({
      tree: null,
      currentNodeId: null,
      visitedPath: [],
      status: "not_found",
      explanation: `Tree is empty. Value ${target} does not exist in the BST.`,
    });
    return steps;
  }

  let curr = root;
  while (curr) {
    visitedPath.push(curr.id);

    if (curr.value === target) {
      steps.push({
        tree: cloneTree(root),
        currentNodeId: curr.id,
        visitedPath: [...visitedPath],
        status: "found",
        comparison: `${target} === ${curr.value}`,
        explanation: `Target value ${target} found at node (${curr.value})! Search completed successfully.`,
      });
      return steps;
    } else if (target < curr.value) {
      steps.push({
        tree: cloneTree(root),
        currentNodeId: curr.id,
        visitedPath: [...visitedPath],
        status: "searching",
        comparison: `${target} < ${curr.value}`,
        explanation: `${target} is less than ${curr.value}. Moving to left child.`,
      });
      curr = curr.left;
    } else {
      steps.push({
        tree: cloneTree(root),
        currentNodeId: curr.id,
        visitedPath: [...visitedPath],
        status: "searching",
        comparison: `${target} > ${curr.value}`,
        explanation: `${target} is greater than ${curr.value}. Moving to right child.`,
      });
      curr = curr.right;
    }
  }

  steps.push({
    tree: cloneTree(root),
    currentNodeId: null,
    visitedPath: [...visitedPath],
    status: "not_found",
    comparison: "null",
    explanation: `Reached null leaf branch. Target value ${target} does not exist in the BST.`,
  });

  return steps;
}

/**
 * Generate step-by-step insert frames
 */
export function generateInsertSteps(initialRoot, value) {
  const steps = [];
  const visitedPath = [];

  if (!initialRoot) {
    const newRoot = new BSTNode(value);
    steps.push({
      tree: cloneTree(newRoot),
      currentNodeId: newRoot.id,
      visitedPath: [newRoot.id],
      status: "inserted",
      explanation: `Tree was empty. Inserted ${value} as the root node.`,
    });
    return { steps, updatedRoot: newRoot };
  }

  const root = cloneTree(initialRoot);
  let curr = root;

  while (curr) {
    visitedPath.push(curr.id);

    if (curr.value === value) {
      steps.push({
        tree: cloneTree(root),
        currentNodeId: curr.id,
        visitedPath: [...visitedPath],
        status: "duplicate",
        comparison: `${value} === ${curr.value}`,
        explanation: `Value ${value} already exists in the BST! BST keys must be strictly unique.`,
      });
      return { steps, updatedRoot: root };
    } else if (value < curr.value) {
      if (!curr.left) {
        steps.push({
          tree: cloneTree(root),
          currentNodeId: curr.id,
          visitedPath: [...visitedPath],
          status: "searching",
          comparison: `${value} < ${curr.value}`,
          explanation: `${value} < ${curr.value}. Left child is empty; inserting new node here.`,
        });

        const newNode = new BSTNode(value);
        curr.left = newNode;
        visitedPath.push(newNode.id);

        steps.push({
          tree: cloneTree(root),
          currentNodeId: newNode.id,
          visitedPath: [...visitedPath],
          status: "inserted",
          comparison: "New Leaf Created",
          explanation: `Successfully inserted node with value ${value} as left child of ${curr.value}.`,
        });
        return { steps, updatedRoot: root };
      } else {
        steps.push({
          tree: cloneTree(root),
          currentNodeId: curr.id,
          visitedPath: [...visitedPath],
          status: "searching",
          comparison: `${value} < ${curr.value}`,
          explanation: `${value} is less than ${curr.value}. Navigating to left child.`,
        });
        curr = curr.left;
      }
    } else {
      if (!curr.right) {
        steps.push({
          tree: cloneTree(root),
          currentNodeId: curr.id,
          visitedPath: [...visitedPath],
          status: "searching",
          comparison: `${value} > ${curr.value}`,
          explanation: `${value} > ${curr.value}. Right child is empty; inserting new node here.`,
        });

        const newNode = new BSTNode(value);
        curr.right = newNode;
        visitedPath.push(newNode.id);

        steps.push({
          tree: cloneTree(root),
          currentNodeId: newNode.id,
          visitedPath: [...visitedPath],
          status: "inserted",
          comparison: "New Leaf Created",
          explanation: `Successfully inserted node with value ${value} as right child of ${curr.value}.`,
        });
        return { steps, updatedRoot: root };
      } else {
        steps.push({
          tree: cloneTree(root),
          currentNodeId: curr.id,
          visitedPath: [...visitedPath],
          status: "searching",
          comparison: `${value} > ${curr.value}`,
          explanation: `${value} is greater than ${curr.value}. Navigating to right child.`,
        });
        curr = curr.right;
      }
    }
  }

  return { steps, updatedRoot: root };
}

/**
 * Generate step-by-step deletion frames
 */
export function generateDeleteSteps(initialRoot, value) {
  const steps = [];
  const visitedPath = [];

  if (!initialRoot) {
    steps.push({
      tree: null,
      currentNodeId: null,
      visitedPath: [],
      status: "not_found",
      explanation: `Cannot delete: tree is empty.`,
    });
    return { steps, updatedRoot: null };
  }

  let root = cloneTree(initialRoot);

  function findMin(node) {
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }

  function deleteNode(node, val) {
    if (!node) {
      steps.push({
        tree: cloneTree(root),
        currentNodeId: null,
        visitedPath: [...visitedPath],
        status: "not_found",
        explanation: `Value ${val} not found in the BST. Deletion aborted.`,
      });
      return null;
    }

    visitedPath.push(node.id);

    if (val < node.value) {
      steps.push({
        tree: cloneTree(root),
        currentNodeId: node.id,
        visitedPath: [...visitedPath],
        status: "searching",
        comparison: `${val} < ${node.value}`,
        explanation: `${val} < ${node.value}. Searching in left subtree for node to delete.`,
      });
      node.left = deleteNode(node.left, val, node);
      return node;
    } else if (val > node.value) {
      steps.push({
        tree: cloneTree(root),
        currentNodeId: node.id,
        visitedPath: [...visitedPath],
        status: "searching",
        comparison: `${val} > ${node.value}`,
        explanation: `${val} > ${node.value}. Searching in right subtree for node to delete.`,
      });
      node.right = deleteNode(node.right, val, node);
      return node;
    } else {
      // Node located
      // Case 1: Leaf node (no children)
      if (!node.left && !node.right) {
        steps.push({
          tree: cloneTree(root),
          currentNodeId: node.id,
          visitedPath: [...visitedPath],
          status: "deleting",
          comparison: "Leaf Node",
          explanation: `Node (${node.value}) is a leaf with no children. Removing directly.`,
        });
        return null;
      }

      // Case 2: One child
      if (!node.left) {
        steps.push({
          tree: cloneTree(root),
          currentNodeId: node.id,
          visitedPath: [...visitedPath],
          status: "deleting",
          comparison: "Single Child (Right)",
          explanation: `Node (${node.value}) has only a right child (${node.right.value}). Replacing node with its right child.`,
        });
        return node.right;
      }
      if (!node.right) {
        steps.push({
          tree: cloneTree(root),
          currentNodeId: node.id,
          visitedPath: [...visitedPath],
          status: "deleting",
          comparison: "Single Child (Left)",
          explanation: `Node (${node.value}) has only a left child (${node.left.value}). Replacing node with its left child.`,
        });
        return node.left;
      }

      // Case 3: Two children
      const successor = findMin(node.right);
      steps.push({
        tree: cloneTree(root),
        currentNodeId: node.id,
        visitedPath: [...visitedPath],
        status: "deleting",
        comparison: "Two Children",
        explanation: `Node (${node.value}) has two children. Finding inorder successor (minimum in right subtree: ${successor.value}).`,
      });

      steps.push({
        tree: cloneTree(root),
        currentNodeId: successor.id,
        visitedPath: [...visitedPath, successor.id],
        status: "deleting",
        comparison: `Copy Successor (${successor.value})`,
        explanation: `Replacing value ${node.value} with inorder successor ${successor.value}, then recursively deleting successor from right subtree.`,
      });

      node.value = successor.value;
      node.right = deleteNode(node.right, successor.value, node);
      return node;
    }
  }

  root = deleteNode(root, value);

  steps.push({
    tree: cloneTree(root),
    currentNodeId: null,
    visitedPath: [],
    status: "completed",
    explanation: `Deletion of ${value} completed. Tree structure updated.`,
  });

  return { steps, updatedRoot: root };
}

/**
 * Calculate tree metrics
 */
export function getTreeMetrics(root) {
  if (!root) return { count: 0, height: 0, min: null, max: null };

  let count = 0;
  let min = root.value;
  let max = root.value;

  function traverse(node) {
    if (!node) return 0;
    count++;
    if (node.value < min) min = node.value;
    if (node.value > max) max = node.value;
    const lh = traverse(node.left);
    const rh = traverse(node.right);
    return 1 + Math.max(lh, rh);
  }

  const height = traverse(root);
  return { count, height, min, max };
}
