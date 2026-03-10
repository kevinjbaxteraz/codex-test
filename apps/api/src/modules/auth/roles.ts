import type { FastifyReply, FastifyRequest } from 'fastify';
import type { PlatformRole } from '@rural/types';

export function requireAnyRole(allowedRoles: PlatformRole[]) {
  return async function roleGuard(request: FastifyRequest, reply: FastifyReply) {
    const claims = request.user as { roles?: PlatformRole[] };
    const roles = claims.roles ?? [];

    const isAllowed = allowedRoles.some((role) => roles.includes(role));

    if (!isAllowed) {
      return reply.code(403).send({ message: 'Forbidden' });
    }
  };
}
