import React from 'react';
import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  Picker,
  StyleSheet,
} from 'react-native';

export interface PickerItem {
  key: string,
  name: string,
}

export interface PickerFieldProp {
  label: string,
  items: PickerItem[],
  selectedValue: string,
  onValueChange: (k: string) => void,
}

interface PickerFieldStyle {
  wrap: ViewStyle,
  label: TextStyle,
  picker: ViewStyle,
}

export const PickerField: React.FC<PickerFieldProp> = ({
  label,
  items,
  selectedValue,
  onValueChange,
  ...props
}) => (
  <View style={styles.wrap}>
    <Text style={styles.label}>{label}</Text>
    <Picker
      style={styles.picker}
      onValueChange={onValueChange}
      selectedValue={selectedValue}
      {...props}
    >
        { items.map((v, index) => (<Picker.Item key={v.key + index} value={v.key} label={v.name} />) ) }
    </Picker>
  </View>
);

const styles = StyleSheet.create<PickerFieldStyle>({
  wrap: {
    padding:10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  picker: {
    margin: 5,
  }
});