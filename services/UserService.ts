import { ToastAndroid } from "react-native";
import { EventRespone } from "../models/EventInterfaces";
import {
  JwtResponse,
  LoginRequest,
  SignUpRequest,
  UserDto,
  UserResponse,
} from "../models/UserInterfaces";
import { store } from "../store/store";
import { Service } from "./Service";

export class UserService extends Service {
  host = "http://192.168.1.12:8080/users";
  token = store.getState().loggedReducer.userToken;

  async loginUser(credentials: LoginRequest): Promise<JwtResponse | undefined> {
    let user = await fetch(this.host + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text, "loginUser"));
      return Promise.reject();
    });
    return user;
  }

  async registerUser(
    credentials: SignUpRequest
  ): Promise<UserResponse | undefined> {
    let user = await fetch(this.host + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text, "registerUser"));
      return Promise.reject();
    });
    return user;
  }

  async getUserById(id: number): Promise<UserDto | undefined> {
    let user = await fetch(this.host + `/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text, "getUser"));
      return Promise.reject();
    });
    return user;
  }

  async updateUser(credentials: UserDto): Promise<UserDto | undefined> {
    let user = await fetch(this.host + "/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
      body: JSON.stringify(credentials),
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text, "updateUser"));
      return Promise.reject();
    });
    return user;
  }

  async getUserBadges(id: number): Promise<string | undefined> {
    let user = await fetch(this.host + `/badges/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
    }).then((response) => {
      if (response.ok) return response.text();
      response.text().then((text) => this.handleError(text, "getUserBadges"));
      return Promise.reject();
    });
    return user;
  }
}
