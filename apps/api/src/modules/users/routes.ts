import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';

const createUserSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  roles: z
    .array(
      z.enum([
        'CONSUMER',
        'VENDOR_OWNER',
        'VENDOR_STAFF',
        'DRIVER',
        'HUB_HOST_OWNER',
        'HUB_HOST_STAFF',
        'ADMIN',
        'OPS',
        'SUPPORT'
      ])
    )
    .min(1)
});

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const body = createUserSchema.parse(request.body);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        fullName: body.fullName,
        roleMemberships: {
          create: body.roles.map((role) => ({ role }))
        }
      },
      include: { roleMemberships: true }
    });

    return reply.code(201).send(user);
  });

  app.get('/users', async () => {
    return prisma.user.findMany({ include: { roleMemberships: true } });
  });
}
