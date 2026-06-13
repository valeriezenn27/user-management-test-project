import { User } from '../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface IUserService {
	findAll(): Promise<User[]>;
	findOne(id: string): Promise<User | undefined>;
	create(user: User): Promise<User>;
	createUser(dto: CreateUserDto): User;
	update(id: string, dto: UpdateUserDto): Promise<User | undefined>;
	delete(id: string): Promise<boolean>;
}
