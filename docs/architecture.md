# Rural Logistics Platform — Revised Product Architecture Plan

## 1) Revised Product Architecture

### Product positioning
A rural marketplace + logistics platform serving the **US-20 corridor from Ashton to Ucon, Idaho** for MVP launch.

### Core platform model
- One marketplace + delivery platform for:
  - consumers,
  - vendors,
  - drivers (independent contractors),
  - hub hosts.
- One mobile app with role-based permissions and experiences.
- Web surfaces for public website/onboarding and admin/operations.

### Confirmed operational constraints
- Driver labor model: **independent contractor**, not employee.
- Hub class taxonomy remains: **A, B, C, D**.
- Standard vehicle classes:
  - `PICKUP_NO_TRAILER`
  - `PICKUP_BUMPER_PULL`
  - `PICKUP_GOOSENECK`
  - `MEDIUM_DUTY_TRUCK`
  - `STRAIGHT_TRUCK`
  - `SEMI`
- Order modes:
  - Immediate
  - Scheduled
  - Quote/Bid-based

---

## 2) Role-Based Permission Model

### Roles
- `CONSUMER`
- `VENDOR_OWNER`, `VENDOR_STAFF`
- `DRIVER`
- `HUB_HOST_OWNER`, `HUB_HOST_STAFF`
- `ADMIN`, `OPS`, `SUPPORT`

### Access model
- Multi-role users are allowed.
- Role assignments scoped by organization context (`vendorId`, `hubId`).
- Permission format: `domain:action:scope`.

### MVP permission examples
- Consumer
  - `marketplace:read:self`
  - `order:create:self`
  - `order:read:self`
- Vendor
  - `storefront:update:vendor`
  - `product:manage:vendor`
  - `order:fulfill:vendor`
- Driver (contractor)
  - `dispatch:read:driver`
  - `dispatch:accept:driver`
  - `delivery:update:driver`
- Hub host
  - `hub:update:hub`
  - `handoff:confirm:hub`
- Admin/Ops/Support
  - `application:review:all`
  - `dispatch:manage:all`
  - `payment:reconcile:all`

---

## 3) Order and Payout State Machine

### Order modes
- `IMMEDIATE`
- `SCHEDULED`
- `QUOTE`

### Order state machine (MVP)
1. `DRAFT`
2. `PENDING_QUOTE` (quote mode only)
3. `QUOTED`
4. `PENDING_PAYMENT`
5. `CONFIRMED`
6. `PREPARING`
7. `READY_FOR_PICKUP`
8. `IN_TRANSIT`
9. `AT_HUB` (relay)
10. `DELIVERED`
11. `COMPLETED`
12. `CANCELLED`
13. `DISPUTED`

### Payment and payout model (MVP recommendation)
- Platform captures customer funds.
- Funds allocated via internal ledger buckets.
- Payouts triggered by milestones:
  - Vendor payout on pickup confirmation (or completed pickup order).
  - Driver payout on proof-of-delivery/handoff milestones.
  - Hub host payout on confirmed handoff/service event.

### Payout state machine
1. `PLANNED`
2. `HELD`
3. `ELIGIBLE`
4. `SCHEDULED`
5. `PROCESSING`
6. `PAID`
7. `FAILED`
8. `REVERSED`

---

## 4) Product Classes and Handling Rules

### Product classes (initial)
- `HAY`
- `GRAIN`
- `FEED`
- `EGGS`
- `SMALL_LIVESTOCK`
- `LARGE_LIVESTOCK`
- `FENCING`
- `PALLETS`
- `RURAL_SUPPLIES`

### Handling rule dimensions
- Requires covered transport (`requiresCovered`).
- Temperature sensitivity (`temperatureMinC`, `temperatureMaxC`).
- Livestock handling flags (`animalWelfareRequired`, `maxHoldMinutes`).
- Trailer required (`requiresTrailer`).
- Vehicle class minimum.
- Hub capability requirements.

### Compatibility checks
1. Product handling requirement vs selected vehicle class.
2. Product handling requirement vs hub class/capability.
3. Open-hours and time-window viability.

