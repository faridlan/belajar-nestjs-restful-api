import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddressWebResponse } from 'src/dto/address.dto';
import {
  ApiBadRequestResponseSwagger,
  ApiNotFoundResponseSwagger,
  ApiSecuritySwagger,
  ApiUnauthorizedResponseSwagger,
} from '../api-utils.swagger';

export function UpdateAddressRequestSwagger() {
  return applyDecorators(
    ApiSecuritySwagger(),
    ApiOperation({
      summary: 'Update Address',
      description: 'Update an existing address for a contact in the system.',
    }),
    ApiResponse({
      status: 200,
      description: 'Address updated successfully',
      type: AddressWebResponse,
    }),
    ApiBadRequestResponseSwagger(),
    ApiNotFoundResponseSwagger(),
    ApiUnauthorizedResponseSwagger(),
  );
}
