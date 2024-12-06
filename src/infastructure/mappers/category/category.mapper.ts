import { CategoryEntity } from 'src/domain/entities/category.entity';
import { CategoryModel } from 'src/domain/models/category.model';

export class CategoryMapper {
  static toModel(entity: CategoryEntity): CategoryModel {
    return new CategoryModel(entity.name, entity.id);
  }

  static toEntity(model: CategoryModel): CategoryEntity {
    const categoryEntity = new CategoryEntity();
    categoryEntity.id = model.id.getValue();
    categoryEntity.name = model.name.getValue();
    return categoryEntity;
  }
}
