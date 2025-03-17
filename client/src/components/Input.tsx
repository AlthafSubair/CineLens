import { forwardRef } from 'react';

interface InputProps {
  type: string;
  placeholder: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ type, placeholder, ...rest }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className="w-full h-10 text-slate-600 dark:text-slate-300 p-4 rounded-md ring-0 focus:outline-none focus:ring-2 dark:focus:ring-[#f38c1d] focus:ring-[#229df2] border border-gray-300 dark:border-slate-600  dark:bg-[#37373e]"
      placeholder={placeholder}
      {...rest}
    />
  );
});

export default Input;
