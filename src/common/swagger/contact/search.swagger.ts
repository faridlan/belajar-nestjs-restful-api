import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContactWebResponses } from 'src/dto/contact.dto';
import {
  ApiNotFoundResponseSwagger,
  ApiUnauthorizedResponseSwagger,
} from '../api-utils.swagger';

export function SearchContactSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Search Contact',
      description: 'Search for contacts based on query parameters.',
    }),
    ApiResponse({
      status: 200,
      description: 'Contact retrieved successfully',
      type: ContactWebResponses,
    }),
    ApiNotFoundResponseSwagger(),
    ApiUnauthorizedResponseSwagger(),
  );
}
