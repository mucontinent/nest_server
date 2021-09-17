import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewUserInput } from './dto/new-user.input';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {

    constructor(private userService: UsersService){}

    @Query(returns => [User])
    users(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Mutation(returns => User)
    createUser(@Args('data') data: NewUserInput) : Promise<User> {
        return this.userService.createUser(data);
    }

}
