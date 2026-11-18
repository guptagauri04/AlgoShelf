/**
 * Singly Linked List step generator for interactive visualizer.
 * Generates frame-by-frame execution steps for insertion and deletion operations.
 */

let nextNodeId = 100;
export const createNode = (value) => ({
  id: `node-${++nextNodeId}-${Date.now().toString(36)}`,
  value: Number(value),
});

export const getInitialList = () => [
  { id: "node-1", value: 12 },
  { id: "node-2", value: 25 },
  { id: "node-3", value: 40 },
  { id: "node-4", value: 68 },
];

/**
 * Generate animation steps for Insert at Beginning (Head)
 */
export function generateInsertHeadSteps(currentList, value) {
  const steps = [];
  const newNode = createNode(value);

  // Step 1: Allocate new node
  steps.push({
    title: "1. Allocate New Node",
    explanation: `Created a new node in memory with value ${value}. Its next pointer currently points to NULL.`,
    code: `ListNode* newNode = new ListNode(${value});\nnewNode->next = nullptr;`,
    nodes: currentList.map((n) => ({ ...n })),
    newNode: { ...newNode },
    headIndex: currentList.length > 0 ? 0 : null,
    highlightedIndex: null,
    targetIndex: null,
    action: "allocate",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
  });

  if (currentList.length === 0) {
    // Empty list scenario
    steps.push({
      title: "2. Set As Head",
      explanation: "List was empty, so the new node immediately becomes the HEAD of the list.",
      code: "head = newNode;",
      nodes: [{ ...newNode }],
      newNode: null,
      headIndex: 0,
      highlightedIndex: 0,
      targetIndex: null,
      action: "complete",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
    });
    return steps;
  }

  // Step 2: Point newNode.next to current head
  steps.push({
    title: "2. Connect New Node to Current Head",
    explanation: `Set newNode->next = head. The new node now links directly to the current head (${currentList[0].value}).`,
    code: "newNode->next = head;",
    nodes: currentList.map((n) => ({ ...n })),
    newNode: { ...newNode, pointsToHead: true },
    headIndex: 0,
    highlightedIndex: 0,
    targetIndex: null,
    action: "link",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
  });

  // Step 3: Update head pointer
  const finalList = [{ ...newNode }, ...currentList.map((n) => ({ ...n }))];
  steps.push({
    title: "3. Update HEAD Pointer",
    explanation: `Updated the HEAD pointer to point to newNode. Node ${value} is now the first node. Operation complete!`,
    code: "head = newNode;",
    nodes: finalList,
    newNode: null,
    headIndex: 0,
    highlightedIndex: 0,
    targetIndex: null,
    action: "complete",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
  });

  return steps;
}

/**
 * Generate animation steps for Insert at End (Tail)
 */
export function generateInsertTailSteps(currentList, value) {
  const steps = [];
  const newNode = createNode(value);

  // If empty, same as insert head
  if (currentList.length === 0) {
    return generateInsertHeadSteps(currentList, value);
  }

  // Step 1: Allocate
  steps.push({
    title: "1. Allocate New Node",
    explanation: `Created a new node with value ${value}. To insert at the end, we must first traverse to the last node.`,
    code: `ListNode* newNode = new ListNode(${value});`,
    nodes: currentList.map((n) => ({ ...n })),
    newNode: { ...newNode },
    headIndex: 0,
    highlightedIndex: null,
    targetIndex: null,
    action: "allocate",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  });

  // Traversal steps
  for (let i = 0; i < currentList.length; i++) {
    const isLast = i === currentList.length - 1;
    steps.push({
      title: isLast ? "2. Reached Last Node" : `2. Traversing List (Step ${i + 1})`,
      explanation: isLast
        ? `Node ${currentList[i].value} at index ${i} has next == NULL. This is the tail of the list.`
        : `Inspecting node ${currentList[i].value} at index ${i}. Since current->next != NULL, advance pointer.`,
      code: isLast ? "// current->next is nullptr" : "current = current->next;",
      nodes: currentList.map((n) => ({ ...n })),
      newNode: { ...newNode },
      headIndex: 0,
      highlightedIndex: i,
      targetIndex: null,
      action: isLast ? "found-tail" : "traverse",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    });
  }

  // Step 3: Link tail to newNode
  const finalList = [...currentList.map((n) => ({ ...n })), { ...newNode }];
  steps.push({
    title: "3. Connect Tail to New Node",
    explanation: `Set current->next = newNode. Node ${currentList[currentList.length - 1].value} now points to ${value}. Node ${value} points to NULL.`,
    code: "current->next = newNode;",
    nodes: finalList,
    newNode: null,
    headIndex: 0,
    highlightedIndex: finalList.length - 1,
    targetIndex: null,
    action: "complete",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  });

  return steps;
}

