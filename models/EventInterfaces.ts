export interface EventRequest {
  longitude: number;
  latitude: number;
  description: string;
  place: string;
  title: string;
  startDate: Date;
  endDate: Date;
  maxAttendants: number;
  lastTimeRegistration: Date;
  creatorId: number;
  tags: string;
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
  id: number;
  latitude: number;
  longitude: number;
  creatorId: number;
  tags: string[];
  eventDetails: EventDetails;
  goingEvents: number[];
  eventInterestedUsers: number[];
}

export interface InAreaRequest {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}
