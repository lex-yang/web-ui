import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { TableField } from './simpleTable';
import { PagingTable, PagingTableProp } from './pagingTable';

export default {
  title: 'UI/PagingTable',
  component: PagingTable,
} as Meta;

const Template: Story<PagingTableProp> = (args) => <PagingTable {...args} />;

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

const createData = () => {
	const data = [];
	for (let i = 0; i < 35; i ++) {
		data.push({
			id: i.toString(),
			a: `Hello-${i + 1}`,
			b: `World-${i + 1}`,
		});
	}
	return data;
}

const sampleData = createData();
export const Primary = Template.bind({});
Primary.args = {
  title: '標題',
  source: sampleData,
  fields: fields, 
};