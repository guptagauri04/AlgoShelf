import { useState, useCallback } from "react";

export default function useStackVisualizer(initialCapacity = 6) {
  const [stack, setStack] = useState([18, 34, 52]);
  const [capacity] = useState(initialCapacity);
  const [peekIndex, setPeekIndex] = useState(-1);
  const [lastAction, setLastAction] = useState({ type: "init" });
  const [message, setMessage] = useState({
    title: "Stack Ready",
    description: "The stack is initialized with 3 elements following LIFO order. The top element is 52.",
    insight: "Elements can only be pushed or popped from the single open end: the Top.",
  });
  const [logs, setLogs] = useState([
    { id: 1, text: "Stack initialized with [18, 34, 52]", time: "Initial", type: "info" },
  ]);

  const addLog = useCallback((text, type = "info") => {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLogs((prev) => [{ id: Date.now() + Math.random(), text, time: timestamp, type }, ...prev.slice(0, 19)]);
  }, []);

  const push = useCallback(
    (value) => {
      setPeekIndex(-1);
      const num = Number(value);
      if (!Number.isFinite(num)) {
        setMessage({
          title: "Invalid Input",
          description: "Please enter a valid finite number to push onto the stack.",
          insight: "A stack requires concrete data elements to store in its memory cells.",
        });
        return false;
      }

      if (stack.length >= capacity) {
        setLastAction({ type: "overflow", val: num });
        setMessage({
          title: "Stack Overflow Alert!",
          description: `Cannot push ${num}. The stack is already full with maximum capacity of ${capacity} elements.`,
          insight: "Stack Overflow occurs when an insertion is requested on a stack that has exhausted its allocated capacity.",
        });
        addLog(`Push rejected: Stack Overflow (Capacity: ${capacity})`, "error");
        return false;
      }

      const nextStack = [...stack, num];
      setStack(nextStack);
      setLastAction({ type: "push", val: num });
      setMessage({
        title: `Pushed ${num} onto Stack`,
        description: `Element ${num} was successfully pushed onto the top of the stack at index ${nextStack.length - 1}.`,
        insight: "In LIFO, the most recently pushed item becomes the new Top and will be the first candidate for Pop.",
      });
      addLog(`Pushed ${num} onto top (index ${nextStack.length - 1})`, "success");
      return true;
    },
    [stack, capacity, addLog]
  );

  const pop = useCallback(() => {
    setPeekIndex(-1);
    if (stack.length === 0) {
      setLastAction({ type: "underflow" });
      setMessage({
        title: "Stack Underflow Alert!",
        description: "Cannot pop an element. The stack is empty.",
        insight: "Stack Underflow occurs when an extraction is attempted on a collection with zero elements.",
      });
      addLog("Pop rejected: Stack Underflow (Stack is empty)", "error");
      return null;
    }

    const poppedVal = stack[stack.length - 1];
    const nextStack = stack.slice(0, -1);
    setStack(nextStack);
    setLastAction({ type: "pop", val: poppedVal });
    setMessage({
      title: `Popped ${poppedVal} from Stack`,
      description: `Successfully removed topmost element ${poppedVal}. New top element is ${
        nextStack.length > 0 ? nextStack[nextStack.length - 1] : "None (empty)"
      }.`,
      insight: "Pop removes strictly from the top, preserving the LIFO ordering of all elements below it.",
    });
    addLog(`Popped ${poppedVal} from top`, "warning");
    return poppedVal;
  }, [stack, addLog]);

  const peek = useCallback(() => {
    if (stack.length === 0) {
      setPeekIndex(-1);
      setLastAction({ type: "underflow" });
      setMessage({
        title: "Stack is Empty",
        description: "Cannot peek. There is no top element in an empty stack.",
        insight: "Peek returns the element at the top index without altering the stack size.",
      });
      addLog("Peek rejected: Stack is empty", "error");
      return null;
    }

    const topIdx = stack.length - 1;
    const topVal = stack[topIdx];
    setPeekIndex(topIdx);
    setLastAction({ type: "peek", val: topVal });
    setMessage({
      title: `Peeked Top Element: ${topVal}`,
      description: `Top of stack holds value ${topVal} at index ${topIdx}. The stack structure remains completely unchanged.`,
      insight: "Peek provides non-destructive inspection of the top element in constant O(1) time.",
    });
    addLog(`Peeked top element: ${topVal} at index ${topIdx}`, "info");
    return topVal;
  }, [stack, addLog]);

  const clear = useCallback(() => {
    setStack([]);
    setPeekIndex(-1);
    setLastAction({ type: "clear" });
    setMessage({
      title: "Stack Cleared",
      description: "All elements were removed from the stack.",
      insight: "An empty stack has top pointer = -1 and size = 0.",
    });
    addLog("Stack cleared to empty state", "info");
  }, [addLog]);

  const pushRandom = useCallback(() => {
    const randomVal = Math.floor(Math.random() * 90) + 10;
    return push(randomVal);
  }, [push]);

  return {
    stack,
    capacity,
    topIndex: stack.length - 1,
    peekIndex,
    lastAction,
    message,
    logs,
    push,
    pop,
    peek,
    clear,
    pushRandom,
  };
}
