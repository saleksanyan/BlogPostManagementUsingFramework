import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { BlogPostEntity } from '../../domain/entities/blog-post.entity';
import { UserEntity } from '../../domain/entities/user.entity';

config({ path: `.env` });

export const createDataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions => {
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DB'),
    synchronize: false,
    logging: true,
    entities: [UserEntity, BlogPostEntity],
    migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
    migrationsTableName: 'migrations',
    migrationsRun: false,
  };
};

const configService = new ConfigService();
export const AppDataSource = new DataSource(
  createDataSourceOptions(configService),
);
