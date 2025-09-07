export type Post = {
    _id: string,
    authorName: string,
    authorId: string,
    content: string,
    createdAt: string,
    likes: number,
    liked: boolean
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



  export type ApiError = { error: string };
  export type ApiResponse =  Post | ApiError