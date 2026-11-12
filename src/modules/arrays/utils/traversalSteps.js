const READY_MESSAGE = {
  title: "Ready",
  description: "Press Play to begin the traversal.",
  insight:
    "The visualization will point at each index, read the value stored there, and mark the element as visited.",
};

/**
 * Build the animation frames for a forward (left to right) traversal.
 *
 * Every element produces three frames so the process reads step by step:
 *   1. point at the index,
 *   2. read the value stored at that index,
 *   3. mark the element as visited and display index + value.
 *
 * Frame shape mirrors the sorting module's step frames.
 */
export function traversalSteps(array) {
  const steps = [
    {
      array: [...array],
      currentIndex: -1,
      visited: [],
      accesses: 0,
      currentLine: -1,
      message: READY_MESSAGE,
    },
  ];

  const visited = [];

  array.forEach((value, index) => {
    steps.push({
      array: [...array],
      currentIndex: index,
      visited: [...visited],
      accesses: index,
      currentLine: 1,
      message: {
        title: `Go to index ${index}`,
        description: `Move the pointer to position ${index} of the array.`,
        insight:
          `An index is simply the element's position counted from the left, starting at 0 — ` +
          `index ${index} is the ${index + 1}${ordinalSuffix(index + 1)} element.`,
      },
    });

    steps.push({
      array: [...array],
      currentIndex: index,
      visited: [...visited],
      accesses: index + 1,
      currentLine: 2,
      message: {
        title: `arr[${index}] = ${value}`,
        description: `Read the value stored at index ${index}: it is ${value}.`,
        insight:
          "Reading an element by its index takes O(1) — the memory address is computed " +
          "directly from the base address plus the index, so no element has to be scanned.",
      },
    });

    visited.push(index);

    steps.push({
      array: [...array],
      currentIndex: index,
      visited: [...visited],
      accesses: index + 1,
      currentLine: 3,
      message: {
        title: `Visited ${index + 1} of ${array.length}`,
        description: `Element ${value} at index ${index} has been visited and added to the traversal path.`,
        insight:
          `${visited.length} element${visited.length === 1 ? " has" : "s have"} been covered so far. ` +
          "Because the pass continues until every index has been visited, the whole traversal costs O(n) time.",
      },
    });
  });

  steps.push({
    array: [...array],
    currentIndex: -1,
    visited: [...visited],
    accesses: array.length,
    currentLine: -1,
    message: {
      title: "Traversal Complete",
      description: `All ${array.length} elements have been visited in order, from index 0 to index ${array.length - 1}.`,
      insight:
        "Each element was accessed exactly once, which is why a full traversal is always O(n) " +
        "with O(1) extra space — the only extra memory is the loop counter.",
    },
  });

  return steps;
}

function ordinalSuffix(number) {
  const lastTwo = number % 100;

  if (lastTwo >= 11 && lastTwo <= 13) return "th";

  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
