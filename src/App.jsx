import { Routes, Route } from "react-router-dom";

// Main Pages
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Sorting Module
import SortingHome from "./modules/sorting/pages/SortingHome";
import BubbleSort from "./modules/sorting/pages/BubbleSort";
import SelectionSort from "./modules/sorting/pages/SelectionSort";
import InsertionSort from "./modules/sorting/pages/InsertionSort";
import MergeSort from "./modules/sorting/pages/MergeSort";
import QuickSort from "./modules/sorting/pages/QuickSort";
import HeapSort from "./modules/sorting/pages/HeapSort";

// Searching Module
import SearchingHome from "./modules/searching/pages/SearchingHome";

// Arrays Module
import ArrayTraversal from "./modules/arrays/pages/ArrayTraversal";

// Scroll Helper
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Sorting */}
        <Route path="/sorting" element={<SortingHome />} />
        <Route path="/sorting/bubble" element={<BubbleSort />} />
        <Route path="/sorting/selection" element={<SelectionSort />} />
        <Route path="/sorting/insertion" element={<InsertionSort />} />
        <Route path="/sorting/merge" element={<MergeSort />} />
        <Route path="/sorting/quick" element={<QuickSort />} />
        <Route path="/sorting/heap" element={<HeapSort />} />

        {/* Searching */}
        <Route path="/searching" element={<SearchingHome />} />

        {/* Arrays */}
        <Route path="/arrays/traversal" element={<ArrayTraversal />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}


export default App;

