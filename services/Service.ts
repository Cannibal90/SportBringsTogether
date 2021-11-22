import React from "react";

export class Service {
  handleError = (text: string, method: string) => {
    if (!text) return Promise.reject();
    let exc = JSON.parse(text);
    console.log("Method: " + method);
    console.log("ERROR: " + exc.message);
  };
}
