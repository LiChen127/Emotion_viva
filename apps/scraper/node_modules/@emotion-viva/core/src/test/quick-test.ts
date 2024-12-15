import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { infrastructureConfig } from '../config/env.config';

async function testConfig() {
  const moduleRef = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        load: [infrastructureConfig],
        envFilePath: ['.env'],
      }),
    ],
  }).compile();

  const configService = moduleRef.get<ConfigService>(ConfigService);
  console.log('MongoDB Config:', configService.get('infrastructure.mongodb'));
}

testConfig().catch(console.error); 