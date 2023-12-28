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

export const sortOptions = {
  sort_by: [
    { id: 'most_popular', name: 'Most Popular', current: false },
    { id: 'price:low_to_high', name: 'Price: Low to High', current: false },
    { id: 'price:high_to_low', name: 'Price: High to Low', current: false },
  ],
};

let data = {
  filters: {
    genres: ['bass_house', 'dubstep', 'techno'],
    // bpmRange: {
    //   id: 'bpmRange',
    //   min: 0,
    //   max: 1000,
    // },
    bpmRange: ['0', '1000'],
    daws: ['Ableton', 'Bitwig', 'FL_Studio', 'Logic'],
  },
};

export const modifyData = (dataFilters) => {
  // console.log('dataFilters.filters:', dataFilters.filters);
  if (dataFilters) {
    const modifiedData = Object.keys(dataFilters).map((key) => {
      return {
        id: key,
        name: key.toUpperCase(),
        options: dataFilters[key]?.map((option) => {
          if (option === null) {
            return {
              id: null,
              label: 'Other',
              checked: false,
            };
          }
          return {
            id: option.toLowerCase(),
            label: option.toUpperCase().replace('_', ' '),
            checked: false,
          };
        }),
      };
    });

    return modifiedData;
  }
};

export const newCategoriesData_OPTION1 = Object.keys(data.filters)
  .filter((key) => Array.isArray(data.filters[key]))
  .map((key) => {
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
  });

const bpmRangeEntity = new schema.Entity('bpmRange');
const option_OPTION1 = new schema.Entity('options');
export const category_OPTION1 = new schema.Entity('categories', {
  options: [option_OPTION1],
});

// newCategoriesData_OPTION1.push(data.filters.bpmRange);

export const normalizedData_OPTION1 = normalize(newCategoriesData_OPTION1, [
  category_OPTION1,
]);

// /////////////////

// let categories_OPTION2 = Object.keys(data.filters).map((category) => {
//   return { id: category, name: category.toUpperCase() };
// });

// const options = Object.entries(data.filters).flatMap(([category, options]) => {
//   return options.map((option) => {
//     return {
//       id: option,
//       categoryId: category,
//       label: option.toUpperCase(),
//       checked: false,
//     };
//   });
// });

// const option_OPTION2 = new schema.Entity('options');

// export const category_OPTION2 = new schema.Entity('categories', {
//   options: [option_OPTION2],
// });

// let categoryOptionsMap_OPTION2 = options.reduce((acc, option) => {
//   if (!acc[option.categoryId]) {
//     acc[option.categoryId] = [];
//   }
//   acc[option.categoryId].push(option);
//   return acc;
// }, {});

// export const normalizedCategories_OPTION2 = categories_OPTION2.map(
//   (category) => ({
//     ...category,
//     options: categoryOptionsMap_OPTION2[category.id] || [],
//   }),
// );

// export const normalizedData_OPTION2 = normalize(normalizedCategories_OPTION2, [
//   category_OPTION2,
// ]);
