import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { Auth } from 'src/common/auth.decorator';
import { User } from '@prisma/client';
import { ContactResponse, SearchContactRequest } from 'src/model/contact.model';
import { WebResponse } from 'src/model/web.model';
import { CreateContactSwagger } from 'src/common/swagger/contact/create.swagger';
import { GetContactSwagger } from 'src/common/swagger/contact/get.swagger';
import { UpdateContactRequestSwagger } from 'src/common/swagger/contact/update.swagger';
import { DeleteContactSwagger } from 'src/common/swagger/contact/delete.swagger';
import { SearchContactSwagger } from 'src/common/swagger/contact/search.swagger';
import {
  CreateContactRequest,
  UpdateContactRequest,
} from 'src/dto/contact.dto';

@Controller('/api/contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  @CreateContactSwagger()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Body() request: CreateContactRequest,
  ): Promise<WebResponse<ContactResponse>> {
    const result = await this.contactService.create(user, request);
    return {
      data: result,
    };
  }

  @Get('/:contactId')
  @GetContactSwagger()
  @HttpCode(200)
  async get(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
  ): Promise<WebResponse<ContactResponse>> {
    const result = await this.contactService.get(user, contactId);
    return {
      data: result,
    };
  }

  @Put('/:contactId')
  @UpdateContactRequestSwagger()
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Body() request: UpdateContactRequest,
  ): Promise<WebResponse<ContactResponse>> {
    request.id = contactId;
    const result = await this.contactService.update(user, request);
    return {
      data: result,
    };
  }

  @Delete('/:contactId')
  @DeleteContactSwagger()
  @HttpCode(200)
  async delete(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
  ): Promise<WebResponse<boolean>> {
    await this.contactService.delete(user, contactId);
    return {
      data: true,
    };
  }

  @Get()
  @SearchContactSwagger()
  @HttpCode(200)
  async search(
    @Auth() user: User,
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('phone') phone?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<WebResponse<ContactResponse[]>> {
    const request: SearchContactRequest = {
      name: name,
      email: email,
      phone: phone,
      page: page || 1,
      size: size || 10,
    };

    return this.contactService.search(user, request);
  }
}
