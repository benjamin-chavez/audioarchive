curl https://api.stripe.com/v1/payment_intents \
  -u "sk_test_51Nxyj1JiRcfe15ltseGsBSVCcWzsAMVseHXaoJVowZxDNIgpFY7rqoVPGso98gAaMKFiAD2dk1AspWZpXsm6MsNj00LJg31vbv:" \
  -d amount=10000 \
  -d currency=usd \
  -d payment_method=pm_card_visa \
  -d confirm=true \
   -d return_url="https://your-redirect-url.com"

OR
curl https://api.stripe.com/v1/payment_intents \
  -u sk_test_51Nxyj1JiRcfe15ltseGsBSVCcWzsAMVseHXaoJVowZxDNIgpFY7rqoVPGso98gAaMKFiAD2dk1AspWZpXsm6MsNj00LJg31vbv: \
  -d amount=10000 \
  -d currency=usd \
  -d payment_method=pm_card_visa \
  -d confirm=true \
  -d "automatic_payment_methods[enabled]"=true \
  -d "automatic_payment_methods[allow_redirects]"=never

------------------------------------------------------------------------

curl https://api.stripe.com/v1/payment_intents \
  -u "sk_test_51Nxyj1JiRcfe15ltseGsBSVCcWzsAMVseHXaoJVowZxDNIgpFY7rqoVPGso98gAaMKFiAD2dk1AspWZpXsm6MsNj00LJg31vbv:" \
  -d amount=10000 \
  -d currency=usd \
  -d payment_method=pm_card_visa \
  -d confirm=true \
  -d return_url="https://your-redirect-url.com"


curl https://api.stripe.com/v1/transfers \
  -u "sk_test_51Nxyj1JiRcfe15ltseGsBSVCcWzsAMVseHXaoJVowZxDNIgpFY7rqoVPGso98gAaMKFiAD2dk1AspWZpXsm6MsNj00LJg31vbv:" \
  -d amount=7000 \
  -d currency=usd \
  -d source_transaction="ch_3OC80eJiRcfe15lt0uA9eQmW" \
  -d destination="acct_1OBstLQpzpp1vjpb"
