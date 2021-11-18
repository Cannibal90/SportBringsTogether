import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link } from "react-router-native";
import TopContainer from "../TopContainer/TopContainer";
import { HelperText, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import {
  validateEmail,
  validateMinThreeSigns,
} from "../../validators/validators";

const ProfileEdit = (props: { history: any }) => {
  const [credentials, setCredentials] = useState<any>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    retype: "",
    city: "",
    dateOfBirth: "",
  });

  const [validationMessages, setValidationMessages] = useState<any>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    retype: "",
    city: "",
    dateOfBirth: "",
  });

  const handleChange = (item: any, name: any) => {
    let check = validateMinThreeSigns(item);

    if (name === "email") {
      check = validateEmail(item);
    }

    setCredentials({
      ...credentials,
      [name]: item,
    });

    setValidationMessages({
      ...validationMessages,
      [name]: check,
    });
  };

  return (
    <View style={styles.container}>
      <TopContainer
        name={"Edit profile"}
        link={"/profile"}
        icon={false}
        history={props.history}
      />
      <View style={styles.searchContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                label="Email"
                value={credentials.email}
                onChangeText={(text: any) => handleChange(text, "city")}
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="Firstname"
                value={credentials.firstname}
                onChangeText={(text: any) => handleChange(text, "firstname")}
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="Surname"
                value={credentials.lastname}
                onChangeText={(text: any) => handleChange(text, "lastname")}
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="Date of birth"
                value={credentials.dateOfBirth}
                onChangeText={(text: any) => handleChange(text, "dateOfBirth")}
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="City"
                value={credentials.city}
                onChangeText={(text: any) => handleChange(text, "city")}
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="Password"
                value={credentials.password}
                onChangeText={(text: any) => handleChange(text, "password")}
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="Retype password"
                value={credentials.retype}
                onChangeText={(text: any) => handleChange(text, "retype")}
                activeUnderlineColor={"#000000"}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log("SAVE");
            }}
            style={{ alignItems: "center", marginVertical: 20 }}
          >
            <LinearGradient
              colors={["#FC8E67", "#FDCC4E"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Save</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputContainer: {
    width: 320,
    height: 600,
    borderRadius: 20,
  },
  inputWrapper: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "left",
  },
  input: {
    marginVertical: 10,
    fontWeight: "700",
    backgroundColor: "rgba(196, 196, 196, 0.28)",
    borderRadius: 10,
    width: "100%",
  },
  button: {
    borderRadius: 20,
    width: 250,
    height: 70,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 31,
    fontWeight: "700",
    color: "#ffffff",
  },
});

export default ProfileEdit;
