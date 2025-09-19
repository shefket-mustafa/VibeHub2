import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux"
import type { AppDispatch, RootState } from "./store"

// react-redux gives us useDispatch and useSelector.
// By default, they are not typed — TS only sees them as very generic functions.
// TypedUseSelectorHook is a helper type from react-redux that lets us enforce the correct state type for useSelector.

export const useAppDispatch: () => AppDispatch = useDispatch;
// This creates a wrapper around useDispatch that always knows the type of our dispatch (AppDispatch).
// So now when we do dispatch(deletePost("id")), TS knows this is valid.

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// This creates a wrapper around useSelector that always knows the shape of your root state.
// So now useAppSelector(state => state.posts.items) is strongly typed — if you mistype posts, TS will yell.