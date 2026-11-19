import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { traversalTopic } from "../../data/traversal";

const WHY_LEARN =
  "Traversal looks trivial, but it is the skeleton of almost every array " +
  "algorithm you will ever meet — searching, counting, reversing and " +
  "sorting all begin with a clean pass over the elements, index by index.";

const SKETCH_VALUES = [3, 7, 1, 9];

export default function TraversalHero() {
  return (
    <section className="border-b border-[#ECE3D8] bg-[#F7F5F2]">
      <div className="mx-auto max-w-7xl px-8 py-16">

        {/* Back */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-[#6B645D] transition hover:text-[#A1764E]"
        >
          <ArrowLeft size={18} />

          <span className="font-medium">
            Back to Bookshelf
          </span>
        </Link>

        {/* Hero */}

        <div className="mt-14 grid items-start gap-14 lg:grid-cols-[1.55fr_1fr]">

          {/* LEFT */}

          <div>

            {/* Chapter */}

            <div className="flex items-center gap-5">
              <div className="h-px w-14 bg-[#D8C5B0]" />

              <p className="uppercase tracking-[0.3em] text-[13px] text-[#A1764E]">
                BOOK I • LESSON {traversalTopic.chapter} — ARRAYS
              </p>
            </div>

            {/* Title */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mt-8 font-Cormorant text-[92px] leading-[0.9] text-[#1F1B18]">
                {traversalTopic.title}
              </h1>
            </motion.div>

            {/* Subtitle */}

            <p className="mt-5 text-[20px] text-[#7A7068]">
              {traversalTopic.subtitle}
            </p>

            {/* Accent */}

            <div className="mt-6 h-[2px] w-20 rounded-full bg-[#A1764E]" />

            {/* Why Learn */}

            <div className="mt-12 max-w-xl border-l-2 border-[#DDD2C5] pl-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#A1764E]">
                Why Learn This?
              </p>

              <p className="mt-3 text-[17px] leading-8 text-[#5F5952]">
                {WHY_LEARN}
              </p>
            </div>

            {/* CTA */}

            <button
              onClick={() =>
                document
                  .getElementById("visualizer")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#A1764E] px-7 py-3 font-medium text-[#A1764E] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A1764E] hover:text-white"
            >
              Lets Visualize

              <ArrowRight size={18} />
            </button>
          </div>

          {/* RIGHT */}

          <div className="pt-3">

            <p className="text-xs uppercase tracking-[0.22em] text-[#A1764E]">
              THINK LIKE A PROGRAMMER
            </p>

            {/* Sketch */}

            <div className="mt-7 rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-6">
              <div className="flex items-end justify-between gap-3">
                {SKETCH_VALUES.map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div className="w-full rounded-lg border border-[#E8DDD1] bg-white py-3 text-center font-mono text-sm font-semibold text-[#1F1B18]">
                      {value}
                    </div>

                    <div
                      className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${
                        index === 1
                          ? "bg-[#1F1B18] text-white"
                          : "bg-[#F1E9DF] text-[#8C837B]"
                      }`}
                    >
                      {index}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-center text-xs text-[#8C837B]">
                The index tells the array where each value lives.
              </p>
            </div>

            {/* Key Takeaways */}

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.28em] text-[#A1764E]">
                Key Takeaways
              </p>

              <ul className="mt-4 space-y-3">
                {traversalTopic.takeaways.map((takeaway, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#A1764E]" />

                    <p className="text-[15px] leading-7 text-[#5F5952]">
                      {takeaway}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
