export const binaryContent = {
  id: "binary",
  chapter: "Chapter II",
  title: "Binary Search",
  subtitle: "Divide and conquer. Halving search intervals in logarithmic time.",

  overview: {
    heading: "What is Binary Search?",
    description:
      "Binary Search is an exceptionally efficient algorithm for finding an element within a sorted array. Rather than scanning sequentially from start to end, it inspects the middle element and immediately eliminates half of the remaining search space based on whether the target is smaller or larger than the midpoint.",
  },

  takeaways: [
    "Prerequisite: The array must be sorted in non-decreasing order before searching.",
    "Maintains three dynamic boundary pointers: Low, Mid, and High.",
    "Halves the remaining search space with each comparison, eliminating unpromising halves.",
    "Operates in O(log n) time complexity and O(1) auxiliary space.",
  ],

  pseudocode: [
    "function binarySearch(arr, target):",
    "    low = 0, high = length(arr) - 1",
    "    while low <= high:",
    "        mid = floor((low + high) / 2)",
    "        if arr[mid] == target:",
    "            return mid // target found",
    "        else if arr[mid] < target:",
    "            low = mid + 1 // discard left half",
    "        else:",
    "            high = mid - 1 // discard right half",
    "    return -1 // target not in array",
  ],

  complexity: {
    best: "O(1)",
    average: "O(log n)",
    worst: "O(log n)",
    space: "O(1)",
  },

  applications: [
    "Lookup queries in sorted relational database indexes and B-Trees",
    "Finding exact terms in large digital dictionaries and telephone directories",
    "Git bisect to identify the specific commit introducing a software defect",
    "Standard library implementations across major programming languages (e.g. C++ std::binary_search, Java Arrays.binarySearch)",
  ],

  advantages: [
    "Exponentially faster than linear search on large datasets (only ~20 comparisons for 1,000,000 elements)",
    "Guaranteed O(log n) upper bound on worst-case execution time",
    "O(1) constant auxiliary space for iterative implementation",
    "Predictable and deterministic performance",
  ],

  disadvantages: [
    "Requires the underlying collection to be sorted beforehand",
    "Sorting an unsorted array takes O(n log n), which is not worthwhile for a single search",
    "Requires random-access indexing; inefficient on singly linked lists",
  ],
};
