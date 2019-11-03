import {
  configure,
  addParameters,
  addDecorator,
  setCustomElements,
  withA11y,
} from '../../index.js';
import * as indexStories from '../stories/foo.stories.js';
import * as demoCardStories from '../stories/demo-wc.card.stories.mdx';
import * as withKnobsStories from '../stories/withWebComponentsKnobs.stories.mdx';

async function run() {
  const customElements = await (await fetch(new URL('../custom-elements.json', import.meta.url))).json();
  setCustomElements(customElements);

  addDecorator(withA11y);

  addParameters({
    a11y: {
      config: {},
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
        restoreScroll: true,
      },
    },
    options: {
      hierarchyRootSeparator: /\|/,
    },
    docs: {
      iframeHeight: '200px',
    },
  });

  configure(() => [
    indexStories,
    demoCardStories,
    withKnobsStories,
  ], {});
}

run();