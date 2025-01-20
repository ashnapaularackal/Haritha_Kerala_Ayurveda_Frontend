// src/app/models/dashboard.model.ts
import { Time } from "@angular/common";
export interface Dashboard {
  userCode: number;
  usersName: string;
  email: string;
  contact_number: string;
  age: number;
  date: Date;
  gender: string;
  nationality: string;
  country_of_residence: string;
  city: string;
  visited: string;
  allergy: string;
  whatsupnumber: string;
  contactwhatsup: string;
  treatment: {
      id: number;
      name: string;
  };
  timeSlot: {
      id: number;
      startTime: string;
      endTime: string;
  };
}