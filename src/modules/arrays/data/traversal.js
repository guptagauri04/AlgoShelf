export const traversalTopic = {
  chapter: "01",

  title: "Array Traversal",

  subtitle: "Every element, one index at a time.",

  takeaways: [
    "Traversal visits each element exactly once, starting at index 0 and ending at index n - 1.",
    "The loop counter is the index, so the current position and its value can be shown at every step.",
    "A full traversal always runs in O(n) time and needs only a constant amount of extra space.",
  ],

  difficulty: "Easy",

  readingTime: "5 min",
};

export const traversalContent = {
  overview: {
    heading: "What is Array Traversal?",

    description:
      "Traversal is the act of visiting every element of an array in order, one position at a time. Because array elements sit next to each other in memory, a single counter does all the work: at step i the program points at index i, reads arr[i], shows it to the user, and moves on. Traversal is the foundation of nearly every array algorithm — searching, summing, mapping and sorting all begin with a pass over the elements.",
  },

  pseudocode: [
    "for i = 0 to n - 1",
    "    current index = i",
    "    value = arr[i]",
    "    mark arr[i] as visited and display i and value",
  ],

  complexity: {
    best: "O(n)",
    average: "O(n)",
    worst: "O(n)",
    space: "O(1)",
  },
};
