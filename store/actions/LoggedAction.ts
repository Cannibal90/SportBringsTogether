import {
  LoggedPayload,
  LoggedState,
  LoggedType,
  LOG_IN,
  LOG_OUT,
} from "../types/LoggedType";

export function logIn(log: LoggedPayload): LoggedType {
  return {
    payload: log,
    type: LOG_IN,
  };
}

export function logOut(): LoggedType {
  return {
    type: LOG_OUT,
  };
}
