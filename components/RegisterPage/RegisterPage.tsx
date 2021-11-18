import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HelperText, TextInput } from "react-native-paper";
import Logo from "../Logo/Logo";
import IconButton from "../IconButton/IconButton";
import { store } from "../../store/store";
import { logIn } from "../../store/actions/LoggedAction";
import {
  validateEmail,
  validateMinThreeSigns,
  validatePasswords,
} from "../../validators/validators";

const RegisterPage = (props: { history: any }) => {
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
    } else if (name === "retype") {
      check = validatePasswords(credentials.password, item);
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

  const checkValidation = () => {
    return Boolean(
      validationMessages.firstname === "" &&
        validationMessages.lastname === "" &&
        validationMessages.email === "" &&
        validationMessages.password === "" &&
        validationMessages.retype === "" &&
        validationMessages.city === "" &&
        validationMessages.dateOfBirth === ""
    );
  };
  const checkEmptyFields = () => {
    return Boolean(
      !credentials.firstname.length ||
        !credentials.lastname.length ||
        !credentials.email.length ||
        !credentials.password.length ||
        !credentials.retype.length ||
        !credentials.city.length ||
        !credentials.dateOfBirth.length
    );
  };

  const handleRegister = () => {
    if (checkValidation() && !checkEmptyFields()) {
      props.history.push("/login");
    }
  };

  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.headlineContainer}>
        <Text style={styles.headline}>Create account</Text>
      </View>

      <View style={styles.centeredView}>
        <LinearGradient
          colors={["#FC8E67", "#FDCC4E"]}
          style={styles.modalView}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.inputWrapper}
          >
            <TextInput
              style={styles.input}
              label="Firstname"
              value={credentials.firstname}
              onChangeText={(text: any) => handleChange(text, "firstname")}
              activeUnderlineColor={"#000000"}
            />
            <HelperText type="error" visible={true} style={styles.errorText}>
              {validationMessages.firstname}
            </HelperText>
            <TextInput
              style={styles.input}
              label="Lastname"
              value={credentials.lastname}
              onChangeText={(text: any) => handleChange(text, "lastname")}
              activeUnderlineColor={"#000000"}
            />
            <HelperText type="error" visible={true} style={styles.errorText}>
              {validationMessages.lastname}
            </HelperText>
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
              label="Password"
              value={credentials.password}
              onChangeText={(text: any) => handleChange(text, "password")}
              activeUnderlineColor={"#000000"}
              secureTextEntry={true}
            />
            <HelperText type="error" visible={true} style={styles.errorText}>
              {validationMessages.password}
            </HelperText>
            <TextInput
              style={styles.input}
              label="Retype password"
              value={credentials.retype}
              onChangeText={(text: any) => handleChange(text, "retype")}
              activeUnderlineColor={"#000000"}
              secureTextEntry={true}
            />
            <HelperText type="error" visible={true} style={styles.errorText}>
              {validationMessages.retype}
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
            <TextInput
              style={styles.input}
              label="Date of birth"
              value={credentials.dateOfBirth}
              onChangeText={(text: any) => handleChange(text, "dateOfBirth")}
              activeUnderlineColor={"#000000"}
            />
            <HelperText type="error" visible={true} style={styles.errorText}>
              {validationMessages.dateOfBirth}
            </HelperText>
          </ScrollView>

          <TouchableOpacity
            onPress={() => {
              handleRegister();
            }}
          >
            <IconButton iconName="check-circle" text="Create account" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 30,
  },
  iconContainer: {
    width: "100%",
    height: "65%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
  },
  button: {
    borderRadius: 20,
    marginTop: 20,
    width: 330,
    height: 70,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 31,
    fontWeight: "700",
    color: "#ffffff",
  },
  headlineContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  headline: {
    marginTop: 10,
    fontSize: 45,
    fontWeight: "700",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    width: "85%",
    height: 370,
    borderRadius: 20,
    padding: 35,
  },
  inputWrapper: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "left",
  },
  input: {
    fontWeight: "700",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 10,
    width: "100%",
  },
  errorText: {
    width: "100%",
    paddingLeft: 0,
    textAlign: "left",
    // marginBottom: 10,
  },
});

export default RegisterPage;
