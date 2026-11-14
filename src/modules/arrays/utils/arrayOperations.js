export function parseArrayInput(input) {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    return { values: [], error: null };
  }

  const tokens = trimmedInput.split(",");
  const values = [];

  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index].trim();

    if (!token || !Number.isFinite(Number(token))) {
      return {
        values: null,
        error: `Value ${index + 1} is not a valid number. Enter numbers separated by commas.`,
      };
    }

    values.push(Number(token));
  }

  return { values, error: null };
}

export function parseIndexInput(input, maximumIndex, operation) {
  const label = operation === "insert" ? "insertion" : "deletion";

  if (!input.trim()) {
    return { index: null, error: `Enter an index for ${label}.` };
  }

  const index = Number(input);

  if (!Number.isInteger(index)) {
    return { index: null, error: "Index must be a whole number." };
  }

  if (index < 0) {
    return { index: null, error: "Index cannot be negative." };
  }

  if (index > maximumIndex) {
    const validRange =
      operation === "insert"
        ? `0 to ${maximumIndex}`
        : maximumIndex < 0
          ? "no valid indices because the array is empty"
          : `0 to ${maximumIndex}`;

    return {
      index: null,
      error:
        operation === "delete" && maximumIndex < 0
          ? "Cannot delete from an empty array."
          : `Index is out of range. Use an index from ${validRange}.`,
    };
  }

  return { index, error: null };
}

function assertValidIndex(index, maximumIndex, operation) {
  if (!Number.isInteger(index) || index < 0 || index > maximumIndex) {
    throw new RangeError(`Invalid ${operation} index: ${index}.`);
  }
}

export function createInsertionSteps(items, value, index, itemId) {
  assertValidIndex(index, items.length, "insertion");

  if (!Number.isFinite(value)) {
    throw new TypeError("The inserted value must be a finite number.");
  }

  const steps = [
    {
      items: [...items],
      title: "Ready to insert",
      description: `Make room for ${value} at index ${index}.`,
      highlightedId: null,
    },
  ];
  const slots = [...items, null];

  for (let position = items.length - 1; position >= index; position--) {
    const shiftedItem = slots[position];
    slots[position + 1] = shiftedItem;
    slots[position] = null;

    steps.push({
      items: [...slots],
      title: "Shift right",
      description: `${shiftedItem.value} moves from index ${position} to index ${position + 1}.`,
      highlightedId: null,
    });
  }

  const insertedItem = { id: itemId, value };
  slots[index] = insertedItem;
  steps.push({
    items: [...slots],
    title: "Insertion complete",
    description: `${value} is now at index ${index}. The array contains ${items.length + 1} elements.`,
    highlightedId: itemId,
    isFinal: true,
  });

  return steps;
}

export function createDeletionSteps(items, index) {
  assertValidIndex(index, items.length - 1, "deletion");

  const deletedItem = items[index];
  const steps = [
    {
      items: [...items],
      title: "Select element",
      description: `Select ${deletedItem.value} at index ${index} for deletion.`,
      highlightedId: deletedItem.id,
    },
  ];
  const slots = [...items];
  slots[index] = null;

  steps.push({
    items: [...slots],
    title: "Remove element",
    description: `${deletedItem.value} is removed from index ${index}; the following elements will fill the gap.`,
    highlightedId: null,
  });

  for (let position = index + 1; position < items.length; position++) {
    const shiftedItem = slots[position];
    slots[position - 1] = shiftedItem;
    slots[position] = null;

    steps.push({
      items: [...slots],
      title: "Shift left",
      description: `${shiftedItem.value} moves from index ${position} to index ${position - 1}.`,
      highlightedId: null,
    });
  }

  const finalItems = slots.slice(0, -1);
  steps.push({
    items: finalItems,
    title: "Deletion complete",
    description: `${deletedItem.value} has been deleted. The array now contains ${finalItems.length} elements.`,
    highlightedId: null,
    isFinal: true,
  });

  return steps;
}

export function generateSampleArray() {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 41) - 10);
}
