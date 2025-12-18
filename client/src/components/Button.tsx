import type { HTMLProps, JSX } from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  icon?: JSX.Element;
  className?: HTMLProps<HTMLElement>["className"];
};

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={` w-full font-semibold py-4 px-6 rounded-lg transition-all  hover:scale-105 active:scale-95  flex items-center  gap-3 justify-center ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

// w-full bg-white text-black font-semibold py-4 px-6 rounded-lg hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
//           >

// w-full bg-zinc-900 text-white font-semibold py-4 px-6 rounded-lg hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 border border-zinc-800 flex items-center justify-center gap-3
