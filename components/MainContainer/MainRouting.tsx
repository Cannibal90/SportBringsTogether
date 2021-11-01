import React from "react";
import { Route, Switch, Redirect } from "react-router-native";
import { View, Text, StyleSheet } from "react-native";
import Startpage from "../Startpage/Startpage";
import Search from "../Search/Search";
import Profile from "../Profile/Profile";

const MainRouting = () => {
  return (
    <Switch>
      <Route path="/startpage" component={Startpage} />
      <Route path="/search" component={Search} />
      <Route path="/profile" component={Profile} />
      <Redirect from="/*" to="/startpage" />
    </Switch>
  );
};

export default MainRouting;
