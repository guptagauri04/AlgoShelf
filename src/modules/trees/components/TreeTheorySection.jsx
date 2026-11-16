import {
  BookOpen,
  Clock3,
  Layers,
  GitBranch,
  CheckCircle,
} from "lucide-react";

export default function TreeTheorySection() {
  return (
    <section className="space-y-8">
      {/* Complexity Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#E8DDD1] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
              Time Complexity
            </p>
            <Clock3 size={16} className="text-[#A1764E]" />
          </div>
          <h3 className="mt-3 font-mono text-3xl font-bold text-[#1F1B18]">
            O(n)
          </h3>
          <p className="mt-2 text-xs text-[#8C837B]">
            Every node in the binary tree is visited exactly once.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8DDD1] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
              Space (Balanced)
            </p>
            <Layers size={16} className="text-[#A1764E]" />
          </div>
          <h3 className="mt-3 font-mono text-3xl font-bold text-[#1F1B18]">
            O(log n)
          </h3>
          <p className="mt-2 text-xs text-[#8C837B]">
            Recursion stack height proportional to tree depth h = log₂(n).
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8DDD1] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
              Space (Skewed)
            </p>
            <Layers size={16} className="text-[#A1764E]" />
          </div>
          <h3 className="mt-3 font-mono text-3xl font-bold text-[#1F1B18]">
            O(n)
          </h3>
          <p className="mt-2 text-xs text-[#8C837B]">
            Degenerate / linked-list-like trees where depth equals n.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8DDD1] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
              Strategy
            </p>
            <GitBranch size={16} className="text-[#A1764E]" />
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold text-[#1F1B18]">
            DFS
          </h3>
          <p className="mt-2 text-xs text-[#8C837B]">
            Depth-First Search recursive divide-and-conquer strategy.
          </p>
        </div>
      </div>

      {/* Deep Dive Article */}
      <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-10">
        <div className="flex items-center gap-3 border-b border-[#EEE5DB] pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F4ECE3] text-[#A1764E]">
            <BookOpen size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
              Deep Dive
            </p>
            <h3 className="font-display text-3xl text-[#1F1B18]">
              Understanding Binary Tree Traversals
            </h3>
          </div>
        </div>

        <div className="prose prose-stone mt-6 max-w-none space-y-6 text-[#5F5952] leading-7">
          <p className="text-lg leading-8 text-[#3A332C]">
            Unlike linear data structures (such as arrays, linked lists, and stacks)
            which have a singular, natural beginning-to-end reading order, trees
            can be traversed in multiple distinct directions. Depth-First
            traversals differ entirely in <em>when</em> the current (root) node
            is visited relative to its left and right subtrees.
          </p>

          <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-3">
            <div className="rounded-2xl border border-[#EDE2D5] bg-[#FCFBF8] p-5">
              <span className="font-mono text-xs font-bold uppercase text-[#A1764E]">
                1. Inorder (L → N → R)
              </span>
              <h4 className="mt-2 font-display text-xl text-[#1F1B18]">
                Symmetric Order
              </h4>
              <p className="mt-2 text-xs text-[#6B645D]">
                Recursively traverses the left subtree, processes the root, and
                then recursively traverses the right subtree. On a Binary Search
                Tree, this guarantees ascending numerical or alphabetical order.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EDE2D5] bg-[#FCFBF8] p-5">
              <span className="font-mono text-xs font-bold uppercase text-[#A1764E]">
                2. Preorder (N → L → R)
              </span>
              <h4 className="mt-2 font-display text-xl text-[#1F1B18]">
                Prefix / Top-Down Order
              </h4>
              <p className="mt-2 text-xs text-[#6B645D]">
                Processes the root before either child. This top-down sequence is
                essential for serializing trees to JSON or disk, and creating an
                exact duplicate (clone) of an existing tree structure.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EDE2D5] bg-[#FCFBF8] p-5">
              <span className="font-mono text-xs font-bold uppercase text-[#A1764E]">
                3. Postorder (L → R → N)
              </span>
              <h4 className="mt-2 font-display text-xl text-[#1F1B18]">
                Postfix / Bottom-Up Order
              </h4>
              <p className="mt-2 text-xs text-[#6B645D]">
                Exhaustively finishes both subtrees before processing the root.
                Essential for bottom-up dependencies, such as safely freeing node
                memory without orphaned pointers or computing folder directory sizes.
              </p>
            </div>
          </div>

          <h4 className="pt-4 font-display text-2xl text-[#1F1B18]">
            Key Takeaways for Technical Interviews
          </h4>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <CheckCircle size={18} className="mt-0.5 text-[#4D7C57] shrink-0" />
              <span>
                <strong>Reconstructing a Unique Tree:</strong> A binary tree can
                be uniquely reconstructed if you are given either (Inorder +
                Preorder) or (Inorder + Postorder). Preorder/Postorder identifies
                the root, and Inorder divides the tree into left and right
                subtrees.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle size={18} className="mt-0.5 text-[#4D7C57] shrink-0" />
              <span>
                <strong>BST Inorder Traversal Property:</strong> If an Inorder
                traversal of a tree produces a strictly sorted array without
                inversions, the tree is a valid Binary Search Tree.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle size={18} className="mt-0.5 text-[#4D7C57] shrink-0" />
              <span>
                <strong>Recursive Call Stack Overhead:</strong> Although the
                traversal requires O(1) auxiliary variables, the implicit call
                stack uses O(h) memory where h is the tree height.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
