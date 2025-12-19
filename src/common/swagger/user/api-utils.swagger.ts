import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiSecuritySwagger() {
  return applyDecorators(ApiSecurity('Authorization', []));
}

export function ApiUnauthorizedResponseSwagger() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      example: { errors: 'Unauthorized' },
    }),
  );
}

export function ApiBadRequestResponseSwagger() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Validation error',
      example: { errors: 'Validation error' },
    }),
  );
}
