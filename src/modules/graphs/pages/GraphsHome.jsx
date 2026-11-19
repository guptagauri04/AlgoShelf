import { ArrowDown, BookOpen, Compass, Network, Route } from "lucide-react";
import AlgorithmCard from "../../../components/AlgorithmCard";
import BackToShelf from "../../sorting/components/ui/BackToShelf";
import Footer from "../../../components/Footer";

export default function GraphsHome() {
  const chapters = [
    {
      chapter: "Chapter I",
      title: "Graph Representation & Traversals",
      description:
        "Understand Adjacency Lists and Matrices, and master Breadth-First Search (BFS) and Depth-First Search (DFS) with live queue and stack tracking.",
      complexity: "O(V + E)",
      difficulty: "Intermediate",
      path: "/learn/graphs/traversals",
    },
    {
      chapter: "Chapter II",
      title: "Dijkstra's Shortest Path",
      description:
        "Trace greedy edge relaxation on weighted networks to locate the absolute lowest-cost path between source and target vertices.",
      complexity: "O((V + E) log V)",
      difficulty: "Advanced",
      path: "/learn/graphs/dijkstra",
    },
  ];

  const scrollToChapters = () => {
    document.getElementById("graphs-chapters")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <BackToShelf />

        {/* Editorial Header */}
        <section className="grid gap-12 border-b border-[#ECE3D8] py-8 pb-16 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px w-12 bg-[#D9C9B6]" />
              <p className="font-body text-xs font-semibold uppercase tracking-[0.4em] text-[#A07A56]">
                Book V
              </p>
            </div>

            <h1 className="font-display text-6xl leading-[0.95] text-[#202020] sm:text-7xl md:text-8xl">
              Graphs &amp;
              <br />
              Networks
            </h1>

            <p className="font-editorial mt-6 max-w-lg text-xl italic leading-relaxed text-[#6B5B4D]">
              &ldquo;The shortest path between two points is not always a
              straight line &mdash; in a graph, it is the path of least
              resistance.&rdquo;
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6B645D]">
              From global GPS navigation and social media followers to network
              packet routing and compiler dependency resolution, graphs model the
              interconnected structures of the physical and digital world.
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
                  Network Architecture
                </span>
              </div>

              <h3 className="mt-4 font-display text-3xl text-[#1F1B18]">
                Foundations of Graph Theory
              </h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-[#EEE5DB] bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1F1B18]">
                    <Network size={16} className="text-[#A1764E]" />
                    <span>BFS vs. DFS</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#6B645D]">
                    BFS expands outwardly in concentric layers using a FIFO
                    queue (best for unweighted shortest paths); DFS explores
                    branch-first using a stack (ideal for cycle detection and
                    topological sorting).
                  </p>
                </div>

                <div className="rounded-2xl border border-[#EEE5DB] bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1F1B18]">
                    <Route size={16} className="text-[#3D5A37]" />
                    <span>Dijkstra&apos;s Greedy Relaxation</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#6B645D]">
                    Greedily expands the closest known vertex from a priority
                    queue to guarantee optimal shortest paths in non-negative
                    weighted networks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapters Collection */}
        <section id="graphs-chapters" className="pt-20">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A07A56]">
              Chapters
            </p>
            <h2 className="mt-3 font-display text-5xl text-[#202020]">
              Available Graph Chapters
            </h2>
            <p className="mt-4 text-base text-[#666]">
              Select a chapter to access interactive laboratories, step-by-step
              traversal playback, and dynamic path relaxation visualizations.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
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
