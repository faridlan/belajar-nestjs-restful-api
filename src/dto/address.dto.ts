import { ApiProperty } from '@nestjs/swagger';

export class AddressBaseResponse {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: '123 Main St' })
  street?: string;
  @ApiProperty({ example: 'Springfield' })
  city?: string;
  @ApiProperty({ example: 'IL' })
  province?: string;
  @ApiProperty({ example: 'USA' })
  country: string;
  @ApiProperty({ example: '62701' })
  postal_code: string;
}

export class CreateAddressRequest {
  contact_id: number;
  @ApiProperty({
    example: '123 Main St',
    minLength: 1,
    maxLength: 255,
    required: false,
  })
  street?: string;
  @ApiProperty({
    example: 'Springfield',
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  city?: string;
  @ApiProperty({
    example: 'IL',
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  province?: string;
  @ApiProperty({
    example: 'USA',
    minLength: 1,
    maxLength: 100,
    required: true,
  })
  country: string;
  @ApiProperty({
    example: '62701',
    minLength: 1,
    maxLength: 20,
    required: true,
  })
  postal_code: string;
}

export class UpdateAddressRequest {
  id: number;
  contact_id: number;
  @ApiProperty({
    example: '123 Main St',
    minLength: 1,
    maxLength: 255,
    required: false,
  })
  street?: string;
  @ApiProperty({
    example: 'Springfield',
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  city?: string;
  @ApiProperty({
    example: 'IL',
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  province?: string;
  @ApiProperty({
    example: 'USA',
    minLength: 1,
    maxLength: 100,
    required: true,
  })
  country: string;
  @ApiProperty({
    example: '62701',
    minLength: 1,
    maxLength: 20,
    required: true,
  })
  postal_code: string;
}

export class AddressWebResponse {
  @ApiProperty({ type: AddressBaseResponse })
  data: AddressBaseResponse;
}

export class AddressWebResponses {
  @ApiProperty({ type: [AddressBaseResponse] })
  data: AddressBaseResponse[];
}
