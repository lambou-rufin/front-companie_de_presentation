import { configureStore } from '@reduxjs/toolkit';

// Importez les reducers que vous avez créés
// import usersReducer from './store/users/UserReducer';

// Configurez le store
export const store = configureStore({
  reducer: {
    // users: usersReducer,
  },
});

// Inférez les types RootState et AppDispatch à partir du store lui-même
export type RootState = ReturnType<typeof store.getState>;
// Type inféré : {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
