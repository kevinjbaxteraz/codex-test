# API Surface Draft (MVP)

## Auth
- `POST /v1/auth/login`
- `GET /v1/auth/me`

## Users/Roles
- `POST /v1/users`
- `GET /v1/users`

## Applications
- `POST /v1/applications`
- `PATCH /v1/applications/:id/status`

## Training
- `GET /v1/training/modules`
- `POST /v1/training/completions`

## Orders
- `POST /v1/orders`
- `POST /v1/orders/:id/quote`
- `PATCH /v1/orders/:id/status`

## Communications
- `POST /v1/conversations`
- `GET /v1/conversations/:id/messages`
- `POST /v1/conversations/:id/messages`
- `POST /v1/masked-sessions`

## Payouts
- `POST /v1/payouts/trigger`
- `GET /v1/payouts/me`
