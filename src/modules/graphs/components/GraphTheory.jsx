import { Network, GitGraph, Sparkles } from "lucide-react";

export default function GraphTheory() {
  return (
    <section className="rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-6 shadow-sm sm:p-8">
      {/* Editorial Title */}
      <div className="border-b border-[#ECE3D8] pb-6">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-[#A07A56]">
          Theoretical Deep Dive
        </p>
        <h2 className="font-display mt-2 text-3xl text-[#202020] sm:text-4xl">
          Graph Foundations, BFS &amp; DFS
        </h2>
        <p className="font-editorial mt-3 text-lg italic text-[#6B5B4D]">
          &ldquo;Graphs represent arbitrary relationships between entities &mdash; from computer networks and social graphs to state spaces and road systems.&rdquo;
        </p>
      </div>

      {/* 2-Column Comparison */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* BFS Card */}
        <div className="flex flex-col rounded-2xl border border-[#E8DED2] bg-white p-6 shadow-xs">
          <div className="flex items-center gap-3 text-[#A65B38]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAEAE0]">
              <Network size={20} />
            </div>
            <div>
              <h3 className="font-display text-xl text-[#1F1B18]">
                Breadth-First Search (BFS)
              </h3>
              <p className="text-xs text-[#8C837B]">Level-by-Level Wavefront</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-[#555]">
            BFS begins at a specified source vertex and explores all direct
            neighbors at distance 1 before moving to vertices at distance 2, and
            so forth. It systematically radiates outward in concentric waves.
          </p>

          <ul className="mt-4 flex flex-col gap-2.5 text-xs text-[#6B5B4D]">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A65B38]" />
              <strong>Data Structure:</strong> FIFO Queue (First-In, First-Out).
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A65B38]" />
              <strong>Guaranteed Property:</strong> Finds the shortest path in
              unweighted graphs.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A65B38]" />
              <strong>Common Uses:</strong> Shortest hop distance, peer-to-peer
              discovery, garbage collection (Cheney&apos;s algorithm).
            </li>
          </ul>
        </div>

        {/* DFS Card */}
        <div className="flex flex-col rounded-2xl border border-[#E8DED2] bg-white p-6 shadow-xs">
          <div className="flex items-center gap-3 text-[#567156]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7EFE7]">
              <GitGraph size={20} />
            </div>
            <div>
              <h3 className="font-display text-xl text-[#1F1B18]">
                Depth-First Search (DFS)
              </h3>
              <p className="text-xs text-[#8C837B]">Deep Probe &amp; Backtrack</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-[#555]">
            DFS dives as deeply along each path as possible before backtracking.
            When reaching a dead end (a node with no unvisited outgoing edges),
            it retraces its steps until an unexplored branch is found.
          </p>

          <ul className="mt-4 flex flex-col gap-2.5 text-xs text-[#6B5B4D]">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#567156]" />
              <strong>Data Structure:</strong> LIFO Stack or Call-Stack Recursion.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#567156]" />
              <strong>Guaranteed Property:</strong> Fully classifies tree edges,
              back edges, forward edges, and cross edges.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#567156]" />
              <strong>Common Uses:</strong> Topological sorting, cycle detection,
              strongly connected components (Tarjan/Kosaraju).
            </li>
          </ul>
        </div>
      </div>

      {/* Complexity Comparison Table */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-[#E8DED2] bg-white">
        <div className="border-b border-[#F0EBE4] bg-[#FAF8F5] px-6 py-3.5">
          <h4 className="font-display text-base text-[#1F1B18]">
            Asymptotic Complexity Matrix
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#F0EBE4] text-[#8C837B]">
                <th className="px-6 py-3 font-sans font-semibold">Algorithm</th>
                <th className="px-6 py-3 font-semibold">Time Complexity</th>
                <th className="px-6 py-3 font-semibold">Space Complexity</th>
                <th className="px-6 py-3 font-sans font-semibold">Structure</th>
                <th className="px-6 py-3 font-sans font-semibold">Key Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE4] text-[#333]">
              <tr>
                <td className="px-6 py-3.5 font-sans font-bold text-[#A65B38]">
                  BFS
                </td>
                <td className="px-6 py-3.5">O(V + E)</td>
                <td className="px-6 py-3.5">O(V)</td>
                <td className="px-6 py-3.5 font-sans">Queue</td>
                <td className="px-6 py-3.5 font-sans text-[#6B645D]">
                  Optimal shortest path in unweighted graphs
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3.5 font-sans font-bold text-[#567156]">
                  DFS
                </td>
                <td className="px-6 py-3.5">O(V + E)</td>
                <td className="px-6 py-3.5">O(V)</td>
                <td className="px-6 py-3.5 font-sans">Stack / Recursion</td>
                <td className="px-6 py-3.5 font-sans text-[#6B645D]">
                  Low memory footprint on deep trees &amp; cycle detection
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Connected vs Disconnected Callout */}
      <div className="mt-8 flex items-start gap-3 rounded-2xl bg-[#F7F2EB] p-5 text-sm leading-6 text-[#6B5B4D]">
        <Sparkles size={20} className="text-[#A65B38] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#1F1B18]">
            Handling Disconnected Graphs:
          </strong>{" "}
          If a graph contains multiple isolated components, running BFS or DFS
          from a single vertex will only discover the connected component
          containing that start vertex. To visit every vertex across all
          components, wrap the traversal inside an outer loop over all vertices
          in $V$, invoking BFS/DFS whenever an unvisited vertex is encountered.
        </div>
      </div>
    </section>
  );
}
