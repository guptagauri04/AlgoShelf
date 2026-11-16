import { ArrowDown, BookOpen, Compass, GitBranch, Split } from "lucide-react";
import AlgorithmCard from "../../../components/AlgorithmCard";
import BackToShelf from "../../sorting/components/ui/BackToShelf";
import Footer from "../../../components/Footer";

export default function TreesHome() {
  const chapters = [
    {
      chapter: "Chapter I",
      title: "Binary Tree Traversal",
      description:
        "Inorder, Preorder, and Postorder recursive journeys. Step-by-step node visitation with live recursion call stack.",
      complexity: "O(n)",
      difficulty: "Beginner",
      path: "/trees/traversal",
    },
    {
      chapter: "Chapter II",
      title: "Binary Search Tree",
      description:
        "Ordered binary tree maintaining the invariant Left < Root < Right for fast logarithmic search, insert, and delete.",
      complexity: "O(log n)",
      difficulty: "Beginner",
      path: "/trees/bst",
      comingSoon: true,
    },
    {
      chapter: "Chapter III",
      title: "AVL Trees",
      description:
        "Self-balancing binary search trees using single and double rotations to strictly guarantee O(log n) operations.",
      complexity: "O(log n)",
      difficulty: "Intermediate",
      path: "/trees/avl",
      comingSoon: true,
    },
  ];

  const scrollToChapters = () => {
    document.getElementById("trees-chapters")?.scrollIntoView({
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
                Book IV
              </p>
            </div>

            <h1 className="font-display text-6xl leading-[0.95] text-[#202020] sm:text-7xl md:text-8xl">
              Tree
              <br />
              Algorithms
            </h1>

            <p className="font-editorial mt-6 max-w-lg text-xl italic leading-relaxed text-[#6B5B4D]">
              “A tree is a structure born of branching possibilities. To understand it is to master recursion and hierarchy.”
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6B645D]">
              From memory representation to filesystem hierarchies and expression
              parsing, trees are among the most versatile structures in computer
              science. Explore how traversing and balancing trees unlocks optimal
              computation.
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

          {/* Decorative Visual Card */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-8 shadow-sm">
              <div className="flex items-center gap-3 text-[#A1764E]">
                <Compass size={24} />
                <span className="text-xs font-semibold uppercase tracking-widest">
                  Tree Foundations
                </span>
              </div>

              <h3 className="mt-4 font-display text-3xl text-[#1F1B18]">
                The Anatomy of Trees
              </h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-[#EEE5DB] bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1F1B18]">
                    <GitBranch size={16} className="text-[#A1764E]" />
                    <span>Recursive Decomposition</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#6B645D]">
                    Every non-empty binary tree consists of a root node and two
                    disjoint subtrees, each of which is itself a valid binary tree.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#EEE5DB] bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1F1B18]">
                    <Split size={16} className="text-[#5A7354]" />
                    <span>Traversals Define Perspective</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#6B645D]">
                    A single binary tree yields three distinct linear sequences:
                    Inorder (symmetric), Preorder (prefix), and Postorder
                    (postfix).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapters Collection */}
        <section id="trees-chapters" className="pt-20">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A07A56]">
              Chapters
            </p>
            <h2 className="mt-3 font-display text-5xl text-[#202020]">
              Available Tree Chapters
            </h2>
            <p className="mt-4 text-base text-[#666]">
              Step inside each chapter for full visual animations, interactive controls,
              and step-by-step recursive traces.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
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
