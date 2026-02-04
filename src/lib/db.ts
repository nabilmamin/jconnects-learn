import { createClient } from '@/lib/supabase/server';
import { Event, Venue, Availability, Table, Ticket, Assignment, User } from '@/lib/types';

// --- Data Access Layer --- //
// -- Event Functions -- //

// Get all 'published' events from supabase
export async function getEvents(): Promise<Event[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('events') // from the Events table
        .select() // select all
        .eq('status', 'published'); // where the status equals published

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

// Get specific event by id
export async function getEventById(id: string): Promise<Event | null> {
    const supabase = await createClient();

    const { data, error } = await supabase 
        .from('events')
        .select()
        .eq('id', id) // wgere id matches the id we passed in
        .single();
    
    if (error) {
        return null;
    }

    return data;
}

// Get events by city
export async function getEventsByCity(city: string): Promise<Event[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('events')
        .select()
        .eq('city', city)
        .eq('status', 'published')
        .order('date', { ascending: true });
        //.gte('date', '2026-01-01'); // greater than or equal to
        //.lte('date', '2026-01-01'); // less than or equal to

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

//-- Venue Functions --//

export async function getVenues(): Promise<Venue[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('venues')
        .select()
        .order('name', { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getVenuesByCity(city: string): Promise<Venue[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('venues')
        .select()
        .eq('city', city)
        .order('name', { ascending: true });
    if (error) {
        throw new Error(error.message);
    }

    return data;
}

// -- Availability Function -- //

export async function getAvailabilityByDate(date: string): Promise<(Availability & { venue: Venue })[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('availability')
        .select(`*, venue:venues(*)`)
        .eq('date', date);
    
    if (error) {
        throw new Error(error.message);
    }

    return data
}

// -- Table Functions -- //

export async function getTablesByEvent(eventId: string): Promise<Table[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('tables')
        .select()
        .eq('event_id', eventId)
        .eq('status', 'active');

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getTableById(id: string): Promise<(Table & { availability: Availability & { venue: Venue }}) | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('tables')
        .select(`*, availability:availability(*,venue:venues(*))`)
        .eq('id', id)
        .single();

    if (error) {
        return null;
    }

    return data;
}

// -- Ticket Functions -- //

export async function getTicketsByUser(userId: string): Promise<Ticket[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('tickets')
        .select()
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    
    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getTicketsByEvent(eventId: string): Promise<Ticket[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('tickets')
        .select()
        .eq('event_id', eventId)
        .eq('status', 'paid')
        .order('created_at', {ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getTicketById(id: string): Promise<(Ticket & { event: Event }) | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('tickets')
        .select(`*, event:events(*)`)
        .eq('id', id)
        .single();

    if (error){
        return null
    }

    return data;
}

type CreateTicketParams = {
    userId: string;
    eventId: string;
    price: number;
    stripePaymentId: string;
};

export async function createTicket(params: CreateTicketParams): Promise<Ticket> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('tickets')
        .insert({
            user_id: params.userId,
            event_id: params.eventId,
            price: params.price,
            stripe_payment_id: params.stripePaymentId,
            status: 'paid',
        })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

// -- Assignment Functions -- //

export async function getAssignmentByTicket(ticketId: string): Promise<(Assignment & { table: Table }) | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('assignments')
        .select(`*, table:tables(*)`)
        .eq('ticket_id', ticketId)
        .single();

    if (error) {
        return null;
    }

    return data;
}

export async function getAssignmentsByTable(tableId: string): Promise<(Assignment & { ticket: Ticket })[]>{
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('assignments')
        .select(`*, ticket:tickets(*)`)
        .eq('table_id', tableId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

// -- User Functions --//
export async function createUser(email:string, passwordHash: string, name: string): Promise<User> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('users')
        .insert({ email, password_hash: passwordHash, name })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('email', email)
        .single()
    
    if (error) {
        return null;
    }

    return data;
}

export async function getUserById(id: string): Promise<User | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('id', id)
        .single()
    
    if(error) {
        return null;
    }

    return data;
}