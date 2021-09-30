import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType()
export class GetUsersInput {

  @Field(type => Int)
  id: number;

  @Field(type => String)
  email: string;

  @Field(type => String)
  @Column()
  username: string;
}