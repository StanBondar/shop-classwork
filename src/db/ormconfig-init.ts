import { verify } from 'jsonwebtoken';
import path from 'path';
import { promises } from 'fs';
import { config } from 'dotenv';

const init = async () => {
  config();

  const dir = process.env.ENV === 'DEV' ? 'src' : 'dist/src';

  const opt = {
    name: 'mongodb1',
    type: 'mongodb',
    url: process.env.MONGO_URL,
    entities: [`${dir}/**/models/*.model{.ts,.js}`]
  };

  const opt2 = {
    type: 'postgres',
    name: 'default',
    url: process.env.DATABASE_URL,
    entities: [`${dir}/**/entities/*.entity{.ts,.js}`],
    migrations: [`${dir}/**/migrations/*{.ts,.js}`],
    cli: {
      migrationsDir: `${dir}/db/migrations`
    },
    synchronize: true
  };
  
  await promises.writeFile(
    path.join(__dirname, '../../ormconfig.json'),
    JSON.stringify([opt, opt2], null, 4)
  );
};

init().then(() => console.log('Ormconfig generated!'));