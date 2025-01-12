import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [PhotosModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
