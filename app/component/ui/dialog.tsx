"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface DialogProps extends React.ComponentProps<typeof DialogPrimitive.Root> {
  children: React.ReactNode;
}

export function Dialog({ children, ...props }: DialogProps) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

interface DialogContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  className?: string;
  children: React.ReactNode;
}

export function DialogContent({ children, className, ...props }: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <DialogPrimitive.Content className={cn("fixed inset-0 m-auto bg-white p-6 rounded-lg shadow-lg", className)} {...props}>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

interface DialogHeaderProps {
  children: React.ReactNode;
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: DialogHeaderProps) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

export function DialogDescription({ children }: DialogHeaderProps) {
  return <p className="text-gray-500">{children}</p>;
}
