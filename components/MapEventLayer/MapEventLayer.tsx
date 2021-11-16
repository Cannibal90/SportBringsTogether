import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MapEventLayer = (props: { visible: any; onChange: any; event: any }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.onChange();
        }}
      >
        <TouchableWithoutFeedback onPress={props.onChange}>
          <View style={styles.centeredView}>
            <LinearGradient
              colors={["#FC8E67", "#FDCC4E"]}
              style={styles.modalView}
            >
              <Pressable
                onPress={() => {
                  console.log("działa");
                }}
              >
                <Text>Tekst</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.35)",
  },
  modalView: {
    margin: 60,
    width: "95%",
    height: 300,
    borderRadius: 20,
    padding: 35,
  },
});

export default MapEventLayer;
