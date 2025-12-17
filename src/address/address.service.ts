import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import { AddressResponse, CreateAddressRequest } from 'src/model/address.model';
import { Logger } from 'winston';
import { AddressValidation } from './address.validation';
import { ContactService } from 'src/contact/contact.service';

@Injectable()
export class AddressService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private contactService: ContactService,
  ) {}

  async create(
    user: User,
    request: CreateAddressRequest,
  ): Promise<AddressResponse> {
    this.logger.debug(`AddressService.create (${JSON.stringify(request)})`);

    const addressRequest: CreateAddressRequest =
      this.validationService.validate(AddressValidation.CREATE, request);

    await this.contactService.checkContactMustExist(
      user.username,
      addressRequest.contact_id,
    );

    const adsress = await this.prismaService.address.create({
      data: addressRequest,
    });

    return {
      id: adsress.id,
      street: adsress.street ?? undefined,
      city: adsress.city ?? undefined,
      province: adsress.province ?? undefined,
      country: adsress.country,
      postal_code: adsress.postal_code,
    };
  }
}
