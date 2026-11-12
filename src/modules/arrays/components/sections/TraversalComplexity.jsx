const DESCRIPTION =
  "Traversing an array always touches every element exactly once, so the " +
  "running time grows linearly with the number of values. The loop counter " +
  "is the only extra memory the pass needs.";

const CARDS = [
  { title: "Best Case", key: "best", subtitle: "Every Element Visited" },
  { title: "Average Case", key: "average", subtitle: "Every Element Visited" },
  { title: "Worst Case", key: "worst", subtitle: "Every Element Visited" },
  { title: "Space", key: "space", subtitle: "Loop Counter Only" },
];

export default function TraversalComplexity({ complexity }) {
  return (
    <section className="bg-[#F7F5F2] py-28">
      <div className="mx-auto max-w-7xl px-8">

        <p className="text-sm uppercase tracking-[0.4em] text-[#A1764E]">
          Complexity Analysis
        </p>

        <h2 className="mt-6 font-Cormorant text-5xl text-[#1F1B18]">
          Performance Characteristics
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-9 text-[#5F5952]">
          {DESCRIPTION}
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => (
            <div
              key={card.key}
              className="rounded-2xl border border-[#E7E0D7] bg-white p-6"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[#8B8378]">
                {card.title}
              </p>

              <h3 className="mt-3 text-3xl font-semibold text-[#1F1B18]">
                {complexity[card.key]}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#6B645D]">
                {card.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
