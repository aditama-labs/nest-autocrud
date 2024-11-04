import { Module } from '@nestjs/common';
import { SimpleModule } from './example/simple/simple.module';
import { CustomModule } from './example/custom/custom.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const getDatabaseCredential = (): any => {
  const url = new URL(process.env.DATABASE_URL);

  // Extract the necessary components
  const username = url.username;
  const password = url.password;
  const host = url.hostname;
  const port = url.port;
  const databaseName = url.pathname.substring(1); // Remove the leading slash
  return {
    type: 'postgres',
    host: host,
    port: port,
    username: username,
    password: password,
    database: databaseName,
    entities: [],
    synchronize: true,
  };
};

@Module({
  imports: [
    SimpleModule,
    CustomModule,
    TypeOrmModule.forRoot(getDatabaseCredential()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
