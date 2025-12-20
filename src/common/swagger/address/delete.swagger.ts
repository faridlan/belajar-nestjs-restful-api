import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ApiNotFoundResponseSwagger,
  ApiSecuritySwagger,
  ApiUnauthorizedResponseSwagger,
} from '../api-utils.swagger';

export function DeleteAddressSwagger() {
  return applyDecorators(
    ApiSecuritySwagger(),
    ApiOperation({
      summary: 'Delete Address',
      description: 'Delete an address by its ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Address deleted successfully',
      example: { data: 'True' },
    }),
    ApiNotFoundResponseSwagger(),
    ApiUnauthorizedResponseSwagger(),
  );
}
