import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';

const createApplicationSchema = z.object({
  userId: z.string(),
  type: z.enum(['VENDOR', 'DRIVER', 'HUB_HOST'])
});

const updateStatusSchema = z.object({
  status: z.enum(['DRAFT', 'SUBMITTED', 'IN_REVIEW', 'APPROVED', 'REJECTED'])
});

export async function applicationRoutes(app: FastifyInstance) {
  app.post('/applications', async (request, reply) => {
    const body = createApplicationSchema.parse(request.body);
    const created = await prisma.application.create({ data: body });
    return reply.code(201).send(created);
  });

  app.patch('/applications/:id/status', async (request) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = updateStatusSchema.parse(request.body);
    return prisma.application.update({ where: { id: params.id }, data: { status: body.status } });
  });
}
