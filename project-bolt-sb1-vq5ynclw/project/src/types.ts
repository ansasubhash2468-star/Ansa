export interface EventItem {
  id: string;
  name: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  total_seats: number;
  registered_seats: number;
  image_url: string | null;
}

export interface Registration {
  id: string;
  event_id: string;
  student_name: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}
