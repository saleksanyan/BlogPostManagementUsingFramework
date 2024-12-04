import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IBlogPostRepository } from '../../../../domain/repositories/blog-post.repository';
import { GetBlogPostByIdQuery } from '../../query/blog-post/get-blog-post-by-id.query';
import { BlogPostOutputDTO } from '../../../../domain/dtos/output/output-blog-post.dto';
import { Inject } from '@nestjs/common';

@QueryHandler(GetBlogPostByIdQuery)
export class GetBlogPostByIdHandler implements IQueryHandler<GetBlogPostByIdQuery>{
  constructor(
    @Inject('IBlogPostRepository')
    private readonly blogPostRepository: IBlogPostRepository,
  ) {}

  async execute(query: GetBlogPostByIdQuery): Promise<BlogPostOutputDTO> {
    const post = await this.blogPostRepository.getById(query.id);

    return new BlogPostOutputDTO(
      post.id,
      post.title,
      post.content,
      post.author.username,
    );
  }
}
