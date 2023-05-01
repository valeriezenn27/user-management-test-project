import { User } from '../models/user.model';

export interface IUserService {
	findAll(): Promise<User[]>;
	findOne(id: string): Promise<User | undefined>;
	create(user: User): Promise<User>;
	update(id: string, user: User): Promise<User | undefined>;
	delete(id: string): Promise<boolean>;
}
