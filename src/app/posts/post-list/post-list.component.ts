import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.services';
import { PostModel } from 'src/app/models/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit{
  posts : PostModel[] = [];
  private postsSub: Subscription;

  constructor(public postservice : PostService){
    console.log("post list constuctor");
  }

  ngOnInit(){
    console.log("post-list ngOnInit Save instance of post")
    // this.posts = this.postservice.getPostsList();
    this.postservice.getPostsList();
    this.postsSub = this.postservice.getPostUpdateListener().subscribe((posts : PostModel[])=>{
      this.posts = posts;
    })
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

  onDeletePost(postId : string){
    this.postservice.delPost(postId);
  }
}
