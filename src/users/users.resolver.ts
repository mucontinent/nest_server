import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewUserInput } from './dto/new-user.input';
import { User } from './user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { GetUsersInput } from './dto/get-users.input';

const saltOrRounds = 10;

let validEmail = (email: string) => email.split('@')[1] != 'bancoppel.com' ? true : false;


@Resolver(of => User)
export class UsersResolver {

    constructor(private userService: UsersService){}

    @Query(returns => [GetUsersInput])
    users(): Promise<GetUsersInput[]> {
        return this.userService.findAll();
    }

    @Query(returns => User)
    user(@Args('email') email: string) : Promise<User> {
        const user = this.userService.findUser(email);

        return user;
    }

    @Mutation(returns => User)
    async createUser(@Args('data') data: NewUserInput) : Promise<User> {
        if(validEmail(data.email)){
            throw new GraphQLError('The email is not compatible with the domain bancoppel.com')
        }

        const tempPass = data.password;
        data.password = await bcrypt.hash(tempPass, saltOrRounds);

        console.log(data.password);
        return this.userService.createUser(data);
    }

}
