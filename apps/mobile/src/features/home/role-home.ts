import type { PlatformRole } from '@rural/types';

export function roleHomeTitle(roles: PlatformRole[]) {
  if (roles.includes('DRIVER')) return 'Driver Dispatch';
  if (roles.includes('VENDOR_OWNER') || roles.includes('VENDOR_STAFF')) return 'Vendor Storefront';
  if (roles.includes('HUB_HOST_OWNER') || roles.includes('HUB_HOST_STAFF')) return 'Hub Operations';
  return 'Marketplace';
}
