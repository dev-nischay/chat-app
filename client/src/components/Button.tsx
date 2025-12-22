import type { ButtonProps } from "./components.types";

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
