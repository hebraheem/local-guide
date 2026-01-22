"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  appName: string;
  mode: "primary" | "secondary";
  handleClick?: () => void;
  className?: string;
  isloading?: string;
}

export const Button = ({
  children,
  className,
  appName,
  handleClick,
  mode,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonProps) => {
  const classname = {
    primary: "bg-primary-600 text-primary-100 hover:bg-primary-700",
    secondary: "bg-secondary-500 text-primary-100 hover:bg-secondary-600",
  }[mode];

  className += ` ${classname}`;
  return (
    <button
      id={`${appName}-button`}
      className={className}
      onClick={handleClick && handleClick}
      {...props}
    >
      {children} {props.disabled && props.isloading==="true" ? "..." : ""}
    </button>
  );
};
