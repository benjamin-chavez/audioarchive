// apps/client/src/lib/normalize.ts

import { normalize, schema } from 'normalizr';
// const categories = [
//   {
//     id: 'genre',
//     name: 'Genre',
//     options: [
//       { id: 'bass_house', label: 'Bass House', checked: false },
//       { id: 'dubstep', label: 'Dubstep', checked: false },
//       { id: 'techno', label: 'Techno', checked: false },
//     ],
//   },
//   {
//     id: 'daw',
//     name: 'DAW',
//     options: [
//       { id: 'ableton', label: 'Ableton', checked: false },
//       { id: "fl_studio'", label: 'FL Studio', checked: false },
//       { id: 'logic', label: 'Logic', checked: false },
//     ],
//   },
// ];

let data = {
  filters: {
    genres: ['bass_house', 'dubstep', 'techno'],
    daws: ['Ableton', 'Bitwig', 'FL_Studio', 'Logic'],
  },
};

export const newCategoriesData_OPTION1 = Object.keys(data.filters).map(
  (key) => {
    return {
      id: key,
      name: key.toUpperCase(),
      options: data.filters[key].map((option) => {
        return {
          id: option.toLowerCase(),
          label: option.toUpperCase().replace('_', ' '),
          checked: false,
        };
      }),
    };
  },
);

const option_OPTION1 = new schema.Entity('options');

export const category_OPTION1 = new schema.Entity('categories', {
  options: [option_OPTION1],
});

export const normalizedData_OPTION1 = normalize(newCategoriesData_OPTION1, [
  category_OPTION1,
]);

// /////////////////

let categories_OPTION2 = Object.keys(data.filters).map((category) => {
  return { id: category, name: category.toUpperCase() };
});

const options = Object.entries(data.filters).flatMap(([category, options]) => {
  return options.map((option) => {
    return {
      id: option,
      categoryId: category,
      label: option.toUpperCase(),
      checked: false,
    };
  });
});

const option_OPTION2 = new schema.Entity('options');

export const category_OPTION2 = new schema.Entity('categories', {
  options: [option_OPTION2],
});

let categoryOptionsMap_OPTION2 = options.reduce((acc, option) => {
  if (!acc[option.categoryId]) {
    acc[option.categoryId] = [];
  }
  acc[option.categoryId].push(option);
  return acc;
}, {});

export const normalizedCategories_OPTION2 = categories_OPTION2.map(
  (category) => ({
    ...category,
    options: categoryOptionsMap_OPTION2[category.id] || [],
  }),
);

export const normalizedData_OPTION2 = normalize(normalizedCategories_OPTION2, [
  category_OPTION2,
]);
