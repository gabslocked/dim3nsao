import { cn } from "@/lib/utils";
import React from "react";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 32"
      className={cn(className)}
      {...props}
    >
      <text
        x="0"
        y="25"
        fontFamily="Orbitron, sans-serif"
        fontSize="28"
        fontWeight="900"
        fill="hsl(var(--foreground))"
      >
        DIM
        <tspan fill="hsl(var(--primary))">3</tspan>
        NSÃO
      </text>
    </svg>
  );
}
