# JC Connects - Full Stack Development Course

**Student**: Nabil
**Goal**: Become a solutions architect through full-stack development mastery
**Started**: January 27, 2026
**Reference Project**: `../jconnects_weekly_dinners/`

---

## Progress Tracker

| Phase | Lesson | Status | Date Completed |
|-------|--------|--------|----------------|
| 1 | 1.0 Project Setup | COMPLETED | Jan 27, 2026 |
| 1 | 1.1 TypeScript Basics | COMPLETED | Jan 27, 2026 |
| 1 | 1.2 React Fundamentals | COMPLETED | Jan 27, 2026 |
| 1 | 1.3 Next.js App Router | COMPLETED | Jan 27, 2026 |
| 2 | 2.1 Supabase Setup | COMPLETED | Jan 27, 2026 |
| 2 | 2.2 Schema Design | COMPLETED | Jan 27, 2026 |
| 2 | 2.3 Data Access Layer | COMPLETED | Feb 1, 2026 |
| 3 | 3.1 JWT Authentication | IN PROGRESS | - |
| 3 | 3.2 Role-Based Access | Not Started | - |
| 4 | 4.1 Stripe Checkout | Not Started | - |
| 4 | 4.2 Webhooks | Not Started | - |
| 4 | 4.3 Stripe Connect | Not Started | - |
| 5 | 5.1 Email with Resend | Not Started | - |
| 5 | 5.2 SMS with Twilio | Not Started | - |
| 6 | 6.1 Environment & Secrets | Not Started | - |
| 6 | 6.2 Deployment | Not Started | - |
| 6 | 6.3 Error Handling | Not Started | - |

---

## Phase 1: Foundations

### Lesson 1.0 - Project Setup
**Objective**: Initialize a Next.js project with TypeScript and understand the generated structure.

**Key Concepts**:
- npm and package.json
- Next.js project structure
- TypeScript configuration
- Development server

**Tasks**:
- [ ] Create Next.js app with `create-next-app`
- [ ] Explore generated files
- [ ] Run development server
- [ ] Make first code change

**Architect's Notes**:
> Why Next.js? It provides file-based routing, server-side rendering, API routes, and excellent DX out of the box. For a startup MVP, this reduces architectural decisions and speeds up development. Trade-off: you're coupled to Vercel's conventions.

---

### Lesson 1.1 - TypeScript Basics
**Objective**: Understand why types matter and how to use them.

**Key Concepts**:
- Type annotations
- Interfaces vs Types
- Generics (basic)
- Type inference

**Architect's Notes**:
> Types are documentation that the compiler enforces. In a team or long-lived project, they prevent entire categories of bugs and make refactoring safe. The cost is verbosity; the benefit compounds over time.

---

### Lesson 1.2 - React Fundamentals
**Objective**: Build interactive UIs with components.

**Key Concepts**:
- Components and JSX
- Props and State (useState)
- Effects (useEffect)
- Event handling
- Conditional rendering
- Lists and keys

---

### Lesson 1.3 - Next.js App Router
**Objective**: Understand Next.js 14's routing and rendering model.

**Key Concepts**:
- File-based routing
- page.tsx vs layout.tsx
- Server Components vs Client Components
- When to use "use client"
- Loading and error states
- Dynamic routes ([id])

**Architect's Notes**:
> Server Components are the default in App Router. They run on the server, reduce client JavaScript, and can directly access databases. Client Components are for interactivity. Knowing when to use each is a key architectural decision.

---

## Phase 2: Database & Data Layer

### Lesson 2.1 - Supabase Setup
**Objective**: Set up a PostgreSQL database with Supabase.

**Key Concepts**:
- Supabase project creation
- Connection strings
- Supabase client setup
- Row Level Security (RLS) concept

