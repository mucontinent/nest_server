import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewUserInput } from './dto/new-user.input';
import { User } from './user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { GetUsersInput } from './dto/get-users.input';
import { JwtService } from '@nestjs/jwt';
import { AuthToken } from './dto/auth-token';
import { AuthenticationError } from 'apollo-server-express';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql2-auth.guard';
import { CurrentUser } from './current-user.decorator';

const saltOrRounds = 10;

let validEmail = (email: string) => email.split('@')[1] != 'bancoppel.com' ? true : false;


@Resolver(() => User)
export class UsersResolver {

    constructor(private userService: UsersService, private jwtService: JwtService) { }

    @Query(returns => User)
    user(@Args('email') email: string): Promise<User> {
        const user = this.userService.findUser(email);

        return user;
    }

    @UseGuards(GqlAuthGuard)
    @Query(returns => GetUsersInput)
    async profile(@CurrentUser() user: User) {
        let getUser = this.userService.findUser(user.email);
        (await getUser).username = (await getUser).email.split('@')[0];
        delete (await getUser).password;

        return getUser;
    }


    @Mutation(returns => AuthToken)
    async login(@Args('credentials') credentials: NewUserInput): Promise<AuthToken | typeof AuthenticationError> {
        const user = await this.userService.findUser(credentials.email);

        if (user && (bcrypt.compareSync(credentials.password, user.password))) {
            const payload = { username: (user.email).split('@')[0], user_id: user.id, email: user.email };
            const token = this.jwtService.sign(payload);

            return {
                token
            };
        }
        throw new AuthenticationError('Invalid credentials');
    }

    @Mutation(returns => User)
    async createUser(@Args('data') data: NewUserInput): Promise<User> {
        if (validEmail(data.email)) {
            throw new GraphQLError('The email is not compatible with the domain bancoppel.com')
        }

        const tempPass = data.password;
        data.password = await bcrypt.hash(tempPass, saltOrRounds);
        return this.userService.createUser(data);
    }

}
