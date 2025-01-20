import { Time } from "@angular/common";


export class TimeSlot {
    id: number | any;
    startTime: string | any;
    endTime: string | any;
    dateBookingCountMap: Map<string, number>| any;
    treatmentPackage: number | any;
}

export class TreatmentPackage {
    id: number |any ;
    name: string |any ;
    description: string | any ;
    price: number |any ;
    timeSlots: TimeSlot[] | any ;
  }
  

export class Registration {
    id: number | any;
    usersName: string | any;
    email: string | any;
    contact_number: string | any;
    age: number | any;
    date: Date | any;
    timeSlot: TimeSlot | any; // Updated to use TimeSlot
    gender: string | any;
    nationality: string | any;
    country_of_residence: string | any;
    city: string | any;
    visited: string | any;
    allergy: string | any;
    whatsupnumber: string | any;
    contactwhatsup: string | any;
    treatment: TreatmentPackage | any ;
}
