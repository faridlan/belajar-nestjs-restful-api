import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserWebBaseResponse } from 'src/dto/user.dto';
import {
  ApiBadRequestResponseSwagger,
  ApiSecuritySwagger,
  ApiUnauthorizedResponseSwagger,
} from './api-utils.swagger';

export function UpdateUserSwagger() {
  return applyDecorators(
    ApiSecuritySwagger(),
    ApiOperation({
      summary: 'Update User',
      description: 'Update user information.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successful user update',
      type: UserWebBaseResponse,
    }),
    ApiBadRequestResponseSwagger(),
    ApiUnauthorizedResponseSwagger(),
  );
}
