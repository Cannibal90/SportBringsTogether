import React from "react";
import { Route, Switch, Redirect } from "react-router-native";
import Startpage from "../Startpage/Startpage";
import Search from "../Search/Search";
import Profile from "../Profile/Profile";
import ActivityDetails from "../ActivityDetails/ActivityDetails";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import ProfileEvents from "../ProfileEvents/ProfileEvents";
import ProfileParticipating from "../ProfileParticipating/ProfileParticipating";
import ProfileHistory from "../ProfileHistory/ProfileHistory";
import ProfileTrophies from "../ProfileTrophies/ProfileTrophies";

const MainRouting = () => {
  return (
    <Switch>
      <Route path="/startpage" component={Startpage} />
      <Route path="/search" component={Search} />
      <Route path="/map/event" component={ActivityDetails} />
      <Route path="/profile/edit" component={ProfileEdit} />
      <Route path="/profile/events" component={ProfileEvents} />
      <Route path="/profile/participating" component={ProfileParticipating} />
      <Route path="/profile/history" component={ProfileHistory} />
      <Route path="/profile/trophies" component={ProfileTrophies} />
      <Route path="/profile" component={Profile} />
      <Redirect from="/*" to="/startpage" />
    </Switch>
  );
};

export default MainRouting;
