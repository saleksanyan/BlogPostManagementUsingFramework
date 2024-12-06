import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BlogPostModel } from '../../../../domain/models/blog-post.model';
import { IBlogPostRepository } from '../../../../domain/repositories/blog-post.repository';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { CreateBlogPostCommand } from '../../commands/blog-post/create-blog-post.command';
import { BlogPostOutputDTO } from '../../../../domain/dtos/output/blog-post/output-blog-post.dto';
import { Inject } from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { EmailService } from 'src/application/services/email.service';

@CommandHandler(CreateBlogPostCommand)
export class CreateBlogPostHandler
  implements ICommandHandler<CreateBlogPostCommand>
{
  constructor(
    @Inject('IBlogPostRepository')
    private readonly blogPostRepository: IBlogPostRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    private readonly emailService: EmailService,
  ) {}

  async execute(command: CreateBlogPostCommand): Promise<BlogPostOutputDTO> {
    const author = await this.userRepository.getById(
      command.createBlogPostInputDto.authorId,
    );

    const categories = await this.categoryRepository.findByIds(
      command.createBlogPostInputDto.categories,
    );

    const post = new BlogPostModel(
      command.createBlogPostInputDto.title,
      command.createBlogPostInputDto.content,
      author,
      categories,
    );
    const createdPost = await this.blogPostRepository.create(post);

    // const postLink = `https://localhost:3000/post/${post.id}`;
    // await this.emailService.sendPostCreationEmail(author.username.getValue(), post.title.getValue(), postLink);

    return new BlogPostOutputDTO(
      createdPost.id.getValue(),
      createdPost.title.getValue(),
      createdPost.content.getValue(),
      createdPost.author.username.getValue(),
      createdPost.categories.map((category) => category.name.getValue()),
      createdPost.status,
    );
  }
}
