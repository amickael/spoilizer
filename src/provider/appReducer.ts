import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SpoilerLog } from '../types/spoilerLog';

const user = createSlice({
    name: 'user',
    initialState: {
        spoilerLog: undefined as SpoilerLog | undefined,
        checkedSpoilers: [] as string[],
    },
    reducers: {
        setSpoilerLog(state, action: PayloadAction<SpoilerLog | undefined>) {
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
        reset(state) {
            state.spoilerLog = undefined;
            state.checkedSpoilers = [];
        },
    },
});

const { actions, reducer } = user;
export const { setSpoilerLog, checkSpoiler, uncheckSpoiler, reset } = actions;

export default reducer;
