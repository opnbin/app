export function env(key: string) {
  const result = process.env[key];

  if (!result) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return result;
}
