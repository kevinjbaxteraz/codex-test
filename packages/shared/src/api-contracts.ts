import { z } from 'zod';

export const createApplicationSchema = z.object({
  userId: z.string(),
  type: z.enum(['VENDOR', 'DRIVER', 'HUB_HOST'])
});

export const createUserSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  roles: z.array(z.string()).min(1)
});

export const loginSchema = z.object({
  email: z.string().email()
});

export const createOrderSchema = z.object({
  consumerId: z.string(),
  mode: z.enum(['IMMEDIATE', 'SCHEDULED', 'QUOTE']),
  scheduledFor: z.string().datetime().optional(),
  subtotalCents: z.number().int().nonnegative(),
  deliveryFeeCents: z.number().int().nonnegative(),
  platformFeeCents: z.number().int().nonnegative(),
  totalCents: z.number().int().nonnegative()
});

export const createConversationSchema = z.object({
  type: z.enum(['VENDOR_CUSTOMER', 'CUSTOMER_DRIVER', 'DRIVER_HUB_HOST']),
  participants: z.array(z.object({ userId: z.string(), roleAtJoin: z.string() })).min(2)
});
