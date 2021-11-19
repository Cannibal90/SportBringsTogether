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
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const ProfileEdit = (props: { history: any }) => {
  const [credentials, setCredentials] = useState<any>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    retype: "",
    city: "",
    dateOfBirth: new Date(),
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
  const [showDate, setShowDate] = useState<boolean>(false);

  const handleChange = (item: any, name: any) => {
    let check = validateMinThreeSigns(item);

    if (name === "email") {
      check = validateEmail(item);
    } else if (name === "dateOfBirth") {
      handleShowDate();
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

  const handleShowDate = () => {
    setShowDate(!showDate);
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
              {showDate && (
                <DateTimePicker
                  value={credentials.dateOfBirth || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event: any, selectedDate: any) => {
                    handleChange(selectedDate, "dateOfBirth");
                  }}
                />
              )}
              <TouchableOpacity
                style={styles.input}
                onPress={() => {
                  handleShowDate();
                }}
              >
                <TextInput
                  style={{ fontWeight: "700" }}
                  label="Date of birth"
                  value={
                    moment(credentials.dateOfBirth).format("YYYY-MM-DD") ===
                    moment(new Date()).format("YYYY-MM-DD")
                      ? ""
                      : moment(credentials.dateOfBirth).format("YYYY-MM-DD")
                  }
                  disabled={true}
                  activeUnderlineColor={"#000000"}
                />
              </TouchableOpacity>
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
