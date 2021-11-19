import { LoggedState, LoggedType, LOG_IN, LOG_OUT } from "../types/LoggedType";

const initialState: LoggedState = {
  logged: false,
  id: 0,
  userToken: "token",
};

export function loggedReducer(
  state = initialState,
  action: LoggedType
): LoggedState {
  switch (action.type) {
    case LOG_IN:
      return {
        logged: true,
        id: action.payload.id,
        userToken: action.payload.userToken,
      };
    case LOG_OUT:
      return {
        logged: false,
        id: 0,
        userToken: "",
      };
    default:
      return state;
  }
}
