import { Dispatch, Middleware, combineReducers, configureStore } from '@reduxjs/toolkit';

import { analysisApi } from './apis/analysis';
import { authApi } from './apis/auth';
import { expenseApi } from './apis/expense';
import { notificationApi } from './apis/notification';
import notify from './middleware/notify';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './apis/user';
import { userReducer } from './slices/user';

/**
 * Combine all reducers into a single root reducer, extend as needed
 */
export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [expenseApi.reducerPath]: expenseApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [analysisApi.reducerPath]: analysisApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  user: userReducer,
});

/**
 * Add any custom middleware here. Remove the `any` type and add your own middleware types.
 */
const middleware = [
  expenseApi.middleware,
  userApi.middleware,
  analysisApi.middleware,
  notificationApi.middleware,
  authApi.middleware,
  notify,
] as Middleware[];

/**
 * The root state of the Redux store.
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Sets up the Redux store with the specified preloaded state and devTools option.
 * @param preloadedState - The initial state of the store.
 * @param devTools - Whether to enable Redux DevTools integration. Default is true.
 * @returns The configured Redux store.
 */
export const setupStore = (preloadedState?: RootState, devTools = true) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
  });
};

/**
 * The Redux store instance.
 */
export const store = setupStore();

/**
 * Sets up the Redux Query listeners for the store.
 */
setupListeners(store.dispatch);

/**
 * The type representing the application store.
 */
export type AppStore = ReturnType<typeof setupStore>;

/**
 * The type of the dispatch function used in the Redux store.
 */
export type AppDispatch = typeof store.dispatch;

export type InvalidatePoleDataParams = {
  dispatch: Dispatch;
  queryFulfilled: Promise<unknown>;
};
