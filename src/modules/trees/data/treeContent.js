export const treeContent = {
  id: "trees",
  title: "Trees & Hierarchical Structures",
  bookNumber: "Book IV",
  subtitle: "Non-linear data structures organizing data hierarchically through parent and child relationships.",
  quote: "“A tree is a non-linear index: by dividing at every branch, search spaces shrink exponentially.”",
  overview: {
    heading: "What is a Tree?",
    description:
      "Unlike arrays and linked lists that store elements in linear sequence, a Tree is a hierarchical data structure consisting of nodes connected by edges. Every tree starts with a single Root node and branches out into subtrees, providing the foundation for file systems, database indices, and compiler syntax trees.",
  },
  takeaways: [
    "Root is the top node with zero incoming edges.",
    "Binary Tree restricts every node to at most two children (left and right).",
    "Binary Search Tree (BST) enforces ordering: Left < Root < Right.",
    "Search, Insertion, and Deletion run in O(log n) average time on balanced trees.",
  ],
  bst: {
    title: "Binary Search Tree (BST) Operations",
    subtitle: "Left subtree is strictly smaller; right subtree is strictly larger. Enables logarithmic search, insertion, and deletion.",
    rule: "For every node with value V: all left descendants < V and all right descendants > V.",
    operations: [
      {
        name: "Search(val)",
        complexity: "O(log n)",
        worst: "O(n)",
        desc: "Compares target with current node. Traverses left if smaller, right if larger, until found or null.",
      },
      {
        name: "Insert(val)",
        complexity: "O(log n)",
        worst: "O(n)",
        desc: "Navigates down the BST following ordering rules, attaching the new value as a leaf node in its correct position.",
      },
      {
        name: "Delete(val)",
        complexity: "O(log n)",
        worst: "O(n)",
        desc: "Locates node and removes it: leaves deleted directly, 1-child nodes spliced to child, 2-child nodes replaced by inorder successor.",
      },
    ],
  },
  traversals: {
    title: "Binary Tree Traversals",
    subtitle: "Systematic algorithms for visiting every node in a tree exactly once.",
    types: [
      {
        id: "inorder",
        name: "Inorder Traversal",
        rule: "Left → Root → Right",
        desc: "Visits the entire left subtree, then the current node, then the right subtree. On a BST, this yields values in sorted ascending order.",
        pseudocode: "function inorder(node) {\n  if (!node) return;\n  inorder(node.left);\n  visit(node);\n  inorder(node.right);\n}",
      },
      {
        id: "preorder",
        name: "Preorder Traversal",
        rule: "Root → Left → Right",
        desc: "Visits the root before its children. Widely used for serializing trees, copying structure, and expression prefix evaluation.",
        pseudocode: "function preorder(node) {\n  if (!node) return;\n  visit(node);\n  preorder(node.left);\n  preorder(node.right);\n}",
      },
      {
        id: "postorder",
        name: "Postorder Traversal",
        rule: "Left → Right → Root",
        desc: "Visits both children before the root. Essential for bottom-up operations like deleting trees or calculating directory sizes.",
        pseudocode: "function postorder(node) {\n  if (!node) return;\n  postorder(node.left);\n  postorder(node.right);\n  visit(node);\n}",
      },
    ],
  },
};
