export const TREE_CONCEPTS = [
  {
    title: "Binary Search Tree Property",
    description:
      "For any given node X, all keys in the left subtree of X are strictly smaller than X's key, and all keys in the right subtree are strictly greater.",
    example: "Left Subtree (< 50) ← [50] → Right Subtree (> 50)",
  },
  {
    title: "O(log n) vs O(n) Complexity",
    description:
      "In a balanced BST, search, insert, and delete take O(log n) time by halving the search space each step. If nodes are inserted in sorted order, the tree degenerates into a linked list of height n with O(n) performance.",
    example: "Balanced tree of 1,000,000 nodes requires ~20 comparisons vs. 1,000,000 in worst-case.",
  },
  {
    title: "Inorder Traversal Ordering",
    description:
      "Traversing a BST via Inorder (Left → Root → Right) produces keys in ascending sorted order, providing an O(n) mechanism to retrieve sorted data without extra sorting passes.",
    example: "Tree with {20, 50, 70} yields sorted stream: [20, 50, 70].",
  },
  {
    title: "Node Deletion Cases",
    description:
      "Deletion involves 3 distinct structural cases: 1) Leaf node (removed immediately), 2) Single child (child replaces node), 3) Two children (replace with inorder successor, i.e., min in right subtree, then delete successor).",
    example: "Deleting node 50 with two children replaces value with min from right subtree.",
  },
];

export const INITIAL_BST_KEYS = [50, 30, 70, 20, 40, 60, 80];
