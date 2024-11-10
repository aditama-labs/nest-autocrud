<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Status

This project is still in development and not ready for production, it's not even ready to install yet. Calling for contributors to help this project.

## Description

Nest Auto CRUD is a library that provides a set of modules, decorator, service, and many more to reduce the boilerplate code.

**I will make the API with backward compatibility, so don't worry about upgrading version**

## Roadmap

### Basic Thing

- Custom body mapping
- Custom validation

### Advanced Support

- Generic support for Prisma ORM [#5273](https://github.com/prisma/prisma/issues/5273)

## Installation

```bash
$ npm install @aditama-labs/nest-autocrud
```

## Example

### Environment Variable

```typescript
// Yes, either Prisma or TypeORM just need this single line of ENV

// PostgreSQL Example
DATABASE_URL =
  'postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public';

// MySQL Example
DATABASE_URL = 'mysql://johndoe:randompassword@localhost:3306/mydb';
```

### Prisma ORM

```typescript
// Your Module
@Module({
  imports: [
    // This module will automatically map your model to the controller
    PrismaModule.forRoot({
      delegate: (prisma: PrismaClient) => prisma.user,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Your Controller
@Controller('examples')
export class AppController extends SkeletonCRUDController {
  // Yes, no need to write anything here
}
```

### TypeORM

```typescript
// Your Entity
@Entity('account')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  username: string;

  @Column({ type: String })
  name: string;
}

// Your Module
@Module({
  // This module will automatically map your model to the controller
  imports: [
    TypeORMModule.forRoot<UserEntity>({
      entity: UserEntity,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Your Controller
@Controller('examples')
export class AppController extends SkeletonCRUDController {
  // Yes, no need to write anything here
}
```

### Output in Terminal

```plaintext
// Expected Output ( As you can see the API is automatically mapped and generated )
[Nest] 125875  - 10/30/2024, 10:57:56 PM     LOG [NestFactory] Starting Nest application...
[Nest] 125875  - 10/30/2024, 10:57:56 PM     LOG [InstanceLoader] PrismaModule dependencies initialized +14ms
[Nest] 125875  - 10/30/2024, 10:57:56 PM     LOG [InstanceLoader] AppModule dependencies initialized +0ms
[Nest] 125875  - 10/30/2024, 10:57:56 PM     LOG [RoutesResolver] AppController {/examples}: +3ms
[Nest] 125875  - 10/30/2024, 10:57:56 PM     LOG [RouterExplorer] Mapped {/examples, POST} route +3ms
[Nest] 125875  - 10/30/2024, 10:57:56 PM     LOG [RouterExplorer] Mapped {/examples/:id, DELETE} route +1ms
[Nest] 125875  - 10/30/2024, 10:57:56 PM     LOG [RouterExplorer] Mapped {/examples/list, GET} route +0ms
[Nest] 125875  - 10/30/2024, 10:57:56 PM     LOG [RouterExplorer] Mapped {/examples, GET} route +1ms
[Nest] 125875  - 10/30/2024, 10:57:56 PM     LOG [RouterExplorer] Mapped {/examples/:id, GET} route +0ms
[Nest] 125875  - 10/30/2024, 10:57:56 PM     LOG [RouterExplorer] Mapped {/examples/:id, PATCH} route +0ms
[Nest] 125875  - 10/30/2024, 10:57:56 PM     LOG [NestApplication] Nest application successfully started +148ms
```

## Support

Nest AutoCRUD is an MIT-licensed open source project.

## Stay in touch

- Author - [Supan Adit Pratama](mailto:email@supanadit.com)
- Website - [https://supanadit.com](https://supanadit.com/)

## License

Nest AutoCRUD is MIT licensed
