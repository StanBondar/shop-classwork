import { config } from 'dotenv';

export const EnvConfig: { PORT?: number; SECRET_KEY: string, CARD_API_URL: string, ACCESS_TOKEN_EXP: string, REFRESH_TOKEN_EXP: string } = {
  SECRET_KEY: '',
  CARD_API_URL: '',
  ACCESS_TOKEN_EXP: '',
  REFRESH_TOKEN_EXP: ''
};

export const createConfig = () => {
  config();
  EnvConfig.PORT = Number(process.env.PORT) || 3000;
  EnvConfig.SECRET_KEY = process.env.SECRET_KEY!;
  EnvConfig.CARD_API_URL = process.env.CARD_API_URL || '';
  EnvConfig.ACCESS_TOKEN_EXP = process.env.ACCESS_TOKEN_EXP || '4h'
  EnvConfig.REFRESH_TOKEN_EXP = process.env.REFRESH_TOKEN_EXP || '8h'
};
