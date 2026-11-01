const assert = require('node:assert/strict');
const test = require('node:test');

async function loadProxy() {
  return import('./h5p-proxy.mjs');
}

function streamFrom(chunks) {
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks)
        controller.enqueue(new TextEncoder().encode(chunk));
      controller.close();
    },
  });
}

test('forwards range requests and streams partial video responses without buffering', async () => {
  const { proxyH5PFile } = await loadProxy();
  const request = new Request('https://school.example/api/h5p/42/video.mp4', {
    headers: { Range: 'bytes=0-3' },
  });
  const upstreamBody = streamFrom(['data']);
  let receivedRequest;

  const response = await proxyH5PFile({
    cacheControl: 'public, max-age=0, s-maxage=60, stale-while-revalidate=300',
    cacheTags: ['h5p-content-42'],
    fetchImpl: async (_url, options) => {
      receivedRequest = options;
      return new Response(upstreamBody, {
        headers: {
          'Accept-Ranges': 'bytes',
          'Content-Length': '4',
          'Content-Encoding': 'br',
          'Content-Range': 'bytes 0-3/10',
          'Content-Type': 'video/mp4',
          ETag: '"video-v1"',
          'X-Upstream-Secret': 'must-not-leak',
        },
        status: 206,
      });
    },
    request,
    upstreamUrl: 'https://strapi.example/api/h5p/content/42/video.mp4',
  });

  assert.equal(receivedRequest.headers.get('range'), 'bytes=0-3');
  assert.equal(receivedRequest.headers.get('accept-encoding'), 'identity');
  assert.equal(receivedRequest.cache, 'no-store');
  assert.equal(receivedRequest.next, undefined);
  assert.equal(response.status, 206);
  assert.equal(response.headers.get('Content-Type'), 'video/mp4');
  assert.equal(response.headers.get('Content-Length'), null);
  assert.equal(response.headers.get('Content-Encoding'), null);
  assert.equal(response.headers.get('Content-Range'), 'bytes 0-3/10');
  assert.equal(response.headers.get('Accept-Ranges'), 'bytes');
  assert.equal(response.headers.get('ETag'), null);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(response.headers.get('X-Upstream-Secret'), null);
  assert.equal(await response.text(), 'data');
});

test('preserves 200 responses and assigns immutable caching to library files', async () => {
  const { proxyH5PFile } = await loadProxy();
  let receivedRequest;
  const response = await proxyH5PFile({
    cacheControl: 'public, max-age=31536000, immutable',
    fetchImpl: async (_url, options) => {
      receivedRequest = options;
      return new Response(streamFrom(['library']), {
        headers: { 'Content-Type': 'application/javascript' },
        status: 200,
      });
    },
    request: new Request(
      'https://school.example/api/h5p/libraries/H5P.Example/library.js'
    ),
    upstreamUrl:
      'https://strapi.example/api/h5p/libraries/H5P.Example/library.js',
  });

  assert.equal(response.status, 200);
  assert.equal(receivedRequest.cache, 'force-cache');
  assert.equal(
    response.headers.get('Cache-Control'),
    'public, max-age=31536000, immutable'
  );
  assert.deepEqual(receivedRequest.next.tags, []);
  assert.equal(await response.text(), 'library');
});

test('preserves 404 status without caching upstream error responses', async () => {
  const { proxyH5PFile } = await loadProxy();
  const response = await proxyH5PFile({
    cacheControl: 'public, max-age=31536000, immutable',
    fetchImpl: async () => new Response('missing', { status: 404 }),
    request: new Request('https://school.example/api/h5p/libraries/missing.js'),
    upstreamUrl: 'https://strapi.example/api/h5p/libraries/missing.js',
  });

  assert.equal(response.status, 404);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(await response.text(), 'missing');
});
