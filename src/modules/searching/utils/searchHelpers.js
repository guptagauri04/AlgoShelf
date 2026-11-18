export function generateRandomArray(size = 8, min = 5, max = 99) {
  const set = new Set();
  while (set.size < size) {
    const val = Math.floor(Math.random() * (max - min + 1)) + min;
    set.add(val);
  }
  return Array.from(set);
}

export function generateSortedArray(size = 8, min = 5, max = 99) {
  const set = new Set();
  while (set.size < size) {
    const val = Math.floor(Math.random() * (max - min + 1)) + min;
    set.add(val);
  }
  return Array.from(set).sort((a, b) => a - b);
}

export function parseTargetInput(input) {
  const trimmed = String(input ?? "").trim();
  if (trimmed === "") {
    return { value: null, error: "Please enter a target number to search for." };
  }
  const num = Number(trimmed);
  if (!Number.isFinite(num)) {
    return { value: null, error: "Target must be a valid number." };
  }
  return { value: num, error: null };
}

export function linearSearchSteps(array, target) {
  const steps = [];
  let comparisons = 0;
  const checkedIndices = [];

  // Frame 0: Initial Start
  steps.push({
    array: [...array],
    currentIndex: -1,
    checkedIndices: [],
    foundIndex: -1,
    target,
    comparisons: 0,
    currentLine: 0,
    status: "idle",
    message: {
      title: "Ready to Search",
      description: `Starting Linear Search for target value ${target} in an array of ${array.length} elements.`,
      insight:
        "Linear Search will examine elements from index 0 sequentially until it finds the target or reaches the end.",
    },
  });

  for (let i = 0; i < array.length; i++) {
    comparisons++;

    // Checking element i
    steps.push({
      array: [...array],
      currentIndex: i,
      checkedIndices: [...checkedIndices],
      foundIndex: -1,
      target,
      comparisons,
      currentLine: 2,
      status: "checking",
      message: {
        title: `Inspecting Index ${i}`,
        description: `Checking arr[${i}] = ${array[i]}. Is ${array[i]} equal to target ${target}?`,
        insight:
          "Linear Search evaluates one element at a time, moving strictly from left to right.",
      },
    });

    if (array[i] === target) {
      // Found element
      steps.push({
        array: [...array],
        currentIndex: i,
        checkedIndices: [...checkedIndices],
        foundIndex: i,
        target,
        comparisons,
        currentLine: 4,
        status: "found",
        message: {
          title: "Target Found!",
          description: `Success! arr[${i}] is equal to ${target}. Search completed in ${comparisons} ${
            comparisons === 1 ? "comparison" : "comparisons"
          }.`,
          insight:
            "Linear Search immediately returns the matching index and halts without inspecting remaining elements.",
        },
      });

      return steps;
    }

    checkedIndices.push(i);
  }

  // Not found
  steps.push({
    array: [...array],
    currentIndex: -1,
    checkedIndices: [...checkedIndices],
    foundIndex: -1,
    target,
    comparisons,
    currentLine: 5,
    status: "not_found",
    message: {
      title: "Target Not Found",
      description: `Examined all ${array.length} elements. Target ${target} does not exist in the array.`,
      insight:
        "When the target is not in the array, Linear Search must check every single item (worst-case O(n)).",
    },
  });

  return steps;
}

