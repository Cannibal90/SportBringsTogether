import { ToastAndroid } from "react-native";
import { EventRespone, InAreaRequest } from "../models/EventInterfaces";
import { store } from "../store/store";
import { Service } from "./Service";

export class EventService extends Service {
  host = "http://192.168.1.12:8080/events";
  token = store.getState().loggedReducer.userToken;

  async getLastThreeEvents(): Promise<EventRespone[] | undefined> {
    let events = await fetch(this.host + "/last", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + store.getState().loggedReducer.userToken,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text, "getLast3Events"));
      return Promise.reject();
    });
    return events;
  }

  async getNearbyEvents(
    area: InAreaRequest
  ): Promise<EventRespone[] | undefined> {
    let events = await fetch(this.host + "/in-area", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + store.getState().loggedReducer.userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(area),
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text, "getNearbyEvents"));
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
      response
        .text()
        .then((text) => this.handleError(text, "getUserCreatedEvents"));
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
      response
        .text()
        .then((text) => this.handleError(text, "getUserParticipatingEvents"));
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
      response
        .text()
        .then((text) => this.handleError(text, "getUserHistoryEvents"));
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
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text, "getEventById"));
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
    ).then((response) => {
      if (response.ok) return response.json();
      response
        .text()
        .then((text) => this.handleError(text, "getInterestedForEvent"));
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
    ).then((response) => {
      if (response.ok) return response.json();
      response
        .text()
        .then((text) => this.handleError(text, "getGoingForEvent"));
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
    ).then((response) => {
      if (response.ok) return response.json();
      response
        .text()
        .then((text) => this.handleError(text, "deleteInterestedForEvent"));
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
    ).then((response) => {
      if (response.ok) return response.json();
      response
        .text()
        .then((text) => this.handleError(text, "deleteGoingForEvent"));
      return Promise.reject();
    });
    return event;
  }

  async deleteEventById(eventId: number): Promise<boolean | undefined> {
    let event = await fetch(this.host + `?idEvent=${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text, "deleteEventById"));
      return Promise.reject();
    });
    return event;
  }

  async updateEventById(
    eventId: number,
    newEvent: any
  ): Promise<boolean | undefined> {
    let event = await fetch(this.host + `?idEvent=${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
      body: JSON.stringify(newEvent),
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text, "updateEventById"));
      return Promise.reject();
    });
    return event;
  }

  async createEvent(newEvent: any): Promise<EventRespone | undefined> {
    let event = await fetch(this.host, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
      body: JSON.stringify(newEvent),
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text, "createEvent"));
      return Promise.reject();
    });
    return event;
  }

  async searchEvents(
    id: number,
    tags: string,
    city: string,
    dates: any
  ): Promise<EventRespone[] | undefined> {
    let searchString = this.prepareStringToSearch(id, tags, city);
    let events = await fetch(this.host + "/search" + searchString, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      },
      body: JSON.stringify(dates),
    }).then((response) => {
      if (response.ok) return response.json();
      response.text().then((text) => this.handleError(text, "searchEvent"));
      return Promise.reject();
    });
    return events;
  }

  prepareStringToSearch(id: number, tags: string, city: string) {
    let searchStr = "";
    let option = false;
    if (id) {
      searchStr = searchStr + `?idEvent=${id}`;
      option = true;
    }
    if (city && city.length) {
      searchStr = searchStr + (option ? `&` : `?`) + `?city=${city}`;
      option = true;
    }
    if (tags && tags.length) {
      searchStr = searchStr + (option ? `&` : `?`) + `?tags=${tags}`;
      option = true;
    }

    return searchStr;
  }
}
