function splitArray(arr, start = 0) {
  const end = start + arr.length - 1;

  if (arr.length <= 1) {
    return {
      value: arr,
      start,
      end,
      left: null,
      right: null,
    };
  }

  const mid = Math.floor(arr.length / 2);

  return {
    value: arr,
    start,
    end,
    left: splitArray(arr.slice(0, mid), start),
    right: splitArray(arr.slice(mid), start + mid),
  };
}

function TreeNode({
  node,
  depth,
  visibleLevel,
  leftIndex,
  rightIndex,
}) {
  if (!node) return null;

  if (depth > visibleLevel) return null;

  const isActive =
    node.start === leftIndex &&
    node.end === rightIndex;

  return (
    <div className="flex flex-col items-center">
      {/* Current Array */}
      <div
        className={`
          rounded-xl
          px-4
          py-2
          shadow-sm
          transition-all
          duration-300
          ${
            isActive
              ? "border-2 border-[#A1764E] bg-[#FFF7ED] scale-105"
              : "border border-[#E8DDD1] bg-[#FAF7F2]"
          }
        `}
      >
        <div className="flex gap-2">
          {node.value.map((num, index) => (
            <div
              key={index}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white font-semibold text-[#1F1B18]"
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Children */}
      {node.left && depth < visibleLevel && (
        <>
          <div className="my-3 h-6 w-px bg-[#A1764E]" />

          <div className="flex items-start justify-center gap-10">
            <TreeNode
              node={node.left}
              depth={depth + 1}
              visibleLevel={visibleLevel}
              leftIndex={leftIndex}
              rightIndex={rightIndex}
            />

            <TreeNode
              node={node.right}
              depth={depth + 1}
              visibleLevel={visibleLevel}
              leftIndex={leftIndex}
              rightIndex={rightIndex}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default function MergeTree({
  array,
  currentLevel = 0,
  leftIndex = -1,
  rightIndex = -1,
}) {
  const tree = splitArray(array);

  return (
    <div className="overflow-x-auto py-8">
      <TreeNode
        node={tree}
        depth={0}
        visibleLevel={currentLevel}
        leftIndex={leftIndex}
        rightIndex={rightIndex}
      />
    </div>
  );
}