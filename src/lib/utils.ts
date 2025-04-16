import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
  ?{
    name: value.name,
    type: value.type,
    size: value.size,
    lastModified: value.lastModified,
  }
  : value;
}