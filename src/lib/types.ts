// Database types - these match the tables in Supabase

export type Setting = {
  key: string;
  value: string;
};

export type UserRole = 'public' | 'coordinator' | 'admin';
export type UserStatus = 'active' | 'flagged' | 'banned';

export type User = {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  notes: string | null;
  created_at: string;
};

export type Venue = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string | null;
  email: string | null;
  contact_name: string | null;
  notes: string | null;
  created_at: string;
};

export type Availability = {
  id: string;
  venue_id: string;
  date: string;
  available_tables: number;
  table_capacity: number;
  notes: string | null;
  created_at: string;
};

export type Event = {
  id: string;
  date: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  status: 'published' | 'cancelled' | 'completed';
  created_at: string;
};

export type Table = {
  id: string;
  event_id: string;
  availability_id: string;
  status: 'active' | 'cancelled';
  dinner_time: string | null;
  reservation_name: string | null;
  created_at: string;
};

export type Ticket = {
  id: string;
  user_id: string;
  event_id: string;
  price: number;
  status: 'pending' | 'paid' | 'refunded';
  stripe_payment_id: string | null;
  guest_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  created_at: string;
};

export type Assignment = {
  id: string;
  ticket_id: string;
  table_id: string;
  created_at: string;
};
