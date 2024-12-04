import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBlogPostRepository } from '../../../../domain/repositories/blog-post.repository';
import { UpdateBlogPostCommand } from '../../commands/blog-post/update-blog-post.command';
import { BlogPostOutputDTO } from '../../../../domain/dtos/output/output-blog-post.dto';
import { Inject } from '@nestjs/common';

@CommandHandler(UpdateBlogPostCommand)
export class UpdateBlogPostHandler implements ICommandHandler<UpdateBlogPostCommand>{
  constructor(
    @Inject('IBlogPostRepository')
    private readonly blogPostRepository: IBlogPostRepository,
  ) {}

  async execute(command: UpdateBlogPostCommand): Promise<BlogPostOutputDTO> {
    const post = await this.blogPostRepository.getById(
      command.id,
    );
    
      post.content = command.updateBlogPostInputDto.content;
      post.title = command.updateBlogPostInputDto.title;

      const updatedPost = await this.blogPostRepository.update(post);

      return new BlogPostOutputDTO(
        updatedPost.id,
        updatedPost.title,
        updatedPost.content,
        updatedPost.author.username,
      );
  }
}
