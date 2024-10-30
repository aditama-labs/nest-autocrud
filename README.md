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

## Roadmap

### Basic Thing

- Basic CRUD Controller with unique selection is ID and general request body
- Custom Read Query Unique Selection
- Custom body mapping
- Custom validation

### Tailored Controller Abstraction

- Controller options for only read and update
- Controller options for only create and delete
- Controller options for only read
- Controller options for only update
- Controller options for only create
- Controller options for only delete
- Controller options for only read and create

### Advanced Support

- Generic support for Prisma ORM [#5273](https://github.com/prisma/prisma/issues/5273)

## Installation

```bash
$ npm install @aditama-labs/nest-autocrud
```

## Example

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
export class AppController extends SkeletonCRUDController {}

// Expected Output
[Nest] 101445  - 10/30/2024, 9:12:20 PM     LOG [NestFactory] Starting Nest application...
[Nest] 101445  - 10/30/2024, 9:12:20 PM     LOG [InstanceLoader] PrismaModule dependencies initialized +14ms
[Nest] 101445  - 10/30/2024, 9:12:20 PM     LOG [InstanceLoader] AppModule dependencies initialized +0ms
[Nest] 101445  - 10/30/2024, 9:12:20 PM     LOG [RoutesResolver] AppController {/example}: +4ms
[Nest] 101445  - 10/30/2024, 9:12:20 PM     LOG [RouterExplorer] Mapped {/example, POST} route +2ms
[Nest] 101445  - 10/30/2024, 9:12:20 PM     LOG [RouterExplorer] Mapped {/example/:id, DELETE} route +0ms
[Nest] 101445  - 10/30/2024, 9:12:20 PM     LOG [RouterExplorer] Mapped {/example/list, GET} route +1ms
[Nest] 101445  - 10/30/2024, 9:12:20 PM     LOG [RouterExplorer] Mapped {/example, GET} route +0ms
[Nest] 101445  - 10/30/2024, 9:12:20 PM     LOG [RouterExplorer] Mapped {/example/:id, GET} route +0ms
[Nest] 101445  - 10/30/2024, 9:12:20 PM     LOG [RouterExplorer] Mapped {/example, PATCH} route +1ms
[Nest] 101445  - 10/30/2024, 9:12:20 PM     LOG [NestApplication] Nest application successfully started +198ms
```

### TypeORM

_COMING SOON_

## Support

Nest AutoCRUD is an MIT-licensed open source project.

## Stay in touch

- Author - [Supan Adit Pratama](mailto:email@supanadit.com)
- Website - [https://supanadit.com](https://supanadit.com/)

## License

Nest AutoCRUD is MIT licensed
