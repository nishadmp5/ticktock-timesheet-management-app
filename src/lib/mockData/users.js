import bcrypt from 'bcrypt';

const password = await bcrypt.hash('test123',10);

export const users = [
    {
        id: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        password,
    }
]