import { useState, useCallback } from "react";

export default function useQueueVisualizer(initialCapacity = 7) {
  const [queue, setQueue] = useState([12, 27, 45, 68]);
  const [capacity] = useState(initialCapacity);
  const [peekIndex, setPeekIndex] = useState(-1);
  const [lastAction, setLastAction] = useState({ type: "init" });
  const [message, setMessage] = useState({
    title: "Queue Ready",
    description: "The queue is initialized with 4 elements in FIFO order. Front is 12, Rear is 68.",
    insight: "Elements enter at the Rear (tail) and leave strictly from the Front (head).",
  });
  const [logs, setLogs] = useState([
    { id: 1, text: "Queue initialized with [12, 27, 45, 68]", time: "Initial", type: "info" },
  ]);

  const addLog = useCallback((text, type = "info") => {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLogs((prev) => [{ id: Date.now() + Math.random(), text, time: timestamp, type }, ...prev.slice(0, 19)]);
  }, []);

  const enqueue = useCallback(
    (value) => {
      setPeekIndex(-1);
      const num = Number(value);
      if (!Number.isFinite(num)) {
        setMessage({
          title: "Invalid Input",
          description: "Please enter a valid finite number to enqueue.",
          insight: "A queue requires concrete values to buffer in sequence.",
        });
        return false;
      }

      if (queue.length >= capacity) {
        setLastAction({ type: "overflow", val: num });
        setMessage({
          title: "Queue Overflow Alert!",
          description: `Cannot enqueue ${num}. The queue has reached its maximum capacity of ${capacity} elements.`,
          insight: "Queue Overflow happens when a producer enqueues faster than consumers dequeue, filling the buffer limit.",
        });
        addLog(`Enqueue rejected: Queue Overflow (Capacity: ${capacity})`, "error");
        return false;
      }

      const nextQueue = [...queue, num];
      setQueue(nextQueue);
      setLastAction({ type: "enqueue", val: num });
      setMessage({
        title: `Enqueued ${num} at Rear`,
        description: `Element ${num} joined the tail of the queue at index ${nextQueue.length - 1}.`,
        insight: "In FIFO, new arrivals wait their turn at the Rear and will be processed after all preceding elements.",
      });
      addLog(`Enqueued ${num} at rear (index ${nextQueue.length - 1})`, "success");
      return true;
    },
    [queue, capacity, addLog]
  );

  const dequeue = useCallback(() => {
    setPeekIndex(-1);
    if (queue.length === 0) {
      setLastAction({ type: "underflow" });
      setMessage({
        title: "Queue Underflow Alert!",
        description: "Cannot dequeue. The queue is empty.",
        insight: "Queue Underflow occurs when consumers request items from an exhausted buffer.",
      });
      addLog("Dequeue rejected: Queue Underflow (Queue is empty)", "error");
      return null;
    }

    const dequeuedVal = queue[0];
    const nextQueue = queue.slice(1);
    setQueue(nextQueue);
    setLastAction({ type: "dequeue", val: dequeuedVal });
    setMessage({
      title: `Dequeued ${dequeuedVal} from Front`,
      description: `Served and removed front element ${dequeuedVal}. New front is ${
        nextQueue.length > 0 ? nextQueue[0] : "None (empty)"
      }.`,
      insight: "Dequeue always dispatches the oldest remaining arrival first, honoring temporal fairness.",
    });
    addLog(`Dequeued ${dequeuedVal} from front`, "warning");
    return dequeuedVal;
  }, [queue, addLog]);

  const peekFront = useCallback(() => {
    if (queue.length === 0) {
      setPeekIndex(-1);
      setLastAction({ type: "underflow" });
      setMessage({
        title: "Queue is Empty",
        description: "Cannot peek front. There are no elements in the queue.",
        insight: "Peek Front examines the head element without removing it.",
      });
      addLog("Peek Front rejected: Queue is empty", "error");
      return null;
    }

    const frontVal = queue[0];
    setPeekIndex(0);
    setLastAction({ type: "peekFront", val: frontVal });
    setMessage({
      title: `Peeked Front Element: ${frontVal}`,
      description: `Front of queue holds value ${frontVal} at index 0. It is next in line to be dequeued.`,
      insight: "Peeking Front inspects the next element to be processed in O(1) time without mutating the queue.",
    });
    addLog(`Peeked front element: ${frontVal}`, "info");
    return frontVal;
  }, [queue, addLog]);

  const peekRear = useCallback(() => {
    if (queue.length === 0) {
      setPeekIndex(-1);
      setLastAction({ type: "underflow" });
      setMessage({
        title: "Queue is Empty",
        description: "Cannot peek rear. There are no elements in the queue.",
        insight: "Peek Rear examines the most recently enqueued element.",
      });
      addLog("Peek Rear rejected: Queue is empty", "error");
      return null;
    }

    const rearIdx = queue.length - 1;
    const rearVal = queue[rearIdx];
    setPeekIndex(rearIdx);
    setLastAction({ type: "peekRear", val: rearVal });
    setMessage({
      title: `Peeked Rear Element: ${rearVal}`,
      description: `Rear of queue holds value ${rearVal} at index ${rearIdx}. It is the newest arrival.`,
      insight: "The rear element will only be serviced after all earlier elements are dequeued.",
    });
    addLog(`Peeked rear element: ${rearVal} at index ${rearIdx}`, "info");
    return rearVal;
  }, [queue, addLog]);

  const clear = useCallback(() => {
    setQueue([]);
    setPeekIndex(-1);
    setLastAction({ type: "clear" });
    setMessage({
      title: "Queue Cleared",
      description: "All elements were removed from the queue.",
      insight: "An empty queue has length = 0 and both front and rear pointers idle.",
    });
    addLog("Queue cleared to empty state", "info");
  }, [addLog]);

  const enqueueRandom = useCallback(() => {
    const randomVal = Math.floor(Math.random() * 90) + 10;
    return enqueue(randomVal);
  }, [enqueue]);

  return {
    queue,
    capacity,
    frontIndex: queue.length > 0 ? 0 : -1,
    rearIndex: queue.length > 0 ? queue.length - 1 : -1,
    peekIndex,
    lastAction,
    message,
    logs,
    enqueue,
    dequeue,
    peekFront,
    peekRear,
    clear,
    enqueueRandom,
  };
}
