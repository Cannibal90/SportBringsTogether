import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
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
} from "../../validators/validators";
import { UserService } from "../../services/UserService";

const LoginPage = (props: { history: any }) => {
  const [credentials, setCredentials] = useState<any>({
    email: "",
    password: "",
  });
  const [validationMessages, setValidationMessages] = useState<any>({
    email: "",
    password: "",
  });

  const userService = new UserService();

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

  const checkValidation = () => {
    return Boolean(
      validationMessages.email === "" && validationMessages.password === ""
    );
  };

  const checkEmptyFields = () => {
    return Boolean(!credentials.email.length || !credentials.password.length);
  };

  const fetchLogin = () => {
    userService
      .loginUser(credentials)
      .then((response) => {
        if (response) {
          store.dispatch(logIn({ userToken: response.token, id: response.id }));
          props.history.push("/startpage");
        }
      })
      .catch((error) => {
        ToastAndroid.show("Wrong credentials!", ToastAndroid.SHORT);
      });
  };

  const handleLogin = () => {
    if (checkValidation() && !checkEmptyFields()) {
      fetchLogin();
    }
  };

  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.headlineContainer}>
        <Text style={styles.headline}>Sign in</Text>
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
          </ScrollView>

          <TouchableOpacity
            onPress={() => {
              handleLogin();
            }}
          >
            <IconButton iconName="check-circle" text="Log in" />
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
    height: 330,
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
    marginBottom: 10,
  },
});

export default LoginPage;
