import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ApiResponse, Comment, Post, PostsState } from "../../types/TStypes";
import type { FeedPostData } from "../../zod/postSchema";


const baseUrl = import.meta.env.VITE_API_URL;

export const deletePost = createAsyncThunk("posts/deletePost", async (id: string) => {
    try{
        const token = localStorage.getItem("token");
        const res = await fetch(`${baseUrl}/posts/delete/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
      
          const data = await res.json();
          if(res.ok){
            return id;
          } else {
            throw new Error(data.error || "Failed to delete a post");
          }

    }catch(err){
        console.error(err);
        throw new Error("Failed to delete a post!")
    }
}) 

export const createPost = createAsyncThunk("posts/createPost", async (data: FeedPostData, {rejectWithValue}) => {
    const token = localStorage.getItem("token");
    let result: ApiResponse;
    try {
        const res = await fetch(`${baseUrl}/posts/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: data.content }),
        });
  
        result = await res.json();

        if (!res.ok) {
            if ("error" in result) {
              return rejectWithValue(result.error);
            }
            return rejectWithValue("Error creating a post");
          }
          return result as Post;
  
}catch(err){
    return rejectWithValue("Invalid server response")
}
})

export const likePost = createAsyncThunk("/posts/likePost", async(id: string, {rejectWithValue}) =>{
    try{
        const token = localStorage.getItem("token");
        const res = await fetch(`${baseUrl}/posts/${id}/like`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        });
    
        const data = await res.json();
        if(!res.ok){
            return rejectWithValue(data.error || "Failed to like a post")
        }
        return {id, likes: data.likes, liked: data.liked};

    }catch(err){
        console.error(err)
        return rejectWithValue("Failed to like a post")
    }
   
})

export const fetchAllPosts = createAsyncThunk("posts/fetchAllPosts", async(_,{rejectWithValue}) => {
    try{

        const res = await fetch(`${baseUrl}/posts/allPosts`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
    
          const postData = await res.json();
          if(!res.ok){
            return rejectWithValue("Failed to fetch all posts!")
          }
          return postData as Post[]

    }catch(err){
        return rejectWithValue("Server error while fetching posts")

    }
})

export const fetchComments = createAsyncThunk("posts/fetchComments", async(postId: string, {rejectWithValue}) => {

    try{
        const res = await fetch(`${baseUrl}/posts/${postId}/comments`);
        if(!res.ok){
            return rejectWithValue("Failed to load comments!")
        }
        const comments = await res.json();
        return comments;
    }catch(err){
        return rejectWithValue("Server failed to fetch comments!")
    }
})

export const addComent = createAsyncThunk("posts/addComment", 
async ({postId, newComment}: {postId: string, newComment: string}, {rejectWithValue}) => {

    try{

        const token = localStorage.getItem("token");
        const res = await fetch(`${baseUrl}/posts/${postId}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newComment }),
        });

        if(!res.ok){
            return rejectWithValue("Failed to add a comment!")
        }
        const data = res.json();
        return data;

    }catch(err){
        return rejectWithValue("Server error!")
    }
})



const initialState: PostsState = {
 items: [],
 state: "idle",
 error: null


}
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {

    },
extraReducers(builder) {
    builder.addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter( i => i._id !== action.payload)
    }),
    builder.addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
    }),
    builder.addCase(likePost.fulfilled, (state,action) => {
        state.items = state.items.map((p) =>
            p._id === action.payload.id ? { ...p, likes: action.payload.likes, liked: action.payload.liked } : p
          )
    }),
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.items = action.payload
    }),
    builder.addCase(fetchComments.fulfilled, (state, action) => {
        const postId = action.meta.arg;
        const post = state.items.find((p) => p._id === postId);
        if(post){
            post.comments = action.payload.sort(
                (a: Comment,b: Comment) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
        }
    }),
    builder.addCase(addComent.fulfilled, (state, action) => {
        const {postId} = action.meta.arg;
        const post = state.items.find((p) => p._id === postId);
        if(post){
            post.comments = [action.payload, ...(post.comments || [])]
        }
    })

},
})

export default postsSlice.reducer;

