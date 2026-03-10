import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';

export async function communicationRoutes(app: FastifyInstance) {
  app.post('/conversations', async (request, reply) => {
    const body = z
      .object({
        type: z.enum(['VENDOR_CUSTOMER', 'CUSTOMER_DRIVER', 'DRIVER_HUB_HOST']),
        participants: z.array(z.object({ userId: z.string(), roleAtJoin: z.string() })).min(2)
      })
      .parse(request.body);

    const conversation = await prisma.conversation.create({
      data: {
        type: body.type,
        participants: { create: body.participants }
      },
      include: { participants: true }
    });

    return reply.code(201).send(conversation);
  });

  app.get('/conversations/:id/messages', async (request) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    return prisma.message.findMany({ where: { conversationId: params.id }, orderBy: { createdAt: 'asc' } });
  });

  app.post('/conversations/:id/messages', async (request, reply) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = z.object({ senderUserId: z.string(), body: z.string().min(1) }).parse(request.body);

    const message = await prisma.message.create({
      data: { conversationId: params.id, senderUserId: body.senderUserId, body: body.body }
    });

    return reply.code(201).send(message);
  });

  app.post('/masked-sessions', async (request, reply) => {
    const body = z
      .object({
        conversationId: z.string(),
        providerRef: z.string(),
        expiresAt: z.string().datetime()
      })
      .parse(request.body);

    const session = await prisma.maskedSession.create({
      data: { ...body, expiresAt: new Date(body.expiresAt) }
    });

    return reply.code(201).send(session);
  });
}
