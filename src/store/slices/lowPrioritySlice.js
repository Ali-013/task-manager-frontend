import { createSlice } from '@reduxjs/toolkit';
import { resetState } from './resetSlice';

const lowPriorityTasksSlice = createSlice({
    name: 'lowPriorityTasks',
    initialState: {
        lowPriorityTasks: [],
        lowPriorityMetaData: {},
        loaded: false,
        loading: false,
    },
    reducers: {
        setLowPriorityTasks: (state, action) => {
            console.log('inside the priorityTaskSlice', action.payload);
            state.lowPriorityTasks = action.payload?.data?.data || [];
            state.lowPriorityMetaData = action.payload?.data?.metaData || {};
            state.loaded = action.payload?.loaded || false;
            state.loading = action.payload?.loading || false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetState, (state) => {
                return {
                    lowPriorityTasks: [],
                    lowPriorityMetaData: {},
                    loaded: false,
                    loading: false,
                };
            });
    },
});

export const { setLowPriorityTasks, } = lowPriorityTasksSlice.actions;
export const lowPriorityTasksReducer = lowPriorityTasksSlice.reducer;
