import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import {
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const Logo = () => {
  // Endpoint
  const discovery = useAutoDiscovery(
    "https://login.microsoftonline.com/ad60aea9-1995-4675-beb3-94257c7ffcd2/oauth2/v2.0"
  );
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "c45f77a3-807a-4952-bc85-5c4d5ca0173c",
      scopes: [
        "openid",
        "profile",
        "email",
        "offline_access",
        "api://digitalonus.oidccompliant/dou.read",
      ],
      redirectUri: makeRedirectUri({
        native: "your.app",
      }),
    },
    discovery
  );

  const fetchall = async () => {
    const res = await promptAsync();
    console.log(response);
  };

  return (
    <LinearGradient
      colors={["#FC8E67", "#FDCC4E"]}
      style={styles.iconContainer}
    >
      <TouchableOpacity disabled={!request} onPress={fetchall}>
        <Image source={require("../../images/Logo.png")} style={styles.logo} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
  },
});

export default Logo;
