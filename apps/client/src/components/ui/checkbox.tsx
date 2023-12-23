// packages/ui/Checkbox.tsx
import * as Checkboxx from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
function Checkbox({
  id,
  name,
  defaultValue,
  defaultChecked,
  onCheck,
  children,
}: {
  id: any;
  name: any;
  defaultValue: any;
  defaultChecked: any;
  onCheck?: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    //   setCheckked(!checkked);
    //   console.log('checkked', checkked);
    //   // Call the onCheck prop with the new checked state
    //   onCheck?.(event.currentTarget.checked);
    // };
    const newChecked = event.target.checked;
    setChecked(newChecked);
    onCheck?.(newChecked);
  };

  return (
    <>
      <div
        // relative
        className="flex items-center"
      >
        <input
          id={id}
          name={name}
          // defaultValue={defaultValue}
          type="checkbox"
          // defaultChecked={checkked}
          checked={checked}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          onChange={handleClick}
          // checked={checkked}
        />
        <label
          htmlFor={id}
          className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
        >
          {children}
        </label>
      </div>
    </>
  );
}
export { Checkbox };
