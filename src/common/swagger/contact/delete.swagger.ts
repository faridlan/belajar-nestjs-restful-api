import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ApiNotFoundResponseSwagger,
  ApiSecuritySwagger,
  ApiUnauthorizedResponseSwagger,
} from '../api-utils.swagger';
import { applyDecorators } from '@nestjs/common';

export function DeleteContactSwagger() {
  return applyDecorators(
    ApiSecuritySwagger(),
    ApiOperation({
      summary: 'Delete Contact',
      description: 'Delete a contact by its ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Contact deleted successfully',
      example: { data: 'True' },
    }),
    ApiNotFoundResponseSwagger(),
    ApiUnauthorizedResponseSwagger(),
  );
}
