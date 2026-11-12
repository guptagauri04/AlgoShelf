import { useState, useEffect, useRef } from "react";
import {
  BarChart3,
  ArrowLeftRight,
  Scale,
  Activity,
  Rabbit,
  Turtle,
} from "lucide-react";

import TraversalArray from "./TraversalArray";
import TraversalControls from "./TraversalControls";
import TraversalPseudocode from "./TraversalPseudocode";
import TraversalStepExplanation from "./TraversalStepExplanation";
import ArrayInput from "./ArrayInput";
import StatCard from "../../../components/StatCard";

import { traversalSteps } from "../utils/traversalSteps";
import { generateRandomArray } from "../utils/generateRandomArray";
import {
  parseArrayInput,
  MAX_ARRAY_SIZE,
} from "../utils/parseArrayInput";
import { traversalContent } from "../data/traversal";

const READY_MESSAGE = {
  title: "Ready",
  description: "Press Play to begin the visualization.",
  insight:
    "Every index will be pointed at, read out loud and marked as visited — one element at a time.",
};

const PAUSED_MESSAGE = {
  title: "Visualization Paused",
  description: "The animation has been paused.",
  insight: "Press Play to continue exactly where the traversal stopped.",
};

const RESET_MESSAGE = {
  title: "Visualization Reset",
  description: "The array has been restored to its initial state.",
  insight: "Press Play whenever you are ready to watch the traversal again.",
};

const SHUFFLE_MESSAGE = {
  title: "Array Shuffled",
  description: "A new random array has been generated.",
  insight: "Press Play to watch the traversal visit every element.",
};

function resizeMessage(size) {
  return {
    title: "Array Resized",
    description: `Generated a new array containing ${size} elements.`,
    insight:
      "A longer array needs more traversal steps, so the animation takes longer to finish.",
  };
}

function createdMessage(size) {
  return {
    title: "Array Created",
    description: `Loaded your array with ${size} elements.`,
    insight:
      "Press Play to traverse your own values from index 0 to index " +
      `${size - 1}.`,
  };
}

