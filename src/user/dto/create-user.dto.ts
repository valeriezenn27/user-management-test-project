import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the user' })
	@IsEmail()
	@IsNotEmpty()
	email: string;
}
