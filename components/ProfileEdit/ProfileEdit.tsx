import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
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
import { UserDto } from "../../models/UserInterfaces";
import { UserService } from "../../services/UserService";
import { store } from "../../store/store";

const ProfileEdit = (props: { history: any }) => {
  const [credentials, setCredentials] = useState<UserDto>({
    id: 0,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    city: "",
    dateOfBirth: new Date(),
    badges: "",
  });

  const [validationMessages, setValidationMessages] = useState<any>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    city: "",
    dateOfBirth: "",
  });
  const [showDate, setShowDate] = useState<boolean>(false);

  const userService = new UserService();

  const handleChange = (item: any, name: any) => {
    let check = validateMinThreeSigns(item);

    if (name === "email") {
      check = validateEmail(item);
    } else if (name === "dateOfBirth") {
      handleShowDate();
    }
    console.log(item);
    console.log(name);
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

  const checkValidation = () => {
    return Boolean(
      validationMessages.firstName === "" &&
        validationMessages.lastName === "" &&
        validationMessages.email === "" &&
        validationMessages.password === "" &&
        validationMessages.city === "" &&
        validationMessages.dateOfBirth.toString() === ""
    );
  };
  const checkEmptyFields = () => {
    return Boolean(
      !credentials.firstName.length ||
        !credentials.lastName.length ||
        !credentials.email.length ||
        !credentials.city.length ||
        !credentials.dateOfBirth.toString().length
    );
  };

  const saveUserDetails = () => {
    if (checkValidation()) {
      console.log(credentials);
      userService
        .updateUser(credentials)
        .then((response) => {
          if (response) {
            setCredentials(response);
            ToastAndroid.show("Changes saved!", ToastAndroid.SHORT);
          }
        })
        .catch(() => {
          ToastAndroid.show(
            "Something goes wrong, try again...",
            ToastAndroid.SHORT
          );
        });
    } else {
      ToastAndroid.show("Check passed data", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    userService
      .getUserById(store.getState().loggedReducer.id)
      .then((response) => {
        if (response) {
          if (isSubscribed) {
            setCredentials(response);
            setValidationMessages({
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              city: "",
              dateOfBirth: "",
            });
          }
        }
      })
      .catch(() => {
        ToastAndroid.show(
          "Something goes wrong, try again...",
          ToastAndroid.SHORT
        );
      });
    return () => {
      isSubscribed = false;
    };
  }, []);

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
                onChangeText={(text: any) => handleChange(text, "email")}
                activeUnderlineColor={"#000000"}
              />
              <HelperText type="error" visible={true} style={styles.errorText}>
                {validationMessages.email}
              </HelperText>
              <TextInput
                style={styles.input}
                label="Firstname"
                value={credentials.firstName}
                onChangeText={(text: any) => handleChange(text, "firstName")}
                activeUnderlineColor={"#000000"}
              />
              <HelperText type="error" visible={true} style={styles.errorText}>
                {validationMessages.firstName}
              </HelperText>
              <TextInput
                style={styles.input}
                label="Surname"
                value={credentials.lastName}
                onChangeText={(text: any) => handleChange(text, "lastName")}
                activeUnderlineColor={"#000000"}
              />
              <HelperText type="error" visible={true} style={styles.errorText}>
                {validationMessages.lastName}
              </HelperText>
              <TextInput
                style={styles.input}
                label="Password"
                value={credentials.password}
                onChangeText={(text: any) => handleChange(text, "password")}
                activeUnderlineColor={"#000000"}
                secureTextEntry={true}
                autoCapitalize="none"
              />
              <HelperText type="error" visible={true} style={styles.errorText}>
                {validationMessages.password}
              </HelperText>
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
              <HelperText type="error" visible={true} style={styles.errorText}>
                {validationMessages.dateOfBirth}
              </HelperText>
              <TextInput
                style={styles.input}
                label="City"
                value={credentials.city}
                onChangeText={(text: any) => handleChange(text, "city")}
                activeUnderlineColor={"#000000"}
              />
              <HelperText type="error" visible={true} style={styles.errorText}>
                {validationMessages.city}
              </HelperText>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              saveUserDetails();
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
    height: 500,
    borderRadius: 20,
  },
  inputWrapper: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "left",
  },
  input: {
    // marginVertical: 10,
    fontWeight: "700",
    backgroundColor: "rgba(196, 196, 196, 0.28)",
    borderRadius: 10,
    width: "100%",
  },
  button: {
    borderRadius: 20,
    width: 280,
    height: 70,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 31,
    fontWeight: "700",
    color: "#ffffff",
  },
  errorText: {
    width: "100%",
    paddingLeft: 0,
    textAlign: "left",
    // marginBottom: 10,
  },
});

export default ProfileEdit;