/**
 * Generate animation steps for Insert at Specific Position
 */
export function generateInsertAtPositionSteps(currentList, value, index) {
  if (index === 0) {
    return generateInsertHeadSteps(currentList, value);
  }
  if (index >= currentList.length) {
    return generateInsertTailSteps(currentList, value);
  }

  const steps = [];
  const newNode = createNode(value);

  // Step 1: Allocate
  steps.push({
    title: "1. Allocate New Node",
    explanation: `Created new node with value ${value}. To insert at index ${index}, traverse to index ${index - 1}.`,
    code: `ListNode* newNode = new ListNode(${value});`,
    nodes: currentList.map((n) => ({ ...n })),
    newNode: { ...newNode },
    headIndex: 0,
    highlightedIndex: null,
    targetIndex: index,
    action: "allocate",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  });

  // Step 2: Traverse to index - 1
  for (let i = 0; i < index; i++) {
    const isPrev = i === index - 1;
    steps.push({
      title: isPrev ? "2. Found Predecessor Node (prev)" : `2. Traversing (Node ${i})`,
      explanation: isPrev
        ? `Node ${currentList[i].value} is at index ${i} (immediately before insertion index ${index}). We pause here.`
        : `Moving current pointer through node ${currentList[i].value}.`,
      code: isPrev ? "// prev node identified" : "prev = prev->next;",
      nodes: currentList.map((n) => ({ ...n })),
      newNode: { ...newNode },
      headIndex: 0,
      highlightedIndex: i,
      targetIndex: index,
      action: isPrev ? "found-prev" : "traverse",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    });
  }

  // Step 3: Link newNode.next = prev.next
  steps.push({
    title: "3. Link New Node to Successor",
    explanation: `Set newNode->next = prev->next. New node now points to node ${currentList[index].value} at index ${index}.`,
    code: "newNode->next = prev->next;",
    nodes: currentList.map((n) => ({ ...n })),
    newNode: { ...newNode, pointsToSuccessor: true, successorValue: currentList[index].value },
    headIndex: 0,
    highlightedIndex: index - 1,
    targetIndex: index,
    action: "link-successor",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  });

  // Step 4: Rewire prev.next = newNode
  const finalList = [
    ...currentList.slice(0, index).map((n) => ({ ...n })),
    { ...newNode },
    ...currentList.slice(index).map((n) => ({ ...n })),
  ];

  steps.push({
    title: "4. Rewire Predecessor to New Node",
    explanation: `Set prev->next = newNode. Predecessor node ${currentList[index - 1].value} now points to ${value}. Insertion complete!`,
    code: "prev->next = newNode;",
    nodes: finalList,
    newNode: null,
    headIndex: 0,
    highlightedIndex: index,
    targetIndex: null,
    action: "complete",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  });

  return steps;
}

/**
 * Generate animation steps for Delete from Beginning (Head)
 */
export function generateDeleteHeadSteps(currentList) {
  const steps = [];

  if (currentList.length === 0) {
    steps.push({
      title: "Error: List is Empty",
      explanation: "Cannot delete from an empty linked list (Underflow).",
      code: "if (head == nullptr) return;",
      nodes: [],
      newNode: null,
      headIndex: null,
      highlightedIndex: null,
      targetIndex: null,
      action: "error",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
    });
    return steps;
  }

  // Step 1: Identify current head
  steps.push({
    title: "1. Identify Head Node",
    explanation: `Targeting HEAD node (${currentList[0].value}) for deletion. Store temporary pointer temp = head.`,
    code: "ListNode* temp = head;",
    nodes: currentList.map((n) => ({ ...n })),
    newNode: null,
    headIndex: 0,
    highlightedIndex: 0,
    targetIndex: 0,
    action: "mark-delete",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
  });

  // Step 2: Advance head pointer
  const finalList = currentList.slice(1).map((n) => ({ ...n }));
  steps.push({
    title: "2. Advance HEAD Pointer",
    explanation: finalList.length > 0
      ? `Set head = head->next. Node ${finalList[0].value} is now the new HEAD.`
      : "Set head = head->next (nullptr). The list is now empty.",
    code: "head = head->next;\ndelete temp;",
    nodes: finalList,
    newNode: null,
    headIndex: finalList.length > 0 ? 0 : null,
    highlightedIndex: null,
    targetIndex: null,
    action: "complete",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
  });

  return steps;
}

