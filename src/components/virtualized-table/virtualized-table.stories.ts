import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./virtualized-table";

const meta: Meta = {
  tags: ["autodocs"],
  title: "Components/VirtualizedTable",
  component: "virtualized-table",
  argTypes: {
    height: { control: "number" },
    columns: { control: "object" },
    data: { control: "object" },
  },
};

export default meta;

type Story = StoryObj;

export const NoData: Story = {
  args: {
    height: 150,
    columns: [
      {
        key: "description",
        header: "Title",
        sortable: true,
      },
      {
        key: "publishedAt",
        header: "Date",
        sortable: true,
        width: 200,
        align: "center",
      },
    ],
  },
  render: (args) =>
    html`<virtualized-table
      .height=${args.height}
      .columns=${args.columns}
    ></virtualized-table>`,
};

export const WithSuggestions: Story = {
  args: {
    height: 250,
    columns: [
      {
        key: "description",
        header: "Title",
        sortable: true,
      },
      {
        key: "publishedAt",
        header: "Date",
        sortable: true,
        width: 200,
        align: "center",
      },
    ],
    data: [
      {
        description:
          "Dozens of Chagossians have flown in to Heathrow Airport this week, putting pressure on housing services.",
        publishedAt: "07/09/2024",
      },
      {
        description:
          "The latest five minute news bulletin from BBC World Service.",
        publishedAt: "22/06/2025",
      },
      {
        description:
          "The latest five minute news bulletin from BBC World Service.",
        publishedAt: "10/10/2025",
      },
    ],
  },
  render: (args) =>
    html`<virtualized-table
      .height=${args.height}
      .data=${args.data}
      .columns=${args.columns}
    ></virtualized-table>`,
};