**Architect's Notes**:
> Why Supabase over raw PostgreSQL? Managed hosting, built-in auth (we won't use it), real-time subscriptions, and a nice dashboard. Trade-off: vendor lock-in. The SQL underneath is standard PostgreSQL, so migration is possible.

---

### Lesson 2.2 - Schema Design
**Objective**: Design database tables for the dinner platform.

**Key Concepts**:
- Entities and relationships
- Primary keys (UUID vs serial)
- Foreign keys and constraints
- Indexes
- Enums
- Normalization

**Architect's Notes**:
> Schema design is one of the hardest things to change later. Spend time here. A bad schema creates technical debt that compounds. We'll design for the MVP but consider future needs.

---

### Lesson 2.3 - Data Access Layer
**Objective**: Create a clean abstraction for database operations.

**Key Concepts**:
- Repository pattern
- Separating data access from business logic
- Error handling
- TypeScript types for database rows

**Architect's Notes**:
> Never scatter raw database queries throughout your codebase. A data access layer (db.ts) centralizes queries, makes testing easier, and allows you to swap databases if needed.

---

## Phase 3: Authentication & Security

### Lesson 3.1 - JWT Authentication
**Objective**: Implement secure authentication with JSON Web Tokens.

**Key Concepts**:
- How JWTs work (header, payload, signature)
- HTTP-only cookies vs localStorage
- Token expiration
- Password hashing (bcrypt)

**Architect's Notes**:
> JWTs in HTTP-only cookies are more secure than localStorage (immune to XSS). Trade-off: slightly more complex setup, and you need CSRF protection for mutations. For this app, we accept the trade-off.

---

### Lesson 3.2 - Role-Based Access Control
**Objective**: Implement different permission levels.

**Key Concepts**:
- User roles (public, coordinator, admin)
- Route protection
- API authorization
- Middleware

---

## Phase 4: Payments & Integrations

### Lesson 4.1 - Stripe Checkout
**Objective**: Accept payments with Stripe.

**Key Concepts**:
- Stripe API basics
- Checkout Sessions
- Success/Cancel URLs
- Storing payment references

---

### Lesson 4.2 - Webhooks
**Objective**: Handle async payment events.

**Key Concepts**:
- What webhooks are
- Webhook signature verification
- Idempotency
- Event handling

**Architect's Notes**:
> Never trust the client to confirm payment. Always use webhooks. The client can lie; Stripe's signed webhooks cannot.

---

### Lesson 4.3 - Stripe Connect
**Objective**: Split payments between platform and coordinator.

**Key Concepts**:
- Marketplace payments
- Connected accounts
- Transfer flows
- Onboarding

---

## Phase 5: Communications

### Lesson 5.1 - Email with Resend
**Objective**: Send transactional emails.

**Key Concepts**:
- Email service providers
- HTML email templates
- Deliverability basics

---

### Lesson 5.2 - SMS with Twilio
**Objective**: Send SMS notifications.

**Key Concepts**:
- Twilio setup
- SMS best practices
- Cost considerations

---

## Phase 6: Production Concerns

### Lesson 6.1 - Environment Variables & Secrets
**Objective**: Manage configuration securely.

**Key Concepts**:
- .env files
- Public vs private variables
- Secret management

---

### Lesson 6.2 - Deployment
**Objective**: Deploy to Vercel.

**Key Concepts**:
- Build process
- Environment configuration
- Domain setup
- Preview deployments

---

### Lesson 6.3 - Error Handling & Monitoring
**Objective**: Build resilient applications.

**Key Concepts**:
- Error boundaries
- API error handling
- Logging strategies
- Monitoring basics

---

## Session Notes

### Session 1 - January 27, 2026
- Discussed learning goals: solutions architect path
- Established baseline: HTML/CSS/JS/Python experience, familiar with CLI/Git/DBs
- Created lesson plan

**Completed Phase 1: Foundations**
- 1.0 Project Setup: Created Next.js app with TypeScript, Tailwind, App Router
- 1.1 TypeScript: Type annotations, props types, Promise types
- 1.2 React: Components, JSX, props, state (useState), events, lists with .map(), keys
- 1.3 Next.js: File-based routing, layouts, dynamic routes [id], Link navigation, Server vs Client Components

**Built:**
- Home page (`/`)
- Events listing page (`/events`)
- Event detail page (`/events/[id]`)
- Reusable EventCard component
- Shared layout with navigation

**Key concepts explained:**
- DRY principle
- Promises and async/await
- React reconciliation and why keys matter
- Destructuring and TypeScript inline types

**Started Phase 2: Database & Data Layer**
- 2.1 Supabase Setup: Created Supabase project, learned about new API keys (publishable/secret vs legacy anon/service_role)
- Created Supabase client files (client.ts for browser, server.ts for server)
- Verified database connection works

**Key concepts explained:**
- Cookies: what they are, how they transport auth tokens
- Auth tokens: signed proof of identity
- Server vs browser clients: why we need both
- createServerClient: why it needs cookie handlers

- 2.2 Schema Design: Designed full database schema through discussion
- See: `docs/SCHEMA_DESIGN.md` for complete documentation

**Business decisions made:**
- Tickets: one ticket = one person, max 2 per user per night (configurable)
- Plus-ones: guest_name/email/phone fields on ticket (null = for purchaser)
- Venue capacity: date-specific via venue_availability table
- Dinner nights: auto-created when venue_availability is added, auto-published
- Table assignment: batch process with simple fill algorithm (largest venue first)
- No matching algorithm for MVP

**Tables designed:**
- settings (app config)
- users
- venues
- venue_availability (date-specific capacity)
- dinner_nights (events)
- dinner_tables (created by system)
- tickets
- assignments

**Next session:** Write SQL migration, create tables in Supabase, build data access layer

---

### Session 2 - January 31, 2026
- Returned after a few days, reviewed Supabase client files (client.ts, server.ts)
- Reviewed events/page.tsx and how it uses the server client

**Completed SQL Migration:**
- Wrote migration for all 8 tables interactively
- Learned SQL syntax: CREATE TABLE, PRIMARY KEY, REFERENCES, NOT NULL, UNIQUE, DEFAULT
- Ran migration in Supabase SQL Editor
- Tested with sample data (The Hutton venue, Feb 14 event)

**Schema Refinements (through discussion):**
- Renamed tables for clarity: venue_availability → availability, dinner_nights → events, dinner_tables → tables
- Moved price from events to tickets (frozen at purchase time)
- Added status column to tables (active/cancelled) for capacity changes
- Split venues.address into address, city, state, zip
- Added city, state, zip to events for multi-city expansion (Jersey City → Hoboken)
- Removed unique constraint on events.date, added unique(date, city)
- Tables created immediately when availability added (not during batch)

**Key concepts explained:**
- SQL migrations: what they are, why versioned changes matter
- DEFAULT keyword: auto-values on insert
- Foreign keys: referential integrity, database enforces relationships
- Unique constraints: preventing duplicate data
- Why events table exists: FK target for tickets, holds event-level status
- Normalization: don't store derived values (available_tables × table_capacity)
- TIMESTAMPTZ vs TIMESTAMP: always store timezone info

**Started Data Access Layer (Lesson 2.3):**
- Created src/lib/types.ts with TypeScript types for all tables
- Created src/lib/db.ts with query functions
- Learned about Promise<T[]> return types for async functions
- Learned Supabase query chaining: .from(), .select(), .eq(), .order()
- Learned Supabase joins: select(`*, venue:venues(*)`)

**Functions built in db.ts:**
- getEvents() - all published events
- getEventById(id) - single event by ID
- getEventsByCity(city) - events filtered by city
- getVenues() - all venues
- getVenuesByCity(city) - venues filtered by city
- getAvailabilityByDate(date) - availability with nested venue (join)

**Tested:**
- Updated events/page.tsx to use getEvents() instead of direct Supabase query
- Verified data displays correctly from database

**Next session:** Complete data access layer (tables, tickets, assignments functions)

---

### Session 3 - February 1, 2026

**Completed Lesson 2.3 - Data Access Layer:**
- Added Table functions: `getTablesByEvent`, `getTableById`
- Added Ticket functions: `getTicketsByUser`, `getTicketsByEvent`, `getTicketById`
- Added Assignment functions: `getAssignmentByTicket`, `getAssignmentsByTable`

**Key concepts explained:**
- Supabase join syntax: `select(`*, event:events(*)`)` - alias:table(columns)
- Nested joins: going two levels deep through foreign keys
- TypeScript intersection types for joined data: `Ticket & { event: Event }`
- Repository pattern: centralizing data access for flexibility

**Phase 2 Complete!**

**Started Lesson 3.1 - JWT Authentication:**
- Installed bcrypt and jose packages
- Added JWT_SECRET to .env.local
- Created `src/lib/auth.ts` with password and JWT functions
- Added password_hash column to users table
- Added `createUser` and `getUserByEmail` to db.ts

**Key concepts explained:**
- JWT structure: header.payload.signature
- Why HTTP-only cookies over localStorage (XSS protection)
- Password hashing with bcrypt
- Salt: random data stored with hash to defeat rainbow tables
- Rounds: repeated hashing to make brute force slow (2^10 iterations)
- Bcrypt string format: algo + rounds + salt + hash all in one

**Next session:** Continue 3.1 - Create signup/login API routes, set auth cookies

---

## Reference Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

---

## Architectural Decisions Log

| Decision | Choice | Rationale | Trade-offs |
|----------|--------|-----------|------------|
| Framework | Next.js 14 | Full-stack, great DX, Vercel deployment | Vendor coupling |
| Database | Supabase (PostgreSQL) | Managed, good free tier, standard SQL | Some vendor lock-in |
| Auth | Custom JWT | Learning purposes, full control | More work than Auth0/Clerk |
| Payments | Stripe | Industry standard, excellent docs | Fees |
| Email | Resend | Modern API, good free tier | Newer service |
| Styling | Tailwind + shadcn | Rapid development, consistent UI | Learning curve |
| Table creation | Immediate on availability | Tables exist from start, simpler mental model | Must handle capacity decreases |
| Assignment | Batch process (night before) | Optimal table filling, no partial tables | Users wait for assignment |
| Matching algo | None (MVP) | Simplicity, ship faster | No smart grouping |
| Events | Auto-created + auto-published | Minimal coordinator friction | Less control over launch |
| Venue capacity | Date-specific table | Flexible, real-world accurate | More complexity than fixed capacity |
| Price storage | On tickets (not events) | Frozen at purchase time, accurate history | Must set price at checkout |
| Multi-city | city/state/zip on events | Supports expansion (JC → Hoboken) | More fields to manage |
| Table status | active/cancelled column | Handle capacity decreases gracefully | Extra state to manage |
| Events table | Keep it (vs derive from availability) | FK target for tickets, referential integrity | One more table |

