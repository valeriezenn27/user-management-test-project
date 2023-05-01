import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { IUserService } from './user.interface';
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

	createUser(user: User): User {
		const maxId = db.get('users').map('id').max().value() || 0;
		const newId = Number(maxId) + 1; // Parse maxId as a number before adding 1
		const newUser = { ...user, id: newId.toString() };
		db.get('users').push(newUser).write();
		return newUser;
	}

	async update(id: string, user: User): Promise<User | undefined> {
		const index = (await this.findAll()).findIndex(u => u.id === id);
		if (index === -1) {
			return undefined; // Return undefined if no user is found
		}
		const updatedUser = db.get('users').find({ id }).assign(user).write();
		return updatedUser;
	}

	async delete(id: string): Promise<boolean> {
		const index = (await this.findAll()).findIndex(u => u.id === id);
		if (index === -1) {
			return undefined; // Return undefined if no user is found
		}
		const deleted = db.get('users').remove({ id }).write();
		return deleted.length > 0;
	}
}
