export type PlatformRole =
  | 'CONSUMER'
  | 'VENDOR_OWNER'
  | 'VENDOR_STAFF'
  | 'DRIVER'
  | 'HUB_HOST_OWNER'
  | 'HUB_HOST_STAFF'
  | 'ADMIN'
  | 'OPS'
  | 'SUPPORT';

export type HubClass = 'A' | 'B' | 'C' | 'D';

export type VehicleClass =
  | 'PICKUP_NO_TRAILER'
  | 'PICKUP_BUMPER_PULL'
  | 'PICKUP_GOOSENECK'
  | 'MEDIUM_DUTY_TRUCK'
  | 'STRAIGHT_TRUCK'
  | 'SEMI';

export type OrderMode = 'IMMEDIATE' | 'SCHEDULED' | 'QUOTE';

export type OrderStatus =
  | 'DRAFT'
  | 'PENDING_QUOTE'
  | 'QUOTED'
  | 'PENDING_PAYMENT'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'IN_TRANSIT'
  | 'AT_HUB'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED';

export type PayoutStatus =
  | 'PLANNED'
  | 'HELD'
  | 'ELIGIBLE'
  | 'SCHEDULED'
  | 'PROCESSING'
  | 'PAID'
  | 'FAILED'
  | 'REVERSED';

export interface AuthUser {
  id: string;
  email: string;
  roles: PlatformRole[];
}

export interface JwtClaims {
  sub: string;
  email: string;
  roles: PlatformRole[];
  iat: number;
  exp: number;
}
