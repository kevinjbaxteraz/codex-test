import type { PlatformRole } from '@rural/types';

export function hasRole(userRoles: PlatformRole[], role: PlatformRole) {
  return userRoles.includes(role);
}

export function isOperationsUser(userRoles: PlatformRole[]) {
  return userRoles.some((role) => ['ADMIN', 'OPS', 'SUPPORT'].includes(role));
}
