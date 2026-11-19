import { ArrowDown, BookOpen, Layers, Repeat } from "lucide-react";
import AlgorithmCard from "../../../components/AlgorithmCard";
import BackToShelf from "../../sorting/components/ui/BackToShelf";
import Footer from "../../../components/Footer";

export default function StacksQueuesHome() {
  const chapters = [
    {
      chapter: "Chapter I",
      title: "Stack (LIFO)",
      description:
        "Last In, First Out data structure. Elements are pushed and popped in O(1) time using a top index pointer.",
      complexity: "O(1)",
      difficulty: "Beginner",
      path: "/learn/stacks",
    },
    {
      chapter: "Chapter II",
      title: "Queue (FIFO)",
      description:
        "First In, First Out data structure. Elements are enqueued and dequeued in O(1) time via circular array pointers.",
      complexity: "O(1)",
      difficulty: "Beginner",
      path: "/learn/queues",
    },
  ];

  const scrollToChapters = () => {
    document.getElementById("linear-chapters")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <BackToShelf />

        {/* Editorial Header */}
        <section className="grid gap-12 py-8 lg:grid-cols-[1.3fr_1fr] lg:items-center border-b border-[#ECE3D8] pb-16">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px w-12 bg-[#D9C9B6]" />
              <p className="font-body text-xs font-semibold uppercase tracking-[0.4em] text-[#A07A56]">
                Linear Structures
              </p>
            </div>

            <h1 className="font-display text-6xl leading-[0.95] text-[#202020] sm:text-7xl md:text-8xl">
              Stacks &amp;
              <br />
              Queues
            </h1>

            <p className="font-editorial mt-6 max-w-lg text-xl italic leading-relaxed text-[#6B5B4D]">
              “Order is not only about numbers, but the discipline of how information enters and leaves.”
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6B645D]">
              Stacks and Queues introduce strict entry and exit disciplines to collections of data. By enforcing LIFO and FIFO constraints, they power operating system scheduling, undo history, and graph traversals.
            </p>

            <button
              type="button"
              onClick={scrollToChapters}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#9D7653] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#8A6645]"
            >
              <BookOpen size={18} />
              <span>Explore Chapters</span>
              <ArrowDown
                size={17}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </button>
          </div>

          {/* Quick Comparison Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 text-[#A1764E]">
                <Repeat size={22} />
                <span className="text-xs font-semibold uppercase tracking-widest">
                  LIFO vs. FIFO At a Glance
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-[#EEE5DB] bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1F1B18]">
                    <Layers size={16} className="text-[#A1764E]" />
                    <span>Stack: Last In, First Out</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#6B645D]">
                    Elements are added and removed from the same end (the top). Used for function call stacks and undo actions.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#EEE5DB] bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1F1B18]">
                    <Repeat size={16} className="text-[#5A7354]" />
                    <span>Queue: First In, First Out</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#6B645D]">
                    Elements enter at the rear and exit from the front. Used for printer spoolers, BFS, and asynchronous message buffers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapters Collection */}
        <section id="linear-chapters" className="pt-20">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A07A56]">
              Chapters
            </p>
            <h2 className="mt-3 font-display text-5xl text-[#202020]">
              Interactive Modules
            </h2>
            <p className="mt-4 text-base text-[#666]">
              Experiment with Push, Pop, Peek, Enqueue, and Dequeue operations with real-time memory visualizations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {chapters.map((ch) => (
              <AlgorithmCard key={ch.title} {...ch} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
