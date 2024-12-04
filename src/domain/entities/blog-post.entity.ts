import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('blog_post')
export class BlogPostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.blogPosts, { onDelete: 'CASCADE' })
  author: UserEntity;
}
