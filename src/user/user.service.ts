import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { IUserService } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ users: [] }).write();

@Injectable()
export class UserService implements IUserService {
	async findAll(): Promise<User[]> {
		return db.get('users').value();
	}

	async findOne(id: string): Promise<User | undefined> {
		return db.get('users').find({ id }).value();
	}

	async create(user: User): Promise<User> {
		db.get('users').push(user).write();
		return user;
	}

	createUser(dto: CreateUserDto): User {
		const maxId = db.get('users').map('id').max().value() || 0;
		const newId = Number(maxId) + 1;
		const newUser: User = { ...dto, id: newId.toString() };
		db.get('users').push(newUser).write();
		return newUser;
	}

	async update(id: string, dto: UpdateUserDto): Promise<User | undefined> {
		const existing = await this.findOne(id);
		if (!existing) {
			return undefined;
		}
		const updatedUser = db.get('users').find({ id }).assign(dto).write();
		return updatedUser;
	}

	async delete(id: string): Promise<boolean> {
		const existing = await this.findOne(id);
		if (!existing) {
			return false;
		}
		const deleted = db.get('users').remove({ id }).write();
		return deleted.length > 0;
	}
}
