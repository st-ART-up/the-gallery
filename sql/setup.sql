DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS drawings CASCADE;

CREATE TABLE users (
    github_username TEXT NOT NULL PRIMARY KEY,
    github_avatar TEXT NOT NULL
);

CREATE TABLE drawings (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    drawing_url TEXT NOT NULL,
    title TEXT,
    caption TEXT,
    artist TEXT NOT NULL REFERENCES users(github_username)
)