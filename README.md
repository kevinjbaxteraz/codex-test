# Rural Logistics Platform Monorepo

Implementation scaffold for a rural marketplace + logistics platform launching on the **US-20 corridor from Ashton to Ucon, Idaho**.

## Confirmed product decisions reflected in this repo
- Single mobile app with role-based experiences (consumer, vendor, driver, hub host).
- Drivers modeled as independent contractors.
- Order modes: immediate, scheduled, and quote/bid-based.
- Masked communications + in-app messaging.
- Onboarding/training video support for drivers, vendors, hub hosts.
- Vehicle classes standardized (pickup to semi).
- Hub classes A/B/C/D retained.
- MVP payout flow: customer funds captured by platform, payouts released by fulfillment milestones.

## Monorepo structure
- `apps/api` - Fastify API (auth, users, applications, training, orders, communications, payouts)
- `apps/mobile` - Expo app scaffold
- `apps/web` - Next.js public + onboarding scaffold
- `apps/admin` - Next.js operations/admin scaffold
- `packages/database` - Prisma schema and seed
- `packages/types` - Shared domain types
- `packages/shared` - Shared API contracts
- `packages/ui` - Shared design tokens
- `docs/architecture.md` - Revised architecture and MVP plan
- `docs/api-surface.md` - API draft

## Setup
```bash
pnpm install
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local
cp apps/mobile/.env.example apps/mobile/.env
pnpm db:generate
pnpm db:migrate -- --name init
pnpm db:seed
pnpm dev
```

## Next build priorities
1. Harden auth/session model and role enforcement middleware.
2. Build full order and payout orchestration service layer.
3. Add hub/vehicle compatibility rules engine.
4. Add production messaging provider integration for masked comms.
5. Build onboarding/training UIs and admin review workflows.

## Insurance/compliance note
Current insurance/compliance guidance is directional only and requires broker/legal review before production launch.
