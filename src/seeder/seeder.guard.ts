/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  HttpException,
} from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class SeederGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User | undefined = request.user;

    if (!user) {
      throw new ForbiddenException('Unauthorized');
    }

    // OPTION 1: allow only specific username
    if (user.username !== 'admin') {
      throw new HttpException('Only admin can run seeder', 403);
    }

    return true;
  }
}
