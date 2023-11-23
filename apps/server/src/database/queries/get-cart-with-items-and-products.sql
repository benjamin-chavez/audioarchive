-- apps/server/src/database/queries/get-cart-with-items-and-products.sql

SELECT
  carts.*,
  json_agg(
    json_build_object(
      'id', cart_items.id,
      'cart_id', cart_items.cart_id,
      'created_at', cart_items.created_at,
      'updated_at', cart_items.updated_at,
      'product', json_build_object(
        'id', products.id,
        'stripe_account_id', accounts.stripe_account_id,
        'name', products.name,
        'genre', products.genre,
        'software', products.software,
        'bpm', products.bpm,
        'price', products.price,
        'img_s3_key', products.img_s3_key,
        'img_s3_url', products.img_s3_url
      ),
      'app_user', json_build_object(
        'id', app_users.id,
        'username', app_users.username
      )
    )
  ) AS items
FROM
  carts
LEFT JOIN cart_items ON carts.id = cart_items.cart_id
LEFT JOIN products ON cart_items.product_id = products.id
LEFT JOIN accounts ON products.account_id = accounts.id
LEFT JOIN app_users ON products.app_user_id = app_users.id
WHERE
  carts.app_user_id = [YourAppUserId] AND
  carts.status = 'active'
GROUP BY
  carts.id;
