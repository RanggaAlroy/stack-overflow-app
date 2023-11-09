import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from 'date-fns';
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(number: number): string {
  if (number < 1000) {
    return number.toString();
  } else if (number >= 1000 && number < 1_000_000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return (number / 1_000_000).toFixed(1) + 'M';
  }
}


export function getTimeStamp(date: Date): string {
  const distance = formatDistanceToNow(date, {
    addSuffix: true,
    includeSeconds: false,
  });
  return distance;
};
