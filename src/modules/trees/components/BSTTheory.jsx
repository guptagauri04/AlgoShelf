import { useState } from "react";
import { BookOpen, Code2, Clock, Cpu } from "lucide-react";

export default function BSTTheory() {
  const [activeCodeTab, setActiveCodeTab] = useState("insert");

  const pseudocodes = {
    insert: `function insert(node, value):
  if node is null:
    return new Node(value)
  if value < node.value:
    node.left = insert(node.left, value)
  else if value > node.value:
    node.right = insert(node.right, value)
  return node`,

    search: `function search(node, target):
  if node is null or node.value == target:
    return node
  if target < node.value:
    return search(node.left, target)
  else:
    return search(node.right, target)`,

    delete: `function delete(node, target):
  if node is null:
    return null
  if target < node.value:
    node.left = delete(node.left, target)
  else if target > node.value:
    node.right = delete(node.right, target)
  else:
    // Case 1: Leaf node
    if node.left is null and node.right is null:
      return null
    // Case 2: One child
    if node.left is null:
      return node.right
    if node.right is null:
      return node.left
    // Case 3: Two children (in-order successor)
    successor = findMin(node.right)
    node.value = successor.value
    node.right = delete(node.right, successor.value)
  return node`,
  };

  return (
    <section className="mt-12 rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-2.5 text-[#B6A3C7]">
        <BookOpen size={20} className="text-[#6F5D86]" />
        <h2 className="font-serif text-2xl font-bold text-[#1F1B18]">
          Binary Search Tree Fundamentals
        </h2>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[#6B5B4D]">
        A <strong>Binary Search Tree (BST)</strong> is a node-based binary tree data structure
        satisfying the strict invariant: for any given node \(N\), all values in its left subtree
        are strictly smaller than \(N.val\), and all values in its right subtree are strictly larger
        than \(N.val\).
      </p>

      {/* Complexities Table */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#F0EAE1] bg-[#FAF8F5] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C7A6B]">
            <Clock size={15} />
            Search (Avg)
          </div>
          <div className="mt-2 font-mono text-xl font-bold text-[#1F1B18]">
            O(log n)
          </div>
          <p className="mt-1 text-xs text-[#7A6A5A]">Balanced tree height</p>
        </div>

        <div className="rounded-2xl border border-[#F0EAE1] bg-[#FAF8F5] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C7A6B]">
            <Clock size={15} />
            Insert (Avg)
          </div>
          <div className="mt-2 font-mono text-xl font-bold text-[#1F1B18]">
            O(log n)
          </div>
          <p className="mt-1 text-xs text-[#7A6A5A]">Traverse single path down</p>
        </div>

        <div className="rounded-2xl border border-[#F0EAE1] bg-[#FAF8F5] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C7A6B]">
            <Clock size={15} />
            Worst Case
          </div>
          <div className="mt-2 font-mono text-xl font-bold text-[#D93025]">
            O(n)
          </div>
          <p className="mt-1 text-xs text-[#7A6A5A]">Degenerates into linked list</p>
        </div>

        <div className="rounded-2xl border border-[#F0EAE1] bg-[#FAF8F5] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C7A6B]">
            <Cpu size={15} />
            Space Complexity
          </div>
          <div className="mt-2 font-mono text-xl font-bold text-[#1F1B18]">
            O(h)
          </div>
          <p className="mt-1 text-xs text-[#7A6A5A]">Recursion call stack depth</p>
        </div>
      </div>

      {/* Deletion Cases Walkthrough */}
      <div className="mt-8 border-t border-[#F0EAE1] pt-6">
        <h3 className="font-serif text-lg font-bold text-[#1F1B18]">
          The 3 Cases of BST Deletion
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#F0EAE1] bg-[#FAF8F5] p-4">
            <span className="font-mono text-xs font-bold text-[#A1764E]">Case 1</span>
            <h4 className="mt-1 text-sm font-semibold text-[#1F1B18]">Leaf Node</h4>
            <p className="mt-1.5 text-xs text-[#6B5B4D]">
              The target node has no children. It can be safely severed from its parent without affecting any other elements.
            </p>
          </div>

          <div className="rounded-xl border border-[#F0EAE1] bg-[#FAF8F5] p-4">
            <span className="font-mono text-xs font-bold text-[#A1764E]">Case 2</span>
            <h4 className="mt-1 text-sm font-semibold text-[#1F1B18]">Single Child</h4>
            <p className="mt-1.5 text-xs text-[#6B5B4D]">
              The node has either only a left or right child. Link the parent directly to that single child, bypassing the target.
            </p>
          </div>

          <div className="rounded-xl border border-[#F0EAE1] bg-[#FAF8F5] p-4">
            <span className="font-mono text-xs font-bold text-[#A1764E]">Case 3</span>
            <h4 className="mt-1 text-sm font-semibold text-[#1F1B18]">Two Children</h4>
            <p className="mt-1.5 text-xs text-[#6B5B4D]">
              Locate the <em>in-order successor</em> (smallest node in the right subtree), copy its value into the target node, and recursively delete the successor.
            </p>
          </div>
        </div>
      </div>

      {/* Pseudocode Tabs */}
      <div className="mt-8 border-t border-[#F0EAE1] pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-[#A1764E]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#1F1B18]">
              Algorithm Pseudocode
            </span>
          </div>
          <div className="flex rounded-lg border border-[#E0D5C7] bg-[#FAF8F5] p-0.5">
            {["insert", "search", "delete"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveCodeTab(tab)}
                className={`rounded-md px-3 py-1 text-xs font-semibold capitalize transition ${
                  activeCodeTab === tab
                    ? "bg-white text-[#A1764E] shadow-sm"
                    : "text-[#6B5B4D] hover:text-[#1F1B18]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <pre className="mt-4 overflow-x-auto rounded-2xl bg-[#2A2421] p-4 font-mono text-xs text-[#EAE0D5] leading-relaxed">
          <code>{pseudocodes[activeCodeTab]}</code>
        </pre>
      </div>
    </section>
  );
}
