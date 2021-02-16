import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { SimpleTable, SimpleTableProp, TableField } from './simpleTable';

export default {
  title: 'UI/SimpleTable',
  component: SimpleTable,
} as Meta;

const Template: Story<SimpleTableProp> = (args) => <SimpleTable {...args} />;

const fields: TableField[] = [
  {
    key: 'a',
    name: '第一欄',
  },
  {
    key: 'b',
    name: '第二欄',
  }
];

const data  = [
  {
    id: '123',
    a: 'Hello',
    b: 'World',
  },
  {
    id: '234',
    a: 'This',
    b: 'That',
  }
];

export const Primary = Template.bind({});
Primary.args = {
  title: '標題',
  source: data,
  fields: fields, 
};