import Footer from "../../../components/Footer";

export default function TraversalLayout({
  hero,
  visualizer,
  overview,
  theory,
  pseudocode,
  complexity,
  code,
  practice,
  nextChapter,
}) {
  return (
    <>
      <main className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">

        {hero}

        {visualizer}

        {overview}

        {theory}

        {pseudocode}

        {complexity}

        {code}

        {practice}

        {nextChapter}
      </main>

      <Footer />
    </>
  );
}
