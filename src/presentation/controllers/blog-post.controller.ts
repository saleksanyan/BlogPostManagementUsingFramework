import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBlogPostCommand } from 'src/application/cqrs/commands/blog-post/create-blog-post.command';
import { DeleteBlogPostCommand } from 'src/application/cqrs/commands/blog-post/delete-blog-post.command';
import { UpdateBlogPostCommand } from 'src/application/cqrs/commands/blog-post/update-blog-post.command';
import { GetBlogPostByIdQuery } from 'src/application/cqrs/query/blog-post/get-blog-post-by-id.query';
import { GetBlogPostsQuery } from 'src/application/cqrs/query/blog-post/get-blog-post.query';
import { HttpExceptionFilter } from 'src/application/exception-filter/http.exception-filter';
import { CreateBlogPostInputDto } from 'src/domain/dtos/input/blog-post/create-blog-post.dto';
import { UpdateBlogPostInputDto } from 'src/domain/dtos/input/blog-post/update-blog-post.dto';
import { BlogPostOutputDTO } from 'src/domain/dtos/output/output-blog-post.dto';

@UseFilters(HttpExceptionFilter)
@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAllPosts(): Promise<BlogPostOutputDTO[]> {
    const query = new GetBlogPostsQuery();
    return await this.queryBus.execute(query);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<BlogPostOutputDTO> {
    const query = new GetBlogPostByIdQuery(id);
    return await this.queryBus.execute(query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() body: CreateBlogPostInputDto): Promise<BlogPostOutputDTO> {
    const command = new CreateBlogPostCommand(body);
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() body: UpdateBlogPostInputDto,
  ): Promise<BlogPostOutputDTO> {
    console.log(body);
    
    const command = new UpdateBlogPostCommand(id, body);
    console.log("AFTER COMMAND ");
    
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param('id') id: string): Promise<void> {
    const command = new DeleteBlogPostCommand(id);
    await this.commandBus.execute(command);
  }
}
