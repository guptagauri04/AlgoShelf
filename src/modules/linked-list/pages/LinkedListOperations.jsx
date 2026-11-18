import { ArrowLeft, BookOpen, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import useLinkedListVisualizer from "../hooks/useLinkedListVisualizer";
import LinkedListCanvas from "../components/LinkedListCanvas";
import LinkedListControls from "../components/LinkedListControls";
import LinkedListStepCard from "../components/LinkedListStepCard";

export default function LinkedListOperations() {
  const visualizer = useLinkedListVisualizer();
  const frame = visualizer.currentFrame;

  return (
    <>
      <main className="min-h-screen bg-[#F7F5F2] px-4 pb-20 pt-10 text-[#1F1B18] sm:px-6 md:pt-14">
        <div className="mx-auto max-w-7xl space-y-10">
          {/* Navigation Bar */}
          <div>
            <Link
              to="/"
              onClick={() => sessionStorage.setItem("scrollToBookshelf", "true")}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A1764E] focus-visible:ring-offset-2"
            >
              <ArrowLeft size={16} />
              Back to bookshelf
            </Link>
          </div>

          {/* Editorial Header */}
          <header className="border-b border-[#E8DDD1] pb-10">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#A1764E] text-white">
                <Layers size={16} />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
                Book IV · Linear Structures
              </p>
            </div>
            <h1 className="mt-4 font-display text-5xl leading-tight text-[#1F1B18] sm:text-6xl">
              Singly Linked List
              <br />
              <span className="text-[#8B5A2B]">Insertion &amp; Deletion</span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#6B645D] md:text-lg">
              Unlike static arrays stored in contiguous memory, a singly linked list is composed of dynamic nodes scattered across memory, connected solely by pointer references. Explore how insertion and deletion reshape these pointer chains.
            </p>
          </header>

          {/* Interactive Visualizer Canvas */}
          <LinkedListCanvas
            nodes={frame.nodes}
            newNode={frame.newNode}
            headIndex={frame.headIndex}
            highlightedIndex={frame.highlightedIndex}
            targetIndex={frame.targetIndex}
            action={frame.action}
          />

          {/* Controls Panel */}
          <LinkedListControls
            nodesCount={visualizer.nodes.length}
            activeTab={visualizer.activeTab}
            setActiveTab={visualizer.setActiveTab}
            inputValue={visualizer.inputValue}
            setInputValue={visualizer.setInputValue}
            indexValue={visualizer.indexValue}
            setIndexValue={visualizer.setIndexValue}
            error={visualizer.error}
            isPlaying={visualizer.isPlaying}
            speed={visualizer.speed}
            setSpeed={visualizer.setSpeed}
            currentStepIndex={visualizer.currentStepIndex}
            totalSteps={visualizer.steps.length}
            executeInsert={visualizer.executeInsert}
            executeDelete={visualizer.executeDelete}
            stepForward={visualizer.stepForward}
            stepBackward={visualizer.stepBackward}
            togglePlay={visualizer.togglePlay}
            handleResetList={visualizer.handleResetList}
            handleClearList={visualizer.handleClearList}
          />

          {/* Step Execution & Complexity Card */}
          <LinkedListStepCard
            frame={frame}
            currentStepIndex={visualizer.currentStepIndex}
            totalSteps={visualizer.steps.length}
          />

          {/* Educational Theory & Summary Table */}
          <section className="rounded-3xl border border-[#E8DDD1] bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
              <BookOpen size={16} />
              <span>Complexity &amp; Operation Reference</span>
            </div>

            <h3 className="mt-3 font-display text-2xl font-bold text-[#1F1B18]">
              Operation Comparison Table
            </h3>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#EEE5DB] font-mono text-xs uppercase text-[#8C837B]">
                    <th className="py-3 pr-4">Operation</th>
                    <th className="py-3 px-4">Time Complexity</th>
                    <th className="py-3 px-4">Space Complexity</th>
                    <th className="py-3 pl-4">Key Pointer Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7F2EA] font-body text-sm text-[#3E3A35]">
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#1F1B18]">Insert at Beginning (Head)</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#5A7354]">O(1)</td>
                    <td className="py-3.5 px-4 font-mono text-[#6B5B4D]">O(1)</td>
                    <td className="py-3.5 pl-4 text-[#6B645D]">Set newNode-&gt;next = head; head = newNode;</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#1F1B18]">Insert at End (Tail)</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#A1764E]">O(n)</td>
                    <td className="py-3.5 px-4 font-mono text-[#6B5B4D]">O(1)</td>
                    <td className="py-3.5 pl-4 text-[#6B645D]">Traverse to last node; set tail-&gt;next = newNode;</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#1F1B18]">Insert at Position k</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#A1764E]">O(n)</td>
                    <td className="py-3.5 px-4 font-mono text-[#6B5B4D]">O(1)</td>
                    <td className="py-3.5 pl-4 text-[#6B645D]">Traverse to k-1; newNode-&gt;next = prev-&gt;next; prev-&gt;next = newNode;</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#1F1B18]">Delete from Beginning (Head)</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#5A7354]">O(1)</td>
                    <td className="py-3.5 px-4 font-mono text-[#6B5B4D]">O(1)</td>
                    <td className="py-3.5 pl-4 text-[#6B645D]">temp = head; head = head-&gt;next; delete temp;</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#1F1B18]">Delete from End (Tail)</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#A1764E]">O(n)</td>
                    <td className="py-3.5 px-4 font-mono text-[#6B5B4D]">O(1)</td>
                    <td className="py-3.5 pl-4 text-[#6B645D]">Traverse to second-last node; prev-&gt;next = nullptr;</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-semibold text-[#1F1B18]">Delete at Position k</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#A1764E]">O(n)</td>
                    <td className="py-3.5 px-4 font-mono text-[#6B5B4D]">O(1)</td>
                    <td className="py-3.5 pl-4 text-[#6B645D]">Traverse to k-1; temp = prev-&gt;next; prev-&gt;next = temp-&gt;next; delete temp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
