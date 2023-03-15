-- Create users table
CREATE TABLE IF NOT EXISTS users(
    id serial primary key not null,
    name text not null unique
);

-- Insert some data
INSERT INTO users(name) VALUES ('Kristian');
INSERT INTO users(name) VALUES ('Walid');
INSERT INTO users(name) VALUES ('bader');
INSERT INTO users(name) VALUES ('anis');
INSERT INTO users(name) VALUES ('amin');
INSERT INTO users(name) VALUES ('nejah');