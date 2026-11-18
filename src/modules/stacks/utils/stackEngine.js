/**
 * Core Stack Data Structure Model with Array Backing
 */
export class ArrayStack {
  constructor(capacity = 7) {
    this.capacity = capacity;
    this.items = [];
  }

  isFull() {
    return this.items.length >= this.capacity;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  topIndex() {
    return this.items.length - 1;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  push(value) {
    if (this.isFull()) {
      throw new Error(`Stack Overflow: Capacity of ${this.capacity} reached.`);
    }
    this.items.push(value);
    return this.items.length - 1;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack Underflow: Stack is empty.");
    }
    return this.items.pop();
  }

  toArray() {
    return [...this.items];
  }
}
