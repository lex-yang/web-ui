import React from 'react';
import {
  Pressable,
  Text,
  Image,
} from 'react-native';

export interface ToolButtonProp {
  imageURI: string,
  title: string,
  onPress: () => void,
}

export const ToolButton: React.FC<ToolButtonProp> = ({
  imageURI,
  title,
  onPress,
}) => (
  <Pressable onPress={onPress}>
    <Image
      style={{ width: 30, height: 30 }}
      source={{ uri: imageURI}}
    />
    <Text style={{ margin: 5, padding: 10, backgroundColor: "#55f", color: "#fff" }}>
      {title}
    </Text>
  </Pressable>
);