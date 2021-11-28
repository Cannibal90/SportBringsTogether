import { EventRespone } from "./EventInterfaces";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city: string;
  dateOfBirth: Date;
}

export interface UserResponse {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  dateOfBirth: Date;
  badges: string;
  createdEvents: EventRespone[];
  interestedEvents: EventRespone[];
  goingEvents: EventRespone[];
}

export interface JwtResponse {
  token: string;
  id: number;
  email: string;
}

export interface UserDto {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  dateOfBirth: Date;
  badges: string;
}
