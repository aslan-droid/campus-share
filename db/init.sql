-- CampusShare — PostgreSQL şeması (Hafta 1)
-- Tablolar: users, listings, messages

CREATE TABLE IF NOT EXISTS users (
    id            SERIAL PRIMARY KEY,
    full_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
    -- Yalnızca .edu.tr uzantılı e-postalar kabul edilir
    CONSTRAINT users_email_edu_tr CHECK (LOWER(email) LIKE '%@%.edu.tr')
);

CREATE TABLE IF NOT EXISTS listings (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(200) NOT NULL,
    description TEXT,
    price       NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    category    VARCHAR(50) NOT NULL
                CHECK (category IN ('Elektronik', 'Kitap', 'Kıyafet', 'Diğer')),
    image_url   TEXT,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
    id           SERIAL PRIMARY KEY,
    listing_id   INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    sender_id    INTEGER REFERENCES users(id) ON DELETE SET NULL,
    sender_name  VARCHAR(100) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    body         TEXT NOT NULL,
    created_at   TIMESTAMP NOT NULL DEFAULT NOW()
);
