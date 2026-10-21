import { AppDataSource } from '../typeorm.config.js';
import { User } from '../../users/entities/users.entity.js';
import * as bcrypt from 'bcryptjs';
import { Role } from '../../users/enum/roles.enum.js';

async function seed() {
  await AppDataSource.initialize();

  try {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({
      where: { email: 'admin@gmail.com' },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);

      const user = userRepository.create({
        username: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role : Role.ADMIN
      });

      await userRepository.save(user);
      console.log('Admin user seeded successfully');
    } else {
      console.log('Admin user already exists');
    }
  } finally {
    await AppDataSource.destroy();
  }
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exitCode = 1;
});