import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./accessible-modal";

const meta: Meta = {
  tags: ["autodocs"],
  title: "Components/AccessibleModal",
  component: "accessible-modal",
  argTypes: {
    open: { control: "boolean" }
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    open: true,
  },
  render: (args) =>
    html`<accessible-modal
      .open=${args.open}
    ><p>Any element inside</p></accessible-modal>`,
};