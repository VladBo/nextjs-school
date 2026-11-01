const FORWARDED_RESPONSE_HEADERS = [
  'accept-ranges',
  'content-length',
  'content-range',
  'content-type',
  'etag',
  'last-modified',
];

export async function proxyH5PFile({
  request,
  upstreamUrl,
  fetchImpl = fetch,
  cacheControl,
}) {
  const requestHeaders = new Headers({ Accept: '*/*' });
  const range = request.headers.get('range');
  if (range) requestHeaders.set('Range', range);

  const upstream = await fetchImpl(upstreamUrl, { headers: requestHeaders });
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
