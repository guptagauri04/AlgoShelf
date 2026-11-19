export function heapSortSteps(inputArray) {
    const array = [...inputArray];

    const steps = [];

    let comparisons = 0;
    let swaps = 0;

    const sorted = [];

    function recordStep({
        comparing = [],
        currentLine = -1,

        heapSize = array.length,

        currentNode = -1,
        leftChild = -1,
        rightChild = -1,

        phase = "build",

        message,
    }) {
        steps.push({
            array: [...array],

            comparing,

            sorted: [...sorted],

            comparisons,
            swaps,

            currentLine,

            heapSize,

            currentNode,
            leftChild,
            rightChild,

            phase,

            message,
        });
    }

    // -----------------------
    // Build Max Heap
    // -----------------------

    recordStep({
        currentLine: 0,
        phase: "build",

        message: {
            title: "Build Max Heap",
            description:
                "Convert the unsorted array into a Max Heap.",
            insight:
                "A Max Heap guarantees that the largest element is always at the root.",
        },
    });

    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        heapify(array.length, i);
    }

    // -----------------------
    // Extract Maximum
    // -----------------------
    for (let end = array.length - 1; end > 0; end--) {
        recordStep({
            currentLine: 7,

            comparing: [0, end],

            heapSize: end + 1,

            currentNode: 0,
            leftChild: -1,
            rightChild: -1,

            phase: "extract",

            message: {
                title: "Extract Maximum",
                description: `${array[0]} is the largest element in the heap and will be moved to its final position.`,
                insight:
                    "The root of a Max Heap always contains the maximum value.",
            },
        });
        const maxValue = array[0];

        [array[0], array[end]] = [array[end], array[0]];

        swaps++;

        sorted.unshift(end);

        recordStep({
            currentLine: 8,

            comparing: [0, end],

            heapSize: end,

            currentNode: 0,
            leftChild: -1,
            rightChild: -1,

            phase: "extract",

            message: {
                title: "Place Maximum",
                description: `${maxValue} is moved to its final sorted position.`,
                insight:
                    "After removing the maximum element, the heap size decreases by one.",
            },
        });

        heapify(end, 0);
    }

    sorted.push(0);

    recordStep({
        currentLine: 9,
        heapSize: 0,
        phase: "complete",

        message: {
            title: "Sorting Complete",
            description:
                "Every element is now in its correct position.",
            insight:
                "Heap Sort has successfully sorted the array in ascending order.",
        },
    });

    return steps;

    function heapify(heapSize, rootIndex) {

        let largest = rootIndex;

        const left = 2 * rootIndex + 1;
        const right = 2 * rootIndex + 2;
        recordStep({
            currentLine: 2,

            heapSize,

            currentNode: rootIndex,
            leftChild: left,
            rightChild: right,

            message: {
                title: "Inspect Node",
                description: `Checking whether ${array[rootIndex]} satisfies the Max Heap property.`,
                insight:
                    "The parent should be greater than or equal to both of its children.",
            },
        });
        if (left < heapSize) {
            comparisons++;

            recordStep({
                currentLine: 3,

                comparing: [largest, left],

                heapSize,

                currentNode: rootIndex,
                leftChild: left,
                rightChild: right,

                message: {
                    title: "Compare Left Child",
                    description: `${array[left]} is compared with ${array[largest]}.`,
                    insight:
                        "If the left child is larger than the current largest value, it becomes the new candidate.",
                },
            });

            if (array[left] > array[largest]) {
                largest = left;
            }
        }
        if (right < heapSize) {
            comparisons++;

            recordStep({
                currentLine: 4,

                comparing: [largest, right],

                heapSize,

                currentNode: rootIndex,
                leftChild: left,
                rightChild: right,

                message: {
                    title: "Compare Right Child",
                    description: `${array[right]} is compared with ${array[largest]}.`,
                    insight:
                        "If the right child is larger than the current largest value, it becomes the new candidate.",
                },
            });

            if (array[right] > array[largest]) {
                largest = right;
            }
        }
        if (largest !== rootIndex) {
            const parent = array[rootIndex];
            const child = array[largest];

            [array[rootIndex], array[largest]] = [
                array[largest],
                array[rootIndex],
            ];

            swaps++;

            recordStep({
                currentLine: 5,

                comparing: [rootIndex, largest],

                heapSize,

                currentNode: rootIndex,
                leftChild:
                    2 * largest + 1 < heapSize ? 2 * largest + 1 : -1,
                rightChild:
                    2 * largest + 2 < heapSize ? 2 * largest + 2 : -1,

                message: {
                    title: "Swap Parent and Child",
                    description: `${child} is larger than ${parent}, so they exchange places.`,
                    insight:
                        "The larger value moves upward to maintain the Max Heap property.",
                },
            });

            heapify(heapSize, largest);
        }

    }
}