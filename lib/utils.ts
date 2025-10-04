import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getImageUrl = (url: string): string => {
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};
