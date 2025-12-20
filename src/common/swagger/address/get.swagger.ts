import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponseSwagger,
  ApiSecuritySwagger,
  ApiUnauthorizedResponseSwagger,
} from '../api-utils.swagger';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddressWebResponse } from 'src/dto/address.dto';

export function GetAddressSwagger() {
  return applyDecorators(
    ApiSecuritySwagger(),
    ApiOperation({
      summary: 'Get Address',
      description: 'Retrieve an address by its ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Address retrieved successfully',
      type: AddressWebResponse,
    }),
    ApiNotFoundResponseSwagger(),
    ApiUnauthorizedResponseSwagger(),
  );
}
