/**
 * Binary Search Tree (BST) operations and coordinate layout generator.
 */

export class TreeNode {
  constructor(value, id = null) {
    this.value = Number(value);
    this.id = id || `bst-${value}-${Math.random().toString(36).substring(2, 7)}`;
    this.left = null;
    this.right = null;
  }
}

// Deep copy tree
export function cloneTree(node) {
  if (!node) return null;
  const copy = new TreeNode(node.value, node.id);
  copy.left = cloneTree(node.left);
  copy.right = cloneTree(node.right);
  return copy;
}

// Default balanced sample BST
export function getInitialTree() {
  const root = new TreeNode(50, "bst-50");
  root.left = new TreeNode(30, "bst-30");
  root.right = new TreeNode(70, "bst-70");
  root.left.left = new TreeNode(20, "bst-20");
  root.left.right = new TreeNode(40, "bst-40");
  root.right.left = new TreeNode(60, "bst-60");
  root.right.right = new TreeNode(85, "bst-85");
  return root;
}

/**
 * Calculates 2D layout coordinates for rendering tree nodes on an SVG canvas.
 * Canvas dimensions: width = 800, height = 400
 */
export function calculateTreeLayout(root) {
  if (!root) return { nodes: [], edges: [] };

  const nodes = [];
  const edges = [];

  function traverse(node, depth, xMin, xMax) {
    if (!node) return;

    const x = (xMin + xMax) / 2;
    const y = 60 + depth * 75;

    nodes.push({
      id: node.id,
      value: node.value,
      x,
      y,
      hasLeft: !!node.left,
      hasRight: !!node.right,
    });

    if (node.left) {
      const childX = (xMin + x) / 2;
      const childY = 60 + (depth + 1) * 75;
      edges.push({
        id: `${node.id}->${node.left.id}`,
        fromX: x,
        fromY: y,
        toX: childX,
        toY: childY,
        side: "left",
      });
      traverse(node.left, depth + 1, xMin, x);
    }

    if (node.right) {
      const childX = (x + xMax) / 2;
      const childY = 60 + (depth + 1) * 75;
      edges.push({
        id: `${node.id}->${node.right.id}`,
        fromX: x,
        fromY: y,
        toX: childX,
        toY: childY,
        side: "right",
      });
      traverse(node.right, depth + 1, x, xMax);
    }
  }

  traverse(root, 0, 0, 800);
  return { nodes, edges };
}

/**
 * Generate step-by-step frames for BST Search
 */
export function generateSearchSteps(root, target) {
  const steps = [];
  const numTarget = Number(target);

  if (!root) {
    steps.push({
      title: "Search Terminated",
      explanation: "The tree is empty. Target was not found.",
      code: "if (root == nullptr) return false;",
      treeSnapshot: null,
      highlightedId: null,
      foundId: null,
      comparison: null,
      timeComplexity: "O(1)",
    });
    return steps;
  }

  let curr = root;

  while (curr !== null) {
    if (curr.value === numTarget) {
      steps.push({
        title: `Target Found: ${numTarget}`,
        explanation: `Comparing target ${numTarget} with node ${curr.value}. Values match! Target located in the BST.`,
        code: `if (val == current->val) return true; // Found!`,
        treeSnapshot: cloneTree(root),
        highlightedId: curr.id,
        foundId: curr.id,
        comparison: "equal",
        timeComplexity: "O(log n)",
      });
      return steps;
    }

    if (numTarget < curr.value) {
      steps.push({
        title: `Compare with Node ${curr.value}`,
        explanation: `Target (${numTarget}) < Node (${curr.value}). By BST property, search left subtree.`,
        code: `if (val < current->val) current = current->left;`,
        treeSnapshot: cloneTree(root),
        highlightedId: curr.id,
        foundId: null,
        comparison: "left",
        timeComplexity: "O(log n)",
      });
      curr = curr.left;
    } else {
      steps.push({
        title: `Compare with Node ${curr.value}`,
        explanation: `Target (${numTarget}) > Node (${curr.value}). By BST property, search right subtree.`,
        code: `if (val > current->val) current = current->right;`,
        treeSnapshot: cloneTree(root),
        highlightedId: curr.id,
        foundId: null,
        comparison: "right",
        timeComplexity: "O(log n)",
      });
      curr = curr.right;
    }
  }

  steps.push({
    title: `Target ${numTarget} Not Found`,
    explanation: `Reached a NULL pointer without finding ${numTarget}. The target does not exist in this tree.`,
    code: `return false; // Reached nullptr`,
    treeSnapshot: cloneTree(root),
    highlightedId: null,
    foundId: null,
    comparison: "not_found",
    timeComplexity: "O(log n)",
  });

  return steps;
}

