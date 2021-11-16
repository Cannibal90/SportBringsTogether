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
  tags: string;
}

export interface EventRespone {
  id: number;
  latitude: number;
  longitude: number;
  creatorId: number;
  tags: string[];
  eventDetails: EventDetails;
}
