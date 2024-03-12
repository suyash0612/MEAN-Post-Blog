import { Injectable } from "@angular/core";
import { PostModel } from "../models/post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

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
        this.http.post<{ message: string, postId : string }>('http://localhost:3000/api/posts', post)
            .subscribe((responseData) => {
                post.id = responseData.postId;
                console.log(responseData.message);
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            });

    }

    getPostsList() {
        // return [...this.posts];
        this.http
            .get<{ message: string, posts: any }>(
                'http://localhost:3000/api/posts'
            )
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id
                    }
                })
            }))
            .subscribe((transformedpostItem) => {
                this.posts = transformedpostItem;
                this.postsUpdated.next([...this.posts]);
            })
    }

    getPostUpdateListener() {
        // console.log('services get post from list')
        return this.postsUpdated.asObservable();
    }

    delPost(postId: string) {
        if (!postId) {
            console.error("Invalid postId:", postId);
            return;
        }

        this.http.delete("http://localhost:3000/api/posts/" + postId)
            .subscribe(() => {
                console.log("Deleted Post");
                const updatedPosts = this.posts.filter(post => post.id !== postId);
                this.posts = updatedPosts;
                this.postsUpdated.next([...this.posts]);
            });
    }


}