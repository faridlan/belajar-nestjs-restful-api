import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Address, User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
} from 'src/model/address.model';
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

    const address = await this.prismaService.address.create({
      data: addressRequest,
    });

    return this.toAddressResponse(address);
  }

  toAddressResponse(address: Address): AddressResponse {
    return {
      id: address.id,
      street: address.street ?? undefined,
      city: address.city ?? undefined,
      province: address.province ?? undefined,
      country: address.country,
      postal_code: address.postal_code,
    };
  }

  async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    this.logger.debug(
      `AddressService.get (${JSON.stringify(user)},${JSON.stringify(request)})`,
    );

    const getAddressRequest: GetAddressRequest =
      this.validationService.validate(AddressValidation.GET, request);

    await this.contactService.checkContactMustExist(
      user.username,
      getAddressRequest.contact_id,
    );

    const address = await this.prismaService.address.findFirst({
      where: {
        id: getAddressRequest.address_id,
        contact_id: getAddressRequest.contact_id,
      },
    });

    if (!address) {
      throw new HttpException('Address not found', 404);
    }

    return this.toAddressResponse(address);
  }
}
