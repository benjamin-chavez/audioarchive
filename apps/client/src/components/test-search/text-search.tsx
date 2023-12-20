'use client';

// require('@tailwindcss/forms'),
// require('@tailwindcss/aspect-ratio'),

// import Container from '../container';
// import AlternateNav from './alternate-nav';
import FilterComponent from './filter-component';
import Inner from './inner';

const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt:
      'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt:
      'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt:
      'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 5,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt:
      'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 6,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt:
      'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 7,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt:
      'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 8,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
];

export default function TestSearch({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      // bg-gray-50
      className=" w-full"
    >
      {/* <AlternateNav /> */}

      <div>
        <main>
          {/* Product grid */}
          <div
          //  className="flex "
          >
            {/* <Inner /> */}
            <div>
              <div
                className="bg-white"
                // className="bg-red-500"
              >
                <div
                  // TODO: SET UP AS CONTAINER COMPONENT
                  // max-w-7xl
                  className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
                >
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Workspace sale
                  </h1>
                  <p className="mt-4 max-w-xl text-sm text-gray-700">
                    Our thoughtfully designed workspace objects are crafted in
                    limited runs. Improve your productivity and organization
                    with these sale items before we run out.
                  </p>
                </div>
              </div>
              <FilterComponent />
              <section
                aria-labelledby="products-heading"
                //  bg-orange-600/10
                // max-w-2xl
                // lg:max-w-7xl
                // lg:px-8
                // sm:px-6
                // px-4
                // mx-auto
                className="items-center justify-center pb-16 pt-12  sm:pb-24 sm:pt-16 flex w-full "
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                {children}
                {/*
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {products.map((product) => (
                    <a key={product.id} href={product.href} className="group">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {product.price}
                      </p>
                    </a>
                  ))}
                </div> */}
              </section>
            </div>
          </div>
        </main>
        {/* <main>
          <div className="flex">
            ////<Inner />
            <div
            // bg-blue-800
            // className=" w-[85%]"
            >
              <Container>
                ////<p>products</p>
                {children}
              </Container>
            </div>
          </div>
        </main> */}
      </div>
    </div>
  );
}
