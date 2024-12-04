import { UserEntity } from '../../../domain/entities/user.entity';
import { UserModel } from '../../../domain/models/user.model';

export class UserMapper {
  static toModel(entity: UserEntity): UserModel {
    return new UserModel(
      entity.username,
      entity.password,
      entity.id
    );
  }

  static toEntity(model: UserModel): UserEntity {
    const userEntity = new UserEntity();
      userEntity.id = model.id;
      userEntity.username = model.username;
      userEntity.password = model.password;

    return userEntity;
  }
}
