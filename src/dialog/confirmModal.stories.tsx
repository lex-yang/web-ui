import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { ConfirmModal, ConfirmModalProp } from './confirmModal';

export default {
  title: 'UI/ConfirModal',
  component: ConfirmModal,
} as Meta;

const Template: Story<ConfirmModalProp> = (args) => <ConfirmModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  visible: true,
  message: '這裡會顯示提示訊息'
};