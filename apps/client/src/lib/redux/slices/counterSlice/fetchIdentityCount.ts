// // apps/client/src/lib/redux/slices/counterSlice/fetchIdentityCount.ts

// const URL = 'http://localhost:3001/api/identity-count';

// export const fetchIdentityCount = async (
//   amount = 1,
// ): Promise<{ data: number }> => {
//   const response = await fetch(URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ amount }),
//   });

//   const result = await response.json();

//   return result;
// };
