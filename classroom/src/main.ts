import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { GCPubSubServer } from '@algoan/nestjs-google-pubsub-microservice';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    strategy: new GCPubSubServer({
      projectId: 'microservice-342322',
      subscriptionsPrefix: 'ignite-lab-sub',
    }),
  });
  app.startAllMicroservices().then(() => {
    console.log('[Classroom] Microservices started');
  });

  app.listen(3334).then(() => {
    console.log('[Classroom] HTTP on port 3334');
  });
}
bootstrap();
