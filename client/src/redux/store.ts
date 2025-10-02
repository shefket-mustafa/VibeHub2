import { configureStore } from "@reduxjs/toolkit"
import postsReducer from "./slices/postsSlice";
import { friendsApi } from "./services/friendsApi";
import { groupsApi } from "./services/groupsApi";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        [friendsApi.reducerPath]: friendsApi.reducer,
        [groupsApi.reducerPath]: groupsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(friendsApi.middleware)
    .concat(groupsApi.middleware)
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;