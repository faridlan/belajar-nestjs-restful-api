import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginWebResponse } from 'src/dto/user.dto';
import { ApiBadRequestResponseSwagger } from './api-utils.swagger';

export function LoginSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'User Login',
      description: 'Authenticate a user and obtain an access token.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successful login',
      type: LoginWebResponse,
    }),
    ApiBadRequestResponseSwagger(),
    ApiUnauthorizedResponse({
      description: 'Invalid username or password',
    }),
  );
}
