import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputFieldLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  htmlFor: string;
  className?: string;
  hasContent: boolean;
}

const InputFieldLabel: FC<InputFieldLabelProps> = ({
  children,
  htmlFor,
  hasContent,
  className,
}) => {
  const baseClasses =
    'mx-2 px-2 absolute duration-300 bg-transparent left-0 transition-all text-gray-500';
  const hasContentClasses = 'text-sm -top-2';
  const noContentClasses =
    'text-base top-2 group-focus-within:-top-2 group-focus-within:text-sm';
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        baseClasses,
        clsx(hasContent ? hasContentClasses : noContentClasses),
        className
      )}
    >
      {children}
    </label>
  );
};

export default InputFieldLabel;
