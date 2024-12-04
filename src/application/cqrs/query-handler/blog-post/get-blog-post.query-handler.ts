import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IBlogPostRepository } from '../../../../domain/repositories/blog-post.repository';
import { GetBlogPostsQuery } from '../../query/blog-post/get-blog-post.query';
import { BlogPostOutputDTO } from '../../../..//domain/dtos/output/output-blog-post.dto';
import { Inject } from '@nestjs/common';

@QueryHandler(GetBlogPostsQuery)
export class GetBlogPostsHandler implements IQueryHandler<GetBlogPostsQuery>{
  constructor(
    @Inject('IBlogPostRepository')
    private readonly blogPostRepository: IBlogPostRepository,
  ) {}

  async execute(query: GetBlogPostsQuery): Promise<BlogPostOutputDTO[]> {
    const posts = await this.blogPostRepository.getAll();

    return posts.map(
      (post) =>
        new BlogPostOutputDTO(
          post.id,
          post.title,
          post.content,
          post.author.username,
        ),
    );
  }
}
