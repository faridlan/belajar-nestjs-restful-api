import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserWebBaseResponse } from 'src/dto/user.dto';
import { ApiBadRequestResponseSwagger } from '../api-utils.swagger';

export function RegisterUserSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'User Registration',
      description: 'Register a new user in the system.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successful user registration',
      type: UserWebBaseResponse,
    }),
    ApiBadRequestResponseSwagger(),
  );
}
