import createClient from 'openapi-fetch';
import qs from 'qs';

import { paths } from '@/types/strapi';

const client = createClient<paths>({
  baseUrl:
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api` || 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
  },
  querySerializer(params) {
    // console.log('qs', params, qs.stringify(params));
    return qs.stringify(params, { encodeValuesOnly: true });
  },
});

export async function fetchStrapi(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const maxAttempts = 5;
  let lastError: unknown;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const response = await fetch(input, {
        ...init,
        signal: AbortSignal.timeout(30_000),
      });

      if (![408, 429].includes(response.status) && response.status < 500) {
        return response;
      }

      if (attempt === maxAttempts - 1) return response;
      await new Promise((resolve) => setTimeout(resolve, 1_000 * 2 ** attempt));
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1_000 * 2 ** attempt));
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('Strapi is unavailable');
}

export { client };
