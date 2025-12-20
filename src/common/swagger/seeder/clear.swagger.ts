import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ApiForbiddenResponseSwagger,
  ApiSecuritySwagger,
  ApiUnauthorizedResponseSwagger,
} from '../api-utils.swagger';

export function ClearSeederSwagger() {
  return applyDecorators(
    ApiSecuritySwagger(),
    ApiOperation({
      summary: 'Clear Seeder',
      description: 'Clear seeder.',
    }),
    ApiResponse({
      status: 200,
      description: 'Seeder cleared successfully',
      example: { message: 'All data cleared except admin' },
    }),
    ApiForbiddenResponseSwagger(),
    ApiUnauthorizedResponseSwagger(),
  );
}
