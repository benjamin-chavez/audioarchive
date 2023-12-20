-- apps/server/src/database/queries/search.sql
ALTER TABLE app_users
    ADD search tsvector GENERATED ALWAYS AS (to_tsvector('english' , display_name) || ' ' || to_tsvector('english' , username))) STORED;

CREATE INDEX idx_search ON app_users USING GIN(search);

ALTER TABLE app_users
    ADD COLUMN ts tsvector GENERATED ALWAYS AS (to_tsvector('english' , display_name || ' ' || username)) STORED;

SELECT
    *
FROM
    app_users
WHERE
    search @@ websearch_to_tsquery('english' , 'am');

SELECT
    *
    , ts_rank(search , websearch_to_tsquery('english' , 'ami'))
    rank
FROM
    app_users
WHERE
    search @@ websearch_to_tsquery('english' , 'ami')
ORDER BY
    rank DESC
LIMIT 10;

-- //////////////////////////
CREATE EXTENSION fuzzystrmatch;

CREATE MATERIALIZED VIEW unique_lexeme AS
SELECT
    word
FROM
    ts_stat('SELECT search FROM app_users');

SELECT
    *
FROM
    unique_lexeme2
WHERE
    levenshtein_less_equal(word , 'amin' , 2) < 2;

SELECT
    *
FROM
    unique_lexeme
WHERE
    levenshtein_less_equal(word , 'chave' , 3) < 2;

SELECT
    websearch_to_tsquery('english' , 'chris lake')
    --////
    SELECT
        *
    FROM
        unique_lexeme
    WHERE
        levenshtein_less_equal(word , 'chri' , 3) < 2;

SELECT
    *
FROM
    app_users
WHERE
    search @@ websearch_to_tsquery('english' , 'chris');

SELECT
    *
FROM
    app_users
WHERE
    search @@ websearch_to_tsquery('english' ,(
            SELECT
                word
            FROM unique_lexeme
            WHERE
                levenshtein_less_equal(word , 'amin' , 3) < 2 LIMIT 10));

SELECT
    *
FROM
    app_users
WHERE
    search @@ websearch_to_tsquery('english' ,(
            SELECT
                word
            FROM unique_lexeme
            WHERE
                levenshtein_less_equal(word , 'lake' , 3) < 2 LIMIT 10));

--///////////////////////////
--EXPLAIN ANALYZE
SELECT
    *
FROM
    app_users
WHERE
    search @@(
        SELECT
            websearch_to_tsquery('english' ,(
                    SELECT
                        word
                    FROM unique_lexeme
                    WHERE
                        levenshtein_less_equal(word , 'amin' , 3) < 2 LIMIT 1)) || ' ' || websearch_to_tsquery('english' ,(
                    SELECT
                        word
                    FROM unique_lexeme
                WHERE
                    levenshtein_less_equal(word , 'lake' , 3) < 2 LIMIT 1)));



SELECT * FROM app_users WHERE similarity(display_name, 'chrs lke') > 0.2;
