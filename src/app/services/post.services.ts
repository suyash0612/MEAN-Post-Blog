import { Injectable } from "@angular/core";
import { PostModel } from "../models/post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class PostService {

    constructor(private http: HttpClient) { }

    // Using rxjs lister to listen to event instead of eventemitter 
    // As Eventemitter needs to be used in conjuntion with output hence avoided
    // Subject is like eventemitter from rxjs allows to multicast values to
    // many Observers


    private posts: PostModel[] = [];
    private postsUpdated = new Subject<PostModel[]>();
    addPostToList(post: PostModel) {
        // console.log('services adding post to list')
        this.http.post<{message:string}>('http://localhost:3000/api/posts',post)
        .subscribe((responseData)=>{
            console.log(responseData.message);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });
        
    }

    getPostsList() {
        // return [...this.posts];
        return this.http.get<{ message: string, posts: PostModel[] }>('http://localhost:3000/api/posts')
            .subscribe((postItem) => {
                this.posts = postItem.posts;
                this.postsUpdated.next([...this.posts]);
            })
    }

    getPostUpdateListener() {
        // console.log('services get post from list')
        return this.postsUpdated.asObservable();
    }


}