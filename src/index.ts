import { EnvConfig } from './config/index';
import 'reflect-metadata';
import { init } from './helpers/startup.helper';

const main = async () => {
  const app = await init();

  app.listen(EnvConfig.PORT, () =>
    console.log(`Started on port ${EnvConfig.PORT}`)
  );
};

main();
