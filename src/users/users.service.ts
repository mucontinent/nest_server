import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUsersInput } from './dto/get-users.input';
import { NewUserInput } from './dto/new-user.input';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

      findAll(): Promise<GetUsersInput[]> {
        return this.usersRepository.find();
      }

      async findUser(email: string): Promise<User>{
        const user = await this.usersRepository.findOneOrFail({email: email});

        console.log(user);

        return user;
      }

      createUser(createUserInput: NewUserInput): Promise<User> {
        const newUser = this.usersRepository.create(createUserInput);

        return this.usersRepository.save(newUser);
      }
}
