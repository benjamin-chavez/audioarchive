import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button style={{ backgroundColor: '#00ffff' }} {...rest}>
      {children}
    </button>
  );
};
