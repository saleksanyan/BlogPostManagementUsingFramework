import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BlogPostModel } from '../../../../domain/models/blog-post.model';
import { IBlogPostRepository } from '../../../../domain/repositories/blog-post.repository';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { CreateBlogPostCommand } from '../../commands/blog-post/create-blog-post.command';
import { BlogPostOutputDTO } from '../../../../domain/dtos/output/output-blog-post.dto';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateBlogPostCommand)
export class CreateBlogPostHandler implements ICommandHandler<CreateBlogPostCommand>{
  constructor(
    @Inject('IBlogPostRepository')
    private readonly blogPostRepository: IBlogPostRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: CreateBlogPostCommand): Promise<BlogPostOutputDTO> {
    const author = await this.userRepository.getById(
      command.createBlogPostInputDto.authorId,
    );

    const post = new BlogPostModel(
      command.createBlogPostInputDto.title,
      command.createBlogPostInputDto.content,
      author,
    );
    const createdPost = await this.blogPostRepository.create(post);
  
    return new BlogPostOutputDTO(
      createdPost.id,
      createdPost.title,
      createdPost.content,
      createdPost.author.username,
    );
  }
}
