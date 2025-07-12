import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DefaultProcess } from './default.process';

export abstract class AuthProcess extends DefaultProcess {
  public payload;

  constructor(private jwtService: JwtService) {
    super();
  }

  abstract validate(): Promise<boolean>;

  async before(): Promise<void> {
    const isValid = await this.validate();
    if (!isValid) {
      throw new UnauthorizedException();
    }
  }

  async after(): Promise<void> {
    const token = await this.jwtService.signAsync(this.payload, {
      expiresIn: '24h',
    });
    this.result = {
      access_token: token,
    };
  }
}
