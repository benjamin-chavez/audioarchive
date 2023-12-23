// 'use client';

// import * as React from 'react';
// import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
// import { CheckIcon } from '@radix-ui/react-icons';

// import { cn } from '@/lib/utils';

// const Checkbox = React.forwardRef<
//   React.ElementRef<typeof CheckboxPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
// >(({ className, ...props }, ref) => (
//   <>
//     <div className="flex h-6 items-center">
//       <input
//         id="comments"
//         aria-describedby="comments-description"
//         name="comments"
//         type="checkbox"
//         className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//       />
//     </div>
//     <CheckboxPrimitive.Root
//       ref={ref}
//       className={cn(
//         'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground bg-red-500',
//         className,
//       )}
//       {...props}
//     >
//       <CheckboxPrimitive.Indicator
//         className={cn('flex items-center justify-center text-current')}
//       >
//         {/* <CheckIcon className="h-4 w-4" /> */}
//       </CheckboxPrimitive.Indicator>
//     </CheckboxPrimitive.Root>
//   </>
// ));
// Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// // export { Checkbox };
// const Checkbox = React.forwardRef<
//   React.ElementRef<typeof CheckboxPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
// >(({ className, ...props }, ref) => (
//   <>
//     <CheckboxPrimitive.Root
//       ref={ref}
//       className={cn(
//         'peer shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
//         'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
//         'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600',
//         className,
//       )}
//       {...props}
//     >
//       {/* <CheckboxPrimitive.Indicator
//         className={cn('flex items-center justify-center text-current')}
//       >
//         <CheckIcon className="h-4 w-4" />
//       </CheckboxPrimitive.Indicator> */}
//     </CheckboxPrimitive.Root>
//   </>
// ));
// Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// export { Checkbox };

// import React from 'react';
// import * as CheckboxPrim from '@radix-ui/react-checkbox';
// import { CheckIcon } from '@radix-ui/react-icons';

// const Checkbox = () => (
//   <form>
//     <div className="flex items-center">
//       <CheckboxPrim.Root
//         className="shadow-blackA4 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
//         defaultChecked
//         id="c1"
//       >
//         <CheckboxPrim.Indicator className="text-violet11">
//           <CheckIcon />
//           <svg viewBox="0 0 18 18" aria-hidden="true">
//             <polyline points="1 9 7 14 15 4" />
//           </svg>
//         </CheckboxPrim.Indicator>
//       </CheckboxPrim.Root>
//       {/* <label
//         className="pl-[15px] text-[15px] leading-none text-white"
//         htmlFor="c1"
//       >
//         Accept terms and conditions.
//       </label> */}

//       <div className="flex h-6 items-center">
//         <input
//           id="comments"
//           aria-describedby="comments-description"
//           name="comments"
//           type="checkbox"
//           // className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//         />
//       </div>
//     </div>
//   </form>
// );

// export { Checkbox };
// import { Checkbox as Check } from 'react-aria-components';
import { Checkbox } from 'react-aria-components';
import type { CheckboxProps } from 'react-aria-components';
import './checkbox.css';

export function MyCheckbox({ children, ...props }: CheckboxProps) {
  return (
    <Checkbox {...props}>
      {({ isIndeterminate }) => (
        <>
          <div className="checkbox">
            <svg viewBox="0 0 18 18" aria-hidden="true">
              {isIndeterminate ? (
                <rect x={1} y={7.5} width={15} height={3} />
              ) : (
                <polyline points="1 9 7 14 15 4" />
              )}
            </svg>
          </div>
          {children}
        </>
      )}
    </Checkbox>
  );
}
