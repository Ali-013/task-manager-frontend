import { createSlice } from '@reduxjs/toolkit';
import { getPriorityTasksThunk } from '../thunks/taskThunks';
import { resetState } from './resetSlice';

const highPriorityTasksSlice = createSlice({
    name: 'highPriorityTasks',
    initialState: {
        highPriorityTasks: [],
        highPriorityMetaData: {},
        loaded: false,
        loading: false,
    },
    reducers: {
        clearHighPriorityTasks: (state, action) => {
            state.highPriorityTasks = action.payload?.tasks || [];
            state.highPriorityMetaData = action.payload?.metaData || {};
            state.loaded = action.payload?.loaded || false;
            state.loading = action.payload?.loading || false;
        },
        addHighPriorityTasks: (state, action) => {
            state.highPriorityTasks = [action.payload, ...state.tasks];
        },
        setHighPriorityTasks: (state, action) => {
            console.log('inside the priorityTaskSlice', action.payload);
            state.highPriorityTasks = action.payload;
        },
        setHighPriorityMetaData: (state, action) => {
            console.log('inside the priorityTaskSlice', action.payload);
            state.highPriorityMetaData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(getPriorityTasksThunk.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(getPriorityTasksThunk.fulfilled, (state, action) => {
            //     state.highPriorityTasks = action.payload.data;
            //     state.highPriorityMetaData = action.payload.metaData;
            //     state.loading = false;
            //     state.loaded = true;
            // })
            // .addCase(getPriorityTasksThunk.rejected, (state) => {
            //     state.loading = false;
            // })
            .addCase(resetState, (state) => {
                return {
                    highPriorityTasks: [],
                    highPriorityMetaData: {},
                    loaded: false,
                    loading: false,
                };
            });
    },
});

export const { clearHighPriorityTasks, addHighPriorityTasks, setHighPriorityTasks, setHighPriorityMetaData } = highPriorityTasksSlice.actions;
export const highPriorityTasksReducer = highPriorityTasksSlice.reducer;
