import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsFQDN, Length, MaxLength } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(50)
  @IsEmail()
  email: string;

  @Field()
  @Length(5, 50)
  password: string;
}