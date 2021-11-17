import { verify } from 'jsonwebtoken';
import path from 'path';
import { promises } from 'fs';
import { config } from 'dotenv';

const init = async () => {
  config();

  const dir = process.env.ENV === 'DEV' ? 'src' : 'dist/src';

  const opt = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [`${dir}/**/entities/*.entity{.ts,.js}`],
    migrations: [`${dir}/**/migrations/*{.ts,.js}`],
    cli: {
      migrationsDir: `${dir}/db/migrations`
    }
    // ssl: {
    //   rejectUnauthorized: false
    // }
  };

  await promises.writeFile(
    path.join(__dirname, '../../ormconfig.json'),
    JSON.stringify(opt, null, 4)
  );
};

init().then(() => console.log('Ormconfig generated!'));