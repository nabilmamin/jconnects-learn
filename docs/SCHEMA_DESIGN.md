# JC Connects - Database Schema Design

**Created**: January 27, 2026
**Updated**: January 31, 2026
**Status**: Designed, not yet implemented

---

## Overview

This document describes the database schema for the JC Connects Weekly Dinners platform. The schema was designed with these principles:

1. **Coordinator logs availability, system creates events and tables** - Minimal manual work
2. **Flexible venue capacity** - Venues can offer different table counts/sizes per date
3. **Automated table assignment** - System assigns users to tables via batch process
4. **Simple MVP** - No matching algorithm, just fill tables efficiently

---

## Entity Relationship Diagram

```
settings (app configuration)

users ──────────────────┐
                        │
                        ▼
                     tickets ─────────────► assignments
                        │                       │
                        │                       │
                        ▼                       ▼
venues ──► availability ──► tables ◄────────── events
```

---

## Tables

### settings
App-wide configuration values.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| key | TEXT | PRIMARY KEY | Setting name |
| value | TEXT | NOT NULL | Setting value |

**Example records:**
```
key                     | value
------------------------+-------
default_ticket_price    | 1000    (in cents = $10)
max_tickets_per_user    | 2
```

---

### users
People who sign up and purchase tickets.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| email | TEXT | UNIQUE, NOT NULL | User's email |
| name | TEXT | NOT NULL | User's full name |
| phone | TEXT | | Optional phone number |
| created_at | TIMESTAMPTZ | DEFAULT now() | When user registered |

---

### venues
Restaurants that partner with the platform.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| name | TEXT | NOT NULL | Venue name ("The Hutton") |
| address | TEXT | NOT NULL | Street address ("225 Hutton St") |
| city | TEXT | NOT NULL | City ("Jersey City") |
| state | TEXT | NOT NULL | State ("NJ") |
| zip | TEXT | NOT NULL | Zip code ("07302") |
| phone | TEXT | | Venue phone number |
| email | TEXT | | Venue email |
| contact_name | TEXT | | Point of contact at venue |
| notes | TEXT | | Coordinator notes ("Back room is quieter") |
| created_at | TIMESTAMPTZ | DEFAULT now() | When venue was added |

---

### availability
Date-specific availability for each venue. This is what the coordinator inputs.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| venue_id | UUID | FK → venues, NOT NULL | Which venue |
| date | DATE | NOT NULL | Which date |
| available_tables | INTEGER | NOT NULL | How many tables venue is offering |
| table_capacity | INTEGER | NOT NULL | Seats per table (4, 6, 8, etc.) |
| notes | TEXT | | Notes ("Only back room available") |
| created_at | TIMESTAMPTZ | DEFAULT now() | When availability was logged |

**Constraints:**
- UNIQUE(venue_id, date) - One record per venue per date

**Example records:**
```
venue      | date       | available_tables | table_capacity
-----------+------------+------------------+----------------
Hutton     | 2026-02-14 | 2                | 6
Hutton     | 2026-02-18 | 10               | 6
Brightside | 2026-02-14 | 4                | 8
```

**System behavior**: When availability is created:
1. Get city/state from the venue
2. If no event exists for that date + city → create event (status=published)
3. Create table records based on available_tables count

---

### events
The main event entity - a dinner event on a specific date in a specific city.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| date | DATE | NOT NULL | Event date |
| city | TEXT | NOT NULL | City ("Jersey City") |
| state | TEXT | NOT NULL | State ("NJ") |
| zip | TEXT | NOT NULL | Zip code for neighborhood grouping |
| status | TEXT | NOT NULL, DEFAULT 'published' | published / cancelled / completed |
| created_at | TIMESTAMPTZ | DEFAULT now() | When event was created |

**Constraints:**
- UNIQUE(date, city) - One event per date per city

**Notes:**
- Auto-created by system when availability is added for a new date/city
- One event can span multiple venues (within the same city)
- Price is stored on tickets (what user paid at purchase time)
- Supports multi-city expansion (Jersey City, Hoboken, etc.)

---

### tables
Individual tables within an event. Created immediately when availability is added.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| event_id | UUID | FK → events, NOT NULL | Which event |
| availability_id | UUID | FK → availability, NOT NULL | Which venue/date (provides capacity) |
| status | TEXT | NOT NULL, DEFAULT 'active' | active / cancelled |
| dinner_time | TIME | | Reservation time at venue |
| created_at | TIMESTAMPTZ | DEFAULT now() | When table was created |

**Notes:**
- Capacity comes from availability.table_capacity (not stored here)
- Created immediately when availability is added
- Status = 'cancelled' when venue capacity decreases

---

