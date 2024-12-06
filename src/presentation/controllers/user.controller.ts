import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  HttpCode,
  UseFilters,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/cqrs/commands/user/create-user.command';
import { UpdateUserCommand } from '../../application/cqrs/commands/user/update-user.command';
import { GetUserByIdQuery } from '../../application/cqrs/query/user/get-user-by-id.query';
import { GetUserListQuery } from '../../application/cqrs/query/user/get-user.query';
import { UserOutputDTO } from '../../domain/dtos/output/user/output-user.dto';
import { HttpExceptionFilter } from 'src/application/exception-filter/http.exception-filter';
import { CreateUserInputDto } from 'src/domain/dtos/input/user/create-user.dto';
import { UpdateUserInputDto } from 'src/domain/dtos/input/user/update-user.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UsersWithCount } from 'src/domain/dtos/output/return-types/user.return-type';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from 'src/domain/constants/pagination.constant';

@UseFilters(HttpExceptionFilter)
@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  x;
  @Get('/list')
  async getUserList(
    @Query('page') page = DEFAULT_PAGE,
    @Query('limit') limit = DEFAULT_LIMIT,
  ): Promise<UsersWithCount> {
    const options: IPaginationOptions = { page, limit };
    const query = new GetUserListQuery(options);
    return await this.queryBus.execute(query);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserOutputDTO> {
    const query = new GetUserByIdQuery(id);
    return await this.queryBus.execute(query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUserInputDto): Promise<UserOutputDTO> {
    const command = new CreateUserCommand(body);
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserInputDto,
  ): Promise<UserOutputDTO> {
    const command = new UpdateUserCommand(id, body);
    return await this.commandBus.execute(command);
  }
}
