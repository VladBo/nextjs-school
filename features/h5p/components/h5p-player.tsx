'use client';

import { useEffect, useState } from 'react';

export function H5PPlayer({ contentId }: { contentId: string }) {
  const [h5pContent, setH5PContent] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/h5p/${contentId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load quiz');
        return res.json();
      })
      .then((data) => {
        setH5PContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [contentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="mb-2 text-lg font-medium">Loading quiz...</div>
          <div className="text-sm text-muted-foreground">Please wait</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="mb-2 text-lg font-medium text-destructive">
            Error loading quiz
          </div>
          <div className="text-sm text-muted-foreground">{error}</div>
        </div>
      </div>
    );
  }

  if (!h5pContent) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="text-lg font-medium">No quiz content found</div>
        </div>
      </div>
    );
  }

  // H5P content will be rendered here once the H5P React library is properly integrated
  // For now, we'll create a placeholder that shows the content exists
  return (
    <div className="rounded-lg border bg-card p-8">
      <div className="mb-4 text-center text-sm text-muted-foreground">
        H5P Player will render here
      </div>
      <div className="text-xs text-muted-foreground">
        Content ID: {contentId}
      </div>
    </div>
  );
}
