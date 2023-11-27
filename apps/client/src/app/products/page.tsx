// frontend/src/app/project-files/page.tsx
import 'server-only';
import ProductsGrid from '../../components/products-grid';

async function getProducts() {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default async function ProductsPage() {
  const res = await getProducts();
  const products = res.data;

  return (
    <div>
      <h1>Projects Page</h1>

      <ProductsGrid products={products} />
    </div>
  );
}
