-- SQL script to seed data into the 'accounts' table
-- Deletes ALL existing entries
-- DELETE FROM accounts;
-- Inserts new entries
INSERT INTO accounts(app_user_id , stripe_account_id , charges_enabled , payouts_enabled , details_submitted , default_account , created_at , updated_at)
    VALUES (2 , 'acct_1OBsdHR8QsErjyla' , TRUE , TRUE , TRUE , TRUE , CURRENT_TIMESTAMP , CURRENT_TIMESTAMP)
    ,(3 , 'acct_1OBsoPQvZQFMaerv' , TRUE , TRUE , TRUE , TRUE , CURRENT_TIMESTAMP , CURRENT_TIMESTAMP)
    ,(4 , 'acct_1OBstLQpzpp1vjpb' , TRUE , TRUE , TRUE , TRUE , CURRENT_TIMESTAMP , CURRENT_TIMESTAMP);
