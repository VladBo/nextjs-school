export function getOptionalData<T>(
  operation: () => Promise<T>,
  onError?: (error: unknown) => void
): Promise<T | null>;
