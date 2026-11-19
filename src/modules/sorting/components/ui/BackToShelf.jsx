import { ArrowLeft, Library } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function BackToShelf() {
  const navigate = useNavigate();

  const handleClick = () => {
    sessionStorage.setItem("scrollToBookshelf", "true");
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mb-12"
    >
      <button
        onClick={handleClick}
        className="
          group
          inline-flex
          items-center
          gap-3
          rounded-full
          border
          border-[#E8DED2]
          bg-white/80
          px-5
          py-2.5
          text-sm
          font-medium
          text-[#6B5B4D]
          shadow-sm
          backdrop-blur-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#D7C5AF]
          hover:bg-white
          hover:shadow-lg
        "
      >
        <motion.div
          whileHover={{ x: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center"
        >
          <ArrowLeft size={17} />
        </motion.div>

        <Library size={17} className="text-[#9D7653]" />

        <span>Return to Bookshelf</span>
      </button>
    </motion.div>
  );
}