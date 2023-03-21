import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userDTO: CreateUserDto) {
    return this.userService.create(userDTO);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDTO: UpdateUserDto) {
    return this.userService.update(id, userDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
