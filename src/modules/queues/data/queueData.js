export const QUEUE_CONCEPTS = [
  {
    title: "FIFO Principle (First In, First Out)",
    description:
      "Elements are added at the Rear and removed from the Front. The first element to arrive is strictly the first element to be processed, mirroring everyday real-world checkout lines and print queues.",
    example: "Enqueue(10), Enqueue(20) → Dequeue() yields 10 first.",
  },
  {
    title: "Circular Array (Ring Buffer)",
    description:
      "To avoid $O(n)$ element shifting during dequeue operations, circular array queues advance Front and Rear pointers using modulo arithmetic: index = (index + 1) % capacity. Both Enqueue and Dequeue execute in instantaneous $O(1)$ time.",
    example: "Rear = (Rear + 1) % Capacity; Front = (Front + 1) % Capacity",
  },
  {
    title: "Queue Overflow & Underflow",
    description:
      "Overflow occurs when an Enqueue is attempted on a queue that has reached its maximum allocated capacity. Underflow occurs when a Dequeue or Peek is attempted on an empty queue (size = 0).",
    example: "Size === Capacity → Overflow error; Size === 0 → Underflow error.",
  },
  {
    title: "Peek (Front & Rear Inspection)",
    description:
      "The Peek/Front operation reads the value of the earliest added item without removing it, while Rear inspection checks the most recently enqueued item. Both operate in $O(1)$ time and $O(1)$ space.",
    example: "Front element is accessed directly via queue[front].",
  },
];

export const INITIAL_QUEUE_ELEMENTS = [14, 28, 42, 56];
export const DEFAULT_QUEUE_CAPACITY = 7;
