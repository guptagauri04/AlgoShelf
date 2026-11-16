import { useState } from "react";
import { ChevronRight } from "lucide-react";

const CODE_SNIPPETS = {
  inorder: {
    pseudocode: [
      "function inorder(node):",
      "    if node is null: return",
      "    inorder(node.left)",
      "    visit(node)  // Left → Root → Right",
      "    inorder(node.right)",
    ],
    javascript: [
      "function inorder(node, result = []) {",
      "  if (!node) return result;",
      "  inorder(node.left, result);",
      "  result.push(node.val);",
      "  inorder(node.right, result);",
      "  return result;",
      "}",
    ],
    python: [
      "def inorder(node):",
      "    if not node: return",
      "    inorder(node.left)",
      "    print(node.val, end=' ')",
      "    inorder(node.right)",
    ],
    cpp: [
      "void inorder(TreeNode* root) {",
      "    if (root == nullptr) return;",
      "    inorder(root->left);",
      "    cout << root->val << \" \";",
      "    inorder(root->right);",
      "}",
    ],
  },
  preorder: {
    pseudocode: [
      "function preorder(node):",
      "    if node is null: return",
      "    visit(node)  // Root → Left → Right",
      "    preorder(node.left)",
      "    preorder(node.right)",
    ],
    javascript: [
      "function preorder(node, result = []) {",
      "  if (!node) return result;",
      "  result.push(node.val);",
      "  preorder(node.left, result);",
      "  preorder(node.right, result);",
      "  return result;",
      "}",
    ],
    python: [
      "def preorder(node):",
      "    if not node: return",
      "    print(node.val, end=' ')",
      "    preorder(node.left)",
      "    preorder(node.right)",
    ],
    cpp: [
      "void preorder(TreeNode* root) {",
      "    if (root == nullptr) return;",
      "    cout << root->val << \" \";",
      "    preorder(root->left);",
      "    preorder(root->right);",
      "}",
    ],
  },
  postorder: {
    pseudocode: [
      "function postorder(node):",
      "    if node is null: return",
      "    postorder(node.left)",
      "    postorder(node.right)",
      "    visit(node)  // Left → Right → Root",
    ],
    javascript: [
      "function postorder(node, result = []) {",
      "  if (!node) return result;",
      "  postorder(node.left, result);",
      "  postorder(node.right, result);",
      "  result.push(node.val);",
      "  return result;",
      "}",
    ],
    python: [
      "def postorder(node):",
      "    if not node: return",
      "    postorder(node.left)",
      "    postorder(node.right)",
      "    print(node.val, end=' ')",
    ],
    cpp: [
      "void postorder(TreeNode* root) {",
      "    if (root == nullptr) return;",
      "    postorder(root->left);",
      "    postorder(root->right);",
      "    cout << root->val << \" \";",
      "}",
    ],
  },
};

export default function TreeCodeBlock({
  traversalType = "inorder",
  activeLine = 1,
}) {
  const [lang, setLang] = useState("pseudocode");

  const lines =
    CODE_SNIPPETS[traversalType]?.[lang] ||
    CODE_SNIPPETS.inorder.pseudocode;

  // Active line mapping (1-based index to 0-based array)
  const activeIndex = activeLine - 1;

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Header and Lang Switcher */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Implementation
          </p>
          <h3 className="mt-1 font-display text-3xl text-[#1F1B18]">
            Code Walkthrough
          </h3>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1.5 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-1.5 text-xs">
          {[
            { id: "pseudocode", label: "Pseudocode" },
            { id: "javascript", label: "JavaScript" },
            { id: "python", label: "Python" },
            { id: "cpp", label: "C++" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLang(item.id)}
              className={`rounded-xl px-2.5 py-1 font-medium transition ${
                lang === item.id
                  ? "bg-[#1F1B18] text-white"
                  : "text-[#5F5952] hover:bg-[#F2ECE4]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code Lines */}
      <div className="space-y-1.5 font-mono text-xs sm:text-sm">
        {lines.map((lineText, index) => {
          // Highlight corresponding line in pseudocode mode
          const isHighlighted = lang === "pseudocode" && activeIndex === index;

          return (
            <div
              key={`${lang}-${index}`}
              className={`flex items-center rounded-xl px-3 py-2 transition-all duration-200 ${
                isHighlighted
                  ? "bg-[#F7EFE3] font-semibold text-[#1F1B18] shadow-xs"
                  : "text-[#5F5952] hover:bg-[#FAF8F5]"
              }`}
            >
              {/* Line indicator */}
              <div className="flex w-6 items-center justify-center">
                {isHighlighted ? (
                  <ChevronRight size={16} className="text-[#A1764E]" />
                ) : (
                  <span className="text-xs text-[#C5B7A8]">{index + 1}</span>
                )}
              </div>

              {/* Accent bar */}
              <div
                className={`mx-3 h-5 w-[2px] rounded-full transition-all ${
                  isHighlighted ? "bg-[#A1764E]" : "bg-transparent"
                }`}
              />

              {/* Line Code */}
              <code className="flex-1 whitespace-pre">{lineText}</code>
            </div>
          );
        })}
      </div>
    </div>
  );
}
