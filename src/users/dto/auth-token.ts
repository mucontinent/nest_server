import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthToken {
    @Field(type => String)
    token: string
}