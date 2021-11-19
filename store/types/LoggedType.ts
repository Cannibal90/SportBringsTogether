export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export interface LoggedState {
  logged: boolean;
  userToken: string;
  id: number;
}

export interface LoggedPayload {
  userToken: string;
  id: number;
}

interface LogIn {
  type: typeof LOG_IN;
  payload: LoggedPayload;
}

interface LogOut {
  type: typeof LOG_OUT;
}

export type LoggedType = LogIn | LogOut;
