import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@ObjectType()
export class User {

  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({unique: true})
  @Field()
  email: string;


  @Column()
  @Field()
  password: string;
}