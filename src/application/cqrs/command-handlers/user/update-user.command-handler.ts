import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { UpdateUserCommand } from '../../commands/user/update-user.command';
import { UserOutputDTO } from '../../../../domain/dtos/output/user/output-user.dto';
import { Inject } from '@nestjs/common';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: UpdateUserCommand): Promise<UserOutputDTO> {
    const user = await this.userRepository.getById(command.id);
    user.password = command.updateUserInputDto.password;
    user.username = command.updateUserInputDto.username;
    user.mail = command.updateUserInputDto.mail;

    const updatedUser = await this.userRepository.update(user);

    return new UserOutputDTO(
      updatedUser.id.getValue(),
      updatedUser.username.getValue(),
      updatedUser.mail.getValue(),
    );
  }
}
