import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaService implements OnModuleDestroy {
  private client: PubSub;
  constructor(configService: ConfigService) {
    this.client = new PubSub({
      projectId: configService.get('GOOGLE_CLOUD_PROJECT'),
    });
  }

  async emit(topic: string, message: any): Promise<any> {
    return this.client
      .topic(topic)
      .publish(Buffer.from(JSON.stringify(message)));
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
