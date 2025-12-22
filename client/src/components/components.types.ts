import type { JSX, HTMLProps } from "react";

export type RoomProps = {
  setMode: React.Dispatch<React.SetStateAction<string | null>>;
};

export type UserResponse = {
  type: "chat" | "join";
  payload: {
    message?: string;
    roomId?: string;
  };
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  icon?: JSX.Element;
  className?: HTMLProps<HTMLElement>["className"];
};
