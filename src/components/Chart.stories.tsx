import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Chart } from "./Chart";

const Template: Story<React.ComponentProps<typeof Chart>> = (
  args
) => <Chart {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  name: "Chart",
};
export default {
  component: Chart,
  title: "Components/Wind Rose Chart",
};
