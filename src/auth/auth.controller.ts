import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthMessages } from 'src/common/enums/messages-tcp.enum';
import { NatsService } from 'src/common/enums/services.enum';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NatsService) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send(AuthMessages.Register, registerUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send(AuthMessages.Login, loginUserDto);
  }

  @Post('verify')
  verifyToken() {
    return this.client.send(AuthMessages.Verify, {});
  }
}
