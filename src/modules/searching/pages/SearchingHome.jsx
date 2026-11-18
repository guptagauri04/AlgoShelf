import { ArrowDown, BookOpen, Compass, Database, Search } from "lucide-react";
import AlgorithmCard from "../../../components/AlgorithmCard";
import BackToShelf from "../../sorting/components/ui/BackToShelf";
import Footer from "../../../components/Footer";

export default function SearchingHome() {
  const chapters = [
    {
      chapter: "Chapter I",
      title: "Linear Search",
      description:
        "The fundamental sequential scan. Inspects elements one by one without needing sorted data.",
      complexity: "O(n)",
      difficulty: "Beginner",
      path: "/searching/linear",
    },
    {
      chapter: "Chapter II",
      title: "Binary Search",
      description:
        "Divide and conquer searching. Halves the search space at each step on ordered datasets.",
      complexity: "O(log n)",
      difficulty: "Beginner",
      path: "/searching/binary",
    },
  ];

  const scrollToChapters = () => {
    document.getElementById("searching-chapters")?.scrollIntoView({
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
                Book III
              </p>
            </div>

            <h1 className="font-display text-6xl leading-[0.95] text-[#202020] sm:text-7xl md:text-8xl">
              Searching
              <br />
              Algorithms
            </h1>

            <p className="font-editorial mt-6 max-w-lg text-xl italic leading-relaxed text-[#6B5B4D]">
              “To search is to ask a question. The art of the algorithm is in how many questions you can avoid asking.”
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6B645D]">
              Whether scanning an unsorted pile or halving an ordered index, searching is the core of information retrieval. Explore how algorithms navigate data structures with precision.
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
                  Algorithm Shelf Guide
                </span>
              </div>

              <h3 className="mt-4 font-display text-3xl text-[#1F1B18]">
                How We Locate Information
              </h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-[#EEE5DB] bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1F1B18]">
                    <Search size={16} className="text-[#A1764E]" />
                    <span>Linear vs. Binary</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#6B645D]">
                    Linear search requires zero setup. Binary search requires sorting first, but delivers exponentially faster lookups.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#EEE5DB] bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1F1B18]">
                    <Database size={16} className="text-[#5A7354]" />
                    <span>The Sorting Trade-off</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#6B645D]">
                    If searching once: Linear search wins. If searching many times: Sorting once with O(n log n) enables O(log n) lookups forever.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapters Collection */}
        <section id="searching-chapters" className="pt-20">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A07A56]">
              Chapters
            </p>
            <h2 className="mt-3 font-display text-5xl text-[#202020]">
              Available Searching Chapters
            </h2>
            <p className="mt-4 text-base text-[#666]">
              Step inside each chapter for full visual animations, interactive controls, and line-by-line pseudocode.
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
