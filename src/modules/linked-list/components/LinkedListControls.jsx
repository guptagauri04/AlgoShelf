
import { useState } from "react";

const LinkedListControls = ({
  addNode,
  startTraversal,
  nextStep,
  resetList,
  status = "idle",
  currentStep = -1,
  totalSteps = 0,
}) => {
  const [inputValue, setInputValue] = useState("");

  // Add a new node
  const handleAddNode = () => {
    const value = inputValue.trim();

    if (value === "") return;

    const success = addNode(value);

    if (success !== false) {
      setInputValue("");
    }
  };

  // Handle Enter key
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddNode();
    }
  };

  // Reset the linked list
  const handleReset = () => {
    resetList();
    setInputValue("");
  };

  return (
    <div className="w-full space-y-5 rounded-xl border border-[#E8E1D9] bg-white p-5 shadow-sm">

      {/* Add Node Section */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-[#1F1B18]">
          Linked List Controls
        </h2>

        <label
          htmlFor="node-value"
          className="mb-2 block text-sm font-medium text-gray-600"
        >
          Enter node value
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="node-value"
            type="number"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a value (e.g. 10)"
            className="w-full rounded-lg border border-[#E8E1D9] px-4 py-3 text-sm outline-none transition focus:border-[#A1764E] focus:ring-2 focus:ring-[#A1764E]/20"
          />

          <button
            onClick={handleAddNode}
            disabled={inputValue.trim() === ""}
            className="rounded-lg bg-[#A1764E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#896341] disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Add Node
          </button>
        </div>
      </div>

      {/* Traversal Buttons */}
      <div className="flex flex-wrap gap-3 border-t border-[#E8E1D9] pt-5">

        <button
          onClick={startTraversal}
          disabled={status === "running" || status === "completed"}
          className="rounded-lg bg-[#1F1B18] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#39332E] disabled:cursor-not-allowed disabled:opacity-40"
        >
          ▶ Start Traversal
        </button>

        <button
          onClick={nextStep}
          disabled={status !== "running"}
          className="rounded-lg border border-[#A1764E] px-5 py-3 text-sm font-semibold text-[#A1764E] transition hover:bg-[#A1764E]/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next Step →
        </button>

        <button
          onClick={handleReset}
          className="rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          ↻ Reset
        </button>
      </div>

      {/* Traversal Progress */}
      <div className="border-t border-[#E8E1D9] pt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Traversal Progress
          </span>

          <span className="text-sm font-semibold text-[#A1764E]">
            {status === "idle"
              ? "Not started"
              : status === "completed"
              ? "Completed"
              : `${Math.min(currentStep + 1, totalSteps)} / ${totalSteps}`}
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-[#EEE8E1]">
          <div
            className="h-full rounded-full bg-[#A1764E] transition-all duration-300"
            style={{
              width:
                status === "completed"
                  ? "100%"
                  : status === "running" && totalSteps > 0
                  ? `${((currentStep + 1) / totalSteps) * 100}%`
                  : "0%",
            }}
          />
        </div>
      </div>

      {/* Status Message */}
      <div className="rounded-lg bg-[#F7F5F2] p-3 text-sm">
        {status === "idle" && (
          <p className="text-gray-600">
            Add nodes and start traversal when you're ready.
          </p>
        )}

        {status === "running" && (
          <p className="font-medium text-[#A1764E]">
            Traversal is in progress. Click Next Step to continue.
          </p>
        )}

        {status === "completed" && (
          <p className="font-medium text-green-700">
            ✓ Traversal completed! Reached NULL.
          </p>
        )}
      </div>
    </div>
  );
};

export default LinkedListControls;
