# Quick Information

The main source of the library is on directory `libs/`. The `src/` directory is used for the examples. Each new feature and possible scenario will have an example in the `src/` directory.

This library is used to create AutoCRUD APIs quickly and easily without sacrificing flexibility, performance, security, scalability, and maintainability.

The foundation of the library is on `libs/skeleton/` which provides the core functionality that can be extended and customized as needed. For example we officially support `libs/prisma/` for Prisma ORM and `libs/typeorm/` for TypeORM, but developers can create their own ORM or database layer by extending the skeleton.

Core concepts of this library is simplified into three main components:

1. **Controllers**: These handle incoming requests and route them to the appropriate executors.
2. **Executors**: These are responsible for executing the business logic and interacting with the data layer.
3. **Processors**: These handle the data processing and transformation before sending the response back to the client.

So the flow of a request is: Request -> Controller -> Executor -> Processor -> Response.

We also provide predefined pairs of executors and processors for common use cases, such as following:

- `libs/skeleton/src/executors/create.executor.ts` and `libs/skeleton/src/processors/create.processor.ts` for creating resources.
- `libs/skeleton/src/executors/read.executor.ts` and `libs/skeleton/src/processors/read.processor.ts` for reading resources.
- `libs/skeleton/src/executors/update.executor.ts` and `libs/skeleton/src/processors/update.processor.ts` for updating resources.
- `libs/skeleton/src/executors/delete.executor.ts` and `libs/skeleton/src/processors/delete.processor.ts` for deleting resources.
- `libs/skeleton/src/executors/pagination.executor.ts` and `libs/skeleton/src/processors/pagination.processor.ts` for paginating resources.
- `libs/skeleton/src/executors/list.executor.ts` and `libs/skeleton/src/processors/list.processor.ts` for return a list of resources without pagination.

For the controller side, we have predefined controllers and routes for common use cases, in `libs/skeleton/src/controllers/skeleton-crud.controller.ts` such as:

- `SkeletonCRUDController` for all in one CRUD operations.
- `SkeletonUpdateController` for only update operations.
- `SkeletonDeleteController` for only delete operations.
- `SkeletonReadController` for only read operations.
- `SkeletonCreateController` for only create operations.
- `SkeletonListController` for listing resources without pagination.
- `SkeletonPaginationController` for paginating resources.
- `SkeletonDetailController` for getting a single resource by ID.
- `CustomCRUDController` for custom identifiers but the rest is same as `SkeletonCRUDController`.
