import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
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

export function ApiNotFoundResponseSwagger() {
  return applyDecorators(
    ApiNotFoundResponse({
      description: 'Not Found',
      example: { errors: 'Not Found' },
    }),
  );
}

export function ApiForbiddenResponseSwagger() {
  return applyDecorators(
    ApiForbiddenResponse({
      description: 'Forbidden',
      example: { errors: 'Only admin can run seeder' },
    }),
  );
}
