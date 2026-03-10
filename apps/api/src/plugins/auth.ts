import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import type { FastifyInstance } from 'fastify';
import { env } from '../config/env.js';

export const authPlugin = fp(async (app: FastifyInstance) => {
  await app.register(fastifyJwt, {
    secret: env.jwtSecret
  });

  app.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      reply.code(401).send({ message: 'Unauthorized' });
    }
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: any, reply: any) => Promise<void>;
  }
}
