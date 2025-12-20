import { ApiProperty } from '@nestjs/swagger';

export class CreateContactRequest {
  @ApiProperty({
    example: 'John',
    minLength: 1,
    maxLength: 100,
    description: 'first_name (required)',
  })
  first_name: string;
  @ApiProperty({
    example: 'Doe',
    minLength: 1,
    maxLength: 100,
    description: 'lastname (optional)',
  })
  last_name?: string;
  @ApiProperty({
    example: 'john@mail.com',
    minLength: 1,
    maxLength: 100,
    description: 'email (optional)',
  })
  email?: string;
  @ApiProperty({
    example: '9999',
    minLength: 1,
    maxLength: 100,
    description: 'phone (optional)',
  })
  phone?: string;
}

export class UpdateContactRequest {
  id: number;
  @ApiProperty({
    example: 'John',
    minLength: 1,
    maxLength: 100,
    description: 'first_name (required)',
  })
  first_name: string;
  @ApiProperty({
    example: 'Doe',
    minLength: 1,
    maxLength: 100,
    description: 'lastname (optional)',
  })
  last_name?: string;
  @ApiProperty({
    example: 'john@mail.com',
    minLength: 1,
    maxLength: 100,
    description: 'email (optional)',
  })
  email?: string;
  @ApiProperty({
    example: '9999',
    minLength: 1,
    maxLength: 100,
    description: 'phone (optional)',
  })
  phone?: string;
}

export class ContactResponse {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'John' })
  first_name: string;
  @ApiProperty({ example: 'Doe' })
  last_name?: string;
  @ApiProperty({ example: 'john@mail.com' })
  email?: string;
  @ApiProperty({ example: '9999' })
  phone?: string;
}

export class ContactWebResponse {
  @ApiProperty({ type: ContactResponse })
  data: ContactResponse;
}

export class ContactWebResponses {
  @ApiProperty({ type: ContactResponse })
  data: ContactResponse[];
}
