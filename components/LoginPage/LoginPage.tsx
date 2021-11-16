import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-paper";
import Logo from "../Logo/Logo";
import IconButton from "../IconButton/IconButton";
import { store } from "../../store/store";
import { logIn } from "../../store/actions/LoggedAction";

const LoginPage = (props: { history: any }) => {
  const [credentials, setCredentials] = useState<any>({
    email: "email",
    password: "password",
  });

  const handleChange = (item: any, name: any) => {
    setCredentials({
      ...credentials,
      [name]: item,
    });
  };

  const handleLogin = () => {
    store.dispatch(logIn({ userToken: "" }));
    props.history.push("/startpage");
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
            <TextInput
              style={styles.input}
              label="Password"
              value={credentials.password}
              onChangeText={(text: any) => handleChange(text, "password")}
              activeUnderlineColor={"#000000"}
              secureTextEntry={true}
            />
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
    height: 300,
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
    marginBottom: 10,
  },
});

export default LoginPage;
