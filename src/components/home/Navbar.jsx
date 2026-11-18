import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo.svg";

const navItemClass =
  "group relative text-[15px] font-medium tracking-[0.08em] text-[#4B433D] transition-all duration-300 hover:text-[#A1764E]";

function NavItem({ children, to, onClick }) {
  const content = (
    <>
      {children}

      <span
        className="
          absolute
          left-1/2
          -bottom-1
          h-[2px]
          w-0
          -translate-x-1/2
          rounded-full
          bg-[#A1764E]
          transition-all
          duration-300
          group-hover:w-full
        "
      />
    </>
  );

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      {to ? (
        <Link to={to} className={navItemClass}>
          {content}
        </Link>
      ) : (
        <button onClick={onClick} className={navItemClass}>
          {content}
        </button>
      )}
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.location.href = "/";
    }
  };

  const scrollToLibrary = () => {
    if (location.pathname === "/") {
      document.getElementById("bookshelf")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      sessionStorage.setItem("scrollToBookshelf", "true");
      window.location.href = "/";
    }
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-[#F7F5F2]/90 backdrop-blur-xl border-b border-[#E9E2D9]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8 lg:px-12">

        {/* Logo */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center"
        >
          <img
            src={logo}
            alt="AlgoShelf"
            className="
              h-12
              w-auto
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        </motion.button>

        {/* Navigation */}
        <nav className="flex items-center gap-14">

          <NavItem onClick={scrollToLibrary}>
            Library
          </NavItem>

          <NavItem to="/practice">
            Practice
          </NavItem>

          <NavItem to="/roadmaps">
            Roadmaps
          </NavItem>

          <NavItem to="/about">
            About
          </NavItem>

        </nav>

      </div>
    </header>
  );
}