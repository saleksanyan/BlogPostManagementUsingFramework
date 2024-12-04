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
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/cqrs/commands/user/create-user.command';
import { UpdateUserCommand } from '../../application/cqrs/commands/user/update-user.command';
import { GetUserByIdQuery } from '../../application/cqrs/query/user/get-user-by-id.query';
import { GetUserQuery } from '../../application/cqrs/query/user/get-user.query';
import { UserOutputDTO } from '../../domain/dtos/output/output-user.dto';
import { HttpExceptionFilter } from 'src/application/exception-filter/http.exception-filter';
import { CreateUserInputDto } from 'src/domain/dtos/input/user/create-user.dto';
import { UpdateUserInputDto } from 'src/domain/dtos/input/user/update-user.dto';

@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAllUsers(): Promise<UserOutputDTO[]> {
    const query = new GetUserQuery();
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
    const user = await this.commandBus.execute(command);
    return new UserOutputDTO(user.id, user.username);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserInputDto,
  ): Promise<UserOutputDTO> {
    const command = new UpdateUserCommand(id, body);
    const user = await this.commandBus.execute(command);
    return new UserOutputDTO(user.id, user.username);
  }
}
