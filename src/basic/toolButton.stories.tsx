import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { ToolButton, ToolButtonProp } from './toolButton';

export default {
  title: 'UI/ToolButton',
  component: ToolButton,
} as Meta;

const Template: Story<ToolButtonProp> = (args) => <ToolButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: '工具1',
  imageURI: "https://img.icons8.com/offices/30/000000/upload-2.png",
};