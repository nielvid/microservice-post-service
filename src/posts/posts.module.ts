import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
