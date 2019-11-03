import './bundles/preview.js';

const bundle = window["__STORYBOOK_BUNDLE__"];
delete window["__STORYBOOK_BUNDLE__"];

export const html = bundle.html;
export const storiesOf = bundle.storiesOf;
export const addParameters = bundle.addParameters;
export const addDecorator = bundle.addDecorator;
export const configure = bundle.configure;
export const withA11y = bundle.withA11y;
export const setCustomElements = bundle.setCustomElements;
export const Story = bundle.Story;
export const Preview= bundle.Preview;
export const Meta= bundle.Meta;
export const Props= bundle.Props;
export const action= bundle.action;
export const withKnobs= bundle.withKnobs;
export const text= bundle.text;
export const number= bundle.number;
export const withWebComponentsKnobs= bundle.withWebComponentsKnobs;
export const React = bundle.React;
export const mdx = bundle.mdx;
export const DocsContainer = bundle.DocsContainer;
export const makeStoryFn = bundle.makeStoryFn;
