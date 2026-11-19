import { useState } from "react";
import { ArrowDown, BookOpen, Network } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AlgorithmCard from "../../../components/AlgorithmCard";
import BackToShelf from "../../sorting/components/ui/BackToShelf";
import Footer from "../../../components/Footer";
import { GRAPH_CONCEPTS } from "../data/graphData";

export default function GraphsHome() {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      chapter: "Chapter I",
      title: "Representation & Traversal",
      description:
        "Dual views of Adjacency Lists and Matrices paired with interactive step-by-step BFS and DFS traversals.",
      complexity: "O(V + E)",
      difficulty: "Beginner",
      path: "/learn/graphs/traversals",
    },
    {
      chapter: "Chapter II",
      title: "Dijkstra's Algorithm",
      description:
        "Greedy shortest-path algorithm for weighted graphs with non-negative edges. Visits nodes in order of increasing distance.",
      complexity: "O(E log V)",
      difficulty: "Intermediate",
      path: "/graphs/dijkstra",
      comingSoon: false,
    },
  ];

  const scrollToChapters = () => {
    document.getElementById("graph-chapters")?.scrollIntoView({
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
              <p className="font-body text-xs font-semibold uppercase tracking-[0.4em] text-[#A65B38]">
                Book V
              </p>
            </div>

            <h1 className="font-display text-6xl leading-[0.95] text-[#202020] sm:text-7xl md:text-8xl">
              Graphs &amp;
              <br />
              Networks
            </h1>

            <p className="font-editorial mt-6 max-w-lg text-xl italic leading-relaxed text-[#6B5B4D]">
              “A graph is the universal language of relations: where nodes hold meaning and edges weave connections.”
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6B645D]">
              From web routing and social networks to compiler dependency trees and road maps, graphs are fundamental to modern computing. Learn how data structures represent their topology and algorithms traverse their interconnected paths.
            </p>

            <button
              type="button"
              onClick={scrollToChapters}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#A65B38] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#8F4E2F]"
            >
              <BookOpen size={18} />
              <span>Explore Graph Algorithms</span>
              <ArrowDown
                size={17}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </button>
          </div>

          {/* Graphical Micro-Visualizer */}
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#EEE5DB] pb-4">
                <div className="flex items-center gap-3 text-[#A65B38]">
                  <Network size={22} />
                  <span className="font-display text-lg text-[#1F1B18]">
                    Network Topology
                  </span>
                </div>
                <span className="rounded-full bg-[#FAEAE0] px-3 py-1 font-mono text-xs font-semibold text-[#A65B38]">
                  G = (V, E)
                </span>
              </div>

              <div className="mt-6 flex justify-center">
                <svg viewBox="0 0 240 140" className="w-full max-w-[240px]">
                  {/* Edges */}
                  <line x1="40" y1="70" x2="120" y2="30" stroke="#D8CDBD" strokeWidth="2.5" />
                  <line x1="40" y1="70" x2="120" y2="110" stroke="#D8CDBD" strokeWidth="2.5" />
                  <line x1="120" y1="30" x2="200" y2="70" stroke="#D8CDBD" strokeWidth="2.5" />
                  <line x1="120" y1="110" x2="200" y2="70" stroke="#D8CDBD" strokeWidth="2.5" />
                  <line x1="120" y1="30" x2="120" y2="110" stroke="#4B7754" strokeWidth="3" />

                  {/* Nodes */}
                  <circle cx="40" cy="70" r="16" fill="#A65B38" stroke="#7A3D22" strokeWidth="2" />
                  <text x="40" y="74" textAnchor="middle" fill="#FFF" className="font-mono text-xs font-bold">A</text>

                  <circle cx="120" cy="30" r="16" fill="#4B7754" stroke="#2D4B34" strokeWidth="2" />
                  <text x="120" y="34" textAnchor="middle" fill="#FFF" className="font-mono text-xs font-bold">B</text>

                  <circle cx="120" cy="110" r="16" fill="#D97706" stroke="#92400E" strokeWidth="2" />
                  <text x="120" y="114" textAnchor="middle" fill="#FFF" className="font-mono text-xs font-bold">C</text>

                  <circle cx="200" cy="70" r="16" fill="#FFFFFF" stroke="#D8CDBD" strokeWidth="2" />
                  <text x="200" y="74" textAnchor="middle" fill="#1F1B18" className="font-mono text-xs font-bold">D</text>
                </svg>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl bg-[#F7F2EB] p-3 text-xs text-[#6B5B4D]">
                <div className="flex items-center gap-1.5 font-mono">
                  <span>|V| = 4 Nodes</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <span>|E| = 5 Edges</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Foundations Tabs */}
        <section className="py-16 border-b border-[#ECE3D8]">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A65B38]">
              Foundations
            </p>
            <h2 className="mt-3 font-display text-4xl text-[#202020]">
              Essential Graph Concepts
            </h2>
          </div>

          <div className="rounded-[30px] border border-[#E8DED2] bg-[#FCFAF7] p-8 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2.5">
              {GRAPH_CONCEPTS.map((concept, index) => (
                <button
                  key={concept.title}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    activeTab === index
                      ? "bg-[#A65B38] text-white shadow-md"
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
                  {GRAPH_CONCEPTS[activeTab].title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[#666]">
                  {GRAPH_CONCEPTS[activeTab].description}
                </p>
                <div className="mt-6 rounded-xl bg-[#F7F5F2] p-4 border border-[#ECE3D8]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#A65B38]">
                    Insight
                  </p>
                  <p className="mt-1 font-mono text-xs text-[#555]">
                    {GRAPH_CONCEPTS[activeTab].example}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Chapters Section */}
        <section id="graph-chapters" className="pt-20">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A65B38]">
              Chapters
            </p>
            <h2 className="mt-3 font-display text-5xl text-[#202020]">
              Interactive Lessons
            </h2>
            <p className="mt-4 text-base text-[#666]">
              Choose a chapter to jump straight into live interactive demonstrations, representation matrices, and traversal animators.
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
