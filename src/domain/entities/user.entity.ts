import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BlogPostEntity } from './blog-post.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => BlogPostEntity, (blogPost) => blogPost.author)
  blogPosts: BlogPostEntity[];
}