---

## 5) Onboarding and Training System

### Onboarding entities
- Application (vendor/driver/hub host).
- Verification documents.
- Compliance checks.
- Review notes and audit logs.

### Training entities
- Training module (role-targeted video).
- Training assignment by role.
- Training completion records.

### MVP training flow
- Drivers, hub hosts, and vendors must complete role-specific video modules before activation where required.

---

## 6) Communications System

### Requirements
- Masked communications + in-app messaging for:
  - vendor ↔ customer
  - customer ↔ driver
  - driver ↔ hub host

### MVP architecture
- Conversation model with participant permissions.
- Message records with moderation flags.
- Optional masked call/session token references.
- Notification events for unread messages.

### Safety controls
- Rate limits.
- Abuse reporting hooks.
- Audit retention windows.

---

## 7) MVP Scope — Ashton-to-Ucon Launch

### Included
- Single mobile app with role-based experiences.
- Vendor storefronts and inventory (core product classes).
- Immediate + scheduled + quote order creation.
- Direct and one-hub relay flow.
- Hub class + capability compatibility checks.
- Contractor driver job acceptance and completion flow.
- In-app messaging and masked communication primitives.
- Milestone-based payout triggering logic.
- Onboarding applications and training completion gates.

### Deferred (post-MVP)
- Multi-hop relay optimization.
- Advanced dynamic pricing and route chaining ML.
- Full dispute automation and advanced claims tooling.

---

## 8) Draft Database Schema (summary)

Key additions beyond baseline:
- `OrderMode`, expanded `OrderStatus`.
- `VehicleClass` enum for standardized vehicle classes.
- `Payout`, `PayoutMilestone`, `LedgerEntry`.
- `TrainingModule`, `TrainingAssignment`, `TrainingCompletion`.
- `Conversation`, `ConversationParticipant`, `Message`, `MaskedSession`.
- `ProductClass`, `HandlingRule` models.

(Implemented in `packages/database/prisma/schema.prisma`.)

---

## 9) Draft API Surface

### Auth/Roles
- `POST /v1/auth/login`
- `GET /v1/auth/me`

### Onboarding/Training
- `POST /v1/applications`
- `PATCH /v1/applications/:id/status`
- `GET /v1/training/modules`
- `POST /v1/training/completions`

### Marketplace/Orders
- `GET /v1/marketplace/products`
- `POST /v1/orders`
- `POST /v1/orders/:id/quote`
- `PATCH /v1/orders/:id/status`

### Dispatch/Hubs
- `GET /v1/dispatch/jobs`
- `POST /v1/dispatch/jobs/:id/accept`
- `POST /v1/hubs/:id/handoffs`

### Communications
- `POST /v1/conversations`
- `GET /v1/conversations/:id/messages`
- `POST /v1/conversations/:id/messages`
- `POST /v1/masked-sessions`

### Payments/Payouts
- `POST /v1/payments/intents`
- `POST /v1/payouts/trigger`
- `GET /v1/payouts/me`

---

## 10) Monorepo Scaffold Status

Monorepo is scaffolded with:
- `apps/api` (Fastify modules)
- `apps/mobile` (single Expo app)
- `apps/web` and `apps/admin` (Next.js)
- shared packages (`types`, `ui`, `shared`, `config`, `database`)

This revision adds order/payout/training/communications data and API scaffolding stubs for immediate implementation.

---

## Insurance and Compliance (broker/legal review required)

Likely categories to include:
- General commercial liability.
- Cargo/load coverage.
- Auto/non-owned auto coverage implications.
- Premises liability for hub hosts.
- Livestock handling and mortality-related risk coverage.
- Contractor agreement risk transfer language.
- Umbrella/excess coverage strategy.

Operational risk areas:
- Handoff liability boundaries.
- Live animal welfare incidents.
- Temperature/handling failures.
- Documentation gaps and claims evidence retention.

> **Note:** This section is directional only and requires formal broker/legal review before launch.
