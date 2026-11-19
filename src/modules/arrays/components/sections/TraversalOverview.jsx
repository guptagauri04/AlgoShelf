export default function TraversalOverview({ overview }) {
  return (
    <section className="mx-auto max-w-6xl px-8 pt-16 pb-24">

      <div className="grid gap-16 lg:grid-cols-2">

        {/* Left */}

        <div>
          <p className="text-sm uppercase tracking-[0.45em] text-[#A1764E]">
            Overview
          </p>

          <h2 className="mt-6 font-Cormorant text-5xl leading-tight text-[#1F1B18]">
            {overview.heading}
          </h2>
        </div>

        {/* Right */}

        <div>
          <p className="text-xl leading-10 text-[#5F5952]">
            {overview.description}
          </p>
        </div>
      </div>
    </section>
  );
}
