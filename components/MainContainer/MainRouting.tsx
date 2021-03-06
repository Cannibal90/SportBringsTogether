import React from "react";
import { Route, Switch, Redirect } from "react-router-native";
import Startpage from "../Startpage/Startpage";
import Search from "../Search/Search";
import Profile from "../Profile/Profile";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import ProfileEvents from "../ProfileEvents/ProfileEvents";
import ProfileParticipating from "../ProfileParticipating/ProfileParticipating";
import ProfileHistory from "../ProfileHistory/ProfileHistory";
import ProfileTrophies from "../ProfileTrophies/ProfileTrophies";
import Map from "../Map/Map";
import SearchResults from "../SearchResults/SearchResults";
import CreateEvent from "../CreateEvent/CreateEvent";
import WelcomePage from "../WelcomePage/WelcomePage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

const MainRouting = () => {
  return (
    <Switch>
      <Route path="/welcome" component={WelcomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/startpage" component={Startpage} />
      <Route path="/map/create" component={CreateEvent} />
      <Route path="/map/:id?/:lat?/:lon?" component={Map} />
      <Route path="/search/results" component={SearchResults} />
      <Route path="/search" component={Search} />
      <Route path="/profile/edit" component={ProfileEdit} />
      <Route path="/profile/events" component={ProfileEvents} />
      <Route path="/profile/participating" component={ProfileParticipating} />
      <Route path="/profile/history" component={ProfileHistory} />
      <Route path="/profile/trophies" component={ProfileTrophies} />
      <Route path="/profile" component={Profile} />
      <Redirect from="/*" to="/welcome" />
    </Switch>
  );
};

export default MainRouting;
