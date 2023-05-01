import { User } from './user.model';

describe('User Model', () => {
	it('should create a User instance', () => {
		const id = '1';
		const name = 'Val Zenn';
		const email = 'val.zenn@email.com';
		const user = new User(id, name, email);

		expect(user).toBeDefined();
		expect(user.id).toEqual(id);
		expect(user.name).toEqual(name);
		expect(user.email).toEqual(email);
	});
});
