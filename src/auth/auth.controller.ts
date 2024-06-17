import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { AuthMessages } from 'src/common/enums/messages-tcp.enum';
import { NatsService } from 'src/common/enums/services.enum';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NatsService) private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res: Response,
  ) {
    try {
      const { user, token } = await firstValueFrom(
        this.client.send(AuthMessages.Register, registerUserDto),
      );
      res.cookie('access-token', token, {
        httpOnly: true,
      });
      return res.json(user);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const { user, token } = await firstValueFrom(
        this.client.send(AuthMessages.Login, loginUserDto),
      );
      res.cookie('access-token', token, {
        httpOnly: true,
      });
      return res.json(user);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('verify')
  verifyToken() {
    return this.client.send(AuthMessages.Verify, {});
  }
}
