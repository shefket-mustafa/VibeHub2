export type Post = {
    _id: string,
    authorName: string,
    authorId: string,
    content: string,
    createdAt: string,
    likes: number,
    liked: boolean,
    comments: Comment[]
  };
  
  export type User = {
    id: string;
    username: string;
    email: string;
  } | null;

  export type UserContextType =
  | {
      user: User;
      setUser: (us: User) => void;
      logout: () => void;

    }
  | undefined;

 export type Comment = {
    _id: string;
    authorName: string;
    content: string;
    createdAt: string;
  };
  
  export type CommentModalProps = {
    postId: string;
    isOpen: boolean;
    onClose: () => void;
  };

  export type FriendsCardType = {
    name: string,
    mutualFriends: string[],
    image: string,
    id: string
  }

  export type PostsState = {
    items: Post[],
    state: "idle" | "loading" | "succeeded" | "failed",
    error: string | null
  }



  export type ApiError = { error: string };
  export type ApiResponse =  Post | ApiError