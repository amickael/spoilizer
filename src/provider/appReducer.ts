import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SpoilerLog } from '../types/spoilerLog';

export const initialState = {
    spoilerLog: undefined as SpoilerLog | SpoilerLog[] | undefined,
    checkedSpoilers: [] as string[],
    checkedEntrances: [] as string[],
};
const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSpoilerLog(
            state,
            action: PayloadAction<SpoilerLog | SpoilerLog[] | undefined>
        ) {
            state.spoilerLog = action.payload;
        },
        checkSpoiler(state, action: PayloadAction<string>) {
            state.checkedSpoilers = [...state.checkedSpoilers, action.payload];
        },
        uncheckSpoiler(state, action: PayloadAction<string>) {
            state.checkedSpoilers = [...state.checkedSpoilers].filter(
                (spoiler) => spoiler !== action.payload
            );
        },
        checkEntrance(state, action: PayloadAction<string>) {
            state.checkedEntrances = [
                ...state.checkedEntrances,
                action.payload,
            ];
        },
        uncheckEntrance(state, action: PayloadAction<string>) {
            state.checkedEntrances = [...state.checkedEntrances].filter(
                (entrance) => entrance !== action.payload
            );
        },
        reset(state) {
            state.spoilerLog = undefined;
            state.checkedSpoilers = [];
            state.checkedEntrances = [];
        },
    },
});

const { actions, reducer } = app;
export const {
    setSpoilerLog,
    checkSpoiler,
    uncheckSpoiler,
    checkEntrance,
    uncheckEntrance,
    reset,
} = actions;

export default reducer;
