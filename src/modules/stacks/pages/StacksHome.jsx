import { useState } from "react";
import { ArrowDown, BookOpen, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AlgorithmCard from "../../../components/AlgorithmCard";
import BackToShelf from "../../sorting/components/ui/BackToShelf";
import Footer from "../../../components/Footer";
import { STACK_CONCEPTS } from "../data/stackData";

export default function StacksHome() {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      chapter: "Chapter I",
      title: "Stack Operations & Frame Trace",
      description:
        "Push, pop, and peek operations demonstrating the Last In, First Out (LIFO) principle with overflow and underflow safeguards.",
      complexity: "O(1)",
      difficulty: "Beginner",
      path: "/learn/stacks/operations",
    },
    {
      chapter: "Chapter II",
      title: "Balanced Parentheses & Expressions",
      description:
        "Classic application using stack frames to validate nested delimiters and evaluate postfix expressions.",
      complexity: "O(n)",
      difficulty: "Intermediate",
      path: "/learn/stacks/applications",
      comingSoon: true,
    },
  ];

  const scrollToChapters = () => {
    document.getElementById("stack-chapters")?.scrollIntoView({
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
              <p className="font-body text-xs font-semibold uppercase tracking-[0.4em] text-[#5A7088]">
                Linear Structures
              </p>
            </div>

            <h1 className="font-display text-6xl leading-[0.95] text-[#202020] sm:text-7xl md:text-8xl">
              Stacks &amp;
              <br />
              Frames
            </h1>

            <p className="font-editorial mt-6 max-w-lg text-xl italic leading-relaxed text-[#6B5B4D]">
              “The last to enter is the first to leave. Memory piled with precision and unstacked in reverse.”
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6B645D]">
              Stacks enforce strict Last-In, First-Out (LIFO) discipline. From managing function call stacks in operating systems to syntax evaluation in language interpreters, stacks are the bedrock of sequential computing.
            </p>

            <button
              type="button"
              onClick={scrollToChapters}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#5A7088] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#485B6F]"
            >
              <BookOpen size={18} />
              <span>Explore Stacks</span>
              <ArrowDown
                size={17}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </button>
          </div>

          {/* Micro Stack Graphic */}
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#EEE5DB] pb-4">
                <div className="flex items-center gap-3 text-[#5A7088]">
                  <Layers size={22} />
                  <span className="font-display text-lg text-[#1F1B18]">
                    LIFO Chamber
                  </span>
                </div>
                <span className="rounded-full bg-[#E9EDF5] px-3 py-1 font-mono text-xs font-semibold text-[#5A7088]">
                  O(1) Boundary
                </span>
              </div>

              <div className="mt-6 flex flex-col items-center gap-1.5">
                {[48, 36, 24, 12].map((v, i) => (
                  <div
                    key={v}
                    className={`flex h-10 w-44 items-center justify-between rounded-lg border px-4 font-mono text-xs font-bold shadow-sm ${
                      i === 0
                        ? "border-[#D97706] bg-[#FEF3C7] text-[#92400E]"
                        : "border-[#D8CDBD] bg-white text-[#1F1B18]"
                    }`}
                  >
                    <span>{v}</span>
                    <span className="text-[10px] text-[#8C837B]">
                      {i === 0 ? "← TOP [3]" : `[${3 - i}]`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl bg-[#F7F2EB] p-3 text-xs text-[#6B5B4D]">
                <span className="font-mono text-[#4B7754] font-bold">Push (Top) →</span>
                <span className="font-mono text-[#DC2626] font-bold">← Pop (Top)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Foundations Tabs */}
        <section className="py-16 border-b border-[#ECE3D8]">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5A7088]">
              Foundations
            </p>
            <h2 className="mt-3 font-display text-4xl text-[#202020]">
              Core Principles of Stacks
            </h2>
          </div>

          <div className="rounded-[30px] border border-[#E8DED2] bg-[#FCFAF7] p-8 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2.5">
              {STACK_CONCEPTS.map((concept, index) => (
                <button
                  key={concept.title}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    activeTab === index
                      ? "bg-[#5A7088] text-white shadow-md"
                      : "bg-white text-[#6B5B4D] border border-[#E8DED2] hover:bg-[#F7F3EE]"
                  }`}
                >
                  {concept.title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="mt-8 rounded-2xl bg-white p-7"
              >
                <h3 className="font-display text-2xl text-[#202020]">
                  {STACK_CONCEPTS[activeTab].title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[#666]">
                  {STACK_CONCEPTS[activeTab].description}
                </p>
                <div className="mt-6 rounded-xl bg-[#F7F5F2] p-4 border border-[#ECE3D8]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#5A7088]">
                    Insight
                  </p>
                  <p className="mt-1 font-mono text-xs text-[#555]">
                    {STACK_CONCEPTS[activeTab].example}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Chapters Section */}
        <section id="stack-chapters" className="pt-20">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5A7088]">
              Chapters
            </p>
            <h2 className="mt-3 font-display text-5xl text-[#202020]">
              Interactive Lessons
            </h2>
            <p className="mt-4 text-base text-[#666]">
              Step inside the interactive stack laboratory to observe top pointer increments and pop decrements.
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
