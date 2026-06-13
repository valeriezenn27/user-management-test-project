import { ApiProperty } from '@nestjs/swagger';

export class BaseModel {
	@ApiProperty({ example: '1', description: 'Unique identifier' })
	id: string;

	constructor(id: string) {
		this.id = id;
	}
}
