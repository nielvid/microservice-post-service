import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/post.dto';
import { Post } from 'src/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  async addPost(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const { title, tags, image, body, role, posted_by } = createPostDto;
      const post = await this.postRepository.create();
      post.title = title;
      post.tags = tags;
      post.image = image;
      post.body = body;
      post.role = role;
      post.post_by = posted_by;
      return await this.postRepository.save(post);
    } catch (error) {
      throw new RpcException('post failed');
    }
  }
  async singlePost(id: string): Promise<Post> {
    try {
      const post = await this.postRepository.findOne(id);
      if (!post) throw new RpcException('Post not found');
      return post;
    } catch (error) {
      throw new RpcException('post failed');
    }
  }
  async fetchAllPost(): Promise<Post[]> {
    try {
      const posts = await this.postRepository.find();
      if (!posts) throw new RpcException('Posts not found');
      return posts;
    } catch (error) {
      throw new RpcException('post failed');
    }
  }
}
