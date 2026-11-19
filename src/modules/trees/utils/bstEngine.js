let nextNodeId = 1;

export function createNode(value) {
  return {
    id: `node-${nextNodeId++}`,
    value,
    left: null,
    right: null,
    x: 0,
    y: 0,
    level: 0,
  };
}

export function cloneTree(node) {
  if (!node) return null;
  return {
    id: node.id,
    value: node.value,
    left: cloneTree(node.left),
    right: cloneTree(node.right),
    x: node.x,
    y: node.y,
    level: node.level,
  };
}

export function computeTreeLayout(root, width = 760, startY = 60) {
  if (!root) return null;

  const cloned = cloneTree(root);

  function assignPositions(node, depth, x, spread) {
    if (!node) return;
    node.level = depth;
    node.x = x;
    node.y = startY + depth * 70;

    const nextSpread = Math.max(spread / 2, 34);

    if (node.left) {
      assignPositions(node.left, depth + 1, x - spread, nextSpread);
    }
    if (node.right) {
      assignPositions(node.right, depth + 1, x + spread, nextSpread);
    }
  }

  assignPositions(cloned, 0, width / 2, width / 4);
  return cloned;
}

export function getTreeNodesList(root) {
  const nodes = [];
  function traverse(node) {
    if (!node) return;
    nodes.push(node);
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return nodes;
}

export function getTreeEdges(root) {
  const edges = [];
  function traverse(node) {
    if (!node) return;
    if (node.left) {
      edges.push({
        id: `edge-${node.id}-${node.left.id}`,
        fromId: node.id,
        toId: node.left.id,
        x1: node.x,
        y1: node.y,
        x2: node.left.x,
        y2: node.left.y,
      });
      traverse(node.left);
    }
    if (node.right) {
      edges.push({
        id: `edge-${node.id}-${node.right.id}`,
        fromId: node.id,
        toId: node.right.id,
        x1: node.x,
        y1: node.y,
        x2: node.right.x,
        y2: node.right.y,
      });
      traverse(node.right);
    }
  }
  traverse(root);
  return edges;
}

export function getTreeHeight(root) {
  if (!root) return 0;
  return 1 + Math.max(getTreeHeight(root.left), getTreeHeight(root.right));
}

export function countNodes(root) {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

export function createInitialTree() {
  const values = [50, 30, 70, 20, 40, 60, 80];
  let root = null;
  values.forEach((val) => {
    root = pureInsert(root, val);
  });
  return computeTreeLayout(root);
}

function pureInsert(node, value) {
  if (!node) return createNode(value);
  if (value < node.value) {
    node.left = pureInsert(node.left, value);
  } else if (value > node.value) {
    node.right = pureInsert(node.right, value);
  }
  return node;
}

export function insertBST(root, value) {
  const path = [];
  let foundDuplicate = false;

  function insertHelper(node) {
    if (!node) {
      const newNode = createNode(value);
      path.push({
        nodeId: newNode.id,
        value,
        type: "insert",
        text: `Attached new leaf node ${value}.`,
      });
      return newNode;
    }

    path.push({
      nodeId: node.id,
      value: node.value,
      type: "compare",
      text: `Comparing target ${value} with node ${node.value}.`,
    });

    if (value === node.value) {
      foundDuplicate = true;
      path.push({
        nodeId: node.id,
        value: node.value,
        type: "duplicate",
        text: `Value ${value} already exists in the BST! Duplicates are not allowed.`,
      });
      return node;
    }

    if (value < node.value) {
      path.push({
        nodeId: node.id,
        value: node.value,
        type: "branch-left",
        text: `${value} < ${node.value}: Traversed into the left subtree.`,
      });
      node.left = insertHelper(node.left);
    } else {
      path.push({
        nodeId: node.id,
        value: node.value,
        type: "branch-right",
        text: `${value} > ${node.value}: Traversed into the right subtree.`,
      });
      node.right = insertHelper(node.right);
    }

    return node;
  }

  const currentClone = cloneTree(root);
  const newTree = insertHelper(currentClone);

  if (foundDuplicate) {
    return {
      root,
      success: false,
      path,
      message: `Value ${value} already exists in the BST.`,
    };
  }

  const updatedLayout = computeTreeLayout(newTree);
  return {
    root: updatedLayout,
    success: true,
    path,
    message: `Successfully inserted ${value} into the BST.`,
  };
}

export function searchBST(root, value) {
  const path = [];
  let curr = root;
  let found = false;
  let targetId = null;

  while (curr) {
    path.push({
      nodeId: curr.id,
      value: curr.value,
      type: "compare",
      text: `Inspecting node ${curr.value}.`,
    });

    if (curr.value === value) {
      found = true;
      targetId = curr.id;
      path.push({
        nodeId: curr.id,
        value: curr.value,
        type: "found",
        text: `Match found! Value ${value} located at node ${curr.id}.`,
      });
      break;
    }

    if (value < curr.value) {
      path.push({
        nodeId: curr.id,
        value: curr.value,
        type: "branch-left",
        text: `${value} < ${curr.value}: Traversing left.`,
      });
      curr = curr.left;
    } else {
      path.push({
        nodeId: curr.id,
        value: curr.value,
        type: "branch-right",
        text: `${value} > ${curr.value}: Traversing right.`,
      });
      curr = curr.right;
    }
  }

  if (!found) {
    path.push({
      nodeId: null,
      value,
      type: "not-found",
      text: `Reached NULL pointer. Value ${value} is not present in the BST.`,
    });
  }

  return {
    found,
    targetId,
    path,
    message: found
      ? `Found ${value} in ${path.filter((p) => p.type === "compare").length} comparison(s).`
      : `Value ${value} was not found in the BST.`,
  };
}

export function deleteBST(root, value) {
  const path = [];
  let found = false;

  function findMin(node) {
    let curr = node;
    while (curr && curr.left) {
      curr = curr.left;
    }
    return curr;
  }

  function deleteHelper(node, val) {
    if (!node) {
      path.push({
        nodeId: null,
        value: val,
        type: "not-found",
        text: `Reached null. Target ${val} not found to delete.`,
      });
      return null;
    }

    path.push({
      nodeId: node.id,
      value: node.value,
      type: "compare",
      text: `Comparing target ${val} with node ${node.value}.`,
    });

    if (val < node.value) {
      node.left = deleteHelper(node.left, val);
      return node;
    }
    if (val > node.value) {
      node.right = deleteHelper(node.right, val);
      return node;
    }

    // Found node to delete
    found = true;

    // Case 1: Leaf node (no children)
    if (!node.left && !node.right) {
      path.push({
        nodeId: node.id,
        value: node.value,
        type: "deleted",
        text: `Node ${node.value} is a leaf node. Removed directly.`,
      });
      return null;
    }

    // Case 2: One child
    if (!node.left) {
      path.push({
        nodeId: node.id,
        value: node.value,
        type: "deleted",
        text: `Node ${node.value} has only right child (${node.right.value}). Splicing right child to parent.`,
      });
      return node.right;
    }
    if (!node.right) {
      path.push({
        nodeId: node.id,
        value: node.value,
        type: "deleted",
        text: `Node ${node.value} has only left child (${node.left.value}). Splicing left child to parent.`,
      });
      return node.left;
    }

    // Case 3: Two children
    const successor = findMin(node.right);
    path.push({
      nodeId: node.id,
      value: node.value,
      type: "successor",
      text: `Node ${node.value} has two children. Inorder successor is ${successor.value}. Replacing ${node.value} with ${successor.value} and deleting successor from right subtree.`,
    });

    node.value = successor.value;
    node.right = deleteHelper(node.right, successor.value);
    return node;
  }

  const currentClone = cloneTree(root);
  const newTree = deleteHelper(currentClone, value);

  if (!found) {
    return {
      root,
      success: false,
      path,
      message: `Value ${value} does not exist in the BST.`,
    };
  }

  const updatedLayout = computeTreeLayout(newTree);
  return {
    root: updatedLayout,
    success: true,
    path,
    message: `Successfully deleted node ${value} from the BST.`,
  };
}

export function getTraversals(root) {
  const inorder = [];
  const preorder = [];
  const postorder = [];

  function inHelper(node) {
    if (!node) return;
    inHelper(node.left);
    inorder.push({ id: node.id, value: node.value });
    inHelper(node.right);
  }

  function preHelper(node) {
    if (!node) return;
    preorder.push({ id: node.id, value: node.value });
    preHelper(node.left);
    preHelper(node.right);
  }

  function postHelper(node) {
    if (!node) return;
    postHelper(node.left);
    postHelper(node.right);
    postorder.push({ id: node.id, value: node.value });
  }

  inHelper(root);
  preHelper(root);
  postHelper(root);

  return { inorder, preorder, postorder };
}

export function generateTraversalSteps(root, type = "inorder") {
  if (!root) return [];
  const steps = [];
  const accumulated = [];

  if (type === "inorder") {
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      accumulated.push({
        id: node.id,
        value: node.value,
        order: accumulated.length + 1,
      });
      steps.push({
        activeId: node.id,
        activeValue: node.value,
        visitedIds: accumulated.map((a) => a.id),
        accumulator: [...accumulated],
        description: `Visited node ${node.value} (Left subtree completed; yielding ${node.value} to inorder array).`,
      });
      traverse(node.right);
    }
    traverse(root);
  } else if (type === "preorder") {
    function traverse(node) {
      if (!node) return;
      accumulated.push({
        id: node.id,
        value: node.value,
        order: accumulated.length + 1,
      });
      steps.push({
        activeId: node.id,
        activeValue: node.value,
        visitedIds: accumulated.map((a) => a.id),
        accumulator: [...accumulated],
        description: `Visited parent node ${node.value} before traversing left & right child subtrees.`,
      });
      traverse(node.left);
      traverse(node.right);
    }
    traverse(root);
  } else if (type === "postorder") {
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      accumulated.push({
        id: node.id,
        value: node.value,
        order: accumulated.length + 1,
      });
      steps.push({
        activeId: node.id,
        activeValue: node.value,
        visitedIds: accumulated.map((a) => a.id),
        accumulator: [...accumulated],
        description: `Both left & right subtrees traversed; now visiting and yielding node ${node.value}.`,
      });
    }
    traverse(root);
  }

  return steps;
}
