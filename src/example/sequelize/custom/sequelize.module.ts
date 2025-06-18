import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Credential } from '@aditama-labs/nest-autocrud/utils';
import { User } from './models/user.model';
import {
    CREATE_PROCESS,
    DELETE_PROCESS,
    LIST_PROCESS,
    PAGINATION_PROCESS,
    READ_PROCESS,
    UPDATE_PROCESS,
} from '@aditama-labs/nest-autocrud/skeleton';
import { SequelizeCreateProcess } from './domain/create.process';
import { SequelizeUpdateProcess } from './domain/update.process';
import { SequelizeDeleteProcess } from './domain/delete.process';
import { SequelizeListProcess } from './domain/list.process';
import { SequelizePaginationProcess } from './domain/pagination.process';
import { SequelizeSimpleController } from './sequelize.controller';


@Module({
    imports: [
        SequelizeModule.forRoot(new Credential(process.env.DATABASE_URL).toSequelizeConfig([User])),
        SequelizeModule.forFeature([User]),
    ],
    controllers: [SequelizeSimpleController],
    providers: [
        {
            provide: CREATE_PROCESS,
            useClass: SequelizeCreateProcess,
        },
        {
            provide: READ_PROCESS,
            useClass: SequelizeCreateProcess,
        },
        {
            provide: UPDATE_PROCESS,
            useClass: SequelizeUpdateProcess,
        },
        {
            provide: DELETE_PROCESS,
            useClass: SequelizeDeleteProcess,
        },
        {
            provide: LIST_PROCESS,
            useClass: SequelizeListProcess,
        },
        {
            provide: PAGINATION_PROCESS,
            useClass: SequelizePaginationProcess,
        },
    ],
})
export class SequelizeCustomModule { }
