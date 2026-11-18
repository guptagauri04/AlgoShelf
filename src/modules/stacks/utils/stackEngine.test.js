/**
 * Comprehensive Unit Tests for ArrayStack Model
 */
import { ArrayStack } from "./stackEngine";

export function runStackSelfTests() {
  const results = [];

  // Test 1: Empty stack initialization
  const stack = new ArrayStack(4);
  results.push({ name: "Initial state is empty", pass: stack.isEmpty() && stack.size() === 0 });

  // Test 2: Push elements
  stack.push(10);
  stack.push(20);
  results.push({ name: "Pushes increment size", pass: stack.size() === 2 && stack.peek() === 20 });

  // Test 3: LIFO order upon Pop
  const popped = stack.pop();
  results.push({ name: "LIFO Pop returns last pushed", pass: popped === 20 && stack.size() === 1 });

  // Test 4: Overflow detection
  stack.push(30);
  stack.push(40);
  stack.push(50); // stack now full (capacity 4)
  results.push({ name: "Full detection", pass: stack.isFull() });

  let overflowCaught = false;
  try {
    stack.push(60);
  } catch {
    overflowCaught = true;
  }
  results.push({ name: "Overflow throws error", pass: overflowCaught });

  return results;
}
