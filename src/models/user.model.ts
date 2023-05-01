import { BaseModel } from './base.model';

export class User extends BaseModel {
	name: string;
	email: string;

	constructor(id: string, name: string, email: string) {
		super(id);
		this.name = name;
		this.email = email;
	}
}
