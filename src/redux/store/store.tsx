import { configureStore } from '@reduxjs/toolkit';
import { getSearchedPhotosSlice } from '../features/getSearchedPhotosSlice';

export const store = configureStore({
    reducer: {
        getSearchedPhotos: getSearchedPhotosSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            // ignoreState: true,
            ignoreActions: true,
        },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
