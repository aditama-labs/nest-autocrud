import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  username: string;

  @Column({ type: String })
  name: string;
}
