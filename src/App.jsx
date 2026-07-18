import { useState, useEffect, useRef } from "react"

function App() {

  /* ===============================
          ARRAY VISUALIZATION
  ============================== */

  const [numbers, setNumbers] = useState([])
  const [originalNumbers, setOriginalNumbers] = useState([])

  const [currentIndices, setCurrentIndices] = useState([])
  const [swappingIndices, setSwappingIndices] = useState([])
  const [sortedIndices, setSortedIndices] = useState([])


  /* ===============================
            ALGORITHM
  ============================== */

  const [algorithm, setAlgorithm] = useState("")
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("")

  const [isSorting, setIsSorting] = useState(false)
  const stopSortingRef = useRef(false)
  const [recursionDepth, setRecursionDepth] = useState(0)
  const [currentRange, setCurrentRange] = useState(null)

  /* ===============================
             CONTROLS
  ============================== */

  const [arraySize, setArraySize] = useState(8)
  const [speed, setSpeed] = useState(300)

  const [showAbout, setShowAbout] = useState(false)
  const [showPseudoCode, setShowPseudoCode] = useState(true)

  const [learningMode, setLearningMode] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)


  /* ===============================
          LIVE STATISTICS
  ============================== */

  const [comparisons, setComparisons] = useState(0)
  const [swaps, setSwaps] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)


  /* ===============================
        LIVE EXPLANATION
  ============================== */

  const [currentStep, setCurrentStep] = useState("")
  const [currentLine, setCurrentLine] = useState(0)
  const [currentPass, setCurrentPass] = useState(0)


  /* ===============================
          GENERATE ARRAY
  ============================== */

  const generateArray = () => {
    if (isSorting) return

    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 10
    )

    setNumbers(newArray)
    setOriginalNumbers([...newArray])

    setCurrentIndices([])
    setSwappingIndices([])
    setSortedIndices([])

    setAlgorithm("")
    setSelectedAlgorithm("")

    setComparisons(0)
    setSwaps(0)
    setTimeTaken(0)

    setCurrentStep("")
    setCurrentLine(0)
    setCurrentPass(0)
  }


  /* ===============================
         RESET VISUALIZER
  ============================== */

  const resetVisualizer = () => {
    stopSortingRef.current = true

    setNumbers([...originalNumbers])

    setCurrentIndices([])
    setSwappingIndices([])
    setSortedIndices([])

    setComparisons(0)
    setSwaps(0)
    setTimeTaken(0)

    setCurrentStep("")
    setCurrentLine(0)
    setCurrentPass(0)

    setAlgorithm("")
    setSelectedAlgorithm("")

    setIsSorting(false)
  }


  /* ===============================
           INITIAL ARRAY
  ============================== */

  useEffect(() => {
    generateArray()
  }, [arraySize])


  /* ===============================
              HELPERS
  ============================== */

  const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms))


  const heapify = async (arr, n, i) => {

    if (stopSortingRef.current) return

    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    setCurrentLine(3)

    setCurrentStep(
      `Checking subtree rooted at ${arr[i]}`
    )

    setCurrentIndices(
      [i, left, right].filter(index => index < n)
    )

    await sleep(speed / 2)

    if (left < n) {

      setComparisons(prev => prev + 1)

      setCurrentStep(
        `Comparing parent ${arr[largest]} with left child ${arr[left]}`
      )

      await sleep(speed / 2)

      if (arr[left] > arr[largest]) {
        largest = left
      }
    }

    if (right < n) {

      setComparisons(prev => prev + 1)

      setCurrentStep(
        `Comparing current largest ${arr[largest]} with right child ${arr[right]}`
      )

      await sleep(speed / 2)

      if (arr[right] > arr[largest]) {
        largest = right
      }
    }

    if (largest !== i) {

      setCurrentLine(5)

      setCurrentStep(
        `Swapping ${arr[i]} with ${arr[largest]}`
      )

      setSwappingIndices([i, largest])

      await sleep(speed / 3)

        ;[arr[i], arr[largest]] =
          [arr[largest], arr[i]]

      setNumbers([...arr])

      setSwaps(prev => prev + 1)

      await sleep(speed)

      setSwappingIndices([])

      setCurrentLine(7)

      setCurrentStep(
        "Heap property violated. Heapifying affected subtree..."
      )

      await heapify(arr, n, largest)
    }

    setCurrentIndices([])
  }

  const partition = async (arr, low, high) => {

    const pivot = arr[high]
    let i = low - 1

    setCurrentLine(1)
    setCurrentStep(`Selected pivot: ${pivot}`)

    for (let j = low; j < high; j++) {

      if (stopSortingRef.current) return low

      setCurrentIndices([j, high])

      setCurrentLine(4)

      setCurrentStep(
        `Is ${arr[j]} < ${pivot}?`
      )

      setComparisons(prev => prev + 1)

      await sleep(speed)

      if (arr[j] < pivot) {

        i++

        setCurrentLine(6)

        setCurrentStep(
          `${arr[j]} belongs to the left partition`
        )

        setSwappingIndices([i, j])

        await sleep(speed / 3)

          ;[arr[i], arr[j]] =
            [arr[j], arr[i]]

        setSwaps(prev => prev + 1)
        setNumbers([...arr])

        await sleep(speed)

        if (stopSortingRef.current) return low

        setSwappingIndices([])
      }
    }

    setCurrentLine(8)

    setCurrentStep(
      `Placing pivot ${pivot} in its correct position`
    )

    setSwappingIndices([i + 1, high])

    await sleep(speed / 3)

      ;[arr[i + 1], arr[high]] =
        [arr[high], arr[i + 1]]

    setSwaps(prev => prev + 1)

    setNumbers([...arr])

    await sleep(speed)

    if (stopSortingRef.current) return low

    setSwappingIndices([])

    setSortedIndices(prev =>
      [...new Set([...prev, i + 1])]
    )

    setCurrentStep(
      `Pivot ${pivot} is now fixed`
    )

    setCurrentIndices([])

    return i + 1
  }


  const quickSortStart = async () => {
    if (isSorting) return

    stopSortingRef.current = false
    setIsSorting(true)

    const startTime = performance.now()

    try {

      // Reset visualization
      setAlgorithm("Quick Sort")

      setComparisons(0)
      setSwaps(0)
      setTimeTaken(0)

      setSortedIndices([])
      setCurrentIndices([])
      setSwappingIndices([])

      setCurrentPass(0)
      setCurrentLine(0)

      setCurrentStep("🚀 Initializing Quick Sort...")

      const arr = [...numbers]

      await sleep(speed)

      await quickSort(arr, 0, arr.length - 1)

      if (!stopSortingRef.current) {

        setCurrentLine(0)

        setCurrentStep("✅ Array sorted successfully!")

        setSortedIndices(
          Array.from(
            { length: arr.length },
            (_, index) => index
          )
        )
      }

    } finally {

      if (!stopSortingRef.current) {
        const endTime = performance.now()

        setTimeTaken(
          (endTime - startTime).toFixed(2)
        )
      }

      setCurrentIndices([])
      setSwappingIndices([])

      setIsSorting(false)
    }
  }

  const bubbleSort = async () => {
    if (isSorting) return

    stopSortingRef.current = false
    setIsSorting(true)

    const startTime = performance.now()

    try {

      setAlgorithm("Bubble Sort")

      setComparisons(0)
      setSwaps(0)
      setTimeTaken(0)

      setSortedIndices([])
      setCurrentIndices([])
      setSwappingIndices([])

      setCurrentPass(0)
      setCurrentLine(0)

      setCurrentStep(
        "🚀 Starting Bubble Sort..."
      )

      const arr = [...numbers]

      await sleep(speed)

      for (let i = 0; i < arr.length; i++) {

        if (stopSortingRef.current) return

        setCurrentPass(i + 1)

        setCurrentLine(1)

        setCurrentStep(
          `Pass ${i + 1}: bubbling the largest element to the end`
        )

        let swapped = false

        for (let j = 0; j < arr.length - i - 1; j++) {

          if (stopSortingRef.current) return

          setCurrentIndices([j, j + 1])

          setCurrentLine(3)

          setCurrentStep(
            `Comparing ${arr[j]} and ${arr[j + 1]}`
          )

          setComparisons(prev => prev + 1)

          await sleep(speed)

          if (arr[j] > arr[j + 1]) {

            setCurrentLine(5)

            setCurrentStep(
              `${arr[j]} is greater than ${arr[j + 1]}. Swapping them.`
            )

            setSwappingIndices([j, j + 1])

            await sleep(speed / 3)

              ;[arr[j], arr[j + 1]] =
                [arr[j + 1], arr[j]]

            setNumbers([...arr])

            setSwaps(prev => prev + 1)

            swapped = true

            await sleep(speed)

            if (stopSortingRef.current) return

            setSwappingIndices([])

          } else {

            setCurrentStep(
              `${arr[j]} is already in the correct order with ${arr[j + 1]}`
            )

            await sleep(speed / 2)
          }
        }

        const sortedIndex = arr.length - i - 1

        setSortedIndices(prev => [
          ...prev,
          sortedIndex
        ])

        setCurrentLine(8)

        setCurrentStep(
          `${arr[sortedIndex]} is now in its final position`
        )

        await sleep(speed / 2)

        if (!swapped) {

          setCurrentLine(9)

          setCurrentStep(
            "No swaps were made in this pass. The array is already sorted."
          )

          await sleep(speed)

          break
        }
      }

    } finally {

      if (!stopSortingRef.current) {

        const endTime = performance.now()

        setTimeTaken(
          (endTime - startTime).toFixed(2)
        )

        setCurrentIndices([])
        setSwappingIndices([])

        setSortedIndices(
          Array.from(
            { length: numbers.length },
            (_, index) => index
          )
        )

        setCurrentLine(0)

        setCurrentStep(
          "✅ Bubble Sort completed successfully!"
        )
      }

      setIsSorting(false)
    }
  }

  const selectionSort = async () => {
    if (isSorting) return

    stopSortingRef.current = false
    setIsSorting(true)

    const startTime = performance.now()

    try {

      setAlgorithm("Selection Sort")

      setComparisons(0)
      setSwaps(0)
      setTimeTaken(0)

      setSortedIndices([])
      setCurrentIndices([])
      setSwappingIndices([])

      setCurrentPass(0)
      setCurrentLine(0)

      setCurrentStep(
        "🚀 Starting Selection Sort..."
      )

      const arr = [...numbers]

      await sleep(speed)

      for (let i = 0; i < arr.length; i++) {

        if (stopSortingRef.current) return

        setCurrentPass(i + 1)

        setCurrentLine(1)

        setCurrentStep(
          `Pass ${i + 1}: Searching for the smallest element`
        )

        let minIndex = i

        setCurrentLine(2)

        setCurrentStep(
          `Current minimum is ${arr[minIndex]}`
        )

        await sleep(speed / 2)

        for (let j = i + 1; j < arr.length; j++) {

          if (stopSortingRef.current) return

          setCurrentIndices([minIndex, j])

          setCurrentLine(4)

          setCurrentStep(
            `Comparing ${arr[j]} with current minimum ${arr[minIndex]}`
          )

          setComparisons(prev => prev + 1)

          await sleep(speed)

          if (arr[j] < arr[minIndex]) {

            setCurrentLine(5)

            setCurrentStep(
              `${arr[j]} is smaller than ${arr[minIndex]}`
            )

            await sleep(speed / 2)

            minIndex = j

            setCurrentLine(6)

            setCurrentIndices([minIndex])

            setCurrentStep(
              `${arr[minIndex]} becomes the new minimum`
            )

            await sleep(speed / 2)

          } else {

            setCurrentStep(
              `${arr[minIndex]} remains the smallest`
            )

            await sleep(speed / 3)
          }
        }

        if (minIndex !== i) {

          setCurrentLine(7)

          setCurrentStep(
            `Swapping ${arr[i]} with ${arr[minIndex]}`
          )

          setSwappingIndices([i, minIndex])

          await sleep(speed / 3)

            ;[arr[i], arr[minIndex]] =
              [arr[minIndex], arr[i]]

          setNumbers([...arr])

          setSwaps(prev => prev + 1)

          await sleep(speed)

          if (stopSortingRef.current) return

          setSwappingIndices([])

        } else {

          setCurrentStep(
            `${arr[i]} is already in the correct position`
          )

          await sleep(speed / 2)
        }

        setSortedIndices(prev => [...prev, i])

        setCurrentLine(8)

        setCurrentStep(
          `${arr[i]} has been placed in its final sorted position`
        )

        await sleep(speed / 2)
      }

    } finally {

      if (!stopSortingRef.current) {

        const endTime = performance.now()

        setTimeTaken(
          (endTime - startTime).toFixed(2)
        )

        setSortedIndices(
          Array.from(
            { length: numbers.length },
            (_, index) => index
          )
        )

        setCurrentIndices([])
        setSwappingIndices([])

        setCurrentLine(0)

        setCurrentStep(
          "✅ Selection Sort completed successfully!"
        )
      }

      setIsSorting(false)
    }
  }

  const insertionSort = async () => {
    if (isSorting) return

    stopSortingRef.current = false
    setIsSorting(true)

    const startTime = performance.now()

    try {

      setAlgorithm("Insertion Sort")

      setComparisons(0)
      setSwaps(0)
      setTimeTaken(0)

      setSortedIndices([])
      setCurrentIndices([])
      setSwappingIndices([])

      setCurrentLine(0)
      setCurrentPass(0)

      setCurrentStep(
        "🚀 Starting Insertion Sort..."
      )

      const arr = [...numbers]

      await sleep(speed)

      setSortedIndices([0])

      for (let i = 1; i < arr.length; i++) {

        if (stopSortingRef.current) return

        const key = arr[i]
        let j = i - 1

        setCurrentPass(i)

        setCurrentLine(1)

        setCurrentStep(
          `Pass ${i}: inserting ${key} into the sorted portion`
        )

        setCurrentIndices([i])

        await sleep(speed / 2)

        while (j >= 0 && arr[j] > key) {

          if (stopSortingRef.current) return

          setCurrentLine(4)

          setCurrentIndices([j, j + 1])

          setCurrentStep(
            `Comparing ${arr[j]} with key ${key}`
          )

          setComparisons(prev => prev + 1)

          await sleep(speed)

          setCurrentLine(5)

          setCurrentStep(
            `${arr[j]} is larger than ${key}. Shift it one position to the right.`
          )

          setSwappingIndices([j, j + 1])

          await sleep(speed / 3)

          arr[j + 1] = arr[j]

          setNumbers([...arr])

          setSwaps(prev => prev + 1)

          await sleep(speed)

          if (stopSortingRef.current) return

          setSwappingIndices([])

          j--
        }

        setCurrentLine(7)

        setCurrentStep(
          `Placing ${key} into its correct position`
        )

        arr[j + 1] = key

        setNumbers([...arr])

        setSortedIndices(
          Array.from(
            { length: i + 1 },
            (_, index) => index
          )
        )

        setCurrentLine(8)

        setCurrentStep(
          `${key} inserted successfully`
        )

        await sleep(speed)
      }

      if (!stopSortingRef.current) {

        setSortedIndices(
          Array.from(
            { length: arr.length },
            (_, index) => index
          )
        )

        setCurrentLine(0)

        setCurrentStep(
          "✅ Insertion Sort completed successfully!"
        )
      }

    } finally {

      if (!stopSortingRef.current) {

        const endTime = performance.now()

        setTimeTaken(
          (endTime - startTime).toFixed(2)
        )
      }

      setCurrentIndices([])
      setSwappingIndices([])

      setIsSorting(false)
    }
  }

  const merge = async (arr, left, mid, right) => {

    const leftArray = arr.slice(left, mid + 1)
    const rightArray = arr.slice(mid + 1, right + 1)

    let i = 0
    let j = 0
    let k = left

    setCurrentLine(4)

    setCurrentStep(
      `Merging [${left}-${mid}] with [${mid + 1}-${right}]`
    )

    await sleep(speed / 2)

    while (
      i < leftArray.length &&
      j < rightArray.length
    ) {

      if (stopSortingRef.current) return

      setCurrentIndices([
        left + i,
        mid + 1 + j
      ])

      setCurrentLine(5)

      setCurrentStep(
        `Comparing ${leftArray[i]} and ${rightArray[j]}`
      )

      setComparisons(prev => prev + 1)

      await sleep(speed)

      if (leftArray[i] <= rightArray[j]) {

        arr[k] = leftArray[i]

        setCurrentStep(
          `${leftArray[i]} is smaller → copy into merged array`
        )

        i++

      } else {

        arr[k] = rightArray[j]

        setCurrentStep(
          `${rightArray[j]} is smaller → copy into merged array`
        )

        j++
      }

      setSwappingIndices([k])

      setNumbers([...arr])

      setSwaps(prev => prev + 1)

      await sleep(speed)

      setSwappingIndices([])

      k++
    }

    while (i < leftArray.length) {

      if (stopSortingRef.current) return

      setCurrentLine(6)

      setCurrentStep(
        `Copying remaining element ${leftArray[i]}`
      )

      arr[k] = leftArray[i]

      setNumbers([...arr])

      setSwappingIndices([k])

      setSwaps(prev => prev + 1)

      await sleep(speed)

      setSwappingIndices([])

      i++
      k++
    }

    while (j < rightArray.length) {

      if (stopSortingRef.current) return

      setCurrentLine(6)

      setCurrentStep(
        `Copying remaining element ${rightArray[j]}`
      )

      arr[k] = rightArray[j]

      setNumbers([...arr])

      setSwappingIndices([k])

      setSwaps(prev => prev + 1)

      await sleep(speed)

      setSwappingIndices([])

      j++
      k++
    }

    setCurrentIndices([])

    setCurrentLine(7)

    setCurrentStep(
      `Merged section [${left}-${right}]`
    )

    await sleep(speed / 2)
  }
  const mergeSort = async (
    arr,
    left,
    right,
    depth = 1
  ) => {

    if (stopSortingRef.current) return

    if (left >= right) return

    setRecursionDepth(depth)

    const mid = Math.floor((left + right) / 2)

    setCurrentRange({
      left,
      mid,
      right
    })

    setCurrentLine(1)

    setCurrentStep(
      `Depth ${depth}: Splitting [${left} - ${right}]`
    )

    await sleep(speed / 2)

    if (stopSortingRef.current) return

    setCurrentLine(2)

    setCurrentStep(
      `Depth ${depth}: Sorting left half [${left} - ${mid}]`
    )

    await mergeSort(
      arr,
      left,
      mid,
      depth + 1
    )

    if (stopSortingRef.current) return

    setCurrentLine(3)

    setCurrentStep(
      `Depth ${depth}: Sorting right half [${mid + 1} - ${right}]`
    )

    await mergeSort(
      arr,
      mid + 1,
      right,
      depth + 1
    )

    if (stopSortingRef.current) return

    setCurrentLine(4)

    setCurrentStep(
      `Depth ${depth}: Merging both sorted halves`
    )

    await merge(
      arr,
      left,
      mid,
      right
    )

    setCurrentStep(
      `Depth ${depth}: Finished merging [${left} - ${right}]`
    )

    await sleep(speed / 3)

    setRecursionDepth(depth - 1)

    if (depth > 1) {

      const parentLeft = left
      const parentRight = right

      setCurrentRange({
        left: parentLeft,
        mid: Math.floor((parentLeft + parentRight) / 2),
        right: parentRight
      })

    } else {

      setCurrentRange(null)
    }
  }

  const mergeSortStart = async () => {

    if (isSorting) return

    stopSortingRef.current = false
    setIsSorting(true)

    const startTime = performance.now()

    try {

      setAlgorithm("Merge Sort")

      setComparisons(0)
      setSwaps(0)
      setTimeTaken(0)

      setSortedIndices([])
      setCurrentIndices([])
      setSwappingIndices([])

      setCurrentLine(0)
      setCurrentPass(0)

      // New
      setRecursionDepth(0)

      setCurrentStep(
        "🚀 Starting Merge Sort..."
      )

      const arr = [...numbers]

      await sleep(speed)

      await mergeSort(
        arr,
        0,
        arr.length - 1,
        1
      )

      if (!stopSortingRef.current) {

        setNumbers([...arr])

        setSortedIndices(
          Array.from(
            { length: arr.length },
            (_, index) => index
          )
        )

        // Reset depth after completion
        setRecursionDepth(0)

        setCurrentLine(0)

        setCurrentStep(
          "✅ Merge Sort completed successfully!"
        )
      }

    } finally {

      if (!stopSortingRef.current) {

        const endTime = performance.now()

        setTimeTaken(
          (endTime - startTime).toFixed(2)
        )
      }

      setCurrentIndices([])
      setSwappingIndices([])

      // Safety reset
      setRecursionDepth(0)

      setIsSorting(false)
    }
  }

  const heapSort = async () => {

    if (isSorting) return

    stopSortingRef.current = false
    setIsSorting(true)

    const startTime = performance.now()

    try {

      setAlgorithm("Heap Sort")

      setComparisons(0)
      setSwaps(0)
      setTimeTaken(0)

      setSortedIndices([])
      setCurrentIndices([])
      setSwappingIndices([])

      setCurrentLine(0)
      setCurrentPass(0)

      setCurrentStep(
        "🚀 Starting Heap Sort..."
      )

      const arr = [...numbers]
      const n = arr.length

      await sleep(speed)

      // ============================
      // Build Max Heap
      // ============================

      setCurrentLine(1)

      setCurrentStep(
        "Building the Max Heap..."
      )

      for (
        let i = Math.floor(n / 2) - 1;
        i >= 0;
        i--
      ) {

        if (stopSortingRef.current) return

        setCurrentPass(
          Math.floor(n / 2) - i
        )

        setCurrentLine(2)

        setCurrentStep(
          `Restoring heap property at node ${i}`
        )

        await heapify(
          arr,
          n,
          i
        )

        if (stopSortingRef.current) return
      }

      // ============================
      // Extract Largest Elements
      // ============================

      for (let i = n - 1; i > 0; i--) {

        if (stopSortingRef.current) return

        setCurrentLine(4)

        setCurrentStep(
          `Moving the largest element (${arr[0]}) to index ${i}`
        )

        setSwappingIndices([0, i])

        await sleep(speed / 3)

          ;[arr[0], arr[i]] =
            [arr[i], arr[0]]

        setSwaps(prev => prev + 1)

        setNumbers([...arr])

        await sleep(speed)

        if (stopSortingRef.current) return

        setSwappingIndices([])

        setSortedIndices(prev => [
          ...prev,
          i
        ])

        setCurrentLine(6)

        setCurrentStep(
          `${arr[i]} is now in its final sorted position`
        )

        await sleep(speed / 2)

        setCurrentLine(7)

        setCurrentStep(
          "Rebuilding the heap..."
        )

        await heapify(
          arr,
          i,
          0
        )

        if (stopSortingRef.current) return
      }

      if (!stopSortingRef.current) {

        setSortedIndices(
          Array.from(
            { length: n },
            (_, index) => index
          )
        )

        setCurrentLine(0)

        setCurrentStep(
          "✅ Heap Sort completed successfully!"
        )
      }

    } finally {

      if (!stopSortingRef.current) {

        const endTime = performance.now()

        setTimeTaken(
          (endTime - startTime).toFixed(2)
        )
      }

      setCurrentIndices([])
      setSwappingIndices([])

      setIsSorting(false)
    }
  }

  const algorithmInfo = {
    "Bubble Sort": {
      icon: "🫧",
      idea:
        "Repeatedly compares adjacent elements and swaps them if they are in the wrong order.",
      technique: "Comparison Based",
      stable: "Yes ✅",
      inPlace: "Yes ✅",
      usage: "Educational purposes and very small datasets.",
      fact: "Large elements 'bubble' to the end after each pass."
    },

    "Selection Sort": {
      icon: "🎯",
      idea:
        "Finds the minimum element and places it in its correct position.",
      technique: "Selection Based",
      stable: "No ❌",
      inPlace: "Yes ✅",
      usage: "Useful when memory writes are expensive.",
      fact: "Performs at most n-1 swaps."
    },

    "Insertion Sort": {
      icon: "📝",
      idea:
        "Builds the sorted array one element at a time by inserting elements into their correct position.",
      technique: "Insertion Based",
      stable: "Yes ✅",
      inPlace: "Yes ✅",
      usage: "Excellent for nearly sorted arrays.",
      fact: "Used internally by many hybrid sorting algorithms."
    },

    "Merge Sort": {
      icon: "🧩",
      idea:
        "Divides the array into halves and merges sorted pieces together.",
      technique: "Divide and Conquer",
      stable: "Yes ✅",
      inPlace: "No ❌",
      usage: "Used for large datasets and external sorting.",
      fact: "Guaranteed O(n log n) performance."
    },

    "Quick Sort": {
      icon: "⚡",
      idea:
        "Chooses a pivot and partitions the array around it.",
      technique: "Divide and Conquer",
      stable: "No ❌",
      inPlace: "Yes ✅",
      usage: "One of the fastest general-purpose sorting algorithms.",
      fact: "Average case performance is extremely efficient."
    },

    "Heap Sort": {
      icon: "🏔️",
      idea:
        "Builds a heap and repeatedly extracts the largest element.",
      technique: "Heap Based",
      stable: "No ❌",
      inPlace: "Yes ✅",
      usage: "Useful when guaranteed O(n log n) performance is needed.",
      fact: "Heap Sort uses a Binary Heap internally."
    }
  }

  const pseudoCodes = {

    "Bubble Sort": [
      "for i = 0 to n - 1",
      "    swapped = false",
      "    for j = 0 to n - i - 1",
      "        compare arr[j] and arr[j+1]",
      "        if arr[j] > arr[j+1]",
      "            swap(arr[j], arr[j+1])",
      "            swapped = true",
      "    mark arr[n-i-1] as sorted",
      "    if swapped == false",
      "        break"
    ],

    "Selection Sort": [
      "for i = 0 to n - 1",
      "    minIndex = i",
      "    for j = i + 1 to n - 1",
      "        compare arr[j] with arr[minIndex]",
      "        if arr[j] < arr[minIndex]",
      "            minIndex = j",
      "    swap(arr[i], arr[minIndex])",
      "    mark arr[i] as sorted"
    ],

    "Insertion Sort": [
      "for i = 1 to n - 1",
      "    key = arr[i]",
      "    j = i - 1",
      "    while j >= 0 and arr[j] > key",
      "        arr[j+1] = arr[j]",
      "        j = j - 1",
      "    arr[j+1] = key",
      "    mark inserted position as sorted"
    ],

    "Merge Sort": [
      "mergeSort(left, right)",
      "    if left >= right return",
      "    mid = (left + right) / 2",
      "    mergeSort(left, mid)",
      "    mergeSort(mid + 1, right)",
      "    merge(left, mid, right)",
      "    return"
    ],

    "Quick Sort": [
      "quickSort(low, high)",
      "    if low >= high return",
      "    pivot = partition(low, high)",
      "    quickSort(low, pivot - 1)",
      "    quickSort(pivot + 1, high)",
      "    return"
    ],

    "Heap Sort": [
      "buildMaxHeap()",
      "for i = n-1 to 1",
      "    swap(root, arr[i])",
      "    heapify(root)",
      "repeat until heap is empty"
    ],

  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <div className="text-center mb-12">

        <h1
          className="
      text-7xl
      md:text-8xl
      font-extrabold
      tracking-tight
      bg-gradient-to-r
      from-purple-400
      via-cyan-400
      to-pink-400
      bg-clip-text
      text-transparent
      drop-shadow-[0_0_35px_rgba(168,85,247,0.8)]
      select-none
    "
        >
          AlgoShelf
        </h1>

        <p className="
    mt-4
    text-base
    md:text-lg
    text-slate-400
    tracking-wide
    font-medium
  ">
          Learn Data Structures & Algorithms Visually
        </p>

      </div>

      <div className="flex flex-col items-center gap-6 mb-10">

        {/* Action Buttons */}
        <div className="flex items-center gap-4 flex-wrap justify-center">

          <button
            disabled={isSorting}
            onClick={generateArray}
            className="
        shadow-lg shadow-cyan-500/30
        bg-cyan-600
        hover:bg-cyan-700
        hover:scale-105
        px-10 py-4
        rounded-2xl
        text-lg
        font-bold
        transition-all duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
          >
            🎲 Generate New Array
          </button>

          <button
            onClick={resetVisualizer}
            className="
        shadow-lg shadow-gray-500/30
        bg-gray-600
        hover:bg-gray-700
        hover:scale-105
        px-8 py-4
        rounded-2xl
        font-semibold
        transition-all duration-300
      "
          >
            🔄 Reset
          </button>

        </div>

        {/* Section Label */}
        <h2 className="
    text-slate-400
    text-sm
    uppercase
    tracking-[0.3em]
    font-semibold
  ">
          Sorting Algorithms
        </h2>

        {/* Algorithm Tabs */}
        <div
          className="
      bg-slate-900/80
      backdrop-blur-sm
      border border-slate-800
      rounded-3xl
      p-4
      flex
      flex-wrap
      justify-center
      gap-3
      shadow-xl
      shadow-black/20
      max-w-6xl
    "
        >

          <button
            disabled={isSorting}
            onClick={bubbleSort}
            className={`
        px-6 py-3
        rounded-2xl
        font-semibold
        tracking-wide
        transition-all duration-300
        hover:scale-105
        disabled:opacity-50
        disabled:cursor-not-allowed
        bg-blue-600
        hover:bg-blue-700
        shadow-lg shadow-blue-500/30
        ${algorithm === "Bubble Sort"
                ? "ring-2 ring-blue-300 scale-105 -translate-y-1 shadow-blue-400/60"
                : ""
              }
      `}
          >
            Bubble Sort
          </button>

          <button
            disabled={isSorting}
            onClick={selectionSort}
            className={`
        px-6 py-3
        rounded-2xl
        font-semibold
        tracking-wide
        transition-all duration-300
        hover:scale-105
        disabled:opacity-50
        disabled:cursor-not-allowed
        bg-green-600
        hover:bg-green-700
        shadow-lg shadow-green-500/30
        ${algorithm === "Selection Sort"
                ? "ring-2 ring-green-300 scale-105 -translate-y-1 shadow-green-400/60"
                : ""
              }
      `}
          >
            Selection Sort
          </button>

          <button
            disabled={isSorting}
            onClick={insertionSort}
            className={`
        px-6 py-3
        rounded-2xl
        font-semibold
        tracking-wide
        transition-all duration-300
        hover:scale-105
        disabled:opacity-50
        disabled:cursor-not-allowed
        bg-orange-600
        hover:bg-orange-700
        shadow-lg shadow-orange-500/30
        ${algorithm === "Insertion Sort"
                ? "ring-2 ring-orange-300 scale-105 -translate-y-1 shadow-orange-400/60"
                : ""
              }
      `}
          >
            Insertion Sort
          </button>

          <button
            disabled={isSorting}
            onClick={mergeSortStart}
            className={`
        px-6 py-3
        rounded-2xl
        font-semibold
        tracking-wide
        transition-all duration-300
        hover:scale-105
        disabled:opacity-50
        disabled:cursor-not-allowed
        bg-pink-600
        hover:bg-pink-700
        shadow-lg shadow-pink-500/30
        ${algorithm === "Merge Sort"
                ? "ring-2 ring-pink-300 scale-105 -translate-y-1 shadow-pink-400/60"
                : ""
              }
      `}
          >
            Merge Sort
          </button>

          <button
            disabled={isSorting}
            onClick={quickSortStart}
            className={`
        px-6 py-3
        rounded-2xl
        font-semibold
        tracking-wide
        transition-all duration-300
        hover:scale-105
        disabled:opacity-50
        disabled:cursor-not-allowed
        bg-red-600
        hover:bg-red-700
        shadow-lg shadow-red-500/30
        ${algorithm === "Quick Sort"
                ? "ring-2 ring-red-300 scale-105 -translate-y-1 shadow-red-400/60"
                : ""
              }
      `}
          >
            Quick Sort
          </button>

          <button
            disabled={isSorting}
            onClick={heapSort}
            className={`
        px-6 py-3
        rounded-2xl
        font-semibold
        tracking-wide
        transition-all duration-300
        hover:scale-105
        disabled:opacity-50
        disabled:cursor-not-allowed
        bg-yellow-600
        hover:bg-yellow-700
        shadow-lg shadow-yellow-500/30
        ${algorithm === "Heap Sort"
                ? "ring-2 ring-yellow-300 scale-105 -translate-y-1 shadow-yellow-400/60"
                : ""
              }
      `}
          >
            Heap Sort
          </button>

        </div>

        {algorithm && algorithmInfo[algorithm] && (

          <div
            className="
      bg-slate-900
      rounded-2xl
      p-6
      mb-6
      w-full
      max-w-2xl
      mx-auto
      border border-slate-700
      shadow-xl
      shadow-black/30
    "
          >

            <h2
              className={`
        text-4xl
        font-bold
        text-center
        mb-6

        ${algorithm === "Bubble Sort"
                  ? "text-blue-400"
                  : algorithm === "Selection Sort"
                    ? "text-green-400"
                    : algorithm === "Insertion Sort"
                      ? "text-orange-400"
                      : algorithm === "Merge Sort"
                        ? "text-pink-400"
                        : algorithm === "Quick Sort"
                          ? "text-red-400"
                          : algorithm === "Heap Sort"
                            ? "text-yellow-400"
                            : "text-white"
                }
      `}
            >
              {algorithmInfo[algorithm].icon} {algorithm}
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">

              {/* Time Complexity */}

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="text-green-400 text-xl font-bold mb-4">
                  Time Complexity
                </h3>

                <div className="space-y-3">

                  <div className="flex justify-between bg-slate-900 rounded-lg px-4 py-2">
                    <span className="text-green-400 font-semibold">
                      Best
                    </span>

                    <span className="font-bold">
                      {
                        algorithm === "Bubble Sort" ? "O(n)" :
                          algorithm === "Selection Sort" ? "O(n²)" :
                            algorithm === "Insertion Sort" ? "O(n)" :
                              algorithm === "Merge Sort" ? "O(n log n)" :
                                algorithm === "Quick Sort" ? "O(n log n)" :
                                  "O(n log n)"
                      }
                    </span>
                  </div>

                  <div className="flex justify-between bg-slate-900 rounded-lg px-4 py-2">
                    <span className="text-yellow-400 font-semibold">
                      Average
                    </span>

                    <span className="font-bold">
                      {
                        algorithm === "Bubble Sort" ? "O(n²)" :
                          algorithm === "Selection Sort" ? "O(n²)" :
                            algorithm === "Insertion Sort" ? "O(n²)" :
                              algorithm === "Merge Sort" ? "O(n log n)" :
                                algorithm === "Quick Sort" ? "O(n log n)" :
                                  "O(n log n)"
                      }
                    </span>
                  </div>

                  <div className="flex justify-between bg-slate-900 rounded-lg px-4 py-2">
                    <span className="text-red-400 font-semibold">
                      Worst
                    </span>

                    <span className="font-bold">
                      {
                        algorithm === "Bubble Sort" ? "O(n²)" :
                          algorithm === "Selection Sort" ? "O(n²)" :
                            algorithm === "Insertion Sort" ? "O(n²)" :
                              algorithm === "Merge Sort" ? "O(n log n)" :
                                algorithm === "Quick Sort" ? "O(n²)" :
                                  "O(n log n)"
                      }
                    </span>
                  </div>

                  <div className="flex justify-between bg-slate-900 rounded-lg px-4 py-2">
                    <span className="text-cyan-400 font-semibold">
                      Space
                    </span>

                    <span className="font-bold">
                      {
                        algorithm === "Merge Sort"
                          ? "O(n)"
                          : algorithm === "Quick Sort"
                            ? "O(log n)"
                            : "O(1)"
                      }
                    </span>
                  </div>

                </div>

              </div>

              {/* Properties */}

              <div className="bg-slate-800 rounded-xl p-5">

                <h3 className="text-blue-400 text-xl font-bold mb-4">
                  Properties
                </h3>

                <div className="space-y-3">

                  <div className="flex justify-between bg-slate-900 rounded-lg px-4 py-2">
                    <span>Stable</span>
                    <span>{algorithmInfo[algorithm].stable}</span>
                  </div>

                  <div className="flex justify-between bg-slate-900 rounded-lg px-4 py-2">
                    <span>In Place</span>
                    <span>{algorithmInfo[algorithm].inPlace}</span>
                  </div>

                  <div className="flex justify-between bg-slate-900 rounded-lg px-4 py-2">
                    <span>Adaptive</span>
                    <span>
                      {
                        algorithm === "Bubble Sort"
                          ? "Yes ✅"
                          : algorithm === "Insertion Sort"
                            ? "Yes ✅"
                            : "No ❌"
                      }
                    </span>
                  </div>

                  <div className="flex justify-between bg-slate-900 rounded-lg px-4 py-2">
                    <span>Technique</span>
                    <span>{algorithmInfo[algorithm].technique}</span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        )}


        {algorithm === "" && (

          <div
            className="
      bg-slate-900/80
      backdrop-blur-sm
      rounded-2xl
      p-6
      mb-6
      w-full
      max-w-3xl
      mx-auto
      border border-cyan-500/20
      shadow-xl shadow-cyan-500/10
    "
          >

            <div className="flex items-center gap-4">

              <div className="
        w-14
        h-14
        rounded-xl
        bg-gradient-to-br
        from-cyan-500
        to-purple-500
        flex
        items-center
        justify-center
        text-3xl
      ">
                🚀
              </div>

              <div className="flex-1">

                <h2 className="
          text-2xl
          font-bold
          bg-gradient-to-r
          from-cyan-400
          to-purple-400
          bg-clip-text
          text-transparent
        ">
                  Welcome to AlgoShelf
                </h2>

                <p className="text-slate-400 mt-1">
                  Generate an array, choose a sorting algorithm and watch every comparison and swap in real time.
                </p>

              </div>

            </div>

            <div className="
      flex
      flex-wrap
      justify-center
      gap-3
      mt-5
      text-sm
    ">

              <div className="bg-slate-800 px-4 py-2 rounded-lg">
                🎲 Generate Array
              </div>

              <div className="bg-slate-800 px-4 py-2 rounded-lg">
                🎯 Pick Algorithm
              </div>

              <div className="bg-slate-800 px-4 py-2 rounded-lg">
                📊 Visualize
              </div>

              <div className="bg-slate-800 px-4 py-2 rounded-lg">
                🧠 Learn
              </div>

            </div>

          </div>

        )}


        <div
          className="
    bg-slate-900/80
    backdrop-blur-sm
    border border-slate-700
    rounded-3xl
    p-6
    mb-8
    w-full
    max-w-7xl
    mx-auto
    shadow-xl
    shadow-black/20
  "
        >

          <div
            className="
      flex
      gap-8
      items-start
      justify-center
      lg:flex-nowrap
      flex-wrap
    "
          >

            {/* LEFT SIDE */}
            <div
              className="
        flex-1
        min-w-0
      "
            >

              <div className="overflow-hidden">

                <div
                  className="
            relative
            flex
            items-end
            justify-evenly
            gap-2
            h-[620px]  
            w-full
            px-6
          "
                >

                  {numbers.map((number, index) => (
                    <div
                      key={index}
                      className={`
                relative
                flex
                items-end
                justify-center
                text-white
                font-bold
                text-xs
                rounded-xl
                transition-all
                duration-500
                ease-in-out
                hover:scale-105
                hover:-translate-y-1
                swappingIndices.includes(index)
                ? "-translate-y-4 scale-105"
                ${sortedIndices.includes(index)
                          ? "bg-green-500 shadow-lg shadow-green-500/40"
                          : swappingIndices.includes(index)
                            ? "bg-red-500 shadow-lg shadow-red-500/40"
                            : currentIndices.includes(index)
                              ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/40"
                              : "bg-gradient-to-t from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30"
                        }
              `}
                      style={{
                        height: `${number * 5.5}px`,
                        width: `${Math.max(45, 95 - arraySize * 2.2)}px`,
                      }}
                    >
                      <span className="mb-2 select-none">
                        {number}
                      </span>
                    </div>
                  ))}

                  {/* Floor Line */}
                  <div
                    className="
              absolute
              bottom-0
              left-0
              right-0
              h-[2px]
              bg-slate-700
            "
                  />
                </div>

              </div>

              {/* Legend */}
              <div
                className="
          flex
          justify-center
          gap-8
          mt-8
          text-sm
          flex-wrap
        "
              >

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-slate-300">
                    Comparing
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-slate-300">
                    Swapping
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-slate-300">
                    Sorted
                  </span>
                </div>

              </div>
              {/* Live Statistics */}
              <div className="
  flex
  justify-center
  items-center
  gap-8
  mt-10
  flex-wrap
">

                <div className="
    flex
    items-center
    gap-2
    text-yellow-400
    font-semibold
  ">
                  📊
                  <span>{comparisons}</span>
                  <span className="text-slate-300">
                    Comparisons
                  </span>
                </div>

                <div className="
    flex
    items-center
    gap-2
    text-red-400
    font-semibold
  ">
                  🔄
                  <span>{swaps}</span>
                  <span className="text-slate-300">
                    Swaps
                  </span>
                </div>

                <div className="
    flex
    items-center
    gap-2
    text-green-400
    font-semibold
  ">
                  ⚡
                  <span>
                    {
                      timeTaken >= 1000
                        ? `${(timeTaken / 1000).toFixed(2)} s`
                        : `${timeTaken} ms`
                    }
                  </span>

                  <span className="text-slate-300">
                    Time
                  </span>
                </div>

              </div>

            </div>

            {/* PSEUDOCODE */}
            {algorithm && (
              <div
                className="
      bg-slate-800
      rounded-2xl
      border
      border-slate-700
      p-5
      w-[300px]
      min-h-[520px]
      shrink-0
      shadow-lg
      shadow-black/20
    "
              >

                <h2 className="
      text-cyan-400
      font-bold
      text-xl
      mb-5
    ">
                  📜 Pseudocode
                </h2>

                {/* PASS */}

                <div className="
      bg-slate-900
      rounded-xl
      p-4
      border
      border-slate-700
      text-center
      mb-4
    ">

                  <p className="
        text-xs
        uppercase
        tracking-[0.2em]
        text-slate-400
      ">
                    Current Pass
                  </p>

                  <p className="
        text-4xl
        font-black
        text-cyan-400
      ">
                    {currentPass}
                  </p>

                </div>

                {/* CURRENT ACTION */}

                <div className="
      bg-slate-900
      rounded-xl
      p-4
      border
      border-slate-700
      mb-5
    ">

                  <p className="
        text-purple-400
        font-semibold
        mb-2
      ">
                    Current Action
                  </p>

                  <p className="
        text-white
        text-sm
        min-h-[48px]
        leading-6
      ">
                    {currentStep || "Waiting to start..."}
                  </p>

                </div>

                {/* PSEUDOCODE */}

                <div>

                  <p className="
        text-slate-400
        text-sm
        font-semibold
        mb-3
      ">
                    Algorithm Steps
                  </p>

                  {pseudoCodes[algorithm]?.map((line, index) => (

                    <div
                      key={index}
                      className={`
            p-3
            rounded-lg
            mb-2
            font-mono
            text-sm
            transition-all
            duration-300

            ${currentLine === index + 1
                          ? "bg-cyan-500/20 border-l-4 border-cyan-400 text-cyan-200 translate-x-1"
                          : "text-slate-400"
                        }
          `}
                    >
                      {line}
                    </div>

                  ))}

                </div>

              </div>
            )}

          </div>

        </div>


        <div className="
  flex
  justify-center
  gap-4
  flex-wrap
  mb-8
">

          {algorithm && (
            <div className="
    w-full
    max-w-5xl
    mx-auto
    mb-6
  ">

              {/* Toggle Button */}
              <button
                onClick={() => setShowAbout(!showAbout)}
                className="
        w-full
        bg-slate-900/80
        backdrop-blur-sm
        border border-slate-700
        rounded-3xl
        p-5
        flex
        justify-between
        items-center
        hover:border-cyan-500/50
        transition-all duration-300
      "
              >
                <div className="flex items-center gap-3">

                  <span className="text-2xl">
                    {algorithmInfo[algorithm].icon}
                  </span>

                  <span className="
          text-xl
          font-bold
          text-cyan-400
        ">
                    About this Algorithm
                  </span>

                </div>

                <span className="
        text-slate-400
        text-2xl
      ">
                  {showAbout ? "▲" : "▼"}
                </span>
              </button>


              {/* Expandable Content */}
              {showAbout && (
                <div className="
        mt-4
        bg-slate-900/80
        backdrop-blur-sm
        rounded-3xl
        p-6
        border border-slate-700
        shadow-lg shadow-black/20
        animate-in fade-in duration-300
      ">

                  <div className="grid md:grid-cols-2 gap-6">

                    <div>
                      <p className="text-purple-400 font-semibold mb-2">
                        📖 How it works
                      </p>

                      <p className="text-slate-300">
                        {algorithmInfo[algorithm].idea}
                      </p>
                    </div>

                    <div>
                      <p className="text-purple-400 font-semibold mb-2">
                        🏗 Technique
                      </p>

                      <p className="text-slate-300">
                        {algorithmInfo[algorithm].technique}
                      </p>
                    </div>

                    <div>
                      <p className="text-purple-400 font-semibold mb-2">
                        🔒 Stability
                      </p>

                      <p className="text-slate-300">
                        {algorithmInfo[algorithm].stable}
                      </p>
                    </div>

                    <div>
                      <p className="text-purple-400 font-semibold mb-2">
                        💾 In Place
                      </p>

                      <p className="text-slate-300">
                        {algorithmInfo[algorithm].inPlace}
                      </p>
                    </div>

                    <div>
                      <p className="text-purple-400 font-semibold mb-2">
                        🌍 Real World Usage
                      </p>

                      <p className="text-slate-300">
                        {algorithmInfo[algorithm].usage}
                      </p>
                    </div>

                    <div>
                      <p className="text-purple-400 font-semibold mb-2">
                        💡 Fun Fact
                      </p>

                      <p className="text-slate-300">
                        {algorithmInfo[algorithm].fact}
                      </p>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

          {/* Array Size */}
          <div className="
    bg-slate-900/80
    backdrop-blur-sm
    rounded-3xl
    p-4
    border border-purple-500/20
    shadow-lg shadow-purple-500/10
    w-[380px]
    hover:border-purple-500/40
    transition-all duration-300
  ">

            <div className="
      flex
      justify-between
      items-center
      mb-3
    ">
              <span className="
        text-purple-400
        font-semibold
      ">
                📏 Array Size
              </span>

              <span className="
        text-white
        font-bold
        text-lg
      ">
                {arraySize}
              </span>
            </div>

            <input
              type="range"
              min="5"
              max="30"
              value={arraySize}
              disabled={isSorting}
              onChange={(e) => setArraySize(Number(e.target.value))}
              className="
        w-full
        accent-purple-500
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
            />

          </div>


          {/* Speed */}
          <div className="
    bg-slate-900/80
    backdrop-blur-sm
    rounded-3xl
    p-4
    border border-cyan-500/20
    shadow-lg shadow-cyan-500/10
    w-[380px]
    hover:border-cyan-500/40
    transition-all duration-300
  ">

            <div className="
      flex
      justify-between
      items-center
      mb-3
    ">
              <span className="
        text-cyan-400
        font-semibold
      ">
                ⚡ Animation Speed
              </span>

              <span className="
        text-white
        font-bold
        text-lg
      ">
                {
                  speed < 200
                    ? "Fast ⚡"
                    : speed < 500
                      ? "Medium 🚀"
                      : "Slow 🐢"
                }
              </span>
            </div>

            <input
              type="range"
              disabled={isSorting}
              min="50"
              max="1000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="
        w-full
        accent-cyan-500
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
            />

            <div className="
      text-right
      text-slate-500
      text-sm
      mt-2
    ">
              {speed} ms
            </div>

          </div>

        </div>

        <footer className="
  text-center
  text-slate-500
  mt-8
  text-sm
  pb-4
">
          Built with React + Tailwind CSS • AlgoShelf
        </footer>
      </div>
    </div>
  )
}

export default App