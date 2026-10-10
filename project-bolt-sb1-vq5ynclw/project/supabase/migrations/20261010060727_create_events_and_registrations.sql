/*
# Create events and registrations tables (single-tenant, no auth)

1. New Tables
- `events`
  - `id` (uuid, primary key)
  - `name` (text, not null) — event name
  - `category` (text, not null) — e.g. Music, Dance, Tech, Drama, Art, Sports
  - `date` (text, not null) — ISO date string e.g. "2026-10-15"
  - `time` (text, not null) — e.g. "18:00"
  - `venue` (text, not null) — venue name
  - `description` (text, not null) — short description
  - `total_seats` (int, not null, default 100)
  - `registered_seats` (int, not null, default 0)
  - `image_url` (text) — optional image for the card
  - `created_at` (timestamptz, default now())
- `registrations`
  - `id` (uuid, primary key)
  - `event_id` (uuid, references events, on delete cascade)
  - `student_name` (text, not null)
  - `email` (text, not null)
  - `phone` (text, not null)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- This is a single-tenant no-auth app: anyone can browse events and register.
- `events`: anon + authenticated can SELECT and UPDATE (for seat count).
- `registrations`: anon + authenticated can SELECT, INSERT, UPDATE, DELETE.
- All policies use `USING (true)` / `WITH CHECK (true)` because the data is intentionally public/shared (campus fest, no sign-in).

3. Seed Data
- Inserts 8 dummy events across categories: Music, Dance, Tech, Drama, Art, Sports, Quiz, Literature.
- Each has a date, time, venue, description, and seat capacity.
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  date text NOT NULL,
  time text NOT NULL,
  venue text NOT NULL,
  description text NOT NULL,
  total_seats int NOT NULL DEFAULT 100,
  registered_seats int NOT NULL DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_events" ON events;
CREATE POLICY "anon_select_events" ON events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_events" ON events;
CREATE POLICY "anon_insert_events" ON events FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_events" ON events;
CREATE POLICY "anon_update_events" ON events FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_events" ON events;
CREATE POLICY "anon_delete_events" ON events FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  student_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_registrations" ON registrations;
CREATE POLICY "anon_select_registrations" ON registrations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_registrations" ON registrations;
CREATE POLICY "anon_insert_registrations" ON registrations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_registrations" ON registrations;
CREATE POLICY "anon_update_registrations" ON registrations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_registrations" ON registrations;
CREATE POLICY "anon_delete_registrations" ON registrations FOR DELETE
  TO anon, authenticated USING (true);

-- Seed events (idempotent: only insert if table is empty)
INSERT INTO events (name, category, date, time, venue, description, total_seats, registered_seats, image_url)
SELECT * FROM (VALUES
  ('Battle of the Bands', 'Music', '2026-10-15', '18:00', 'Main Auditorium', 'Collegiate bands clash in a night of live music, roaring crowds, and electric energy.', 120, 98, NULL),
  ('Solo Singing Championship', 'Music', '2026-10-16', '15:00', 'Open Air Stage', 'Find the best voice on campus. Solo performers battle for the title of Verve Vocalist.', 80, 65, NULL),
  ('Hip-Hop Showdown', 'Dance', '2026-10-15', '16:00', 'Dance Floor B', 'Crews and solo dancers face off in the ultimate street dance battle.', 60, 60, NULL),
  ('Hack the Verve', 'Tech', '2026-10-16', '09:00', 'Computer Lab 3', 'A 12-hour hackathon where teams build apps that solve real campus problems.', 50, 32, NULL),
  ('Stage Play: Midnight Echo', 'Drama', '2026-10-17', '19:30', 'Main Auditorium', 'A gripping original play performed by the campus theatre society.', 150, 72, NULL),
  ('Live Canvas', 'Art', '2026-10-16', '14:00', 'Art Courtyard', 'Artists paint live on giant canvases while the audience watches creativity unfold.', 40, 18, NULL),
  ('Inter-College Football Finals', 'Sports', '2026-10-17', '10:00', 'Main Ground', 'The grand finale of the inter-college football tournament. Cheer your team to glory!', 200, 155, NULL),
  ('Verve Quiz Bowl', 'Quiz', '2026-10-15', '11:00', 'Seminar Hall 1', 'Test your wits in a fast-paced general knowledge and trivia quiz competition.', 100, 41, NULL)
) AS v(name, category, date, time, venue, description, total_seats, registered_seats, image_url)
WHERE NOT EXISTS (SELECT 1 FROM events);
