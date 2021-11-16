import { config } from "dotenv";
import { writeFile } from "fs";
import path from "path";
import fs from 'fs';

const initOrmConfic = async () => {
  config();

  const dir = process.env.ENV === "DEV" ? '' : 'dist';

  const opt = {
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    entities: [
      `${dir}/src/**/entities/*.entity{.ts,.js}`
    ],
    migrations: [`${dir}/src/**/migrations/*{.ts,.js}`],
    migrationsDir: [`${dir}/src/**/migrations`],
    ssl: {
      rejectUnauthorized: false
    }
  };
  console.log(path.join(__dirname, '../../ormconfig.json'));
  await fs.promises.writeFile(path.join(__dirname, '../../ormconfig.json'), JSON.stringify(opt, null, 4))
}

initOrmConfic().then(() => console.log('Orm config generated!'))