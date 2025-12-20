import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContactWebResponse } from 'src/dto/contact.dto';
import {
  ApiBadRequestResponseSwagger,
  ApiSecuritySwagger,
  ApiUnauthorizedResponseSwagger,
} from '../api-utils.swagger';

export function GetContactSwagger() {
  return applyDecorators(
    ApiSecuritySwagger(),
    ApiOperation({
      summary: 'Get Contact',
      description: 'Retrieve a contact by its ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Contact retrieved successfully',
      type: ContactWebResponse,
    }),
    ApiBadRequestResponseSwagger(),
    ApiUnauthorizedResponseSwagger(),
  );
}
