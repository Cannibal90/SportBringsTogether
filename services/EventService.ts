import { ToastAndroid } from "react-native";
import { EventRespone } from "../models/EventInterfaces";
import { store } from "../store/store";
import { Service } from "./Service";

export class EventService extends Service {
  host = "http://192.168.1.12:8080/events";
  token = store.getState().loggedReducer.userToken;

  async getNearbyEvents(): Promise<EventRespone[] | undefined> {
    let events = await fetch(this.host + "/last", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + store.getState().loggedReducer.userToken,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text));
      return Promise.reject();
    });
    // .catch((error) => {
    //   console.log("Connection failed!");
    //   return Promise.reject();
    // });
    return events;
  }

  async getUserCreatedEvents(id: number): Promise<EventRespone[] | undefined> {
    let events = await fetch(this.host + "/mine/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text));
      return Promise.reject();
    });
    // .catch((error) => {
    //   console.log("Connection failed!");
    //   return Promise.reject();
    // });
    return events;
  }

  async getUserParticipatingEvents(
    id: number
  ): Promise<EventRespone[] | undefined> {
    let events = await fetch(this.host + "/attending/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text));
      return Promise.reject();
    });
    // .catch((error) => {
    //   console.log("Connection failed!");
    //   return Promise.reject();
    // });
    return events;
  }

  async getUserHistoryEvents(id: number): Promise<EventRespone[] | undefined> {
    let events = await fetch(this.host + "/attended/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text));
      return Promise.reject();
    });
    // .catch((error) => {
    //   console.log("Connection failed!");
    //   return Promise.reject();
    // });
    return events;
  }

  async getEventById(id: number): Promise<EventRespone | undefined> {
    let event = await fetch(this.host + "/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        response.text().then((text) => this.handleError(text));
        return Promise.reject();
      })
      .catch((error) => {
        console.log("Connection failed!");
        ToastAndroid.show("Connection failed!", ToastAndroid.SHORT);
        return Promise.reject();
      });
    return event;
  }
}
