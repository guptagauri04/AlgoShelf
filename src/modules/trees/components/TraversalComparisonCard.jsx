import { ArrowRight, Sparkles, Check } from "lucide-react";

export default function TraversalComparisonCard({
  comparisonSequences = {},
  activeTraversal = "inorder",
  onSelectTraversal,
}) {
  const cards = [
    {
      id: "inorder",
      title: "Inorder Traversal",
      rule: "Left → Root → Right",
      mnemonic: "Root in the Middle",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      description:
        "Visits the left subtree first, then the root, then the right subtree. In a Binary Search Tree (BST), this always yields sorted ascending values.",
      bestFor: [
        "Sorted order retrieval in BSTs",
        "Evaluating infix mathematical expressions",
        "Validating if a binary tree is a valid BST",
      ],
      sequence: comparisonSequences.inorder || [],
    },
    {
      id: "preorder",
      title: "Preorder Traversal",
      rule: "Root → Left → Right",
      mnemonic: "Root Comes First",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      description:
        "Visits the root node before exploring either subtree. Because parents are processed before children, it mirrors how trees are copied and serialized.",
      bestFor: [
        "Cloning / creating a replica of a tree",
        "Tree serialization / storage in files or networks",
        "Generating prefix Polish notation",
      ],
      sequence: comparisonSequences.preorder || [],
    },
    {
      id: "postorder",
      title: "Postorder Traversal",
      rule: "Left → Right → Root",
      mnemonic: "Root Comes Last",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description:
        "Explores both left and right subtrees completely before visiting the root node. Perfect for bottom-up computation where child results are required first.",
      bestFor: [
        "Deleting or freeing nodes in memory safely",
        "Calculating file system folder sizes / subtree heights",
        "Generating postfix Reverse Polish notation",
      ],
      sequence: comparisonSequences.postorder || [],
    },
  ];

  return (
    <section className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F4ECE3] text-[#A1764E]">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
              Comparison Guide
            </p>
            <h3 className="font-display text-3xl text-[#1F1B18]">
              Compare the Three Techniques
            </h3>
          </div>
        </div>

        <p className="max-w-md text-xs text-[#6B645D]">
          Notice how the position of the <strong>Root</strong> node shifts from{" "}
          <em>first</em> (Preorder) to <em>middle</em> (Inorder) to{" "}
          <em>last</em> (Postorder).
        </p>
      </div>

      {/* 3 Traversal Cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {cards.map((c) => {
          const isActive = activeTraversal === c.id;
          return (
            <div
              key={c.id}
              onClick={() => onSelectTraversal(c.id)}
              className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all cursor-pointer ${
                isActive
                  ? "border-[#A1764E] bg-[#FAF6F0] shadow-md ring-2 ring-[#A1764E]/30"
                  : "border-[#E8DED2] bg-[#FCFBF8] hover:border-[#D5C7B7] hover:bg-white hover:shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full border px-3 py-0.5 text-xs font-bold uppercase tracking-wide ${c.badgeColor}`}
                  >
                    {c.rule}
                  </span>
                  {isActive && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#A1764E]">
                      <Check size={14} /> Active
                    </span>
                  )}
                </div>

                <h4 className="mt-4 font-display text-2xl font-bold text-[#1F1B18]">
                  {c.title}
                </h4>

                <p className="mt-1 font-mono text-xs font-semibold text-[#A1764E]">
                  Mnemonic: {c.mnemonic}
                </p>

                <p className="mt-3 text-xs leading-5 text-[#5F5952]">
                  {c.description}
                </p>

                {/* Sequence on Current Tree */}
                <div className="mt-4 rounded-xl border border-[#EDE2D5] bg-white p-3">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#8C837B]">
                    Current Tree Result:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1 font-mono text-sm font-bold text-[#1F1B18]">
                    [ {c.sequence.join(", ")} ]
                  </div>
                </div>

                {/* Key Applications */}
                <div className="mt-4">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#8C837B]">
                    Primary Uses:
                  </span>
                  <ul className="mt-1.5 space-y-1 text-xs text-[#6B645D]">
                    {c.bestFor.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#A1764E]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 border-t border-[#EEE5DB] pt-4">
                <button
                  type="button"
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold transition ${
                    isActive
                      ? "bg-[#1F1B18] text-white"
                      : "bg-[#F2ECE4] text-[#5F5952] group-hover:bg-[#E8DED2]"
                  }`}
                >
                  <span>{isActive ? "Currently Visualizing" : `Switch to ${c.title}`}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
