import Book from "./Book";
import {
  Database,
  ArrowUpDown,
  Search,
  GitBranch,
  Network,
  Brain,
} from "lucide-react";

const books = [
  {
    title: "Arrays",
    description: "Master the building block of every algorithm.",
    icon: Database,
    link: "/arrays/traversal",
    spine: "#B3875D",
    iconBg: "#F4E7D8",
    iconColor: "#8B5A2B",
  },
  {
    title: "Sorting",
    description: "Visualize every sorting algorithm step by step.",
    icon: ArrowUpDown,
    link: "/sorting",
    spine: "#C69C4A",
    iconBg: "#F8F0D9",
    iconColor: "#A46E17",
  },
  {
    title: "Searching",
    description: "Binary Search, Linear Search and more.",
    icon: Search,
    link: "/searching",
    spine: "#8DA78D",
    iconBg: "#E7EFE7",
    iconColor: "#567156",
  },
  {
    title: "Trees",
    description: "Binary Trees, BST, AVL and Traversals.",
    icon: GitBranch,
    link: "/learn/trees",
    spine: "#B6A3C7",
    iconBg: "#F0EBF7",
    iconColor: "#6F5D86",
  },
  {
    title: "Graphs",
    description: "DFS, BFS and shortest path algorithms.",
    icon: Network,
    link: "/learn/graphs",
    spine: "#D39B7B",
    iconBg: "#FAEAE0",
    iconColor: "#A65B38",
  },
  {
    title: "Dynamic\nProgramming",
    description: "Break difficult problems into simple subproblems.",
    icon: Brain,
    link: "/learn/dp",
    spine: "#8EA2BA",
    iconBg: "#E9EDF5",
    iconColor: "#5A7088",
  },
];

const topBooks = books.slice(0, 3);
const bottomBooks = books.slice(3);

const rotationsTop = ["-rotate-2", "rotate-1", "-rotate-1"];
const rotationsBottom = ["rotate-1", "-rotate-2", "rotate-2"];

function ShelfRow({ books, rotations }) {
  return (
    <div className="mb-28">
      {/* Books */}

      <div className="flex justify-center items-end gap-14">
        {books.map((book, index) => (
          <div
            key={book.title}
            className={`${rotations[index]} transition-transform duration-300`}
          >
            <Book {...book} />
          </div>
        ))}
      </div>

      {/* Wooden Shelf */}

      <div className="mt-5 flex justify-center">
        <div className="relative w-[790px]">
          {/* Shelf Top */}

          <div className="h-6 rounded-md bg-gradient-to-b from-[#B7865A] via-[#98653F] to-[#6C4528]" />

          {/* Highlight */}

          <div className="absolute left-2 right-2 top-[2px] h-[2px] rounded-full bg-white/20" />

          {/* Shadow */}

          <div className="absolute left-4 right-4 top-6 h-4 rounded-full bg-black/20 blur-md" />
        </div>
      </div>
    </div>
  );
}

export default function Bookshelf() {
  return (
    <section
      id="bookshelf"
      className="scroll-mt-24 bg-[#F7F5F2] px-6 py-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}

        <div className="mb-20 text-center">
          <p className="font-body text-sm uppercase tracking-[0.35em] text-[#A07A56]">
            Your Collection
          </p>

          <h2 className="font-display mt-3 text-5xl md:text-6xl text-[#202020]">
            The Bookshelf
          </h2>

          <p className="font-body mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#666]">
            Choose a book, open its first chapter, and begin your journey through
            beautifully crafted visual explanations.
          </p>
        </div>

        <ShelfRow
          books={topBooks}
          rotations={rotationsTop}
        />

        <ShelfRow
          books={bottomBooks}
          rotations={rotationsBottom}
        />
      </div>
    </section>
  );
}