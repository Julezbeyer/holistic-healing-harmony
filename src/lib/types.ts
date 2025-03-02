
export type TimeSlot = {
  id: string;
  date: string; // ISO-Format
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  isAvailable: boolean;
};

export type Appointment = {
  id: string;
  timeSlotId: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  status: 'confirmed' | 'cancelled' | 'pending';
  createdAt: string;
};
