import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Group, GroupCreateRequest, GroupInfoTypes, GroupMessages, GroupsCreateResponse } from "../../types/TStypes";
import type { CreateGroupData } from "../../zod/createGroupSchema";


const baseUrl = import.meta.env.VITE_API_URL;

export const groupsApi = createApi({
    reducerPath: "groupsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if(token) headers.set(`Authorization`, `Bearer ${token}`)
                return headers
        }
    }), 
    tagTypes: ["Groups"],
    endpoints: (builder) => ({
        createGroup: builder.mutation<GroupsCreateResponse, CreateGroupData>({
            query: (body) => ({
                url: "groups/create",
                method: "POST",
                body
            }),
            invalidatesTags: ["Groups"]
        }),
        getAllGroups: builder.query<GroupCreateRequest[], void>({
            query: () => ({
                url: "groups/discover",
                method: "GET"
            }),
            providesTags: ["Groups"]
        }),
        getYourGroups: builder.query<Group[], void>({
            query: () => ({
                url: "groups/my-groups",
                method: "GET"
            }),
            providesTags: ["Groups"]
        }),
        deleteGroup: builder.mutation<{message: string}, string>({
            query: (id) => ({
                url: `groups/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Groups"] 
        }),
        joinGroup: builder.mutation<{message: string}, string>({
            query: (id) => ({
                url: `groups/join/${id}`,
                method: "POST"
            }),
            invalidatesTags: ["Groups"]
        }),
        getGroup: builder.query<GroupInfoTypes, string>({
            query: (id) => ({
                url: `groups/${id}`, 
                method: "GET"
            }),
            providesTags: ["Groups"]
        }),
        getGroupMessages: builder.query<GroupMessages[], string>({
            query: (id) => ({
                url: `groups/${id}/messages`,
                method: "GET"
            }),
            providesTags: ["Groups"]
        }),
        sendGroupMessage: builder.mutation<GroupMessages,  {id: string, text: string}>({
            query: ({id, text}) => ({
                url: `groups/${id}/messages`,
                method: "POST",
                body: {text}
            }),
            invalidatesTags: ["Groups"]
        })
    }),

    
})


export const {
    useCreateGroupMutation,
    useGetAllGroupsQuery,
    useGetYourGroupsQuery,
    useDeleteGroupMutation,
    useJoinGroupMutation,
    useGetGroupQuery,
    useGetGroupMessagesQuery,
    useSendGroupMessageMutation

} = groupsApi;