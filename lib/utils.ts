import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function getStrapiMediaUrl(url?: string) {
  if (url?.startsWith('http')) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}
