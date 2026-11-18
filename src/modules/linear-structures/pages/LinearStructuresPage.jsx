import { useState } from "react";
import Footer from "../../../components/Footer";
import LinearStructuresHeader from "../components/LinearStructuresHeader";
import StackVisualizer from "../components/StackVisualizer";
import QueueVisualizer from "../components/QueueVisualizer";
import StackControls from "../components/StackControls";
import QueueControls from "../components/QueueControls";
import OperationLog from "../components/OperationLog";
import CodeBlock from "../../searching/components/CodeBlock";
import ComplexityCard from "../../searching/components/ComplexityCard";
import TheorySection from "../../searching/components/TheorySection";
import { stackContent, queueContent } from "../data/content";
import useStackVisualizer from "../hooks/useStackVisualizer";
import useQueueVisualizer from "../hooks/useQueueVisualizer";
import { Lightbulb } from "lucide-react";

export default function LinearStructuresPage({ defaultTab = "stack" }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Stack State & Controls
  const stackVis = useStackVisualizer(6);

  // Queue State & Controls
  const queueVis = useQueueVisualizer(7);

  const activeContent = activeTab === "stack" ? stackContent : queueContent;
  const activeMessage = activeTab === "stack" ? stackVis.message : queueVis.message;

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      {/* Editorial Header & Tab Switcher */}
      <LinearStructuresHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto max-w-7xl px-6 py-14 md:px-8 space-y-10">
        {/* Visualizer Canvas */}
        {activeTab === "stack" ? (
          <StackVisualizer
            stack={stackVis.stack}
            capacity={stackVis.capacity}
            peekIndex={stackVis.peekIndex}
            lastAction={stackVis.lastAction}
          />
        ) : (
          <QueueVisualizer
            queue={queueVis.queue}
            capacity={queueVis.capacity}
            peekIndex={queueVis.peekIndex}
            lastAction={queueVis.lastAction}
          />
        )}

        {/* Controls */}
        {activeTab === "stack" ? (
          <StackControls
            onPush={stackVis.push}
            onPop={stackVis.pop}
            onPeek={stackVis.peek}
            onClear={stackVis.clear}
            onPushRandom={stackVis.pushRandom}
            isFull={stackVis.stack.length >= stackVis.capacity}
            isEmpty={stackVis.stack.length === 0}
          />
        ) : (
          <QueueControls
            onEnqueue={queueVis.enqueue}
            onDequeue={queueVis.dequeue}
            onPeekFront={queueVis.peekFront}
            onPeekRear={queueVis.peekRear}
            onClear={queueVis.clear}
            onEnqueueRandom={queueVis.enqueueRandom}
            isFull={queueVis.queue.length >= queueVis.capacity}
            isEmpty={queueVis.queue.length === 0}
          />
        )}

        {/* Live Feedback & Operation History Grid */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Active Operation Insight Card */}
          <section className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
              Live State Feedback
            </p>
            <h3 className="mt-2 font-display text-3xl text-[#1F1B18]">
              {activeMessage.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-[#5F5952]">
              {activeMessage.description}
            </p>

            {activeMessage.insight && (
              <div className="mt-6 rounded-2xl border border-[#EDE3D7] bg-[#FCFBF8] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4ECE3]">
                    <Lightbulb size={17} className="text-[#A1764E]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
                      Architectural Principle
                    </p>
                    <p className="text-xs text-[#8C837B]">
                      {activeTab === "stack" ? "LIFO (Last In, First Out)" : "FIFO (First In, First Out)"}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#5F5952]">
                  {activeMessage.insight}
                </p>
              </div>
            )}
          </section>

          {/* Operation History Audit Log */}
          <OperationLog
            logs={activeTab === "stack" ? stackVis.logs : queueVis.logs}
            principle={activeTab === "stack" ? "LIFO" : "FIFO"}
          />
        </div>

        {/* Pseudocode Trace */}
        <CodeBlock pseudocode={activeContent.pseudocode} currentLine={-1} />

        {/* Complexity Analysis Cards */}
        <section className="pt-8 border-t border-[#ECE3D8]">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
            Performance Analysis
          </p>
          <h2 className="mt-2 font-display text-4xl text-[#1F1B18]">
            Time &amp; Space Complexity
          </h2>
          <p className="mt-2 max-w-2xl text-base text-[#6B645D]">
            All fundamental insertion, deletion, and inspection operations run in strictly bounded constant time.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activeTab === "stack" ? (
              <>
                <ComplexityCard
                  title="Push"
                  value={stackContent.complexity.push}
                  subtitle="Adds item to the top in constant time"
                />
                <ComplexityCard
                  title="Pop"
                  value={stackContent.complexity.pop}
                  subtitle="Extracts item from the top in constant time"
                />
                <ComplexityCard
                  title="Peek"
                  value={stackContent.complexity.peek}
                  subtitle="Inspects top item without mutation"
                />
                <ComplexityCard
                  title="Space"
                  value={stackContent.complexity.space}
                  subtitle="Linear auxiliary memory proportional to size"
                />
              </>
            ) : (
              <>
                <ComplexityCard
                  title="Enqueue"
                  value={queueContent.complexity.enqueue}
                  subtitle="Adds item to the rear in constant time"
                />
                <ComplexityCard
                  title="Dequeue"
                  value={queueContent.complexity.dequeue}
                  subtitle="Extracts item from the front in constant time"
                />
                <ComplexityCard
                  title="Peek / Front"
                  value={queueContent.complexity.peek}
                  subtitle="Inspects head arrival without mutation"
                />
                <ComplexityCard
                  title="Space"
                  value={queueContent.complexity.space}
                  subtitle="Linear auxiliary memory proportional to size"
                />
              </>
            )}
          </div>

          {/* Complexity Nuance Callout */}
          <div className="mt-5 rounded-2xl border border-[#E8DDD1] bg-[#FAF7F2] p-5">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-[#1F1B18]">
              <span>💡</span> Theoretical O(1) Operations vs. Reactive O(C) Buffer Immutability
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-[#5F5952]">
              {activeContent.complexity.note}
            </p>
          </div>
        </section>

        {/* Theoretical Foundations */}
        <section className="pt-6">
          <TheorySection content={activeContent} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
