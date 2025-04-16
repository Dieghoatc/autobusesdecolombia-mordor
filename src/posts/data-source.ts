import { DataSource } from 'typeorm';
import { Post } from './post.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL_PUBLIC, // Usamos una variable de entorno
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Post],
  synchronize: true,
  migrations: ['dist/migrations/**/*.js'],
  ssl: {
    rejectUnauthorized: false, // Necesario para conexiones SSL en Railway
  },
});
