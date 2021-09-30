import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { MonitoringKeysModule } from './monitoring-keys/monitoring-keys.module';
import { MonitoringKeys } from './monitoring-keys/dto/new-data';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Development2021*',
      database: 'bcplinv',
      entities: [User, MonitoringKeys],
      synchronize: true
    }),
    UsersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: false,
      playground: true,
      context: ({ req }) => ({ ...req }),
    }),
    MonitoringKeysModule,
  ]
})
export class AppModule { }
