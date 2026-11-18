import { motion } from "framer-motion";
import SortingIllustration from "../ui/SortingIllustration";
import {
    ArrowDown,
    BookOpen,
} from "lucide-react";

export default function EditorialHeader() {
    const scrollToChapters = () => {
        document.getElementById("algorithms")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <section className="grid gap-14 py-8 lg:grid-cols-2 lg:items-center">

            {/* Left Content */}

            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >

                {/* Chapter */}

                <div className="mb-5 flex items-center gap-4">
                    <div className="h-px w-12 bg-[#D9C9B6]" />

                    <p className="font-body text-sm font-semibold uppercase tracking-[0.4em] text-[#A07A56]">
                        Book II
                    </p>
                </div>

                {/* Title */}

                <h1 className="font-bold font-display text-5xl leading-tight text-[#202020] sm:text-6xl md:text-7xl">
                    Sorting
                    <br />
                    Algorithms
                </h1>

                {/* Quote */}

                <p className="font-editorial mt-7 max-w-md text-xl italic leading-relaxed text-[#6B5B4D]">
                    “Learn to organize information before learning to organize code.”
                </p>

                {/* CTA */}

                <button
                    onClick={scrollToChapters}
                    className="
            group
            mt-10
            inline-flex
            items-center
            gap-3
            rounded-full
            bg-[#9D7653]
            px-7
            py-3.5
            text-sm
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-[#8A6645]
            hover:shadow-xl
          "
                >
                    <BookOpen size={18} />

                    <span>Start Exploring</span>

                    <ArrowDown
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-y-1"
                    />
                </button>
            </motion.div>

            {/* Illustration */}

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="flex justify-center"
            >
                <SortingIllustration />
            </motion.div>

        </section>
    );
}