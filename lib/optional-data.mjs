export async function getOptionalData(operation, onError) {
  try {
    return await operation();
  } catch (error) {
    onError?.(error);
    return null;
  }
}
