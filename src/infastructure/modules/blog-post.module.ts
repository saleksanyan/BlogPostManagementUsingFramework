import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryHandler } from '../repository-handlers/user.repository-handler';
import { CreateBlogPostHandler } from 'src/application/cqrs/command-handlers/blog-post/create-blog-post.command-handler';
import { DeleteBlogPostHandler } from 'src/application/cqrs/command-handlers/blog-post/delete-blog-post.command-handler';
import { UpdateBlogPostHandler } from 'src/application/cqrs/command-handlers/blog-post/update-blog-post.command-handler';
import { GetBlogPostByIdHandler } from 'src/application/cqrs/query-handler/blog-post/get-blog-post-by-id.query-handler';
import { GetBlogPostsHandler } from 'src/application/cqrs/query-handler/blog-post/get-blog-post.query-handler';
import { BlogPostEntity } from 'src/domain/entities/blog-post.entity';
import { UserEntity } from 'src/domain/entities/user.entity';
import { BlogPostController } from 'src/presentation/controllers/blog-post.controller';
import { BlogPostRepositoryHandler } from '../repository-handlers/blog-post.repository-handler';

@Module({
    imports: [
        TypeOrmModule.forFeature([BlogPostEntity, UserEntity]),
        CqrsModule,
    ],
    controllers: [BlogPostController],
    providers: [
        CreateBlogPostHandler, 
        UpdateBlogPostHandler, 
        DeleteBlogPostHandler,
        GetBlogPostByIdHandler,
        GetBlogPostsHandler,
        BlogPostRepositoryHandler,
        {
            provide: 'IBlogPostRepository',
            useClass: BlogPostRepositoryHandler,
          },
          {
            provide: 'IUserRepository',
            useClass: UserRepositoryHandler,
          },
    ],
    exports: []
  })
  export class BlogPostModule {}
  