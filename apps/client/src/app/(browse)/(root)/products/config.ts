// apps/client/src/app/(browse)/products/config.ts

import {
  DAW_ENUM_VALUES,
  GENRE_ENUM_VALUES,
  STANDARD_KEYS_ENUM_VALUES,
} from '@shared/src';

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

export const filters1 = [
  {
    id: 'genre_name',
    name: 'Genre',
    options: GENRE_ENUM_VALUES.map((genre) => ({
      value: genre.toLowerCase(),
      label: genre,
      checked: false,
    })),
  },
  {
    id: 'BPM',
    name: 'BPM',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'Key',
    name: 'Key',
    options: STANDARD_KEYS_ENUM_VALUES.map((key) => ({
      value: key,
      label: key,
      checked: false,
    })),
  },
  {
    id: 'DAW',
    name: 'DAW',
    options: DAW_ENUM_VALUES.map((daw) => ({
      value: daw,
      label: daw,
      checked: false,
    })),
  },
];

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

export const filters = {
  genre_name: {
    name: 'Genre',
    options: {
      'bass house': {
        label: 'Bass House',
        checked: false,
      },
      breakbeat: {
        label: 'Breakbeat',
        checked: false,
      },
      breaks: {
        label: 'Breaks',
        checked: false,
      },
      'deep house': {
        label: 'Deep House',
        checked: false,
      },
      'uk bass': {
        label: 'UK Bass',
        checked: false,
      },
      dubstep: {
        label: 'dubstep',
        checked: false,
      },
      house: {
        label: 'House',
        checked: false,
      },
      pop: {
        label: 'Pop',
        checked: false,
      },
      techno: {
        label: 'Techno',
        checked: false,
      },
      trap: {
        label: 'Trap',
        checked: false,
      },
    },
  },
  BPM: {
    name: 'BPM',
    options: {
      white: {
        label: 'White',
        checked: false,
      },
      beige: {
        label: 'Beige',
        checked: false,
      },
      blue: {
        label: 'Blue',
        checked: false,
      },
      brown: {
        label: 'Brown',
        checked: false,
      },
      green: {
        label: 'Green',
        checked: false,
      },
      purple: {
        label: 'Purple',
        checked: false,
      },
    },
  },
  Key: {
    name: 'Key',
    options: {
      'B Major': {
        label: 'B Major',
        checked: false,
      },
      'F♯/G♭ Major': {
        label: 'F♯/G♭ Major',
        checked: false,
      },
      'D♭ Major': {
        label: 'D♭ Major',
        checked: false,
      },
      'A♭ Major': {
        label: 'A♭ Major',
        checked: false,
      },
      'E♭ Major': {
        label: 'E♭ Major',
        checked: false,
      },
      'B♭ Major': {
        label: 'B♭ Major',
        checked: false,
      },
      'F Major': {
        label: 'F Major',
        checked: false,
      },
      'C Major': {
        label: 'C Major',
        checked: false,
      },
      'G Major': {
        label: 'G Major',
        checked: false,
      },
      'D Major': {
        label: 'D Major',
        checked: false,
      },
      'A Major': {
        label: 'A Major',
        checked: false,
      },
      'E Major': {
        label: 'E Major',
        checked: false,
      },
      'A♭ Minor': {
        label: 'A♭ Minor',
        checked: false,
      },
      'E♭ Minor': {
        label: 'E♭ Minor',
        checked: false,
      },
      'B♭ Minor': {
        label: 'B♭ Minor',
        checked: false,
      },
      'F Minor': {
        label: 'F Minor',
        checked: false,
      },
      'C Minor': {
        label: 'C Minor',
        checked: false,
      },
      'G Minor': {
        label: 'G Minor',
        checked: false,
      },
      'D Minor': {
        label: 'D Minor',
        checked: false,
      },
      'A Minor': {
        label: 'A Minor',
        checked: false,
      },
      'E Minor': {
        label: 'E Minor',
        checked: false,
      },
      'B Minor': {
        label: 'B Minor',
        checked: false,
      },
      'F♯/G♭ Minor': {
        label: 'F♯/G♭ Minor',
        checked: false,
      },
      'D♭ Minor': {
        label: 'D♭ Minor',
        checked: false,
      },
    },
  },
  DAW: {
    name: 'DAW',
    options: {
      Ableton: {
        label: 'Ableton',
        checked: false,
      },
      'FL Studio': {
        label: 'FL Studio',
        checked: false,
      },
      Logic: {
        label: 'Logic',
        checked: false,
      },
      Bitwig: {
        label: 'Bitwig',
        checked: false,
      },
    },
  },
};
