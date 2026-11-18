import { useState } from "react";
import { ArrowDown, BookOpen, Network, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AlgorithmCard from "../../../components/AlgorithmCard";
import BackToShelf from "../../sorting/components/ui/BackToShelf";
import Footer from "../../../components/Footer";

const concepts = [
  {
    title: "Vertices & Edges",
    description:
      "A graph G = (V, E) consists of a set of vertices (entities) and edges (interconnections). Edges may be directed (one-way streets) or undirected (two-way relationships).",
    example: "Undirected edge (A, B) = bidirectional; Directed edge (A â†’ B) = one-way.",
  },
  {
    title: "Adjacency Representations",
    description:
      "Adjacency lists store neighbors in lightweight linked arrays with O(V + E) space. Adjacency matrices store connections in a V Ã— V binary grid, granting O(1) edge verification.",
    example: "Sparse social graph: use List; Dense interconnection grid: use Matrix.",
  },
  {
    title: "BFS: Level-Order Wavefront",
    description:
      "Breadth-First Search radiates outward from a source vertex using a FIFO Queue. It guarantees discovery of the shortest unweighted path between any two nodes.",
    example: "Finding minimum friends-of-friends hops on LinkedIn or Facebook.",
  },
  {
    title: "DFS: Depth & Backtracking",
    description:
      "Depth-First Search plunges deep down a single branch using a LIFO Stack or recursion before backtracking. Fundamental for cycle detection and topological sorting.",
    example: "Resolving build order dependencies in package managers like npm or cargo.",
  },
];

export default function GraphsHome() {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      chapter: "Chapter I",
      title: "Graph Representation & Traversal",
      description:
        "Visualize vertices, edges, adjacency lists and matrices. Step through BFS and DFS with real-time queue and stack states.",
      complexity: "O(V + E)",
      difficulty: "Beginner",
      path: "/learn/graphs/traversal",
    },
    {
      chapter: "Chapter II",
      title: "Dijkstra's Shortest Path",
      description:
        "Greedily compute the minimum weighted path through weighted graphs using a priority queue.",
      complexity: "O((V + E) log V)",
      difficulty: "Intermediate",
      path: "/learn/graphs/dijkstra",
      comingSoon: true,
    },
    {
      chapter: "Chapter III",
      title: "Topological Sort & DAGs",
      description:
        "Linear ordering of vertices in Directed Acyclic Graphs based on Kahn's algorithm and DFS timestamps.",
      complexity: "O(V + E)",
      difficulty: "Intermediate",
      path: "/learn/graphs/topological",
      comingSoon: true,
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
              &ldquo;Where linear memory ends, networks begin &mdash; modeling the interconnected fabric of our universe.&rdquo;
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6B645D]">
              Graphs are the most expressive non-linear data structures in computer science. From internet routing tables and neural pathways to flight routes and social graphs, graph algorithms navigate intricate relationships with mathematical precision.
            </p>

            <button
              type="button"
              onClick={scrollToChapters}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#A65B38] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#8D4B2C]"
            >
              <BookOpen size={18} />
              <span>Explore Graph Chapters</span>
              <ArrowDown
                size={17}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </button>
          </div>

          {/* Visual Mini Graph Preview */}
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-8 shadow-sm">
              <div className="flex items-center gap-3 text-[#A65B38]">
                <div className="rounded-2xl bg-[#FAEAE0] p-3 text-[#A65B38]">
                  <Network size={24} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-[#1F1B18]">
                    Network Topology
                  </h3>
                  <p className="text-xs text-[#8C837B]">
                    G = (V, E) Representation
                  </p>
                </div>
              </div>

              {/* Decorative Mini SVG */}
              <div className="mt-6 flex justify-center rounded-2xl border border-[#EEE5DB] bg-white p-4">
                <svg viewBox="0 0 240 140" className="w-full h-32">
                  {/* Edges */}
                  <line x1="40" y1="70" x2="120" y2="30" stroke="#D9C9B6" strokeWidth="2" />
                  <line x1="40" y1="70" x2="120" y2="110" stroke="#D9C9B6" strokeWidth="2" />
                  <line x1="120" y1="30" x2="200" y2="70" stroke="#A65B38" strokeWidth="2.5" strokeDasharray="3,3" />
                  <line x1="120" y1="110" x2="200" y2="70" stroke="#567156" strokeWidth="2.5" />
                  <line x1="120" y1="30" x2="120" y2="110" stroke="#D9C9B6" strokeWidth="2" />

                  {/* Nodes */}
                  <circle cx="40" cy="70" r="14" fill="#A65B38" />
                  <text x="40" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">A</text>

                  <circle cx="120" cy="30" r="14" fill="#567156" />
                  <text x="120" y="34" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">B</text>

                  <circle cx="120" cy="110" r="14" fill="#567156" />
                  <text x="120" y="114" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">C</text>

                  <circle cx="200" cy="70" r="14" fill="#FFFFFF" stroke="#D9C9B6" strokeWidth="2" />
                  <text x="200" y="74" textAnchor="middle" fill="#1F1B18" fontSize="10" fontWeight="bold">D</text>
                </svg>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-2xl bg-[#F7F2EB] p-3 text-xs text-[#6B5B4D]">
                <Share2 size={16} className="text-[#A65B38] shrink-0" />
                <span>Traversals systematically explore every reachable vertex.</span>
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
              The Core Principles of Graph Theory
            </h2>
          </div>

          <div className="rounded-[30px] border border-[#E8DED2] bg-[#FCFAF7] p-8 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2.5">
              {concepts.map((concept, index) => (
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
                  {concepts[activeTab].title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[#666]">
                  {concepts[activeTab].description}
                </p>
                <div className="mt-6 rounded-xl bg-[#F7F5F2] p-4 border border-[#ECE3D8]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#A65B38]">
                    Practical Application
                  </p>
                  <p className="mt-1 font-mono text-xs text-[#555]">
                    {concepts[activeTab].example}
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
              Step inside each interactive chapter to experiment with graph topologies, representations, and traversal algorithms.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
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
