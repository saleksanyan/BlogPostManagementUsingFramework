import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateBlogPostInputDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  constructor(title: string, content: string, authorId: string) {
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }
}
