import { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

const Heading = ({ children, className }: HeadingProps) => {
  return (
    <h1 className={cn(`mt-2 mb-5 text-4xl font-semibold`, className)}>
      {children}
    </h1>
  );
};

export default Heading;
