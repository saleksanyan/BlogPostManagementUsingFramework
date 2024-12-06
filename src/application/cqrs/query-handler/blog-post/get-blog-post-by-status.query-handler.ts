import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IBlogPostRepository } from '../../../../domain/repositories/blog-post.repository';
import { BlogPostOutputDTO } from '../../../../domain/dtos/output/blog-post/output-blog-post.dto';
import { Inject } from '@nestjs/common';
import { BlogPostsWithCount } from 'src/domain/dtos/output/return-types/blog-post.return-type';
import { GetBlogPostByStatusQuery } from '../../query/blog-post/get-blog-post-by-status.query';

@QueryHandler(GetBlogPostByStatusQuery)
export class GetBlogPostByStatusHandler
  implements IQueryHandler<GetBlogPostByStatusQuery>
{
  constructor(
    @Inject('IBlogPostRepository')
    private readonly blogPostRepository: IBlogPostRepository,
  ) {}

  async execute(query: GetBlogPostByStatusQuery): Promise<BlogPostsWithCount> {
    const postsWithPagination = await this.blogPostRepository.getByStatus(
      query.status,
      query.options,
    );

    const outputPosts = postsWithPagination.items.map(
      (post) =>
        new BlogPostOutputDTO(
          post.id.getValue(),
          post.title.getValue(),
          post.content.getValue(),
          post.author.username.getValue(),
          post.categories.map((category) => category.name.getValue()),
          post.status,
        ),
    );
    const postsWithCount = new BlogPostsWithCount(
      outputPosts,
      postsWithPagination.meta.totalItems,
    );

    return postsWithCount;
  }
}
