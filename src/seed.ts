import db from './config/mongo';
import userModel from './model/user';


const seedDataUser = async () => {
    try {
        await db()
        const sampleUsers = [
            {
                name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                role: 'user'
            },
            {
                name: 'Jane',
                last_name: 'Smith',
                email: 'jane.smith@example.com',
                password: 'securePassword',
                role: 'admin'
            },
            {
                name: 'Bob',
                last_name: 'Johnson',
                email: 'bob.johnson@example.com',
                password: '123456',
                role: 'user'
            },
            {
                name: 'Alice',
                last_name: 'Williams',
                email: 'alice.williams@example.com',
                password: 'p@ssw0rd',
                role: 'user'
            },
            {
                name: 'Charlie',
                last_name: 'Brown',
                email: 'charlie.brown@example.com',
                password: 'brownie',
                role: 'admin'
            }
        ];

        await userModel.insertMany(sampleUsers);
        console.log('Data Imported!');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

seedDataUser();