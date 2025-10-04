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

export { client };
