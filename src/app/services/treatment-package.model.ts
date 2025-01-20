import { TimeSlot } from './time-slot.model';
import { Image } from './image.model';

export interface TreatmentPackage {
  id?: number;
  name: string;
  description: string;
  price: number;
  timeSlots: TimeSlot[];
  images: Image[];
}