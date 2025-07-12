import { AuthProcess } from '@aditama-labs/nest-autocrud/skeleton/src/processes/auth.process';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { PRISMA_DELEGATE } from 'libs';

@Injectable()
export class PrismaBasicAuthProcess extends AuthProcess {
  public payload;

  constructor(
    @Inject(PRISMA_DELEGATE)
    private delegate: any,
    jwtService: JwtService,
  ) {
    super(jwtService);
  }

  async validate(): Promise<boolean> {
    const user = await this.delegate.findUnique({
      where: { username: this.payload.username },
    });

    if (!user || !compareSync(this.payload.password, user.password)) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
