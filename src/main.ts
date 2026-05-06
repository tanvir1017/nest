import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './app/utils/envalid.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const listening = await app.listen(env.PORT);

  console.log(`Server is running on port ${listening.address().port} in ${env.NODE_ENV} mode`);
}

bootstrap().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
