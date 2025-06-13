/**
 * Validates required environment variables
 * @throws Error if any required variables are missing
 */
export function validateEnv() {
  const required = [
    'OPENAI_API_KEY',
    'NEXT_PUBLIC_WEBSITE_URL'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

/**
 * Gets a required environment variable
 * @throws Error if the variable is not set
 */
export function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value;
}

/**
 * Gets an optional environment variable with a default value
 */
export function getOptionalEnv(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
} 