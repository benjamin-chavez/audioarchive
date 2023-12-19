-- apps/server/src/database/queries/products-fuzzy-search.sql

PREPARE fuzzy_search3(text) AS
    SELECT products.id
         , products.genre_name
         , products.name
         , products.daw
         , products.bpm
         , products.price
         , products.img_s3_key
         , products.img_s3_url
         , products.key
         , products.label
         , products.description
         , app_users.id       as seller_id
         , app_users.username as seller_username
    FROM products
             JOIN app_users ON products.app_user_id = app_users.id
    WHERE products.genre_name % $1
       OR products.name % $1
       OR products.daw % $1
       -- OR products.bpm::text % $1
       OR products.description % $1
       OR app_users.username % $1
       OR app_users.display_name % $1;

EXECUTE fuzzy_search3('amin');


-- -- SELECT * FROM app_users
-- -- WHERE display_name % 'ami lake' OR username % 'ami lake';
