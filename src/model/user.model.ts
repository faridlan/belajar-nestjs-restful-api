import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRequest {
  username: string;
  password: string;
  name: string;
}

export class UserResponse {
  @ApiProperty({ example: 'john' })
  username: string;
  @ApiProperty({ example: 'John Doe' })
  name: string;
  @ApiProperty({ example: 'XXX-YYY-205-88sdj-328hks' })
  token?: string;
}

export class LoginUserRequest {
  @ApiProperty({ example: 'john' })
  username: string;
  @ApiProperty({ example: 'rahasia123' })
  password: string;
}

export class UpdateUserRequest {
  name?: string;
  password?: string;
}
