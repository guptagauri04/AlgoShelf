import { useState, useEffect, useRef } from "react";
import {
    BarChart3,
    ArrowLeftRight,
    Scale,
    Activity,
} from "lucide-react";
import MergeArrayBars from "./MergeArrayBars";
import MergeTree from "./MergeTree";
import ControlPanel from "./ControlPanel";
import StatCard from "../../../components/StatCard";
import PseudocodeSection from "./sections/PseudocodeSection";

import { bubbleSortSteps } from "../utils/bubbleSortSteps";
import { selectionSortSteps } from "../utils/selectionSortSteps";
import { insertionSortSteps } from "../utils/insertionSortSteps";
import { mergeSortSteps } from "../utils/mergeSortSteps";

import { generateRandomArray } from "../utils/generateRandomArray";
import StepExplanation from "./StepExplanation";
import { Turtle, Rabbit } from "lucide-react";

export default function AlgorithmVisualizer({
    algorithm,
    pseudocode,
}) {

    const [array, setArray] = useState(generateRandomArray());

    const [comparing, setComparing] = useState([]);

    const [sorted, setSorted] = useState([]);

    const [comparisons, setComparisons] = useState(0);

    const [swaps, setSwaps] = useState(0);

    const [currentPass, setCurrentPass] = useState(0);

    const [leftIndex, setLeftIndex] = useState(-1);

    const [rightIndex, setRightIndex] = useState(-1);

    const [visibleSegments, setVisibleSegments] = useState([]);

    const [phase, setPhase] = useState("divide");

    const [currentStep, setCurrentStep] = useState(0);

    const [message, setMessage] = useState({
        title: "Ready",
        description: "Press Play to begin the visualization.",
        insight:
            "Each comparison and swap will be explained as the algorithm progresses.",
    });

    const [playing, setPlaying] = useState(false);

    const [currentLine, setCurrentLine] = useState(-1);

    const [steps, setSteps] = useState([]);

    const [speed, setSpeed] = useState(500);

    const [arraySize, setArraySize] = useState(10);

    const timerRef = useRef(null);

    function handleShuffle() {

        clearInterval(timerRef.current);

        const newArray = generateRandomArray(arraySize);

        setArray(newArray);

        setComparing([]);

        setSorted([]);

        setComparisons(0);

        setSwaps(0);

        setCurrentStep(0);

        setCurrentLine(-1);

        setMessage({
            title: "Array Shuffled",
            description: "A new random array has been generated.",
            insight:
                `Press Play to watch ${algorithm.title} organize this new array.`,
        });

        setCurrentPass(1);

        setLeftIndex(-1);

        setRightIndex(-1);

        setVisibleSegments([]);

        setPhase("divide");

        setSteps([]);

        setPlaying(false);

    }

    function handlePlay() {

        if (playing) return;

        let animationSteps = steps;

        if (animationSteps.length === 0) {

            if (algorithm.id === "bubble") {
                animationSteps = bubbleSortSteps(array);
            } else if (algorithm.id === "selection") {
                animationSteps = selectionSortSteps(array);
            } else if (algorithm.id === "insertion") {
                animationSteps = insertionSortSteps(array);
            } else if (algorithm.id === "merge") {
                animationSteps = mergeSortSteps(array);
            }

            setSteps(animationSteps);

            setCurrentStep(0);

        }

        setPlaying(true);

    }

    function handlePause() {

        clearInterval(timerRef.current);

        setPlaying(false);

        setMessage({
            title: "Visualization Paused",
            description: "The animation has been paused.",
            insight:
                "Press Play to continue exactly where the visualization stopped.",
        });

    }

    function handleReset() {

        clearInterval(timerRef.current);

        setPlaying(false);

        const originalArray =
            steps.length > 0
                ? steps[0].array
                : array;

        setArray([...originalArray]);

        setCurrentStep(0);

        setSteps([]);

        setComparing([]);

        setSorted([]);

        setComparisons(0);

        setSwaps(0);

        setCurrentLine(-1);

        setVisibleSegments([]);

        setPhase("divide");

        setMessage({
            title: "Visualization Reset",
            description: "The array has been restored to its initial state.",
            insight:
                `Press Play whenever you're ready to watch ${algorithm.title} again.`,
        });

    }

    useEffect(() => {

        if (!playing) return;

        if (steps.length === 0) return;

        clearInterval(timerRef.current);

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

    useEffect(() => {

        if (steps.length === 0) return;

        const frame = steps[currentStep];

        if (!frame) return;

        setArray(frame.array);

        setComparing(frame.comparing);

        setSorted(frame.sorted);

        setComparisons(frame.comparisons);

        setSwaps(frame.swaps);

        setCurrentLine(frame.currentLine);

        setMessage(frame.message);

        setCurrentPass(frame.currentPass);

        setLeftIndex(frame.leftIndex);

        setRightIndex(frame.rightIndex);

        setVisibleSegments(frame.visibleSegments || []);

        setPhase(frame.phase || "divide");

        if (currentStep >= steps.length - 1) {
            setPlaying(false);

            setMessage({
                title: "Sorting Complete",
                description:
                    "The array is now fully sorted in ascending order.",
                insight:
                    `${algorithm.title} has finished. Every element is now in its correct position.`,
            });
        }

    }, [currentStep, steps, algorithm?.title]);

    const progress =
        steps.length > 0
            ? (currentStep / (steps.length - 1)) * 100
            : 0;

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
                    Watch {algorithm.title} in Action
                </h2>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5F5952]">
                    Learn by watching every comparison,
                    swap and decision the algorithm makes.
                </p>

            </div>

            <div className="mb-8 rounded-2xl border border-[#E8DDD1] bg-white p-5">

                <div className="mb-3 flex items-center justify-between">

                    <span className="text-sm font-medium text-[#6B645D]">
                        Algorithm Progress
                    </span>

                    <div className="text-right">

                        <p className="text-sm font-semibold text-[#A1764E]">
                            {Math.round(progress)}%
                        </p>

                        <p className="text-xs text-[#8C837B]">
                            Pass {currentPass} of {array.length}
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

                <div className="rounded-3xl border border-[#E8DDD1] bg-white p-8">

                    <MergeArrayBars
                        array={array}
                        comparing={comparing}
                        sorted={sorted}
                        phase={phase}
                        visibleSegments={visibleSegments}
                    />

                    {/* Controls */}
                    <div className="mt-8 border-t border-[#EEE5DB] pt-6">
                        <ControlPanel
                            playing={playing}
                            onShuffle={handleShuffle}
                            onPlay={handlePlay}
                            onPause={handlePause}
                            onReset={handleReset}
                        />
                    </div>

                    {/* Merge Tree */}
                    {algorithm.id === "merge" && (
                        <div className="mt-10 border-t border-[#EEE5DB] pt-8">

                            <h3 className="text-center font-Cormorant text-3xl text-[#1F1B18]">
                                Recursive Split
                            </h3>

                            <p className="mt-2 text-center text-[#6B645D]">
                                Watch how Merge Sort recursively divides the array.
                            </p>

                            <div className="mt-8">
                                <MergeTree
                                    array={array}
                                    currentLevel={currentPass}
                                    leftIndex={leftIndex}
                                    rightIndex={rightIndex}
                                />
                            </div>

                        </div>
                    )}

                </div>

                {/* RIGHT PANEL */}

                <div className="rounded-3xl border border-[#E8DDD1] bg-white p-8">

                    <PseudocodeSection
                        pseudocode={pseudocode}
                        currentLine={currentLine}
                    />

                </div>

            </div>

            {/* Step Explanation */}

            <StepExplanation message={message} />

            {/* Statistics */}

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Comparisons"
                    value={comparisons}
                    subtitle="Adjacent checks"
                    icon={Scale}
                />

                <StatCard
                    title={
                        algorithm.id === "insertion"
                            ? "Shifts"
                            : algorithm.id === "merge"
                                ? "Writes"
                                : "Swaps"
                    }
                    value={swaps}
                    subtitle={
                        algorithm.id === "insertion"
                            ? "Elements shifted"
                            : algorithm.id === "merge"
                                ? "Array writes"
                                : "Elements exchanged"
                    }
                    icon={ArrowLeftRight}
                />

                <StatCard
                    title={
                        algorithm.id === "merge"
                            ? "Merge Level"
                            : "Current Pass"
                    }
                    value={
                        algorithm.id === "merge"
                            ? currentPass
                            : `${currentPass} / ${array.length}`
                    }
                    subtitle={
                        algorithm.id === "merge"
                            ? "Current recursion depth"
                            : "Current sorting pass"
                    }
                    icon={BarChart3}
                />

                <StatCard
                    title="Progress"
                    value={`${Math.round(progress)}%`}
                    subtitle="Sorting completed"
                    icon={Activity}
                />

            </div>

            {/* Visualization Settings */}

            <div className="mt-10 rounded-3xl border border-[#E8DDD1] bg-white p-8">

                <h3 className="font-Cormorant text-2xl text-[#1F1B18]">
                    Visualization Settings
                </h3>

                <p className="mt-2 text-[#6B645D]">
                    Adjust the animation before running the algorithm.
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
                                    Choose how many values to sort
                                </span>
                            </div>

                        </div>

                        <input
                            type="range"
                            min="5"
                            max="25"
                            step="1"
                            value={arraySize}
                            disabled={playing}
                            onChange={(e) => {
                                const size = Number(e.target.value);

                                setArraySize(size);

                                const newArray = generateRandomArray(size);

                                setArray(newArray);

                                setSteps([]);
                                setCurrentStep(0);
                                setComparisons(0);
                                setSwaps(0);
                                setComparing([]);
                                setSorted([]);
                                setCurrentLine(-1);

                                setMessage({
                                    title: "Array Resized",
                                    description: `Generated a new array containing ${size} elements.`,
                                    insight:
                                        "Larger arrays require more comparisons and swaps, making the animation longer.",
                                });

                                setPlaying(false);
                                clearInterval(timerRef.current);
                            }}
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
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            className="w-full accent-[#A1764E]"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}