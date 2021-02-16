import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { ConfirmModal, ConfirmModalProp, withModal } from './confirmModal';
import { Image } from 'react-native';

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

const imageURL = "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/1fab9d9b86c9071e3f10c14b7869e3ec338f1429.png";
const ImageModal = withModal(() => <Image style={{ width: "100%", height: "100%" }} source={{ uri: imageURL }} />);

export const Second = ImageModal.bind({});
Second.args = {
  visible: true,
}