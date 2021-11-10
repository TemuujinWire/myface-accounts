import {useContext} from "react";
import {LoginContext} from "../Components/LoginManager/LoginManager";

export interface ListResponse<T> {
    items: T[];
    totalNumberOfItems: number;
    page: number;
    nextPage: string;
    previousPage: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    displayName: string;
    username: string;
    email: string;
    profileImageUrl: string;
    coverImageUrl: string;
}

export interface Interaction {
    id: number;
    user: User;
    type: string;
    date: string;
}

export interface Post {
    id: number;
    message: string;
    imageUrl: string;
    postedAt: string;
    postedBy: User;
    likes: Interaction[];
    dislikes: Interaction[];
}

export interface NewPost {
    message: string;
    imageUrl: string;
}

async function makeAuthenticatedGetRequest(route:string) {
    const response =  await fetch(`https://localhost:5001/${route}`, {
        method: "GET",
        headers: {
            "Authorization": "Basic " + document.cookie.substring(6),
        }
    });
    return await response.json();
}

export async function checkCredentials(token:string) {
    await fetch(`https://localhost:5001/login`, {
        method: "GET",
        headers: {
            "Authorization": "Basic " + token,
        }
    });
}

export async function fetchUsers(searchTerm: string, page: number, pageSize: number): Promise<ListResponse<User>> {
    return await makeAuthenticatedGetRequest(`users?search=${searchTerm}&page=${page}&pageSize=${pageSize}`);
}

export async function fetchUser(userId: string | number): Promise<User> {
    return await makeAuthenticatedGetRequest(`users/${userId}`);
}

export async function fetchPosts(page: number, pageSize: number): Promise<ListResponse<Post>> {
   return await makeAuthenticatedGetRequest(`feed?page=${page}&pageSize=${pageSize}`);
}

export async function fetchPostsForUser(page: number, pageSize: number, userId: string | number) {
    return await makeAuthenticatedGetRequest(`feed?page=${page}&pageSize=${pageSize}&postedBy=${userId}`);
}

export async function fetchPostsLikedBy(page: number, pageSize: number, userId: string | number) {
    return await makeAuthenticatedGetRequest(`feed?page=${page}&pageSize=${pageSize}&likedBy=${userId}`);
}

export async function fetchPostsDislikedBy(page: number, pageSize: number, userId: string | number) {
    return await makeAuthenticatedGetRequest(`feed?page=${page}&pageSize=${pageSize}&dislikedBy=${userId}`);
}

export async function createPost(newPost: NewPost) {
    const response = await fetch(`https://localhost:5001/posts/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + document.cookie.substring(6),
        },
        body: JSON.stringify(newPost),
    });
    
    if (!response.ok) {
        throw new Error(await response.json())
    }
}
