import {
  configure,
  addParameters,
  addDecorator,
  setCustomElements,
  withA11y,
  DocsPage,
  DocsContainer,
  getCustomElements, isValidComponent, isValidMetaData
} from '../../index.js';
import * as indexStories from '../stories/foo.stories.js';
import * as demoCardStories from '../stories/demo-wc.card.stories.mdx';
import * as withKnobsStories from '../stories/withWebComponentsKnobs.stories.mdx';

function mapData(data) {
  return data.map(item => ({
    name: item.name,
    type: { name: item.type },
    required: '',
    description: item.description,
    defaultValue: item.default,
  }));
}

function isEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}


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

  addParameters({
    docs: {
      container: DocsContainer,
      page: DocsPage,
    },
  });
  
  addParameters({
    docs: {
      extractProps: tagName => {
        const customElements = getCustomElements();
        if (isValidComponent(tagName) && isValidMetaData(customElements)) {
          const metaData = customElements.tags.find(
            tag => tag.name.toUpperCase() === tagName.toUpperCase()
          );
          const sections = {};
          if (metaData.attributes) {
            sections.attributes = mapData(metaData.attributes);
          }
          if (metaData.properties) {
            sections.props = mapData(metaData.properties);
          }
          if (metaData.events) {
            sections.events = mapData(metaData.events);
          }
          if (metaData.slots) {
            sections.slots = mapData(metaData.slots);
          }
          if (metaData.cssProperties) {
            sections.css = mapData(metaData.cssProperties);
          }
          return isEmpty(sections) ? false : { sections };
        }
        return false;
      },
      extractComponentDescription: tagName => {
        const customElements = getCustomElements();
        if (isValidComponent(tagName) && isValidMetaData(customElements)) {
          const metaData = customElements.tags.find(
            tag => tag.name.toUpperCase() === tagName.toUpperCase()
          );
          if (metaData && metaData.description) {
            return metaData.description;
          }
        }
        return false;
      },
    },
  });  

  configure(() => [
    indexStories,
    demoCardStories,
    withKnobsStories,
  ], {});
}

run();