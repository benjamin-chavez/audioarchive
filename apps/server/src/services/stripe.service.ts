// apps/server/src/services/stripe.service.ts

import { Product } from '@shared/src/schemas';
// import { convertDollarsToCents } from '../lib/utils';

import Stripe from 'stripe';
// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export function convertDollarsToCents(price: number) {
  // const priceInCents = Math.round(price * 100);
  // return priceInCents;
  return Math.round(price * 100);
}

class StripeService {
  // static async createProduct(product: Omit<Product, 'id' | 'tripeProductId'>) {
  static async createProduct(product: Partial<Product>) {
    // TODO: Error handling

    // TODO: First check if product exists before creating it

    const stripeProduct = await stripe.products.create({
      // @ts-ignore
      name: product.name,
      // description: product.description,
      // images: [product.s3SignedUrl],
      url: `http://localhost:3000/${product.id}`,
      images: [
        'https://audio-archive-initial-dev-setup.s3.us-east-2.amazonaws.com/amin-chavez-Booty-seed.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVMDFJ6IXT3NLKUL4%2F20231114%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231114T161119Z&X-Amz-Expires=86400&X-Amz-Signature=6009ac3237446c1493797522009550612e6be18633bd201f860fe2723c1a984c&X-Amz-SignedHeaders=host&x-id=GetObject',
      ],
      metadata: {
        // appProductId: product.id,
        // @ts-ignore
        app_product_id: product.id,
      },
    });
    console.log('stripeProduct', stripeProduct);

    await this.createPrice(product, stripeProduct.id);

    return stripeProduct.id;
  }

  static async createPrice(
    // product: Omit<Product, 'id'>,
    product: Partial<Product>,
    stripeProductId: string
  ) {
    // TODO: Error handling
    // @ts-ignore
    const priceInCents = convertDollarsToCents(product.price);
    const stripePrice = await stripe.prices.create({
      product: stripeProductId,
      unit_amount: priceInCents,
      currency: 'usd',
    });

    return stripePrice;
  }

  static async getProducts() {
    // TODO: Error handling
    const stripeProducts = await stripe.products.list({});

    return stripeProducts;
  }

  // static async getOrCreateProduct() {}

  static async deleteProduct(product: Product) {
    // TODO: Error handling
    // TODO: Delete associated prices
    const deletedProduct = await stripe.products.del(product.stripeProductId);

    return deletedProduct;
  }
}

export default StripeService;
