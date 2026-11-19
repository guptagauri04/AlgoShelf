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
import LinearSearch from "./modules/searching/pages/LinearSearch";

// Arrays Module
import ArraysHome from "./modules/arrays/pages/ArraysHome";
import ArrayOperations from "./modules/arrays/pages/ArrayOperations";

// Graphs Module
import GraphsHome from "./modules/graphs/pages/GraphsHome";
import GraphTraversalsPage from "./modules/graphs/pages/GraphTraversalsPage";
import DijkstraPage from "./modules/graphs/pages/DijkstraPage";

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
        <Route path="/searching/linear" element={<LinearSearch />} />

        {/* Arrays */}
        <Route path="/learn/arrays" element={<ArraysHome />} />
        <Route path="/learn/arrays/operations" element={<ArrayOperations />} />

        {/* Graphs - Supporting both /learn/graphs and /graphs */}
        <Route path="/learn/graphs" element={<GraphsHome />} />
        <Route path="/learn/graphs/traversals" element={<GraphTraversalsPage />} />
        <Route path="/learn/graphs/dijkstra" element={<DijkstraPage />} />
        <Route path="/graphs" element={<GraphsHome />} />
        <Route path="/graphs/traversals" element={<GraphTraversalsPage />} />
        <Route path="/graphs/dijkstra" element={<DijkstraPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
