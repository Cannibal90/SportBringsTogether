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

  async getInterestedForEvent(
    eventId: number,
    userId: number
  ): Promise<EventRespone | undefined> {
    let event = await fetch(
      this.host + `/interested?idEvent=${eventId}&userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
      }
    )
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

  async getGoingForEvent(
    eventId: number,
    userId: number
  ): Promise<EventRespone | undefined> {
    let event = await fetch(
      this.host + `/going?idEvent=${eventId}&userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
      }
    )
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

  async deleteInterestedForEvent(
    eventId: number,
    userId: number
  ): Promise<EventRespone | undefined> {
    let event = await fetch(
      this.host + `/not-interested?idEvent=${eventId}&userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
      }
    )
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

  async deleteGoingForEvent(
    eventId: number,
    userId: number
  ): Promise<EventRespone | undefined> {
    let event = await fetch(
      this.host + `/not-going?idEvent=${eventId}&userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
      }
    )
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

  async deleteEventById(eventId: number): Promise<boolean | undefined> {
    let event = await fetch(this.host + `idEvent=${eventId}`, {
      method: "DELETE",
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

  async updateEventById(
    eventId: number,
    newEvent: any
  ): Promise<boolean | undefined> {
    let event = await fetch(this.host + `idEvent=${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
      body: JSON.stringify(newEvent),
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
