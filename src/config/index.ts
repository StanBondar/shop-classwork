import { config } from 'dotenv';

export const EnvConfig: { PORT?: number; SECRET_KEY: string } = {
  SECRET_KEY: '',
};

export const createConfig = () => {
  config();
  EnvConfig.PORT = Number(process.env.PORT) || 3000;
  EnvConfig.SECRET_KEY = process.env.SECRET_KEY!;
};
