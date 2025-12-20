import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddressWebResponse } from 'src/dto/address.dto';
import {
  ApiBadRequestResponseSwagger,
  ApiNotFoundResponseSwagger,
  ApiSecuritySwagger,
  ApiUnauthorizedResponseSwagger,
} from '../api-utils.swagger';

export function CreateAddressSwagger() {
  return applyDecorators(
    ApiSecuritySwagger(),
    ApiOperation({
      summary: 'Create Address',
      description: 'Create a new address for a contact in the system.',
    }),
    ApiResponse({
      status: 200,
      description: 'Address created successfully',
      type: AddressWebResponse,
    }),
    ApiBadRequestResponseSwagger(),
    ApiNotFoundResponseSwagger(),
    ApiUnauthorizedResponseSwagger(),
  );
}
