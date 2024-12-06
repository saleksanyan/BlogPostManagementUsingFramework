import { UpdateStatusInputDto } from 'src/domain/dtos/input/blog-post/update-status.dto';

export class UpdateStatusCommand {
  constructor(
    public readonly id: string,
    public readonly updateStatusInputDto: UpdateStatusInputDto,
  ) {}
}
