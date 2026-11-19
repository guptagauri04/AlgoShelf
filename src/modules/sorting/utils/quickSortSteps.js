export function quickSortSteps(inputArray, pivotStrategy = "last") {
  const array = [...inputArray];

  const steps = [];

  let comparisons = 0;
  let swaps = 0;
  let lastDepth = 1;

  const sorted = [];
  function recordStep({
    comparing = [],
    currentLine = -1,
    leftIndex = -1,
    rightIndex = -1,
    pivotIndex = -1,

    chosenPivotValue = null,
    chosenPivotOriginalIndex = -1,

    pass = 0,
    message,
  }) {
    lastDepth = pass;

    steps.push({
      array: [...array],
      comparing,
      sorted: [...sorted],
      comparisons,
      swaps,
      currentLine,

      currentPass: pass,

      leftIndex,
      rightIndex,
      pivotIndex,

      chosenPivotValue,
      chosenPivotOriginalIndex,

      message,
    });
  }

  quickSort(0, array.length - 1, 1);

  recordStep({
    pass: lastDepth,
    currentLine: 0,
    message: {
      title: "Sorting Complete",
      description:
        "Quick Sort has finished sorting the entire array.",
      insight:
        "Every pivot has reached its correct position, producing a fully sorted array.",
    },
  });

  return steps;

  function choosePivotIndex(low, high) {
    switch (pivotStrategy) {
      case "first":
        return low;

      case "middle":
        return Math.floor((low + high) / 2);

      case "random":
        return Math.floor(Math.random() * (high - low + 1)) + low;

      case "median3": {
        const mid = Math.floor((low + high) / 2);

        const candidates = [
          { index: low, value: array[low] },
          { index: mid, value: array[mid] },
          { index: high, value: array[high] },
        ];

        candidates.sort((a, b) => a.value - b.value);

        return candidates[1].index;
      }

      case "last":
      default:
        return high;
    }
  }

  function quickSort(low, high, depth) {
    if (low > high) return;

    if (low === high) {
      if (!sorted.includes(low)) sorted.push(low);

      recordStep({
        currentLine: 1,
        pass: depth,
        leftIndex: low,
        rightIndex: high,
        message: {
          title: "Single Element",
          description: `${array[low]} is already sorted.`,
          insight:
            "A subarray containing one element is already sorted by definition.",
        },
      });

      return;
    }

    recordStep({
      currentLine: 1,
      pass: depth,
      leftIndex: low,
      rightIndex: high,
      message: {
        title: "Recursive Call",
        description: `Sorting subarray from index ${low} to ${high}.`,
        insight:
          "Quick Sort recursively partitions smaller and smaller subarrays.",
      },
    });

    const pivot = partition(low, high, depth);

    if (!sorted.includes(pivot)) {
      sorted.push(pivot);
      sorted.sort((a, b) => a - b);
    }

    quickSort(low, pivot - 1, depth + 1);

    quickSort(pivot + 1, high, depth + 1);
  }

  function partition(low, high, depth) {
    const chosenPivot = choosePivotIndex(low, high);

    // Save the ORIGINAL pivot value before swapping
    const chosenPivotValue = array[chosenPivot];

    console.log({
      strategy: pivotStrategy,
      chosenPivot,
      high,
      chosenValue: chosenPivotValue,
      lastValue: array[high],
    });

    if (chosenPivot !== high) {
      [array[chosenPivot], array[high]] = [
        array[high],
        array[chosenPivot],
      ];

      swaps++;
    }

    const pivotValue = array[high];

    let i = low - 1;

    const strategyName = {
      last: "Last Element",
      first: "First Element",
      middle: "Middle Element",
      random: "Random",
      median3: "Median of Three",
    };

    recordStep({
      currentLine: 2,
      pass: depth,

      pivotIndex: high,

      chosenPivotValue: chosenPivotValue,
      chosenPivotOriginalIndex: chosenPivot,

      leftIndex: low,
      rightIndex: high,

      message: {
        title: "Choose Pivot",
        description: `${pivotValue} is selected as the pivot.`,
        insight: `Pivot strategy: ${strategyName[pivotStrategy]}.`,
      },
    });
    for (let j = low; j < high; j++) {
      comparisons++;

      recordStep({
        currentLine: 4,
        pass: depth,
        comparing: [j, high],
        leftIndex: i,
        rightIndex: j,
        pivotIndex: high,
        message: {
          title: "Compare With Pivot",
          description: `${array[j]} is compared with pivot ${pivotValue}.`,
          insight:
            "Elements smaller than the pivot move to the left partition.",
        },
      });

      if (array[j] < pivotValue) {
        i++;

        if (i !== j) {
          const left = array[i];
          const right = array[j];

          [array[i], array[j]] = [array[j], array[i]];

          swaps++;

          recordStep({
            currentLine: 6,
            pass: depth,
            comparing: [i, j],
            leftIndex: i,
            rightIndex: j,
            pivotIndex: high,
            message: {
              title: "Swap Into Left Partition",
              description: `${right} is moved before the pivot while ${left} moves right.`,
              insight:
                "Everything before index i is guaranteed to be smaller than the pivot.",
            },
          });
        } else {
          recordStep({
            currentLine: 6,
            pass: depth,
            comparing: [j],
            leftIndex: i,
            rightIndex: j,
            pivotIndex: high,
            message: {
              title: "Correct Side",
              description: `${array[j]} already belongs in the left partition.`,
              insight:
                "No swap is required because the element is already correctly positioned.",
            },
          });
        }
      } else {
        recordStep({
          currentLine: 4,
          pass: depth,
          comparing: [j, high],
          leftIndex: i,
          rightIndex: j,
          pivotIndex: high,
          message: {
            title: "Keep On Right",
            description: `${array[j]} remains to the right of the pivot.`,
            insight:
              "Values greater than or equal to the pivot stay in the right partition.",
          },
        });
      }
    }
    i++;

    [array[i], array[high]] = [array[high], array[i]];

    swaps++;

    recordStep({
      currentLine: 8,
      pass: depth,
      comparing: [i, high],
      leftIndex: i,
      rightIndex: high,
      pivotIndex: i,
      message: {
        title: "Place Pivot",
        description: `${pivotValue} is moved into its final sorted position.`,
        insight:
          "After partitioning, every element to the left of the pivot is smaller, and every element to the right is greater than or equal to it.",
      },
    });

    return i;
  }
}