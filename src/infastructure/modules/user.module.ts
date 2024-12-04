import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserHandler } from 'src/application/cqrs/command-handlers/user/create-user.command-handler';
import { UpdateUserHandler } from 'src/application/cqrs/command-handlers/user/update-user.command-handler';
import { GetUserByIdHandler } from 'src/application/cqrs/query-handler/user/get-user-by-id.query-handler';
import { GetUserHandler } from 'src/application/cqrs/query-handler/user/get-user.query-handler';
import { UserEntity } from 'src/domain/entities/user.entity';
import { UserController } from 'src/presentation/controllers/user.controller';
import { UserRepositoryHandler } from '../repository-handlers/user.repository-handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CqrsModule,
],
  controllers: [UserController],
  providers: [
    CreateUserHandler,
    UpdateUserHandler,
    GetUserByIdHandler,
    GetUserHandler,
    UserRepositoryHandler,
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryHandler,
    },
  ],
  exports: []
})
export class UserModule {}
