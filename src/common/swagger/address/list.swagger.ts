import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ApiNotFoundResponseSwagger,
  ApiSecuritySwagger,
  ApiUnauthorizedResponseSwagger,
} from '../api-utils.swagger';
import { AddressWebResponses } from 'src/dto/address.dto';

export function ListAddressSwagger() {
  return applyDecorators(
    ApiSecuritySwagger(),
    ApiOperation({
      summary: 'List Addresses',
      description: 'Retrieve a list of all addresses in the system.',
    }),
    ApiResponse({
      status: 200,
      description: 'Addresses retrieved successfully',
      type: AddressWebResponses,
    }),
    ApiUnauthorizedResponseSwagger(),
    ApiNotFoundResponseSwagger(),
  );
}
