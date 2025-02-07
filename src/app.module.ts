import { Module, MiddlewareConsumer, NestModule  } from '@nestjs/common';
import { ResponseTimeMiddleware } from './middleware/response-time.middleware';
import { ConfigModule } from '@nestjs/config';
import { PhotosModule } from './photos/photos.module';
import { PostsModule } from './posts/posts.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    PhotosModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
    ContactModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeMiddleware).forRoutes('*'); // Aplica el middleware a todas las rutas
  }
}
