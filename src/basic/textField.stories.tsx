import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { TextField, TextFieldProp } from './textField';

export default {
  title: 'UI/TextField',
  component: TextField,
} as Meta;

const Template: Story<TextFieldProp> = (args) => <TextField {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: '欄位名稱',
  placeholder: '請輸入資料'
};