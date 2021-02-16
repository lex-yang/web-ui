import React from 'react';
import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  TextInput,
  StyleSheet,
} from 'react-native';

export interface TextFieldProp {
  label: string,
  placeholder?: string,
  length?: number,
  defaultValue?: string,

  onChangeText: (text: string) => void,
}

interface TextFieldStyle {
  wrap: ViewStyle,
  label: TextStyle,
  input: TextStyle,
}

export const TextField: React.FC<TextFieldProp> = ({
  label,
  placeholder,
  length,
  defaultValue,
  onChangeText,
  ...props
}) => (
  <View style={styles.wrap}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      maxLength={length}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create<TextFieldStyle>({
  wrap: {
    padding:10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 18,
    margin: 5,
    padding: 3,
  },
});