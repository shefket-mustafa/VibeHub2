import { configureStore } from "@reduxjs/toolkit"
import postsReducer from "./slices/postsSlice";
import { friendsApi } from "./services/friendsApi";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        [friendsApi.reducerPath]: friendsApi.reducer
    },
    middleware:     (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(friendsApi.middleware)
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;