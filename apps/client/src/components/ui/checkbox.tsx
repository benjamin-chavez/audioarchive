// packages/ui/Checkbox.tsx

export function Checkbox({
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
  // const [checked, setChecked] = useState(defaultChecked);
  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    // Call the onCheck prop with the new checked state
    onCheck?.(event.currentTarget.checked);
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
          defaultValue={defaultValue}
          type="checkbox"
          defaultChecked={defaultChecked}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          onClick={handleClick}
          // checked={checked}
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
