import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserInputDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  constructor(password: string, username: string) {
    this.password = password;
    this.username = username;
  }
}
