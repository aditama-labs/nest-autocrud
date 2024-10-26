import { CreateProcess } from '@autocrud/skeleton/processes/create.process';
import { Prisma, PrismaClient } from '@prisma/client';

export abstract class PrismaCreateProcess implements CreateProcess {
  constructor(private readonly prisma: PrismaClient) {}

  abstract initialization(): T;
  abstract before(): T;
  abstract begin(): T;
  process(): T {
    this.prisma['asd'].create({
      data,
    });
  }
  abstract end(): T;
  abstract after(): T;
  abstract result(): R;
}
