import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContactWebResponse } from 'src/dto/contact.dto';
import {
  ApiBadRequestResponseSwagger,
  ApiNotFoundResponseSwagger,
  ApiSecuritySwagger,
  ApiUnauthorizedResponseSwagger,
} from '../api-utils.swagger';

export function UpdateContactRequestSwagger() {
  return applyDecorators(
    ApiSecuritySwagger(),
    ApiOperation({
      summary: 'Update Contact Request',
      description: 'Schema for updating a contact.',
    }),
    ApiResponse({
      status: 200,
      description: 'Update contact request schema',
      type: ContactWebResponse,
    }),
    ApiBadRequestResponseSwagger(),
    ApiNotFoundResponseSwagger(),
    ApiUnauthorizedResponseSwagger(),
  );
}
