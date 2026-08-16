export function isUnauthorizedError(error: Error): boolean {
  if (!error || !error.message) return false;
  return /401|unauthorized/i.test(error.message);
}