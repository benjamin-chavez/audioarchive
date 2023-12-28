// apps/client/src/app/(browse)/products/config.ts

import {
  DAW_ENUM_VALUES,
  GENRE_ENUM_VALUES,
  STANDARD_KEYS_ENUM_VALUES,
} from '@shared/src';
import { normalize, schema } from 'normalizr';

// TODO: Consider changing the name of the `value` key to `id`?

export const sortOptions = {
  sort_by: [
    { value: 'pop', name: 'Most Popular', current: false },
    // { name: 'Best Rating',  current: false },
    // { name: 'Newest',  current: false },
    { value: 'pr_lh', name: 'Price: Low to High', current: false },
    { value: 'pr_hl', name: 'Price: High to Low', current: false },
  ],
};

// export const activeFilters = [{ value: 'objects', label: 'Objects' }];
export const products = [
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

export type FilterItem = {
  id: string;
  label: string;
  checked: boolean;
};

export type FiltersByCategory = Record<string, FilterItem[]>;

export const filters: FiltersByCategory = {
  genre: [
    {
      id: 'bass_house',
      label: 'Bass House',
      checked: false,
    },
    {
      id: 'breakbeat',
      label: 'Breakbeat',
      checked: false,
    },
    {
      id: 'breaks',
      label: 'Breaks',
      checked: false,
    },
    {
      id: 'deep house',
      label: 'Deep House',
      checked: false,
    },
    {
      id: 'uk bass',
      label: 'UK Bass',
      checked: false,
    },
    {
      id: 'dubstep',
      label: 'Dubstep',
      checked: false,
    },
    {
      id: 'house',
      label: 'House',
      checked: false,
    },
    {
      id: 'pop',
      label: 'Pop',
      checked: false,
    },
    {
      id: 'techno',
      label: 'Techno',
      checked: false,
    },
    {
      id: 'trap',
      label: 'Trap',
      checked: false,
    },
  ],
  // Key: [
  //   {
  //     id: 'b_major',
  //     label: 'B Major',
  //     checked: false,
  //   },
  //   {
  //     id: 'f♯/g♭_major',
  //     label: 'F♯/G♭ Major',
  //     checked: false,
  //   },
  //   {
  //     id: 'd♭_major',
  //     label: 'D♭ Major',
  //     checked: false,
  //   },
  //   {
  //     id: 'a♭_major',
  //     label: 'A♭ Major',
  //     checked: false,
  //   },
  //   {
  //     id: 'e♭_major',
  //     label: 'E♭ Major',
  //     checked: false,
  //   },
  //   {
  //     id: 'b♭_major',
  //     label: 'B♭ Major',
  //     checked: false,
  //   },
  //   {
  //     id: 'f_major',
  //     label: 'F Major',
  //     checked: false,
  //   },
  //   {
  //     id: 'c_major',
  //     label: 'C Major',
  //     checked: false,
  //   },
  //   {
  //     id: 'g_major',
  //     label: 'G Major',
  //     checked: false,
  //   },
  //   {
  //     id: 'd_major',
  //     label: 'D Major',
  //     checked: false,
  //   },
  //   {
  //     id: 'a_major',
  //     label: 'A Major',
  //     checked: false,
  //   },
  //   {
  //     id: 'e_major',
  //     label: 'E Major',
  //     checked: false,
  //   },
  //   {
  //     id: 'a♭_minor',
  //     label: 'A♭ Minor',
  //     checked: false,
  //   },
  //   {
  //     id: 'e♭_minor',
  //     label: 'E♭ Minor',
  //     checked: false,
  //   },
  //   {
  //     id: 'b♭_minor',
  //     label: 'B♭ Minor',
  //     checked: false,
  //   },
  //   {
  //     id: 'f_minor',
  //     label: 'F Minor',
  //     checked: false,
  //   },
  //   {
  //     id: 'c_minor',
  //     label: 'C Minor',
  //     checked: false,
  //   },
  //   {
  //     id: 'g_minor',
  //     label: 'G Minor',
  //     checked: false,
  //   },
  //   {
  //     id: 'd_minor',
  //     label: 'D Minor',
  //     checked: false,
  //   },
  //   {
  //     id: 'a_minor',
  //     label: 'A Minor',
  //     checked: false,
  //   },
  //   {
  //     id: 'e_minor',
  //     label: 'E Minor',
  //     checked: false,
  //   },
  //   {
  //     id: 'b_minor',
  //     label: 'B Minor',
  //     checked: false,
  //   },
  //   {
  //     id: 'f♯/g♭_minor',
  //     label: 'F♯/G♭ Minor',
  //     checked: false,
  //   },
  //   {
  //     id: 'd♭_minor',
  //     label: 'D♭ Minor',
  //     checked: false,
  //   },
  // ],
  DAW: [
    { id: 'ableton', label: 'Ableton', checked: false },
    { id: "fl_studio'", label: 'FL Studio', checked: false },
    { id: 'logic', label: 'Logic', checked: false },
    { id: 'bitwig', label: 'Bitwig', checked: false },
  ],
};

const SelectedFiltersByCategory: FiltersByCategory = {};

const filter = new schema.Entity('filters');

export const updateFilters = (
  filters: FilterItem[],
  id: string,
  updates: Partial<FilterItem>,
) => {
  return filters.map((filter) => {
    if (filter.id === id) return { ...filter, ...updates };
    return filter;
  });
};

export const getInitialFilters = () => {
  return filters;
};
