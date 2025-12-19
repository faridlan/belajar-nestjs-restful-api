import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ApiSecuritySwagger,
  ApiUnauthorizedResponseSwagger,
} from './api-utils.swagger';

export function DeleteUserSwagger() {
  return applyDecorators(
    ApiSecuritySwagger(),
    ApiOperation({
      summary: 'Delete User',
      description: 'Delete user information.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successful user delete',
      example: { data: 'True' },
    }),
    ApiUnauthorizedResponseSwagger(),
  );
}
