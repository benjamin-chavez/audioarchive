-- apps/server/src/database/queries/search-notes--delete-once-search-is-implemented.sql

CREATE TABLE test_trgm (t text);
CREATE INDEX trgm_idx ON test_trgm USING GIN (t gin_trgm_ops);
SELECT t, similarity(t, 'word') AS sml
  FROM test_trgm
  WHERE t % 'word'
  ORDER BY sml DESC, t;

-------------------------------------------------------------------

CREATE EXTENSION fuzzystrmatch;

CREATE MATERIALIZED VIEW unique_lexeme AS
   SELECT word FROM ts_stat('SELECT search FROM app_users');

CREATE MATERIALIZED VIEW unique_lexeme2 AS
   SELECT word FROM ts_stat('SELECT search2 FROM app_users');

-------------------------------------------------------------------

SELECT *, similarity(display_name, 'ami') AS sml
  FROM app_users
  WHERE display_name % 'ami'
  ORDER BY sml DESC, display_name;


SELECT display_name, similarity(display_name, 'ami') AS sml
  FROM app_users
  WHERE display_name % 'ami'
  ORDER BY sml DESC, display_name;


SELECT *, word_similarity('amin', display_name) AS sml
  FROM test_trgm
  WHERE 'amin' <% display_name
  ORDER BY sml DESC, display_name;

SELECT *, word_similarity('cha', display_name) AS sml
  FROM app_users
  WHERE 'cha' <% display_name
  ORDER BY sml DESC, display_name;


SELECT *, strict_word_similarity('cha', display_name) AS sml
   FROM app_users
  WHERE 'cha' <<% display_name
  ORDER BY sml DESC, display_name;

-------------------------------------------------------------------

ALTER TABLE app_users
    ADD COLUMN ts tsvector GENERATED ALWAYS AS (to_tsvector('english' , display_name , || ' ' || username)) STORED;

CREATE INDEX ts_idx ON app_users USING GIN(ts);

-------------------------------------------------------------------

SELECT * FROM app_users
WHERE ts @@ to_tsquery('english', 'ami');
