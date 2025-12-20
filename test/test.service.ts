import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { Address, Contact } from '@prisma/client';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteAll() {
    await this.deleteAddress();
    await this.deleteContact();
    await this.deleteUser();
  }

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async deleteContact() {
    await this.prismaService.contact.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async deleteAddress() {
    await this.prismaService.address.deleteMany({
      where: {
        contact: {
          username: 'test',
        },
      },
    });
  }

  async getUser() {
    return this.prismaService.user.findUnique({
      where: {
        username: 'test',
      },
    });
  }

  async getContact(): Promise<Contact | null> {
    return this.prismaService.contact.findFirst({
      where: {
        username: 'test',
      },
    });
  }

  async getAddress(): Promise<Address | null> {
    return this.prismaService.address.findFirst({
      where: {
        contact: {
          username: 'test',
        },
      },
    });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'test',
        name: 'test',
        password: await bcrypt.hash('test', 10),
        token: 'test',
      },
    });
  }

  async createContact() {
    await this.prismaService.contact.create({
      data: {
        username: 'test',
        first_name: 'test',
        last_name: 'test',
        email: 'test@mail.com',
        phone: '9999',
      },
    });
  }

  async createAddress() {
    const contact = await this.getContact();
    await this.prismaService.address.create({
      data: {
        contact_id: contact!.id,
        street: 'jalan test',
        city: 'kota test',
        province: 'provinsi test',
        country: 'negara test',
        postal_code: '1111',
      },
    });
  }

  async createAdmin() {
    await this.prismaService.user.upsert({
      where: {
        username: 'admin',
      },
      update: {
        token: 'admin', // ensure token is always valid
      },
      create: {
        username: 'admin',
        password: await bcrypt.hash('admin', 10),
        name: 'Admin',
        token: 'admin',
      },
    });
  }

  async getUsers() {
    return this.prismaService.user.findMany();
  }
}
