import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBlogPostRepository } from '../../../../domain/repositories/blog-post.repository';
import { BlogPostOutputDTO } from '../../../../domain/dtos/output/blog-post/output-blog-post.dto';
import { Inject } from '@nestjs/common';
import { UpdateStatusCommand } from '../../commands/blog-post/update-status.command';

@CommandHandler(UpdateStatusCommand)
export class UpdateStatusHandler
  implements ICommandHandler<UpdateStatusCommand>
{
  constructor(
    @Inject('IBlogPostRepository')
    private readonly blogPostRepository: IBlogPostRepository,
  ) {}

  async execute(command: UpdateStatusCommand): Promise<BlogPostOutputDTO> {
    const post = await this.blogPostRepository.updateStatus(
      command.id,
      command.updateStatusInputDto,
    );

    return new BlogPostOutputDTO(
      post.id.getValue(),
      post.title.getValue(),
      post.content.getValue(),
      post.author.username.getValue(),
      post.categories.map((category) => category.name.getValue()),
      post.status,
    );
  }
}
