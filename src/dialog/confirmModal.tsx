import React from 'react';
import {
  View,
  Pressable,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native-web';

import Modal from 'modal-enhanced-react-native-web';

import {
  TextField
} from '../basic';

export interface ConfirmModalProp {
  visible: boolean;
  message: string;

  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProp> = ({ visible, message, onClose, onConfirm }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      visible={visible}
    >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.field}>
          <Text style={styles.title}>{message}</Text>
        </View>
        <View style={styles.modalButtons}>
          <Pressable
            style={styles.openButton}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>取消</Text>
          </Pressable>

          <Pressable
            style={styles.openButton}
            onPress={() => {
              onConfirm();
              onClose();
            }}
          >
            <Text style={styles.textStyle}>確定</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>)
}

export const withModal = (ChildComponent) => {
  return ({ visible, message, onClose, onConfirm, ...props } : ConfirmModalProp) => {
    return (
      <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={{ height: 600 }} >
            <ChildComponent {... props} />
          </ScrollView>
          <View style={styles.modalButtons}>
            <Pressable
              style={styles.openButton}
              onPress={onClose}
            >
              <Text style={styles.textStyle}>取消</Text>
            </Pressable>
  
            <Pressable
              style={styles.openButton}
              onPress={() => {
                onConfirm();
                onClose();
              }}
            >
              <Text style={styles.textStyle}>確定</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>)
  }
}

const styles = StyleSheet.create({
  field: {
    padding:10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  centeredView: {
    backgroundColor: "rgba(90, 90, 90, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    width: "90vw",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "70vw",
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
  },
  openButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    padding: 10,
    margin: 20,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});