import React from "react";
import { NativeRouter } from "react-router-native";
import MainContainer from "./components/MainContainer/MainContainer";
import Startpage from "./components/Startpage/Startpage";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <NativeRouter>
      <MainContainer />
    </NativeRouter>
  );
}
