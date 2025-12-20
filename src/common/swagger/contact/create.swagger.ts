import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContactWebResponse } from 'src/dto/contact.dto';
import {
  ApiBadRequestResponseSwagger,
  ApiUnauthorizedResponseSwagger,
} from '../api-utils.swagger';

export function CreateContactSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create Contact',
      description: 'Create a new contact in the system.',
    }),
    ApiResponse({
      status: 200,
      description: 'Contact created successfully',
      type: ContactWebResponse,
    }),
    ApiBadRequestResponseSwagger(),
    ApiUnauthorizedResponseSwagger(),
  );
}
