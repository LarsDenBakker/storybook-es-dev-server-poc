import { html } from "../../index.js";

export default {
  title: "Demo"
};

export const heading = () =>
  html`
    <h1>Hello World</h1>
  `;

export const button = () =>
  html`
    <button>My button stuff</button>
  `;
