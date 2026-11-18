import { useState } from "react";
import { ArrowDown, BookOpen, GitBranch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AlgorithmCard from "../../../components/AlgorithmCard";
import BackToShelf from "../../sorting/components/ui/BackToShelf";
import Footer from "../../../components/Footer";
import { TREE_CONCEPTS } from "../data/treeData";

export default function TreesHome() {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      chapter: "Chapter I",
      title: "Binary Search Tree Operations",
      description:
        "Interactive laboratory for BST insertion, binary search path tracing, and complex 3-case node deletion.",
      complexity: "O(log n)",
      difficulty: "Intermediate",
      path: "/learn/trees/bst",
    },
    {
      chapter: "Chapter II",
      title: "Binary Tree Traversals",
      description:
        "Visualize recursive Inorder, Preorder, and Postorder tree traversals with synchronized call stacks.",
      complexity: "O(n)",
      difficulty: "Beginner",
      path: "/learn/trees/traversals",
      comingSoon: true,
    },
  ];

  const scrollToChapters = () => {
    document.getElementById("tree-chapters")?.scrollIntoView({
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
              <p className="font-body text-xs font-semibold uppercase tracking-[0.4em] text-[#6F5D86]">
                Book IV
              </p>
            </div>

            <h1 className="font-display text-6xl leading-[0.95] text-[#202020] sm:text-7xl md:text-8xl">
              Trees &amp;
              <br />
              Hierarchies
            </h1>

            <p className="font-editorial mt-6 max-w-lg text-xl italic leading-relaxed text-[#6B5B4D]">
              “Branches split, decisions bifurcate, and data finds its natural logarithmic equilibrium.”
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6B645D]">
              Trees represent non-linear hierarchical relationships. By maintaining the Binary Search Tree invariant (left &lt; root &lt; right), they enable efficient $O(\log n)$ retrieval, dynamic insertions, and sorted streaming.
            </p>

            <button
              type="button"
              onClick={scrollToChapters}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#6F5D86] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#5C4C70]"
            >
              <BookOpen size={18} />
              <span>Explore Tree Algorithms</span>
              <ArrowDown
                size={17}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </button>
          </div>

          {/* Micro Tree Illustration */}
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#EEE5DB] pb-4">
                <div className="flex items-center gap-3 text-[#6F5D86]">
                  <GitBranch size={22} />
                  <span className="font-display text-lg text-[#1F1B18]">
                    BST Invariant
                  </span>
                </div>
                <span className="rounded-full bg-[#F0EBF7] px-3 py-1 font-mono text-xs font-semibold text-[#6F5D86]">
                  Left &lt; Root &lt; Right
                </span>
              </div>

              <div className="mt-6 flex justify-center">
                <svg viewBox="0 0 240 140" className="w-full max-w-[240px]">
                  {/* Edges */}
                  <line x1="120" y1="30" x2="65" y2="80" stroke="#D8CDBD" strokeWidth="2.5" />
                  <line x1="120" y1="30" x2="175" y2="80" stroke="#D8CDBD" strokeWidth="2.5" />
                  <line x1="65" y1="80" x2="40" y2="120" stroke="#D8CDBD" strokeWidth="2" />
                  <line x1="65" y1="80" x2="90" y2="120" stroke="#D8CDBD" strokeWidth="2" />

                  {/* Root */}
                  <circle cx="120" cy="30" r="16" fill="#6F5D86" stroke="#4C3D5E" strokeWidth="2" />
                  <text x="120" y="34" textAnchor="middle" fill="#FFF" className="font-mono text-xs font-bold">50</text>

                  {/* Left */}
                  <circle cx="65" cy="80" r="15" fill="#4B7754" stroke="#2D4B34" strokeWidth="2" />
                  <text x="65" y="84" textAnchor="middle" fill="#FFF" className="font-mono text-xs font-bold">30</text>

                  {/* Right */}
                  <circle cx="175" cy="80" r="15" fill="#D97706" stroke="#92400E" strokeWidth="2" />
                  <text x="175" y="84" textAnchor="middle" fill="#FFF" className="font-mono text-xs font-bold">70</text>

                  {/* Leaves */}
                  <circle cx="40" cy="120" r="12" fill="#FFFFFF" stroke="#D8CDBD" strokeWidth="2" />
                  <text x="40" y="124" textAnchor="middle" fill="#1F1B18" className="font-mono text-[10px] font-bold">20</text>

                  <circle cx="90" cy="120" r="12" fill="#FFFFFF" stroke="#D8CDBD" strokeWidth="2" />
                  <text x="90" y="124" textAnchor="middle" fill="#1F1B18" className="font-mono text-[10px] font-bold">40</text>
                </svg>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl bg-[#F7F2EB] p-3 text-xs text-[#6B5B4D]">
                <span className="font-mono">Balanced Height: O(log n)</span>
                <span className="font-mono text-[#6F5D86] font-semibold">Strict Order</span>
              </div>
            </div>
          </div>
        </section>

        {/* Foundations Tabs */}
        <section className="py-16 border-b border-[#ECE3D8]">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6F5D86]">
              Foundations
            </p>
            <h2 className="mt-3 font-display text-4xl text-[#202020]">
              Core Principles of Search Trees
            </h2>
          </div>

          <div className="rounded-[30px] border border-[#E8DED2] bg-[#FCFAF7] p-8 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2.5">
              {TREE_CONCEPTS.map((concept, index) => (
                <button
                  key={concept.title}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    activeTab === index
                      ? "bg-[#6F5D86] text-white shadow-md"
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
                  {TREE_CONCEPTS[activeTab].title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[#666]">
                  {TREE_CONCEPTS[activeTab].description}
                </p>
                <div className="mt-6 rounded-xl bg-[#F7F5F2] p-4 border border-[#ECE3D8]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6F5D86]">
                    Insight
                  </p>
                  <p className="mt-1 font-mono text-xs text-[#555]">
                    {TREE_CONCEPTS[activeTab].example}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Chapters Section */}
        <section id="tree-chapters" className="pt-20">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6F5D86]">
              Chapters
            </p>
            <h2 className="mt-3 font-display text-5xl text-[#202020]">
              Interactive Lessons
            </h2>
            <p className="mt-4 text-base text-[#666]">
              Explore BST invariants through live node insertion, logarithmic search comparisons, and 3-case node deletion.
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
