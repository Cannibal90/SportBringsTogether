import { ToastAndroid } from "react-native";
import { EventRespone } from "../models/EventInterfaces";
import {
  JwtResponse,
  LoginRequest,
  SignUpRequest,
  UserResponse,
} from "../models/UserInterfaces";
import { Service } from "./Service";

export class UserService extends Service {
  host = "http://192.168.1.12:8080/users";

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
}
