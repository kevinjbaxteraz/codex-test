import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';

const createOrderSchema = z.object({
  consumerId: z.string(),
  mode: z.enum(['IMMEDIATE', 'SCHEDULED', 'QUOTE']),
  scheduledFor: z.string().datetime().optional(),
  subtotalCents: z.number().int().nonnegative(),
  deliveryFeeCents: z.number().int().nonnegative(),
  platformFeeCents: z.number().int().nonnegative(),
  totalCents: z.number().int().nonnegative()
});

export async function orderRoutes(app: FastifyInstance) {
  app.post('/orders', async (request, reply) => {
    const body = createOrderSchema.parse(request.body);
    const created = await prisma.consumerOrder.create({
      data: {
        ...body,
        scheduledFor: body.scheduledFor ? new Date(body.scheduledFor) : undefined,
        status: body.mode === 'QUOTE' ? 'PENDING_QUOTE' : 'PENDING_PAYMENT'
      }
    });

    return reply.code(201).send(created);
  });

  app.post('/orders/:id/quote', async (request) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = z.object({ quoteAmountCents: z.number().int().positive() }).parse(request.body);
    return prisma.consumerOrder.update({
      where: { id: params.id },
      data: { quoteAmountCents: body.quoteAmountCents, status: 'QUOTED' }
    });
  });

  app.patch('/orders/:id/status', async (request) => {
    const params = z.object({ id: z.string() }).parse(request.params);
    const body = z.object({
      status: z.enum([
        'DRAFT',
        'PENDING_QUOTE',
        'QUOTED',
        'PENDING_PAYMENT',
        'CONFIRMED',
        'PREPARING',
        'READY_FOR_PICKUP',
        'IN_TRANSIT',
        'AT_HUB',
        'DELIVERED',
        'COMPLETED',
        'CANCELLED',
        'DISPUTED'
      ])
    }).parse(request.body);
    return prisma.consumerOrder.update({ where: { id: params.id }, data: { status: body.status } });
  });
}
