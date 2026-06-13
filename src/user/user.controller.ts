import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../models/user.model';

@ApiTags('users')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get()
	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, description: 'Returns a list of all users', type: [User] })
	async findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a user by ID' })
	@ApiParam({ name: 'id', description: 'User ID' })
	@ApiResponse({ status: 200, description: 'Returns the user with the given ID', type: User })
	@ApiResponse({ status: 404, description: 'User not found' })
	async findOne(@Param('id') id: string): Promise<User> {
		const user = await this.userService.findOne(id);
		if (!user) throw new NotFoundException(`User with ID ${id} not found`);
		return user;
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Create a new user' })
	@ApiResponse({ status: 201, description: 'Returns the newly created user', type: User })
	async create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.createUser(createUserDto);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a user by ID' })
	@ApiParam({ name: 'id', description: 'User ID' })
	@ApiResponse({ status: 200, description: 'Returns the updated user', type: User })
	@ApiResponse({ status: 404, description: 'User not found' })
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.userService.update(id, updateUserDto);
		if (!user) throw new NotFoundException(`User with ID ${id} not found`);
		return user;
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Delete a user by ID' })
	@ApiParam({ name: 'id', description: 'User ID' })
	@ApiResponse({ status: 204, description: 'User successfully deleted' })
	@ApiResponse({ status: 404, description: 'User not found' })
	async delete(@Param('id') id: string): Promise<void> {
		const deleted = await this.userService.delete(id);
		if (!deleted) throw new NotFoundException(`User with ID ${id} not found`);
	}
}
