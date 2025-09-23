import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import type { UserPreview } from "../../types/TStypes";

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
    endpoints: (builder) => ({
        getSuggestions: builder.query<UserPreview[], void>({
            query: () => "friends/suggestions",
            transformResponse: (response: { suggestions: UserPreview[]}) => {
                return response.suggestions
            }
        })
    })
})

export const {useGetSuggestionsQuery} = friendsApi;