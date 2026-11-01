const FORWARDED_RESPONSE_HEADERS = [
  'accept-ranges',
  'content-range',
  'content-type',
  'last-modified',
];

export async function proxyH5PFile({
  request,
  upstreamUrl,
  fetchImpl = fetch,
  cacheControl,
  cacheTags = [],
}) {
  // Node's fetch transparently decompresses Brotli/gzip responses. Ask R2
  // for identity bytes and avoid forwarding representation headers that may no
  // longer describe the body returned by fetch.
  const requestHeaders = new Headers({
    Accept: '*/*',
    'Accept-Encoding': 'identity',
  });
  const range = request.headers.get('range');
  if (range) requestHeaders.set('Range', range);

  const cacheOptions = range
    ? { cache: 'no-store' }
    : { cache: 'force-cache', next: { tags: cacheTags } };
  const upstream = await fetchImpl(upstreamUrl, {
    headers: requestHeaders,
    ...cacheOptions,
  });
  const responseHeaders = new Headers();
  for (const name of FORWARDED_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  responseHeaders.set('Cache-Control', upstream.ok ? cacheControl : 'no-store');

  return new Response(upstream.body, {
    headers: responseHeaders,
    status: upstream.status,
    statusText: upstream.statusText,
  });
}