### tickets
Proof of purchase for an event.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| user_id | UUID | FK → users, NOT NULL | Who purchased |
| event_id | UUID | FK → events, NOT NULL | Which event |
| price | INTEGER | NOT NULL | Amount paid in cents (frozen at purchase time) |
| status | TEXT | NOT NULL, DEFAULT 'pending' | pending / paid / refunded |
| stripe_payment_id | TEXT | | Stripe payment reference |
| guest_name | TEXT | | If ticket is for a friend (NULL = for purchaser) |
| guest_email | TEXT | | Guest's email for communications |
| guest_phone | TEXT | | Guest's phone |
| created_at | TIMESTAMPTZ | DEFAULT now() | When ticket was created |

**Business rules:**
- guest_name = NULL → ticket is for the purchaser
- guest_name = filled → ticket is for a friend
- Max tickets per user per event enforced by application (default: 2)

---

### assignments
Links tickets to tables. Created by batch process or coordinator.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| ticket_id | UUID | FK → tickets, UNIQUE, NOT NULL | Which ticket |
| table_id | UUID | FK → tables, NOT NULL | Which table |
| created_at | TIMESTAMPTZ | DEFAULT now() | When assignment was made |

**Constraints:**
- UNIQUE(ticket_id) - One ticket = one seat (no double assignments)

---

## System Workflows

### Coordinator Logs Venue Availability

```
1. Coordinator adds: Hutton (Jersey City) has 3 tables of 6 on Feb 18
2. System gets venue's city/state (Jersey City, NJ)
3. System checks: Does event for Feb 18 + Jersey City exist?
   - No → Create event (date=Feb 18, city=Jersey City, state=NJ, status=published)
   - Yes → Do nothing
4. Create availability record
5. Create 3 table records (referencing event + availability)
```

### User Purchases Ticket

```
1. User selects event (Feb 18)
2. System checks: Can user buy more tickets?
   - Count user's tickets for this event < max_tickets_per_user
3. User completes Stripe checkout
4. Stripe webhook confirms payment
5. Ticket created: status=paid, price=current price, no assignment yet
6. User sees: "You're in! We'll assign your table soon."
```

### Batch Assignment Process (Night Before Event)

```
1. Get all events with status=published and date=tomorrow
2. For each event:
   a. Get unassigned tickets (paid, no assignment)
   b. Get active tables for this event
   c. Sort tables by capacity (descending)
   d. Assign tickets to tables (fill completely)
   e. If remaining tickets can't fill a table:
      - Create partial assignment
      - Flag for coordinator review
3. Send confirmation emails to assigned users
```

### Availability Decreases (Capacity Change)

```
1. Venue says: "We only have 2 tables now, not 3"
2. Update availability.available_tables = 2
3. Mark excess table records as status='cancelled'
4. If cancelled table had assignments:
   - Reassign those tickets to other active tables
   - Or flag for coordinator review
```

### Assignment Algorithm (Simple Fill)

```
Input:
- Hutton: 3 tables × 6 = 18 seats
- Brightside: 2 tables × 4 = 8 seats
- 22 tickets to assign

Output:
- Hutton Table 1: 6 people
- Hutton Table 2: 6 people
- Hutton Table 3: 6 people
- Brightside Table 1: 4 people
Total: 22 assigned

If 25 tickets:
- Hutton: 18 (3 full tables)
- Brightside Table 1: 4 (full)
- Brightside Table 2: 3 (incomplete - flag for review)
```

---

## Queries

### Get active tables for an event

```sql
select
  t.id as table_id,
  v.name as venue_name,
  a.table_capacity
from tables t
join availability a on a.id = t.availability_id
join venues v on v.id = a.venue_id
where t.event_id = 'xxx'
  and t.status = 'active';
```

### Get unassigned tickets for an event

```sql
select t.*, u.name as purchaser_name, u.email as purchaser_email
from tickets t
join users u on u.id = t.user_id
where t.event_id = 'xxx'
  and t.status = 'paid'
  and t.id not in (select ticket_id from assignments);
```

### Get table assignments with attendee info

```sql
select
  tb.id as table_id,
  v.name as venue_name,
  a.table_capacity,
  coalesce(t.guest_name, u.name) as attendee_name,
  coalesce(t.guest_email, u.email) as attendee_email
from tables tb
join availability a on a.id = tb.availability_id
join venues v on v.id = a.venue_id
join assignments asn on asn.table_id = tb.id
join tickets t on t.id = asn.ticket_id
join users u on u.id = t.user_id
where tb.event_id = 'xxx'
order by tb.id, asn.created_at;
```

### Count tickets per user for an event

```sql
select count(*) as ticket_count
from tickets
where user_id = 'xxx'
  and event_id = 'yyy'
  and status in ('pending', 'paid');
```

---

## Future Considerations (Post-MVP)

These were discussed but deferred:

1. **Matching algorithm** - Group by dietary restrictions, age, avoid repeat pairings
2. **User preferences** - Venue preference, seating preference
3. **Multiple coordinators** - Track which coordinator manages which events
4. **Soft deletes** - Archive instead of delete for audit trail
5. **Waitlist** - When event is full, allow waitlist signup

---

## Next Steps

1. Run SQL migration in Supabase
2. Test with sample data
3. Build data access layer (src/lib/db.ts)
