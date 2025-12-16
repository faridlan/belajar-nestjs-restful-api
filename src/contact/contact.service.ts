import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Contact, User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import {
  ContactResponse,
  CreateContactRequest,
  UpdateContactRequest,
} from 'src/model/contact.model';
import { Logger } from 'winston';
import { ContactValidation } from './contact.validation';

@Injectable()
export class ContactService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(
    user: User,
    request: CreateContactRequest,
  ): Promise<ContactResponse> {
    this.logger.debug(
      `ConatactService.create (${JSON.stringify(user)},${JSON.stringify(request)})`,
    );

    const contacRequest: CreateContactRequest = this.validationService.validate(
      ContactValidation.CREATE,
      request,
    );

    const contact = await this.prismaService.contact.create({
      data: {
        ...contacRequest,
        ...{ username: user.username },
      },
    });

    return this.toContactResponse(contact);
  }

  toContactResponse(contact: Contact): ContactResponse {
    return {
      id: contact.id,
      first_name: contact.first_name,
      last_name: contact.last_name ?? undefined,
      email: contact.email ?? undefined,
      phone: contact.phone ?? undefined,
    };
  }

  async checkContactMustExist(
    username: string,
    contactId: number,
  ): Promise<Contact> {
    const contact = await this.prismaService.contact.findFirst({
      where: {
        username: username,
        id: contactId,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    return contact;
  }

  async get(user: User, contactId: number): Promise<ContactResponse> {
    const contact = await this.checkContactMustExist(user.username, contactId);

    return this.toContactResponse(contact);
  }

  async update(
    user: User,
    request: UpdateContactRequest,
  ): Promise<ContactResponse> {
    this.logger.debug(
      `ContactService.update (${JSON.stringify(user)},${JSON.stringify(
        request,
      )})`,
    );

    const updateRequest: UpdateContactRequest = this.validationService.validate(
      ContactValidation.UPDATE,
      request,
    );

    let contact = await this.checkContactMustExist(
      user.username,
      updateRequest.id,
    );

    contact = await this.prismaService.contact.update({
      where: {
        username: contact.username,
        id: contact.id,
      },
      data: updateRequest,
    });

    return this.toContactResponse(contact);
  }

  async delete(user: User, contactId: number): Promise<ContactResponse> {
    this.logger.debug(
      `ContactService.delete (${JSON.stringify(user)},${JSON.stringify(
        contactId,
      )})`,
    );

    await this.checkContactMustExist(user.username, contactId);

    const contact = await this.prismaService.contact.delete({
      where: {
        id: contactId,
        username: user.username,
      },
    });

    return this.toContactResponse(contact);
  }
}
