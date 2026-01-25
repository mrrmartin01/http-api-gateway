import { Transport, ClientProviderOptions } from '@nestjs/microservices';

export const NATS_CLIENT_CONFIG: ClientProviderOptions = {
  name: 'GATEWAY_SERVICE',
  transport: Transport.NATS,
  options: {
    servers: ['nats://nats'],
  },
};
