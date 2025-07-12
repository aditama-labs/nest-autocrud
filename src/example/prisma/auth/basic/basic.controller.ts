import { AuthExecutor } from '@aditama-labs/nest-autocrud/skeleton/src/executors/auth.executor';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcryptjs';
import { AuthGuard } from 'libs';
import { PrismaBasicAuthProcess } from './domain/auth.process';

@Controller('auth/basic/prisma')
export class PrismaAuthBasicController {
  constructor(private readonly process: PrismaBasicAuthProcess) {}

  @Post()
  async auth(@Body() body: any): Promise<any> {
    return await AuthExecutor.bootstrap(this.process, body);
  }

  // This endpoint is for generating a hashed password, ( Demo Purpose)
  // You can save generated password to your database manually.
  @Post('password/generate')
  async generatePassword(@Body() body: any): Promise<any> {
    let payload = body;
    if (payload.password && payload.password.length > 0) {
      // If it does, hash the password
      payload.password = this.hashPassword(payload.password);
    }
    return payload;
  }

  // Test Guard
  @Get('protected')
  @UseGuards(AuthGuard)
  async protectedRoute(): Promise<string> {
    return 'This is a protected route, you have access!';
  }

  private hashPassword(password: string): string {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }
}
