import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { env } from './config/env.js';
import { authPlugin } from './plugins/auth.js';
import { healthRoutes } from './modules/health/routes.js';
import { authRoutes } from './modules/auth/routes.js';
import { userRoutes } from './modules/users/routes.js';
import { applicationRoutes } from './modules/applications/routes.js';
import { trainingRoutes } from './modules/training/routes.js';
import { orderRoutes } from './modules/orders/routes.js';
import { communicationRoutes } from './modules/communications/routes.js';
import { payoutRoutes } from './modules/payouts/routes.js';

const app = Fastify({ logger: true });

await app.register(fastifyCors, { origin: env.corsOrigin });
await app.register(authPlugin);

await app.register(healthRoutes);
await app.register(authRoutes, { prefix: '/v1' });
await app.register(userRoutes, { prefix: '/v1' });
await app.register(applicationRoutes, { prefix: '/v1' });
await app.register(trainingRoutes, { prefix: '/v1' });
await app.register(orderRoutes, { prefix: '/v1' });
await app.register(communicationRoutes, { prefix: '/v1' });
await app.register(payoutRoutes, { prefix: '/v1' });

const start = async () => {
  try {
    await app.listen({ host: '0.0.0.0', port: env.port });
    app.log.info(`API listening on :${env.port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