export default function TraversalVisualizer() {
  const [baseArray, setBaseArray] = useState(() => generateRandomArray(10));

  const [steps, setSteps] = useState([]);

  const [currentStep, setCurrentStep] = useState(0);

  const [playing, setPlaying] = useState(false);

  const [speed, setSpeed] = useState(500);

  const [arraySize, setArraySize] = useState(10);

  const [inputValue, setInputValue] = useState("");

  const [inputError, setInputError] = useState(null);

  const [notice, setNotice] = useState(null);

  const timerRef = useRef(null);

  /* The current frame is derived from the step list instead of being copied
     into state by an effect, which keeps the render pure and lint clean. */

  const frame =
    steps.length > 0
      ? steps[Math.min(currentStep, steps.length - 1)]
      : null;

  const array = frame ? frame.array : baseArray;
  const currentIndex = frame ? frame.currentIndex : -1;
  const visited = frame ? frame.visited : [];
  const accesses = frame ? frame.accesses : 0;
  const currentLine = frame ? frame.currentLine : -1;
  const message = notice ?? (frame ? frame.message : READY_MESSAGE);

  const progress =
    steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 0;

  function clearTimer() {
    clearInterval(timerRef.current);
  }

  function resetSteps(nextNotice) {
    clearTimer();
    setSteps([]);
    setCurrentStep(0);
    setPlaying(false);
    setNotice(nextNotice);
  }

  function handleShuffle() {
    const newArray = generateRandomArray(arraySize);

    setBaseArray(newArray);
    resetSteps(SHUFFLE_MESSAGE);
  }

  function handlePlay() {
    if (playing) return;

    if (steps.length > 0 && currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }

    if (steps.length === 0) {
      setSteps(traversalSteps(baseArray));
      setCurrentStep(0);
    }

    setNotice(null);
    setPlaying(true);
  }

  function handlePause() {
    clearTimer();
    setPlaying(false);
    setNotice(PAUSED_MESSAGE);
  }

  function handleReset() {
    const originalArray =
      steps.length > 0 ? steps[0].array : baseArray;

    setBaseArray([...originalArray]);
    resetSteps(RESET_MESSAGE);
  }

  function handleSizeChange(event) {
    const size = Number(event.target.value);

    setArraySize(size);
    setBaseArray(generateRandomArray(size));
    resetSteps(resizeMessage(size));
  }

  function handleInputChange(value) {
    setInputValue(value);

    if (inputError) setInputError(null);
  }

  function handleApplyArray() {
    const { values, error } = parseArrayInput(inputValue);

    if (error) {
      setInputError(error);
      return;
    }

    setInputError(null);
    setBaseArray(values);
    setArraySize(values.length);
    resetSteps(createdMessage(values.length));
  }

  useEffect(() => {
    if (!playing) return;
    if (steps.length === 0) return;

    clearTimer();

    timerRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timerRef.current);
          setPlaying(false);
          return prev;
        }

        return prev + 1;
      });
    }, speed);

    return () => clearInterval(timerRef.current);
  }, [playing, steps, speed]);

  return (
    <section
      id="visualizer"
      className="mx-auto max-w-7xl scroll-mt-24 px-8 py-24"
    >
      {/* Heading */}

      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.35em] text-[#A1764E]">
          Interactive Visualizer
        </p>

        <h2 className="mt-4 font-Cormorant text-5xl text-[#1F1B18]">
          Watch Array Traversal in Action
        </h2>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5F5952]">
          See how each element is reached through its index — highlighted
          one by one until the whole array has been visited.
        </p>
      </div>

      {/* Progress */}

      <div className="mb-8 rounded-2xl border border-[#E8DDD1] bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-[#6B645D]">
            Traversal Progress
          </span>

          <div className="text-right">
            <p className="text-sm font-semibold text-[#A1764E]">
              {Math.round(progress)}%
            </p>

            <p className="text-xs text-[#8C837B]">
              {steps.length > 0
                ? `Step ${currentStep + 1} of ${steps.length}`
                : `${visited.length} of ${array.length} elements visited`}
            </p>
          </div>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-[#EFE8DF]">
          <div
            className="h-full rounded-full bg-[#A1764E] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Workspace */}

      <div className="grid gap-8 lg:grid-cols-[1.75fr_1fr]">

        {/* LEFT PANEL */}

        <div className="flex min-h-[650px] flex-col rounded-3xl border border-[#E8DDD1] bg-white p-8">

          <div className="flex-1">
            <TraversalArray
              array={array}
              currentIndex={currentIndex}
              visited={visited}
            />
          </div>

          <div className="mt-8 border-t border-[#EEE5DB] pt-6">

            <TraversalControls
              playing={playing}
              onShuffle={handleShuffle}
              onPlay={handlePlay}
              onPause={handlePause}
              onReset={handleReset}
            />

            <ArrayInput
              value={inputValue}
              onChange={handleInputChange}
              onApply={handleApplyArray}
              error={inputError}
              disabled={playing}
            />
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="rounded-3xl border border-[#E8DDD1] bg-white p-8">
          <TraversalPseudocode
            pseudocode={traversalContent.pseudocode}
            currentLine={currentLine}
          />
        </div>
      </div>

      {/* Step Explanation */}

      <TraversalStepExplanation message={message} />

      {/* Statistics */}

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Elements Visited"
          value={`${visited.length} / ${array.length}`}
          subtitle="Indices covered so far"
          icon={Activity}
        />

        <StatCard
          title="Current Index"
          value={currentIndex === -1 ? "—" : currentIndex}
          subtitle={
            currentIndex === -1
              ? "No element is being accessed"
              : `Reading arr[${currentIndex}]`
          }
          icon={ArrowLeftRight}
        />

        <StatCard
          title="Elements Read"
          value={accesses}
          subtitle="Direct index accesses"
          icon={Scale}
        />

        <StatCard
          title="Progress"
          value={`${Math.round(progress)}%`}
          subtitle="Traversal completed"
          icon={BarChart3}
        />
      </div>

      {/* Visualization Settings */}

      <div className="mt-10 rounded-3xl border border-[#E8DDD1] bg-white p-8">

        <h3 className="font-Cormorant text-2xl text-[#1F1B18]">
          Visualization Settings
        </h3>

        <p className="mt-2 text-[#6B645D]">
          Adjust the animation before running the traversal.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">

          {/* Array Size */}

          <div>
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <p className="font-medium text-[#1F1B18]">
                  Array Size
                </p>

                <span className="text-sm text-[#A1764E]">
                  {arraySize} Elements
                </span>
              </div>

              <div className="mt-2 h-5">
                <span className="text-sm text-[#8C837B]">
                  Choose how many values to traverse
                </span>
              </div>
            </div>

            <input
              type="range"
              min="2"
              max={MAX_ARRAY_SIZE}
              step="1"
              value={Math.min(arraySize, MAX_ARRAY_SIZE)}
              disabled={playing}
              onChange={handleSizeChange}
              className="w-full accent-[#A1764E] disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>

          {/* Animation Speed */}

          <div>
            <div className="mb-3">
              <p className="font-medium text-[#1F1B18]">
                Animation Speed
              </p>

              <div className="mt-2 flex h-5 items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm text-[#8C837B]">
                  <Rabbit
                    size={15}
                    strokeWidth={2}
                    className="text-[#A1764E]"
                  />
                  <span>Fast</span>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-[#8C837B]">
                  <span>Slow</span>
                  <Turtle
                    size={15}
                    strokeWidth={2}
                    className="text-[#A1764E]"
                  />
                </div>
              </div>
            </div>

            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
              className="w-full accent-[#A1764E]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