/**
 * Generate step-by-step frames for BST Insert
 */
export function generateInsertSteps(root, value) {
  const steps = [];
  const numVal = Number(value);
  const newNode = new TreeNode(numVal);

  if (!root) {
    steps.push({
      title: `Insert at Root`,
      explanation: `Tree was empty. Created node ${numVal} as the new root of the tree.`,
      code: `root = new TreeNode(${numVal});`,
      treeSnapshot: newNode,
      highlightedId: newNode.id,
      foundId: newNode.id,
      comparison: "insert",
      timeComplexity: "O(1)",
    });
    return steps;
  }

  const workingTree = cloneTree(root);
  let curr = workingTree;

  while (curr !== null) {
    if (curr.value === numVal) {
      steps.push({
        title: `Duplicate Key: ${numVal}`,
        explanation: `Node with value ${numVal} already exists. Standard BSTs do not allow duplicate keys.`,
        code: `if (val == current->val) return; // Duplicates ignored`,
        treeSnapshot: cloneTree(workingTree),
        highlightedId: curr.id,
        foundId: null,
        comparison: "duplicate",
        timeComplexity: "O(log n)",
      });
      return steps;
    }

    if (numVal < curr.value) {
      steps.push({
        title: `Compare with Node ${curr.value}`,
        explanation: `Value (${numVal}) < Node (${curr.value}). Navigate into left branch.`,
        code: `if (val < current->val) current = current->left;`,
        treeSnapshot: cloneTree(workingTree),
        highlightedId: curr.id,
        foundId: null,
        comparison: "left",
        timeComplexity: "O(log n)",
      });

      if (!curr.left) {
        curr.left = newNode;
        steps.push({
          title: `Attach New Node ${numVal}`,
          explanation: `Found empty slot at left child of node ${curr.value}. Attached node ${numVal} as left child.`,
          code: `current->left = new TreeNode(${numVal});`,
          treeSnapshot: cloneTree(workingTree),
          highlightedId: newNode.id,
          foundId: newNode.id,
          comparison: "inserted",
          timeComplexity: "O(log n)",
        });
        return steps;
      }
      curr = curr.left;
    } else {
      steps.push({
        title: `Compare with Node ${curr.value}`,
        explanation: `Value (${numVal}) > Node (${curr.value}). Navigate into right branch.`,
        code: `if (val > current->val) current = current->right;`,
        treeSnapshot: cloneTree(workingTree),
        highlightedId: curr.id,
        foundId: null,
        comparison: "right",
        timeComplexity: "O(log n)",
      });

      if (!curr.right) {
        curr.right = newNode;
        steps.push({
          title: `Attach New Node ${numVal}`,
          explanation: `Found empty slot at right child of node ${curr.value}. Attached node ${numVal} as right child.`,
          code: `current->right = new TreeNode(${numVal});`,
          treeSnapshot: cloneTree(workingTree),
          highlightedId: newNode.id,
          foundId: newNode.id,
          comparison: "inserted",
          timeComplexity: "O(log n)",
        });
        return steps;
      }
      curr = curr.right;
    }
  }

  return steps;
}

/**
 * Generate step-by-step frames for BST Delete
 */
