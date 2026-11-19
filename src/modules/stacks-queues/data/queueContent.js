export const queueContent = {
  id: "queue",
  title: "Circular Queue Data Structure",
  subtitle:
    "First In, First Out (FIFO). Elements enter at the rear and exit from the front in O(1) algorithmic time via circular array pointers.",
  overview: {
    heading: "What is a Circular Queue?",
    description:
      "A Queue is a linear data structure adhering to the FIFO (First In, First Out) principle. To achieve true O(1) algorithmic complexity without expensive O(n) array element shifts, AlgoShelf implements a Circular Array (Ring Buffer) where front and rear pointers wrap around using modulo arithmetic.",
  },
  takeaways: [
    "Pointer Complexity O(1): Enqueue and Dequeue advance pointers via modulo math ((ptr + 1) % capacity) in O(1) time with zero element shifts.",
    "React Buffer Note O(C): In React's declarative state paradigm, updating state creates a shallow copy of the fixed-capacity buffer in O(C) time (where capacity C = 6).",
    "Eliminates Linear Shifts: Unlike linear queue unshifting which costs O(n), circular pointer wrapping leaves existing items unmoved in memory.",
    "Fundamental for OS CPU task scheduling, ring buffers, and Breadth-First Search (BFS).",
  ],
  operations: [
    {
      name: "Enqueue(x)",
      complexity: "O(1)*",
      desc: "Places element x at buffer[rear] and advances rear = (rear + 1) % capacity in O(1) pointer time (*O(C) shallow buffer copy for React state updates, where C = 6).",
    },
    {
      name: "Dequeue()",
      complexity: "O(1)*",
      desc: "Reads buffer[front], clears slot in-place, and advances front = (front + 1) % capacity in O(1) pointer time (*O(C) shallow buffer copy for React state updates, where C = 6).",
    },
    {
      name: "Front()",
      complexity: "O(1)",
      desc: "Inspects buffer[front] in O(1) constant time without modifying pointers or copying the buffer.",
    },
    {
      name: "Rear()",
      complexity: "O(1)",
      desc: "Inspects the most recently enqueued element in O(1) constant time.",
    },
  ],
  applications: [
    "CPU task scheduling and asynchronous job queues",
    "Breadth-First Search (BFS) in trees and graphs",
    "Printer spooling and network packet ring buffering",
    "Real-time event loop queues in runtime systems",
  ],
};
