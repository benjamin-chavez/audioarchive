// // apps/client/src/contexts/appUserContext.ts

// import { getMe } from '@/lib/data/me';
// import { useQuery } from '@tanstack/react-query';
// import { createContext, useContext } from 'react';

// const MeContext = createContext<any>(null);

// export const useMe = () => useContext(MeContext);

// export const MeProvider = ({ children }) => {
//   const {
//     data: me,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ['me'],
//     queryFn: getMe,
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching user data</div>;
//   }

//   <MeContext.Provider value={{ me, isLoading, error }}>
//     {children}
//   </MeContext.Provider>;
// };
