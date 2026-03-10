import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';

export async function payoutRoutes(app: FastifyInstance) {
  app.post('/payouts/trigger', async (request, reply) => {
    const body = z
      .object({
        payoutId: z.string(),
        milestone: z.enum(['ORDER_PICKED_UP', 'ORDER_DELIVERED', 'HUB_HANDOFF_CONFIRMED'])
      })
      .parse(request.body);

    await prisma.payoutMilestone.upsert({
      where: { payoutId_type: { payoutId: body.payoutId, type: body.milestone } },
      update: { reachedAt: new Date() },
      create: { payoutId: body.payoutId, type: body.milestone, reachedAt: new Date() }
    });

    const payout = await prisma.payout.update({
      where: { id: body.payoutId },
      data: { status: 'ELIGIBLE' }
    });

    return reply.code(200).send(payout);
  });

  app.get('/payouts/me', async (request) => {
    const query = z.object({ userId: z.string() }).parse(request.query);

    return prisma.payout.findMany({
      where: {
        OR: [
          { driverProfile: { userId: query.userId } },
          { vendor: { memberships: { some: { userId: query.userId } } } },
          { hub: { memberships: { some: { userId: query.userId } } } }
        ]
      }
    });
  });
}
