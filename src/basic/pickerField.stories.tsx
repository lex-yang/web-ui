import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { PickerField, PickerFieldProp } from './pickerField';

export default {
  title: 'UI/PickerField',
  component: PickerField,
} as Meta;

const Template: Story<PickerFieldProp> = (args) => <PickerField {...args} />;

export const Primary = Template.bind({});
const gradeItems = [
  { key: "g0", name: "請選擇" },
  { key: "g9", name: "國三" },
  { key: "g8", name: "國二" },
  { key: "g7", name: "國一" },
  { key: "g6", name: "小六" },
  { key: "g5", name: "小五" },
  { key: "g4", name: "小四" },
  { key: "g3", name: "小三" },
  { key: "g2", name: "小二" }];

Primary.args = {
  label: '請選擇年級',
  items: gradeItems,
};