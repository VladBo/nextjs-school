'use client';

import { useEffect, useRef, useState } from 'react';

interface H5PPlayerProps {
  contentId: string;
  title?: string;
}

export function H5PPlayer({ contentId, title }: H5PPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const h5pInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    let mounted = true;

    const initH5P = async () => {
      if (!containerRef.current) return;

      try {
        // Dynamic import to avoid SSR issues
        const { H5P } = await import('h5p-standalone');

        if (!mounted) return;

        // Clear container
        containerRef.current.innerHTML = '';

        // Initialize H5P with our API route that serves extracted content
        const h5pPath = `/api/h5p/${contentId}`;

        h5pInstanceRef.current = new H5P(containerRef.current, {
          h5pJsonPath: h5pPath,
          frameJs: '/h5p/frame.bundle.js',
          frameCss: '/h5p/styles/h5p.css',
          frame: true,
          copyright: false,
          export: false,
          icon: false,
          fullScreen: false,
          embed: false,
        });

        setLoading(false);
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to initialize H5P player'
          );
          setLoading(false);
        }
      }
    };

    initH5P();

    return () => {
      mounted = false;
      // Cleanup H5P instance
      if (
        h5pInstanceRef.current &&
        typeof (h5pInstanceRef.current as { dispose?: () => void }).dispose ===
          'function'
      ) {
        (h5pInstanceRef.current as { dispose: () => void }).dispose();
      }
    };
  }, [contentId]);

  if (error) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="mb-2 text-lg font-medium text-destructive">
            Error loading content
          </div>
          <div className="mb-4 text-sm text-muted-foreground">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h5p-container">
      {loading && (
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <div className="text-lg font-medium">
              Loading {title || 'content'}...
            </div>
            <div className="text-sm text-muted-foreground">
              Preparing interactive content
            </div>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="h5p-player min-h-[400px] w-full"
        data-content-id={contentId}
      />
    </div>
  );
}
