import * as bcrypt from 'bcrypt';
import { AppDataSource } from '../data-source';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/enums/role.enum';

// Creates the first admin user. Idempotent: does nothing if the email already exists.
// Usage: MIGRATIONS_DATABASE_URL=... ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run seed:admin
async function createAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');
  }
  if (password.length < 8) {
    throw new Error('ADMIN_PASSWORD must be at least 8 characters');
  }

  await AppDataSource.initialize();
  try {
    const users = AppDataSource.getRepository(User);

    if (await users.existsBy({ email })) {
      console.log(`Admin ${email} already exists, nothing to do`);
      return;
    }

    await users.insert({
      email,
      password: await bcrypt.hash(password, 10),
      role: Role.Admin,
    });
    console.log(`Admin ${email} created`);
  } finally {
    await AppDataSource.destroy();
  }
}

createAdmin().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
