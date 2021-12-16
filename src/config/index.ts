import { config } from 'dotenv';

export const EnvConfig: { PORT?: number; SECRET_KEY: string, CARD_API_URL: string } = {
  SECRET_KEY: '',
  CARD_API_URL: ''
};

export const createConfig = () => {
  config();
  EnvConfig.PORT = Number(process.env.PORT) || 3000;
  EnvConfig.SECRET_KEY = process.env.SECRET_KEY!;
  EnvConfig.CARD_API_URL = process.env.CARD_API_URL || '';
};
