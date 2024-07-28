import React, { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export function Container({ className, children }: Props) {
  return (
    <div
      className={`max-w-screen-xl w-full mx-auto md:px-20 px-2.5 h-full ${className}`}
    >
      {children}
    </div>
  );
}