export function generateDeleteSteps(root, value) {
  const steps = [];
  const numVal = Number(value);

  if (!root) {
    steps.push({
      title: "Tree is Empty",
      explanation: "Cannot delete from an empty tree.",
      code: "// Tree is empty",
      treeSnapshot: null,
      highlightedId: null,
      foundId: null,
      comparison: null,
      timeComplexity: "O(1)",
    });
    return steps;
  }

  const workingTree = cloneTree(root);

  function findMin(node) {
    let curr = node;
    while (curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  function deleteNode(node, val) {
    if (!node) return null;

    if (val < node.value) {
      steps.push({
        title: `Search for Node ${val}`,
        explanation: `${val} < ${node.value}. Traversing left subtree.`,
        code: "root->left = deleteNode(root->left, val);",
        treeSnapshot: cloneTree(workingTree),
        highlightedId: node.id,
        foundId: null,
        comparison: "left",
        timeComplexity: "O(log n)",
      });
      node.left = deleteNode(node.left, val);
      return node;
    } else if (val > node.value) {
      steps.push({
        title: `Search for Node ${val}`,
        explanation: `${val} > ${node.value}. Traversing right subtree.`,
        code: "root->right = deleteNode(root->right, val);",
        treeSnapshot: cloneTree(workingTree),
        highlightedId: node.id,
        foundId: null,
        comparison: "right",
        timeComplexity: "O(log n)",
      });
      node.right = deleteNode(node.right, val);
      return node;
    } else {
      // Node found!
      // Case 1: Leaf node
      if (!node.left && !node.right) {
        steps.push({
          title: `Delete Leaf Node ${val}`,
          explanation: `Node ${val} has no children. It is simply removed from the tree.`,
          code: "delete root;\nreturn nullptr;",
          treeSnapshot: cloneTree(workingTree),
          highlightedId: node.id,
          foundId: node.id,
          comparison: "delete",
          timeComplexity: "O(log n)",
        });
        return null;
      }

      // Case 2: One child
      if (!node.left) {
        steps.push({
          title: `Replace with Right Child`,
          explanation: `Node ${val} has only a right child (${node.right.value}). The child replaces this node.`,
          code: "TreeNode* temp = root->right;\ndelete root;\nreturn temp;",
          treeSnapshot: cloneTree(workingTree),
          highlightedId: node.id,
          foundId: node.id,
          comparison: "delete",
          timeComplexity: "O(log n)",
        });
        return node.right;
      } else if (!node.right) {
        steps.push({
          title: `Replace with Left Child`,
          explanation: `Node ${val} has only a left child (${node.left.value}). The child replaces this node.`,
          code: "TreeNode* temp = root->left;\ndelete root;\nreturn temp;",
          treeSnapshot: cloneTree(workingTree),
          highlightedId: node.id,
          foundId: node.id,
          comparison: "delete",
          timeComplexity: "O(log n)",
        });
        return node.left;
      }

      // Case 3: Two children (inorder successor)
      const successor = findMin(node.right);
      steps.push({
        title: `Two Children: Find Inorder Successor`,
        explanation: `Node ${val} has two children. Finding minimum value in right subtree: ${successor.value}.`,
        code: `TreeNode* temp = findMin(root->right);\nroot->val = temp->val;`,
        treeSnapshot: cloneTree(workingTree),
        highlightedId: successor.id,
        foundId: node.id,
        comparison: "successor",
        timeComplexity: "O(log n)",
      });

      node.value = successor.value;
      node.right = deleteNode(node.right, successor.value);
      return node;
    }
  }

  const finalTree = deleteNode(workingTree, numVal);
  steps.push({
    title: `Deletion Complete`,
    explanation: `Successfully removed ${numVal} from the Binary Search Tree while preserving the BST invariant.`,
    code: "// Deletion completed and tree invariants preserved",
    treeSnapshot: cloneTree(finalTree),
    highlightedId: null,
    foundId: null,
    comparison: "complete",
    timeComplexity: "O(log n)",
  });

  return steps;
}
