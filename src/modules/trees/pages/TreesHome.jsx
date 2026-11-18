import { useState } from "react";
import { ArrowDown, GitBranch, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AlgorithmCard from "../../../components/AlgorithmCard";
import BackToShelf from "../../sorting/components/ui/BackToShelf";
import Footer from "../../../components/Footer";

const treeConcepts = [
  {
    title: "Binary Search Invariant",
    description:
      "For every node X, all values in its left subtree are strictly less than X.val, and all values in its right subtree are strictly greater than X.val. This enables logarithmic binary search capabilities in dynamic data.",
    example: "Left Subtree (< X) ← X → Right Subtree (> X)",
  },
  {
    title: "Logarithmic Efficiency",
    description:
      "When a tree remains balanced, each branch decision eliminates half the remaining search space, matching the performance of binary search in O(log n) time.",
    example: "A balanced tree of 1,000,000 nodes requires at most ~20 comparisons.",
  },
  {
    title: "Structural Deletion Rules",
    description:
      "Removing nodes requires preserving binary search properties across three distinct topological cases: leaf nodes, single-child parents, and two-child parents (in-order successor replacement).",
    example: "Two-child removal swaps with the smallest node in the right subtree.",
  },
  {
    title: "Skewed Tree Hazard",
    description:
      "Inserting sorted sequences without self-balancing mechanisms degrades the tree into a linked list with worst-case O(n) search time and O(n) call-stack depth.",
    example: "Inserting [10, 20, 30, 40] sequentially creates an unbalanced linear chain.",
  },
];

export default function TreesHome() {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      chapter: "Chapter I",
      title: "Binary Search Tree Operations",
      description:
        "Visualize interactive insertion, binary search, and 3-case node deletion with dynamic rebalancing and node highlighting.",
      complexity: "O(log n)",
      difficulty: "Intermediate",
      path: "/learn/trees/bst",
    },
    {
      chapter: "Chapter II",
      title: "Binary Tree Traversals",
      description:
        "Master In-Order, Pre-Order, Post-Order, and Level-Order breadth-first traversals on hierarchical node networks.",
      complexity: "O(n)",
      difficulty: "Beginner",
      path: "/learn/trees/traversals",
      comingSoon: true,
    },
    {
      chapter: "Chapter III",
      title: "AVL Self-Balancing Trees",
      description:
        "Examine Left and Right rotations (LL, RR, LR, RL) that restore strictly bounded O(log n) guarantees.",
      complexity: "O(log n)",
      difficulty: "Advanced",
      path: "/learn/trees/avl",
      comingSoon: true,
    },
  ];

  const scrollToChapters = () => {
    document.getElementById("chapters-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main className="min-h-screen bg-[#F7F5F2] px-4 pb-24 pt-10 text-[#1F1B18] sm:px-6 md:pt-14">
        <div className="mx-auto max-w-7xl">
          <BackToShelf />

          {/* Hero Section */}
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6F5D86]">
                Book IV · Data Structures
              </p>
              <h1 className="mt-4 font-serif text-5xl leading-tight text-[#1F1B18] sm:text-6xl md:text-7xl">
                Trees &amp; Hierarchies
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#6B645D] md:text-lg">
                Move beyond linear memory into branching hierarchical structures. Explore Binary Search Trees,
                tree rotations, and algorithmic traversals step-by-step.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={scrollToChapters}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#6F5D86] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#58486D] active:scale-95"
                >
                  <ArrowDown size={16} />
                  Start Exploring
                </button>
              </div>
            </div>

            {/* Concept Showcase Card */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2 border-b border-[#F0EAE1] pb-4">
                <GitBranch size={18} className="text-[#6F5D86]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F1B18]">
                  Core Tree Principles
                </span>
              </div>

              {/* Tabs */}
              <div className="mt-4 flex flex-wrap gap-2">
                {treeConcepts.map((concept, idx) => (
                  <button
                    key={concept.title}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      activeTab === idx
                        ? "bg-[#F0EBF7] text-[#6F5D86] font-semibold"
                        : "text-[#7A6A5A] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    {concept.title}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="mt-6"
                >
                  <h3 className="font-serif text-lg font-bold text-[#1F1B18]">
                    {treeConcepts[activeTab].title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5A4C3F]">
                    {treeConcepts[activeTab].description}
                  </p>
                  <div className="mt-4 rounded-xl border border-[#F0EAE1] bg-[#FAF8F5] p-3 text-xs font-mono text-[#6F5D86]">
                    {treeConcepts[activeTab].example}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Chapters Grid */}
          <section id="chapters-section" className="mt-24 border-t border-[#E8DDD1] pt-14">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#6F5D86]" />
              <h2 className="font-serif text-3xl font-bold text-[#1F1B18]">
                Interactive Chapters
              </h2>
            </div>
            <p className="mt-2 text-sm text-[#6B645D]">
              Choose a chapter to begin visual experimentation.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {chapters.map((chapter) => (
                <AlgorithmCard
                  key={chapter.title}
                  title={chapter.title}
                  description={chapter.description}
                  complexity={chapter.complexity}
                  link={chapter.path}
                  chapter={chapter.chapter}
                  difficulty={chapter.difficulty}
                  comingSoon={chapter.comingSoon}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
