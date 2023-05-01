import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get()
	async findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<User | undefined> {
		return this.userService.findOne(id);
	}

	@Post()
	async create(@Body() user: User): Promise<User> {
		return this.userService.createUser(user);
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() user: User): Promise<User | undefined> {
		return this.userService.update(id, user);
	}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<boolean> {
		return this.userService.delete(id);
	}
}
