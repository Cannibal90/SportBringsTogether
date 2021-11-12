export interface EventRequest {
  longitude: number;
  latitude: number;
  description: string;
  place: string;
  title: string;
  startDate: Date;
  endDate: Date;
  maxAttendants: number;
  lastTimeRegistration: number;
  creatorId: number;
}

export interface EventDetails {
  id: number;
  description: string;
  place: string;
  title: string;
  startDate: Date;
  endDate: Date;
  maxAttendants: number;
  lastTimeRegistration: Date;
}

export interface EventRespone {
  latitude: number;
  longitude: number;
  creatorId: number;
  eventDetails: EventDetails;
}
