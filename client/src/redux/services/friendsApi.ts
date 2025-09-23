import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import type { FriendRequestResponse, IncomingRequest, UserPreview } from "../../types/TStypes";

const baseUrl = import.meta.env.VITE_API_URL;

export const friendsApi = createApi({
    reducerPath: "friendsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) =>{
            const token = localStorage.getItem("token");
            if(token) headers.set("Authorization", `Bearer ${token}`)
                return headers
        }
    }),
    tagTypes: ["Friends"],// This tells RTK Query we will use a "Friends" tag

    endpoints: (builder) => ({
        getSuggestions: builder.query<UserPreview[], void>({
            query: () => "friends/suggestions",
            transformResponse: (response: { suggestions: UserPreview[]}) => {
                return response.suggestions
            },
            providesTags: ["Friends"],
        }),
        getIncoming: builder.query<IncomingRequest[], void>({
            query: () => "friends/incoming",
            transformResponse: (response: {incomingRequests: {_id: string, requester: UserPreview}[] }) => 
                 response.incomingRequests.map(r => ({
                    requestId: r._id,
                    ...r.requester
                 })),
                 providesTags: ["Friends"],

        }),
        getAllFriends: builder.query<UserPreview[], void>({
            query: () => "friends/all",
            transformResponse: (response: {friends: UserPreview[]}) => {
                return response.friends
            },
            providesTags: ["Friends"],
        }),
        sendFriendRequest: builder.mutation<FriendRequestResponse, string>({
            query: (recipientId) =>({
                url: `friends/request/${recipientId}`,
                method: "POST"
            }),
            invalidatesTags: ["Friends"],
        }),
        acceptFriendRequest: builder.mutation<{message: string}, string>({
            query: (requestId) => ({
                url: `/friends/accept/${requestId}`,
            method: "PATCH"
        }),
        invalidatesTags: ["Friends"],
        }),
        removeFriend: builder.mutation<{message: string}, string>({
            query: (friendId) => ({
                url: `/friends/delete/${friendId}/remove`,
                method: "DELETE"
            }),
            invalidatesTags: ["Friends"]
        }),
        cancelFriendRequest: builder.mutation<{message: string}, string>({
            query: (requestId) => ({
                url: `/friends/delete/${requestId}/cancel`,
                method: "DELETE"
            }),
            invalidatesTags: ["Friends"]
        }),
        declineFriendRequest: builder.mutation<{ message: string }, string>({
            query: (requestId) => ({
              url: `friends/decline/${requestId}`,
              method: "DELETE",
            }),
            invalidatesTags: ["Friends"],
          }),
    }),
})

export const {useGetSuggestionsQuery, 
    useGetIncomingQuery, 
    useGetAllFriendsQuery, 
    useSendFriendRequestMutation,
useAcceptFriendRequestMutation,
useRemoveFriendMutation,
useCancelFriendRequestMutation,
useDeclineFriendRequestMutation} = friendsApi;