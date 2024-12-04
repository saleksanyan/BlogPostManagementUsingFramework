import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BlogPostMapper } from '../mappers/blog-post/blog-post.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPostNotFoundException } from 'src/application/exceptions/blog-post-not-found.exception';
import { BlogPostEntity } from 'src/domain/entities/blog-post.entity';
import { BlogPostModel } from 'src/domain/models/blog-post.model';
import { IBlogPostRepository } from 'src/domain/repositories/blog-post.repository';

@Injectable()
export class BlogPostRepositoryHandler implements IBlogPostRepository
{
  constructor(
    @InjectRepository(BlogPostEntity)
    private readonly repository: Repository<BlogPostEntity>
  ) {}

  async create(post: BlogPostModel): Promise<BlogPostModel> {
    const entity = this.repository.create(post);
    const savedEntity = await this.repository.save(entity);
    
    return BlogPostMapper.toModel(savedEntity);
  }

  async update(post: BlogPostModel): Promise<BlogPostModel> {
    const entity = BlogPostMapper.toEntity(post);    
    const updatedEntity = await this.repository.save(entity);

    return BlogPostMapper.toModel(updatedEntity);
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new BlogPostNotFoundException(`Blog post with ID ${id} not found`);
    }
  }

  async getById(id: string): Promise<BlogPostModel> {
    const entity = await this.repository.findOne({ where: { id: id}, relations: ['author']});
    if (!entity) {
      throw new BlogPostNotFoundException(`Blog post with ID ${id} not found`);
    }
    
    return BlogPostMapper.toModel(entity);
  }

  async getAll(): Promise<BlogPostModel[]> {
    const entities = await this.repository.find({relations: ['author']});

    return entities.map((entity) => BlogPostMapper.toModel(entity));
  }
}