/**
 * Generate animation steps for Delete from End (Tail)
 */
export function generateDeleteTailSteps(currentList) {
  if (currentList.length <= 1) {
    return generateDeleteHeadSteps(currentList);
  }

  const steps = [];

  // Step 1: Traverse to second-to-last node
  for (let i = 0; i < currentList.length - 1; i++) {
    const isSecondLast = i === currentList.length - 2;
    steps.push({
      title: isSecondLast ? "1. Found Second-to-Last Node" : `1. Traversing (Node ${i})`,
      explanation: isSecondLast
        ? `Node ${currentList[i].value} at index ${i} is the node right before the tail (prev).`
        : `Traversing through node ${currentList[i].value} to reach the second-to-last node.`,
      code: isSecondLast ? "// prev->next->next == nullptr" : "prev = prev->next;",
      nodes: currentList.map((n) => ({ ...n })),
      newNode: null,
      headIndex: 0,
      highlightedIndex: i,
      targetIndex: currentList.length - 1,
      action: isSecondLast ? "found-prev" : "traverse",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    });
  }

  // Step 2: Mark tail for deletion
  steps.push({
    title: "2. Target Tail Node",
    explanation: `Targeting tail node (${currentList[currentList.length - 1].value}) at index ${currentList.length - 1} for deletion.`,
    code: "ListNode* temp = prev->next;",
    nodes: currentList.map((n) => ({ ...n })),
    newNode: null,
    headIndex: 0,
    highlightedIndex: currentList.length - 1,
    targetIndex: currentList.length - 1,
    action: "mark-delete",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  });

  // Step 3: Sever link and delete
  const finalList = currentList.slice(0, currentList.length - 1).map((n) => ({ ...n }));
  steps.push({
    title: "3. Sever Tail Link",
    explanation: `Set prev->next = nullptr. Node ${finalList[finalList.length - 1].value} is now the new tail. Deletion complete!`,
    code: "prev->next = nullptr;\ndelete temp;",
    nodes: finalList,
    newNode: null,
    headIndex: 0,
    highlightedIndex: finalList.length - 1,
    targetIndex: null,
    action: "complete",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  });

  return steps;
}

/**
 * Generate animation steps for Delete from Specific Position
 */
export function generateDeleteAtPositionSteps(currentList, index) {
  if (index === 0) {
    return generateDeleteHeadSteps(currentList);
  }
  if (index >= currentList.length - 1) {
    return generateDeleteTailSteps(currentList);
  }

  const steps = [];

  // Step 1: Traverse to index - 1
  for (let i = 0; i < index; i++) {
    const isPrev = i === index - 1;
    steps.push({
      title: isPrev ? "1. Found Predecessor Node (prev)" : `1. Traversing (Node ${i})`,
      explanation: isPrev
        ? `Node ${currentList[i].value} at index ${i} is immediately before node to delete.`
        : `Moving pointer forward towards target index ${index}.`,
      code: isPrev ? "// prev identified at index - 1" : "prev = prev->next;",
      nodes: currentList.map((n) => ({ ...n })),
      newNode: null,
      headIndex: 0,
      highlightedIndex: i,
      targetIndex: index,
      action: isPrev ? "found-prev" : "traverse",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    });
  }

  // Step 2: Mark node at index for deletion
  steps.push({
    title: `2. Target Node at Index ${index}`,
    explanation: `Identify node ${currentList[index].value} as temp = prev->next. It will be removed from the chain.`,
    code: "ListNode* temp = prev->next;",
    nodes: currentList.map((n) => ({ ...n })),
    newNode: null,
    headIndex: 0,
    highlightedIndex: index,
    targetIndex: index,
    action: "mark-delete",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  });

  // Step 3: Bypass and delete
  const finalList = [
    ...currentList.slice(0, index).map((n) => ({ ...n })),
    ...currentList.slice(index + 1).map((n) => ({ ...n })),
  ];

  steps.push({
    title: "3. Bypass Target Node",
    explanation: `Set prev->next = temp->next. Node ${currentList[index - 1].value} now skips ${currentList[index].value} and points to ${currentList[index + 1].value}. Free temp memory. Deletion complete!`,
    code: "prev->next = temp->next;\ndelete temp;",
    nodes: finalList,
    newNode: null,
    headIndex: 0,
    highlightedIndex: index - 1,
    targetIndex: null,
    action: "complete",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  });

  return steps;
}
