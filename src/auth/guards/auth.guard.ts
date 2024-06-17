import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { AuthMessages } from 'src/common/enums/messages-tcp.enum';
import { NatsService } from 'src/common/enums/services.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(NatsService) private readonly client: ClientProxy) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const { user, token: newToken } = await firstValueFrom(
        this.client.send(AuthMessages.Verify, token),
      );
      request.user = user;
      request.token = newToken;
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
