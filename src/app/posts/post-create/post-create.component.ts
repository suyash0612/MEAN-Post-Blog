import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enterTitle : string = '';
  enterContent : string = '';

  constructor(private postservice : PostService){
    console.log('post create constructor')
  }

  onAddPost(form:NgForm){
    if(form.invalid)  return;
    const post = {
      id : null,
      title : form.value.title,
      content : form.value.content
    };
    this.postservice.addPostToList(post);
    form.resetForm()
    }
}
