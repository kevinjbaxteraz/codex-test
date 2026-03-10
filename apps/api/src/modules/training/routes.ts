import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';

const completionSchema = z.object({
  userId: z.string(),
  moduleId: z.string()
});

export async function trainingRoutes(app: FastifyInstance) {
  app.get('/training/modules', async () => prisma.trainingModule.findMany());

  app.post('/training/completions', async (request, reply) => {
    const body = completionSchema.parse(request.body);
    const completion = await prisma.trainingCompletion.create({ data: body });
    return reply.code(201).send(completion);
  });
}
