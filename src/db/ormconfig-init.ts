import { config } from "dotenv";
import { writeFile } from "fs";
import path from "path";
import fs from 'fs';

const initOrmConfic = async () => {
  config();

  const dir = process.env.ENV === "DEV" ? 'src/' : 'dist/';

  const opt = {
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    entities: [
      `${dir}**/entities/*.entity{.ts,.js}`
    ],
    migrations: [`${dir}**/migrations/*{.ts,.js}`],
    migrationsDir: [`${dir}**/migrations`],
    ssl: {
      rejectUnauthorized: false
    }
  };
  console.log(path.join(__dirname, '../../ormconfig.json'));
  await fs.promises.writeFile(path.join(__dirname, '../../ormconfig.json'), JSON.stringify(opt, null, 4))
}

initOrmConfic().then(() => console.log('Orm config generated!'))