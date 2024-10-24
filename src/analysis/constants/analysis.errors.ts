import { BadRequestException } from '@nestjs/common';

export const ANALYSIS_ERRORS = {
  DEMO_SELECTED: new BadRequestException({
    id: 'AYS-001',
    message: 'Demostração já selecionada.',
  }),
};
