import { ChevronRight } from "lucide-react";

export default function TraversalPseudocode({
  pseudocode,
  currentLine = -1,
}) {
  return (
    <div>

      {/* Heading */}

      <div className="mb-8">

        <p className="text-xs uppercase tracking-[0.35em] text-[#A1764E]">
          Algorithm
        </p>

        <h3 className="mt-2 font-Cormorant text-3xl text-[#1F1B18]">
          Pseudocode
        </h3>
      </div>

      {/* Code */}

      <div className="space-y-2">

        {pseudocode.map((line, index) => {

          const active = currentLine === index;

          return (
            <div
              key={index}
              className={`group flex items-center rounded-xl transition-all duration-300 ${
                active
                  ? "bg-[#F7EFE3] shadow-sm"
                  : "hover:bg-[#FAF8F5]"
              }`}
            >
              {/* Active Arrow */}

              <div className="w-8 flex justify-center">
                {active ? (
                  <ChevronRight
                    size={18}
                    className="text-[#A1764E]"
                  />
                ) : (
                  <div className="w-[18px]" />
                )}
              </div>

              {/* Line Number */}

              <div
                className={`w-10 text-sm font-semibold transition-colors ${
                  active
                    ? "text-[#A1764E]"
                    : "text-[#B7A999]"
                }`}
              >
                {index + 1}
              </div>

              {/* Accent */}

              <div
                className={`mr-4 h-8 w-[3px] rounded-full transition-all ${
                  active
                    ? "bg-[#A1764E]"
                    : "bg-transparent"
                }`}
              />

              {/* Code */}

              <code
                className={`flex-1 py-3 font-mono text-[13px] transition-colors ${
                  active
                    ? "font-semibold text-[#1F1B18]"
                    : "text-[#5F5952]"
                }`}
              >
                {line}
              </code>
            </div>
          );
        })}
      </div>
    </div>
  );
}
