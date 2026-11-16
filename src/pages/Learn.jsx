import TopicCard from "../components/TopicCard";

function Learn() {
  return (
    <div>
      <h1>Learn DSA</h1>

      <p>Select a topic to start learning.</p>

      <hr />

      <TopicCard
        title="📊 Sorting Algorithms"
        description="Learn Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort and Heap Sort."
        path="/learn/sorting"
      />

      <TopicCard
        title="🔍 Searching Algorithms"
        description="Learn Linear Search and Binary Search through interactive visualizations."
        path="/learn/searching"
      />

      <TopicCard
        title="🌳 Tree Algorithms"
        description="Learn Inorder, Preorder, and Postorder binary tree traversals through interactive visualizations."
        path="/learn/trees"
      />
    </div>
  );
}

export default Learn;