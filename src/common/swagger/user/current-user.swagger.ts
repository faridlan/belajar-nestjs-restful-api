import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserWebBaseResponse } from 'src/dto/user.dto';
import { ApiSecuritySwagger } from '../api-utils.swagger';

export function CurrentUserSwagger() {
  return applyDecorators(
    ApiSecuritySwagger(),
    ApiOperation({
      summary: 'Get Current User',
      description: 'Retrieve information about the authenticated user.',
    }),
    ApiResponse({
      status: 200,
      description: 'Current user data',
      type: UserWebBaseResponse,
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      example: { errors: 'Unauthorized' },
    }),
  );
}
