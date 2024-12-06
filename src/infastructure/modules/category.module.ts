import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryHandler } from '../persistence/user.repository-handler';
import { CreateBlogPostHandler } from 'src/application/cqrs/command-handlers/blog-post/create-blog-post.command-handler';
import { DeleteBlogPostHandler } from 'src/application/cqrs/command-handlers/blog-post/delete-blog-post.command-handler';
import { UpdateBlogPostHandler } from 'src/application/cqrs/command-handlers/blog-post/update-blog-post.command-handler';
import { GetBlogPostByIdHandler } from 'src/application/cqrs/query-handler/blog-post/get-blog-post-by-id.query-handler';
import { GetBlogPostListHandler } from 'src/application/cqrs/query-handler/blog-post/get-blog-post.query-handler';
import { BlogPostEntity } from 'src/domain/entities/blog-post.entity';
import { UserEntity } from 'src/domain/entities/user.entity';
import { BlogPostController } from 'src/presentation/controllers/blog-post.controller';
import { BlogPostRepositoryHandler } from '../persistence/blog-post.repository-handler';
import { CategoryRepositoryHandler } from '../persistence/category.repository-handler';
import { CategoryEntity } from 'src/domain/entities/category.entity';
import { CreateCategoryHandler } from 'src/application/cqrs/command-handlers/category/create-category.command-handler';
import { GetCategoryByIdHandler } from 'src/application/cqrs/query-handler/category/get-category-by-id.query-handler';
import { GetCategoryListHandler } from 'src/application/cqrs/query-handler/category/get-category.query-handler';
import { DeleteCategoryHandler } from 'src/application/cqrs/command-handlers/category/delete-category.command-handler';
import { CategoryController } from 'src/presentation/controllers/category.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogPostEntity, CategoryEntity]),
    CqrsModule,
  ],
  controllers: [CategoryController],
  providers: [
    CreateCategoryHandler,
    GetCategoryByIdHandler,
    GetCategoryListHandler,
    DeleteCategoryHandler,
    CategoryRepositoryHandler,
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepositoryHandler,
    },
  ],
  exports: [],
})
export class CategoryModule {}
