import ComplexityCard from "../ComplexityCard";

export default function ComplexitySection({ algorithm, complexity }) {
  const descriptions = {
    bubble:
      "Bubble Sort is simple to understand but inefficient on large datasets. These complexity values describe how its performance changes as the input grows.",

    selection:
      "Selection Sort repeatedly scans the unsorted portion of the array to find the smallest element before placing it into its final position. Although it performs fewer swaps than Bubble Sort, it still requires quadratic time for almost every input.",

    insertion:
      "Insertion Sort builds a sorted portion of the array one element at a time. It performs exceptionally well on nearly sorted data, achieving linear time in the best case while remaining simple, stable, and in-place.",

    merge:
      "Merge Sort always divides the array into smaller halves before merging them back together. Unlike Bubble or Insertion Sort, its running time remains O(n log n) regardless of the input order.",
    
     quick:
      "Quick Sort partitions the array around a pivot and recursively sorts the resulting subarrays. It delivers excellent average-case performance, though poor pivot choices can degrade it to O(n²).",

    heap:
      "Heap Sort converts the array into a max-heap and repeatedly extracts the root. It guarantees consistent O(n log n) running time across all cases while maintaining O(1) in-place auxiliary space.",
  };

  return (
    <section className="bg-[#F7F5F2] py-28">
      <div className="mx-auto max-w-7xl px-8">
        <p
          className="
            text-sm
            uppercase
            tracking-[0.4em]
            text-[#A1764E]
          "
        >
          Complexity Analysis
        </p>

        <h2
          className="
            mt-6
            font-Cormorant
            text-5xl
            text-[#1F1B18]
          "
        >
          Performance Characteristics
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-9 text-[#5F5952]">
          {descriptions[algorithm.id]}
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <ComplexityCard
            title="Best Case"
            value={complexity.best}
            subtitle={
              algorithm.id === "insertion"
                ? "Nearly Sorted"
                : algorithm.id === "selection"
                  ? "Any Input"
                  : "Already Sorted"
            }
          />

          <ComplexityCard
            title="Average Case"
            value={complexity.average}
            subtitle="Typical Input"
          />

          <ComplexityCard
            title="Worst Case"
            value={complexity.worst}
            subtitle={
              algorithm.id === "selection"
                ? "Any Input"
                : "Reverse Sorted"
            }
          />

          <ComplexityCard
            title="Space"
            value={complexity.space}
            subtitle="Auxiliary Memory"
          />
        </div>
      </div>
    </section>
  );
}