import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GroupCreateRequest, GroupsCreateResponse } from "../../types/TStypes";
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
        getYourGroups: builder.query<GroupCreateRequest[], void>({
            query: () => ({
                url: "groups/my-groups",
                method: "GET"
            }),
            providesTags: ["Groups"]
        }),
    }),

    
})


export const {
    useCreateGroupMutation,
    useGetAllGroupsQuery,
    useGetYourGroupsQuery,
} = groupsApi;