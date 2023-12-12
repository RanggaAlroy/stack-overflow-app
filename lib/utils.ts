import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from 'date-fns';
import qs from 'query-string';
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";


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

export const getJoinedDate = (date: Date): string => {
  // Check if the date is a valid Date object
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }

  // Extract the month and year from the Date object
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // Create the joined date string (e.g., "September 2023")
  const joinedDate = `Joined ${month} ${year}`;

  return joinedDate;
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null; 
}

export const formUrlQuery = ({ params, key, value}: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  },
  { skipNull: true});
}

interface removeKeysParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({ params, keysToRemove}: removeKeysParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
})

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  },
  { skipNull: true});
}

interface BadgeParams {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[]
}

export const assignBadges = (params: BadgeParams) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  }

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level: any) => {
      if(count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] +=1 ;
      }
    })
  })

  return badgeCounts;
}