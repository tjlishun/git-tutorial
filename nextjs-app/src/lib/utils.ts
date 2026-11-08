import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并 className
 * clsx 负责条件类名，twMerge 负责处理 Tailwind 类名冲突
 * 例：cn("px-2", "px-4") → "px-4"（后者覆盖前者）
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
