import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./search-input";

const meta: Meta = {
  tags: ["autodocs"],
  title: "Components/SearchInput",
  component: "search-input",
  argTypes: {
    placeholder: { control: "text" },
    debounce: { control: "number" },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    placeholder: "Pesquisar...",
    debounce: 300,
  },
  render: (args) =>
    html`<search-input
      placeholder=${args.placeholder}
      .debounce=${args.debounce}
    ></search-input>`,
};

export const WithSuggestions: Story = {
  args: {
    placeholder: "Search users...",
    debounce: 300,
  },
  render: (args) =>
    html`<search-input
      placeholder=${args.placeholder}
      .debounce=${args.debounce}
      .suggestions=${[
        { id: "1", label: "John Doe", value: "john" },
        { id: "2", label: "Jane Smith", value: "jane" },
        { id: "3", label: "Bob Johnson", value: "bob" },
      ]}
    ></search-input>`,
};
