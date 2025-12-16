import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Contact, User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import { ContactResponse, CreateContactRequest } from 'src/model/contact.model';
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

  async get(user: User, contactId: number): Promise<ContactResponse> {
    const contact = await this.prismaService.contact.findFirst({
      where: {
        username: user.username,
        id: contactId,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    return this.toContactResponse(contact);
  }
}
