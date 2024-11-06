import { UnauthorizedException } from '@nestjs/common';

export const COMMON_ERRORS = {
  AUTH: {
    INVALID_CREDENTIALS: new UnauthorizedException({
      id: 'AUTH-001',
      message: 'Credenciais inválidas.',
    }),
  },
};
