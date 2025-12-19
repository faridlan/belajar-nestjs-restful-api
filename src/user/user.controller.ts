import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
} from '@nestjs/common';
import { UserResponse } from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';
import { UserService } from './user.service';
import { Auth } from 'src/common/auth.decorator';
import { User } from '@prisma/client';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
} from 'src/dto/user.dto';
import { RegisterUserSwagger } from 'src/common/swagger/user/register-user.swagger';
import { LoginSwagger } from 'src/common/swagger/user/login.swagger';
import { CurrentUserSwagger } from 'src/common/swagger/user/current-user.swagger';
import { UpdateUserSwagger } from 'src/common/swagger/user/update-user.swagger';
import { DeleteUserSwagger } from 'src/common/swagger/user/delete-user.swagger';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @RegisterUserSwagger()
  @HttpCode(200)
  async register(
    @Body() request: RegisterUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.register(request);

    return {
      data: result,
    };
  }

  //Login Controller
  @Post('/login')
  @LoginSwagger()
  @HttpCode(200)
  async login(
    @Body() request: LoginUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.login(request);

    return {
      data: result,
    };
  }

  //Get Current User Controller
  @Get('/current')
  @CurrentUserSwagger()
  @HttpCode(200)
  async get(@Auth() user: User): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.get(user);

    return {
      data: result,
    };
  }

  @Patch('/current')
  @UpdateUserSwagger()
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Body() request: UpdateUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.update(user, request);

    return {
      data: result,
    };
  }

  @Delete('/current')
  @DeleteUserSwagger()
  @HttpCode(200)
  async logout(@Auth() user: User): Promise<WebResponse<boolean>> {
    await this.userService.logout(user);

    return {
      data: true,
    };
  }
}
