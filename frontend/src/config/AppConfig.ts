export interface AppConfig {
  apiBaseUrl: string;
  timeout: number;
  retryAttempts: number;
}

export const appConfig: AppConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  retryAttempts: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || '3'),
};