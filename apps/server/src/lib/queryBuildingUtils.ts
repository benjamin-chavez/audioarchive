// apps/server/src/lib/queryBuildingUtils.ts

export const VALID_PRODUCT_FILTERS = [
  'genre_name',
  'daw',
  'key',
  'price',
  'bpm',
];

export function processFilters(filters) {
  if (!filters) {
    return {};
  }

  let processedFilters = Object.entries(filters).forEach(([key, val]) => {
    // TODO: potentially set up the `VALID_PRODUCT_FILTERS` array to update automatically based on ts types or something

    if (!VALID_PRODUCT_FILTERS.includes(key)) {
      // return res.status(400).json({ message: `Invalid filter: ${key}` });
      // TODO: fix this error handling
      return;
    }

    // TODO: Add additional type checking/validation on query params

    processedFilters[key] = val;
  });

  return processedFilters;
}

export function processSearchQuery(q) {
  if (!q) {
    return '';
  }

  const sanitizedQuery = q.replace(/[^\w\s]/gi, '');
  const formatedQuery = sanitizedQuery.split(' ').filter(Boolean).join(' | ');

  return formatedQuery;
}

export function processSort(sort) {
  if (typeof sort !== 'string') {
    return ['', 'ASC'];
  }

  const [sortBy, sortOrder] = sort.split('__');

  return [sortBy, sortOrder === 'desc' ? 'DESC' : 'ASC'];
}

export function processLimit(limit) {
  if (!limit) {
    return 10;
    // return;
  }

  return parseInt(limit, 10);
}

export function processOffset(page, limitPerPage) {
  // return;
  const pageNumber = parseInt(page, 10) || 0;
  const offset = (pageNumber - 1) * limitPerPage;

  return offset;
}
