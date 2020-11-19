import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Chart } from "./Chart";

const Template: Story<React.ComponentProps<typeof Chart>> = (
  args
) => <Chart {...args} />;

export const WindroseChart = Template.bind({});
WindroseChart.args = {
  name: "Chart",
};
export default {
  component: Chart,
  title: "Components",
};
