import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.user = {
        id: '454554',
        name: 'John Doe',
        email: 'john@email.com',
      };
      request.token = token;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const cookies = request.cookies;
    const token = cookies['access-token'] ? cookies['access-token'] : undefined;
    return token;
  }
}
