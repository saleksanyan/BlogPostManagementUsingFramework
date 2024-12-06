import { UpdateUserInputDto } from '../../../../domain/dtos/input/user/update-user.dto';

export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly updateUserInputDto: UpdateUserInputDto,
  ) {}
}
