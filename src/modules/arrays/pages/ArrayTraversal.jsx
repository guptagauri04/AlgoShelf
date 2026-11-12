import TraversalLayout from "../layouts/TraversalLayout";

import TraversalHero from "../components/sections/TraversalHero";
import TraversalOverview from "../components/sections/TraversalOverview";
import TraversalComplexity from "../components/sections/TraversalComplexity";

import TraversalVisualizer from "../components/TraversalVisualizer";

import { traversalContent } from "../data/traversal";

export default function ArrayTraversal() {
  return (
    <TraversalLayout
      hero={<TraversalHero />}

      visualizer={<TraversalVisualizer />}

      overview={
        <TraversalOverview
          overview={traversalContent.overview}
        />
      }

      theory={null}

      pseudocode={null}

      complexity={
        <TraversalComplexity
          complexity={traversalContent.complexity}
        />
      }

      code={null}
      practice={null}
      nextChapter={null}
    />
  );
}
