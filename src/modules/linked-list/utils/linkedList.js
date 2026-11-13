
// Represents an individual node in the linked list
export class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Manages the singly linked list
export default class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Adds a new node at the end of the list
  append(data) {
    const newNode = new ListNode(data);

    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;

      while (current.next !== null) {
        current = current.next;
      }

      current.next = newNode;
    }

    this.size++;
    return newNode;
  }

  // Returns all nodes with their pointer information
  getNodes() {
    const nodes = [];
    let current = this.head;
    let index = 0;

    while (current !== null) {
      nodes.push({
        id: index,
        data: current.data,
        next: current.next !== null ? index + 1 : null,
      });

      current = current.next;
      index++;
    }

    return nodes;
  }

  // Generates steps for visualizing traversal
  traverse() {
    const steps = [];
    let current = this.head;
    let index = 0;

    while (current !== null) {
      steps.push({
        type: "visit",
        index,
        data: current.data,
      });

      current = current.next;
      index++;
    }

    // Traversal ends when current becomes NULL
    steps.push({
      type: "complete",
      index: null,
      data: null,
    });

    return steps;
  }

  // Removes all nodes
  clear() {
    this.head = null;
    this.size = 0;
  }
}