export function binarySearchSteps(array, target) {
  const steps = [];
  let comparisons = 0;
  let low = 0;
  let high = array.length - 1;

  // Frame 0: Initial Start
  steps.push({
    array: [...array],
    lowIndex: low,
    highIndex: high,
    midIndex: -1,
    currentIndex: -1,
    eliminatedIndices: [],
    foundIndex: -1,
    target,
    comparisons: 0,
    currentLine: 1,
    status: "idle",
    message: {
      title: "Ready for Binary Search",
      description: `Starting Binary Search for target value ${target} in a sorted array of ${array.length} elements. Low = 0, High = ${high}.`,
      insight:
        "Binary Search requires a sorted collection. It halves the search interval on every comparison.",
    },
  });

  const getEliminated = (l, h) => {
    const list = [];
    for (let i = 0; i < array.length; i++) {
      if (i < l || i > h) {
        list.push(i);
      }
    }
    return list;
  };

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;

    // Checking Mid
    steps.push({
      array: [...array],
      lowIndex: low,
      highIndex: high,
      midIndex: mid,
      currentIndex: mid,
      eliminatedIndices: getEliminated(low, high),
      foundIndex: -1,
      target,
      comparisons,
      currentLine: 3,
      status: "checking",
      message: {
        title: `Inspecting Mid at Index ${mid}`,
        description: `Calculated mid = floor((${low} + ${high}) / 2) = ${mid}. Comparing arr[${mid}] = ${array[mid]} with target ${target}.`,
        insight:
          "Binary Search examines the midpoint of the active boundary [low..high] to decide which half to eliminate.",
      },
    });

    if (array[mid] === target) {
      // Match found
      steps.push({
        array: [...array],
        lowIndex: low,
        highIndex: high,
        midIndex: mid,
        currentIndex: mid,
        eliminatedIndices: getEliminated(low, high),
        foundIndex: mid,
        target,
        comparisons,
        currentLine: 5,
        status: "found",
        message: {
          title: "Target Found!",
          description: `arr[${mid}] is equal to ${target}! Found target at index ${mid} in ${comparisons} ${
            comparisons === 1 ? "comparison" : "comparisons"
          }.`,
          insight:
            "Binary Search successfully located the target in O(log n) time without scanning unnecessary elements.",
        },
      });
      return steps;
    } else if (array[mid] < target) {
      // Eliminate left half
      const nextLow = mid + 1;
      steps.push({
        array: [...array],
        lowIndex: low,
        highIndex: high,
        midIndex: mid,
        currentIndex: mid,
        eliminatedIndices: getEliminated(low, high),
        foundIndex: -1,
        target,
        comparisons,
        currentLine: 7,
        status: "eliminating_left",
        message: {
          title: `arr[${mid}] (${array[mid]}) < Target (${target})`,
          description: `Since ${array[mid]} is smaller than target ${target}, the target must be in the right half. Eliminating indices ${low} to ${mid}. Setting low = ${nextLow}.`,
          insight:
            "All elements at or before index mid are strictly less than target and can be safely discarded.",
        },
      });
      low = nextLow;
    } else {
      // Eliminate right half
      const nextHigh = mid - 1;
      steps.push({
        array: [...array],
        lowIndex: low,
        highIndex: high,
        midIndex: mid,
        currentIndex: mid,
        eliminatedIndices: getEliminated(low, high),
        foundIndex: -1,
        target,
        comparisons,
        currentLine: 9,
        status: "eliminating_right",
        message: {
          title: `arr[${mid}] (${array[mid]}) > Target (${target})`,
          description: `Since ${array[mid]} is greater than target ${target}, the target must be in the left half. Eliminating indices ${mid} to ${high}. Setting high = ${nextHigh}.`,
          insight:
            "All elements at or after index mid are strictly greater than target and can be safely discarded.",
        },
      });
      high = nextHigh;
    }
  }

  // Not Found
  steps.push({
    array: [...array],
    lowIndex: low,
    highIndex: high,
    midIndex: -1,
    currentIndex: -1,
    eliminatedIndices: getEliminated(low, high),
    foundIndex: -1,
    target,
    comparisons,
    currentLine: 10,
    status: "not_found",
    message: {
      title: "Target Not Found",
      description: `Search window collapsed (low ${low} > high ${high}). Target ${target} does not exist in the sorted array.`,
      insight:
        `Binary Search definitively concludes target absence in only ${comparisons} comparisons (O(log n) efficiency).`,
    },
  });

  return steps;
}
