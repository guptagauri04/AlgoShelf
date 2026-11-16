
import { useState } from "react";
import useLinkedList from "../hooks/useLinkedList";
import LinkedListVisualizer from "../components/LinkedListVisualizer";
import LinkedListControls from "../components/LinkedListControls";

const SinglyLinkedList = () => {
  const {
    nodes,
    currentNode,
    currentNodeIndex,
    traversalSteps,
    currentStep,
    status,
    addNode,
    startTraversal,
    nextStep,
    resetList,
  } = useLinkedList();

  const [autoPlay, setAutoPlay] = useState(false);

  // Automatically move through traversal steps
  const handleAutoPlay = () => {
    if (status === "completed") return;

    if (status === "idle") {
      startTraversal();
      setAutoPlay(true);
      return;
    }

    setAutoPlay(true);
  };

  // Stop automatic traversal when completed
  const stopAutoPlay = () => {
    setAutoPlay(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Page Heading */}
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#A1764E]">
            Data Structures / Linked Lists
          </p>

          <h1 className="text-3xl font-bold text-[#1F1B18] sm:text-4xl">
            Singly Linked List Traversal
          </h1>

          <p className="max-w-3xl text-gray-600">
            Understand how traversal works in a singly linked list.
            Follow the pointers from the head node until NULL is reached.
          </p>
        </div>

        {/* Controls */}
        <LinkedListControls
          addNode={addNode}
          startTraversal={startTraversal}
          nextStep={nextStep}
          resetList={resetList}
          status={status}
          currentStep={currentStep}
          totalSteps={traversalSteps.length}
          autoPlay={autoPlay}
          setAutoPlay={setAutoPlay}
          stopAutoPlay={stopAutoPlay}
        />

        {/* Visualization */}
        <LinkedListVisualizer
          nodes={nodes}
          currentNode={currentNode}
          currentNodeIndex={currentNodeIndex}
          traversalSteps={traversalSteps}
          currentStep={currentStep}
          status={status}
        />

        {/* Traversal Information */}
        <div className="rounded-xl border border-[#E8E1D9] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1F1B18]">
            How Traversal Works
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-600">
            <li>Start from the HEAD pointer.</li>
            <li>Access the data stored in the current node.</li>
            <li>Follow the current node's next pointer.</li>
            <li>Repeat until the next pointer becomes NULL.</li>
            <li>Stop traversal when the end of the list is reached.</li>
          </ol>
        </div>

      </div>
    </div>
  );
};

export default SinglyLinkedList;
