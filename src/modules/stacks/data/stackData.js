export const STACK_CONCEPTS = [
  {
    title: "LIFO Principle (Last In, First Out)",
    description:
      "Elements are added and removed from a single open boundary called the Top of the Stack. The last element pushed is strictly the first element popped, mirroring a physical stack of plates or books.",
    example: "Push(10), Push(20) → Pop() yields 20 first.",
  },
  {
    title: "O(1) Constant Time Operations",
    description:
      "Because all modifications take place exclusively at the top index without shifting remaining elements, Push, Pop, and Peek execute in optimal O(1) time and O(1) auxiliary space.",
    example: "Top pointer simply increments upon Push and decrements upon Pop.",
  },
  {
    title: "Stack Overflow & Underflow",
    description:
      "Stack Overflow occurs when attempting to push onto an array-based stack that has reached its maximum allocated capacity. Stack Underflow occurs when attempting to pop or peek from an empty stack (size === 0).",
    example: "top === capacity - 1 → Overflow error; top === -1 → Underflow error.",
  },
  {
    title: "Common Applications",
    description:
      "Stacks power execution call stacks in programming runtimes, undo/redo mechanisms in text editors, balanced parenthesis matching in compilers, and depth-first searches (DFS).",
    example: "Browser history back button is a classic Stack data structure.",
  },
];

export const INITIAL_STACK_ELEMENTS = [12, 24, 36, 48];
export const DEFAULT_STACK_CAPACITY = 7;
