import { BlogPostEntity } from '../../../domain/entities/blog-post.entity';
import { BlogPostModel } from '../../../domain/models/blog-post.model';
import { UserMapper } from '../user/user.mapper';

export class BlogPostMapper {
  static toModel(entity: BlogPostEntity): BlogPostModel {
    console.log("THE AUTHOR ", entity.author);
    
    return new BlogPostModel(
      entity.title,
      entity.content,
      UserMapper.toModel(entity.author),
      entity.id,
    );
  }

  static toEntity(model: BlogPostModel): BlogPostEntity {
    const postEntity = new BlogPostEntity();
    postEntity.id = model.id;
      postEntity.title = model.title;
      postEntity.content = model.content;
      postEntity.author = UserMapper.toEntity(model.author);

      return postEntity;
  }
}
