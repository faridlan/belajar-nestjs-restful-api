import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
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

    const result = await this.prismaService.contact.create({
      data: {
        ...contacRequest,
        ...{ username: user.username },
      },
    });

    return {
      id: result.id,
      first_name: result.first_name,
      last_name: result.last_name ?? undefined,
      email: result.email ?? undefined,
      phone: result.phone ?? undefined,
    };
  }
}
