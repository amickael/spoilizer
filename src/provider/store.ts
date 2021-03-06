import { loadState, saveState } from './persist';
import throttle from 'lodash/throttle';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import appReducer, { initialState } from './appReducer';

const store = configureStore({
    reducer: appReducer,
    middleware: getDefaultMiddleware(),
    preloadedState: loadState(initialState),
});

export type RootState = ReturnType<typeof store.getState>;

store.subscribe(
    throttle(() => {
        saveState(store.getState());
    }, 1000)
);

export default store;
