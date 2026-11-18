import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
      {to ? (
        <Link to={to} className={navItemClass}>
          {content}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={navItemClass}>
          {content}
        </button>
      )}
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);

  // Close mobile drawer on route change without cascading renders
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    setMobileOpen(false);
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
    setMobileOpen(false);
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
        scrolled || mobileOpen
          ? "bg-[#F7F5F2]/95 backdrop-blur-xl border-b border-[#E9E2D9] shadow-xs"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 md:h-24 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Logo */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center"
        >
          <img
            src={logo}
            alt="AlgoShelf"
            className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-14">
          <NavItem onClick={scrollToLibrary}>Library</NavItem>
          <NavItem to="/practice">Practice</NavItem>
          <NavItem to="/roadmaps">Roadmaps</NavItem>
          <NavItem to="/about">About</NavItem>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8DDD1] bg-white/80 text-[#4B433D] shadow-xs transition hover:bg-white"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="border-b border-[#E9E2D9] bg-[#F7F5F2]/98 backdrop-blur-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col space-y-4 px-6 pb-6 pt-2">
              <button
                type="button"
                onClick={scrollToLibrary}
                className="flex w-full items-center justify-start rounded-xl p-3 text-left font-medium text-[#4B433D] hover:bg-[#EFE5D6]/50 hover:text-[#A1764E]"
              >
                Library
              </button>

              <Link
                to="/practice"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-start rounded-xl p-3 text-left font-medium text-[#4B433D] hover:bg-[#EFE5D6]/50 hover:text-[#A1764E]"
              >
                Practice
              </Link>

              <Link
                to="/roadmaps"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-start rounded-xl p-3 text-left font-medium text-[#4B433D] hover:bg-[#EFE5D6]/50 hover:text-[#A1764E]"
              >
                Roadmaps
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-start rounded-xl p-3 text-left font-medium text-[#4B433D] hover:bg-[#EFE5D6]/50 hover:text-[#A1764E]"
              >
                About
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
