import AlgorithmLayout from "../layouts/AlgorithmLayout";

import AlgorithmHero from "../components/sections/AlgorithmHero";
import OverviewSection from "../components/sections/OverviewSection";
import ComplexitySection from "../components/sections/ComplexitySection";

import AlgorithmVisualizer from "../components/AlgorithmVisualizer";

import { bubbleContent } from "../data/bubble";
import { getAlgorithm } from "../utils/getAlgorithm";

export default function BubbleSort() {
  const algorithm = getAlgorithm("bubble");

  return (
    <AlgorithmLayout
      hero={<AlgorithmHero algorithm={algorithm} />}

      visualizer={
        <AlgorithmVisualizer
          algorithm={algorithm}
          pseudocode={bubbleContent.pseudocode}
        />
      }

      overview={
        <OverviewSection
          overview={bubbleContent.overview}
        />
      }

      theory={null}

      pseudocode={null}

      complexity={
        <ComplexitySection
          algorithm={algorithm}
          complexity={bubbleContent.complexity}
        />
      }

      code={null}
      practice={null}
      nextChapter={null}
    />
  );
}