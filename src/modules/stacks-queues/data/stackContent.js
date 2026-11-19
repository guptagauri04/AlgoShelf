export const stackContent = {
  id: "stack",
  title: "Stack Data Structure",
  subtitle:
    "Last In, First Out (LIFO). Elements enter and exit exclusively from the top in O(1) algorithmic time.",
  overview: {
    heading: "What is a Stack?",
    description:
      "A Stack is a linear data structure adhering to the LIFO (Last In, First Out) principle. The last element pushed is the first to be popped. By maintaining a direct top pointer index into pre-allocated memory, core operations run in strict O(1) algorithmic time without shifting elements.",
  },
  takeaways: [
    "Pointer Complexity O(1): Directly increments or decrements the top pointer and indexes pre-allocated memory in O(1) constant time without shifting existing elements.",
    "React Buffer Note O(C): In React's declarative state paradigm, updating state creates a shallow copy of the fixed-capacity buffer in O(C) time (where capacity C = 6).",
    "Zero Element Shift: Unlike a linear array where unshifting requires O(n) element moves, stack operations leave all other elements untouched in memory.",
    "Essential for function call stacks, undo/redo mechanisms, and parsing syntax.",
  ],
  operations: [
    {
      name: "Push(x)",
      complexity: "O(1)*",
      desc: "Increments top pointer and writes x at buffer[top] in O(1) pointer time (*O(C) shallow buffer copy for React state updates, where C = 6).",
    },
    {
      name: "Pop()",
      complexity: "O(1)*",
      desc: "Reads buffer[top], clears slot in-place, and decrements top pointer in O(1) pointer time (*O(C) shallow buffer copy for React state updates, where C = 6).",
    },
    {
      name: "Peek()",
      complexity: "O(1)",
      desc: "Inspects buffer[top] in O(1) constant time without modifying the top pointer or copying the buffer.",
    },
    {
      name: "isEmpty()",
      complexity: "O(1)",
      desc: "Checks whether top === -1 in O(1) constant time.",
    },
  ],
  applications: [
    "Call stack management in programming language runtimes",
    "Undo/Redo operations in text editors and creative tools",
    "Balanced parentheses and expression evaluation (infix to postfix)",
    "Backtracking algorithms (Depth-First Search, maze solving)",
  ],
};
