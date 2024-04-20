import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { useContainer } from 'class-validator';
const PORT = process.env.PORT || 5000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(PORT);
}
bootstrap();
