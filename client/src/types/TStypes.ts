

export type Post = {
  _id: string;
  authorName: string;
  authorId: string;
  content: string;
  image: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
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
      showCommentsFor: string,
      setShowCommentsFor: (id: string) => void
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
  name: string;
  mutualFriends: string[];
  image: string;
  id: string;
};

export type PostsState = {
  items: Post[];
  state: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type UserPreview = {
  _id: string,
  username: string,
  email: string
  
}

export type GroupCreateRequest = {
  _id: string,
  name: string,
  description: string,
  owner: string,
  members: string[] | null
}

export type GroupsCreateResponse = {
  message: string,
  group: GroupCreateRequest

}
export type Group = {
  _id: string,
  name: string,
  description: string,
  owner: string,
  members: string[]
}

export type Record = {
  userId: string,
  sockedId: string
}

export type DirectMessages = {
  _id: string,
  senderId: string,
  recipientId: string,
  content: string,
  createdAt: string
}

export type GroupMessages = {
  _id: string,
  group: string,
  sender: {
    _id: string,
    username: string,
    email: string
  },
  text: string,
  createdAt: string
}

export type ErrorType = {
  err: string | null
}

export type UploadStatusType = "idle" | "uploading" | "successfull" | "failed";

export type IncomingRequest = UserPreview & { requestId: string };


export type FriendRequest = {
  _id: string;
  requester: UserPreview;
  recipient: UserPreview;
  status: "pending" | "accepted";
};

export type FriendRequestResponse = {
  message: string;
  newFriendRequest: FriendRequest;
};

export type ApiError = { error: string };
export type ApiResponse = Post | ApiError;
