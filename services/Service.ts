import React from "react";

export class Service {
  handleError = (text: string) => {
    if (!text) return Promise.reject();
    let exc = JSON.parse(text);
    console.log("ERROR: " + exc.message);
  };
}
