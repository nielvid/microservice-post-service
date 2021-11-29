import { Controller } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/post.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @MessagePattern({ cmd: 'post' })
  addPost(createPostDto: CreatePostDto) {
    return this.postsService.addPost(createPostDto);
  }
  @MessagePattern({ cmd: 'one-post' })
  SinglePost(id: string) {
    return this.postsService.singlePost(id);
  }
  @MessagePattern({ cmd: 'all-post' })
  fetchAllPost() {
    return this.postsService.fetchAllPost();
  }
}
