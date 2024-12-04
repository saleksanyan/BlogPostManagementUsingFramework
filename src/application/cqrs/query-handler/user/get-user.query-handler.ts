import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { GetUserQuery } from '../../query/user/get-user.query';
import { UserOutputDTO } from '../../../..//domain/dtos/output/output-user.dto';
import { Inject } from '@nestjs/common';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery>{
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: GetUserQuery): Promise<UserOutputDTO[]> {
    const users =  await this.userRepository.getAll();
    return users.map((user) => new UserOutputDTO(user.id, user.username))
  }
}
