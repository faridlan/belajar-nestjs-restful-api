import { ApiProperty } from '@nestjs/swagger';

export class UserBaseResponse {
  @ApiProperty({ example: 'john' })
  username: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;
}

export class LoginUserRequest {
  @ApiProperty({
    example: 'john',
    minLength: 1,
    maxLength: 100,
    description: 'Username (required)',
  })
  username: string;

  @ApiProperty({
    example: 'rahasia123',
    minLength: 1,
    maxLength: 100,
    description: 'Password (required)',
  })
  password: string;
}

export class RegisterUserRequest extends LoginUserRequest {
  @ApiProperty({
    example: 'John Doe',
    minLength: 1,
    maxLength: 100,
    description: 'Name (required)',
  })
  name: string;
}

export class UpdateUserRequest {
  @ApiProperty({
    description: 'Name (optional)',
    example: 'John Doe',
  })
  name?: string;
  @ApiProperty({
    description: 'Password (optional)',
    example: 'newpassword123',
  })
  password?: string;
}

export class LoginResponse extends UserBaseResponse {
  @ApiProperty({ example: 'XXX-YYY-205-88sdj-328hks' })
  token: string;
}

export class LoginWebResponse {
  @ApiProperty({ type: LoginResponse })
  data: LoginResponse;
}

export class UserWebBaseResponse {
  @ApiProperty({ type: UserBaseResponse })
  data: UserBaseResponse;
}
