import { CreateCategoryInputDto } from 'src/domain/dtos/input/category/create-category.dto';

export class CreateCategoryCommand {
  constructor(public readonly createCategroyInputDto: CreateCategoryInputDto) {}
}
