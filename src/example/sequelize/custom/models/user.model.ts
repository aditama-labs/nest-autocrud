import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: "account", createdAt: false, updatedAt: false })
export class User extends Model {
    @Column({ primaryKey: true, type: 'uuid' })
    id: string;

    @Column
    username: string;

    @Column
    name: string;
}