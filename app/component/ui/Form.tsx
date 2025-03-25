import * as React from "react";

export function Form({ children, ...props }: React.HTMLProps<HTMLFormElement>) {
  return <form {...props} className="space-y-4">{children}</form>;
}
