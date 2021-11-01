import React from "react";
import { NativeRouter } from "react-router-native";
import MainContainer from "./components/MainContainer/MainContainer";
import Startpage from "./components/Startpage/Startpage";

export default function App() {
  return (
    <NativeRouter>
      <MainContainer />
    </NativeRouter>
  );
}
