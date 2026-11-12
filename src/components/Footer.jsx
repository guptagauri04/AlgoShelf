import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-[#E7DED5] bg-[#F7F5F2]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-8 py-16 md:flex-row">

        {/* Brand */}
        <div>
          <h3
            className="
              font-Cormorant
              text-4xl
              leading-none
              text-[#1F1B18]
            "
          >
            <span className="text-[#1F1B18]">Algo</span>
            <span className="text-[#A1764E]">Shelf</span>
          </h3>

          <p className="mt-3 max-w-sm text-[15px] leading-7 text-[#6A625C]">
            Learn algorithms through beautiful explanations,
            interactive visualizations, and carefully written chapters.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex gap-10 text-[15px] text-[#5B5550]">
          <Link
            to="/"
            className="transition-colors hover:text-[#A1764E]"
          >
            Home
          </Link>

          <Link
            to="/arrays/traversal"
            className="transition-colors hover:text-[#A1764E]"
          >
            Arrays
          </Link>

          <Link
            to="/sorting"
            className="transition-colors hover:text-[#A1764E]"
          >
            Sorting
          </Link>

          <Link
            to="/searching"
            className="transition-colors hover:text-[#A1764E]"
          >
            Searching
          </Link>

          <Link
            to="/about"
            className="transition-colors hover:text-[#A1764E]"
          >
            About
          </Link>
        </nav>
      </div>

      <div className="border-t border-[#E7DED5] py-6">
        <p className="text-center text-sm text-[#8B847D]">
          © {new Date().getFullYear()} AlgoShelf. Crafted with curiosity.
        </p>
      </div>
    </footer>
  );
}