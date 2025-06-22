import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UsersService } from './users.service';
import { Role } from '../common/enums/role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  findAll(
    @Query('role') role?: string,
    @Query('sortBy') sortBy: 'name' | 'createdAt' = 'name',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.usersService.findAll(role, sortBy, order);
  }

  @Get('inactive')
  @Roles(Role.Admin)
  findInactiveUsers() {
    return this.usersService.findInactiveUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    if (req.user.role !== Role.Admin && req.user.userId !== +id) {
      throw new ForbiddenException('Acesso negado');
    }
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() userData) {
    return this.usersService.create(userData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData, @Request() req) {
    if (req.user.role !== Role.Admin && req.user.userId !== +id) {
      throw new ForbiddenException('Acesso negado');
    }
    return this.usersService.update(+id, updateData);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
