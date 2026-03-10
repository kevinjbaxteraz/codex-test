import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';

const loginSchema = z.object({
  email: z.string().email()
});

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/login', async (request, reply) => {
    const body = loginSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: { email: body.email },
      include: { roleMemberships: true }
    });

    if (!user) {
      return reply.code(404).send({ message: 'User not found' });
    }

    const roles = user.roleMemberships.map((membership) => membership.role);

    const token = await reply.jwtSign({
      sub: user.id,
      email: user.email,
      roles
    });

    return { token, user: { id: user.id, email: user.email, roles } };
  });

  app.get('/auth/me', { preHandler: [app.authenticate] }, async (request) => ({
    user: request.user
  }));
}
