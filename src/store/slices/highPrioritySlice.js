import { createSlice } from '@reduxjs/toolkit';
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
        setHighPriorityTasks: (state, action) => {
            console.log('inside the priorityTaskSlice', action.payload);
            state.highPriorityTasks = action.payload?.data?.data || [];
            state.highPriorityMetaData = action.payload?.data?.metaData || {};
            state.loaded = action.payload?.loaded || false;
            state.loading = action.payload?.loading || false;
        }, 
        setHighPriorityMetaData: (state, action) => {
            return {
                ...state,
                highPriorityMetaData: action.payload
            }
        },
        setHighPriorityMetaDecri: (state, action) => {
            if (state.highPriorityMetaData?.range?.end !== undefined) {
                state.highPriorityMetaData.range.end -= 1;
            }
        },
        addHighPriorityTasks: (state, action) => {
            return {
                ...state,
                highPriorityTasks: [action.payload, ...state.highPriorityTasks]
            }
        },
        updateHighPriorityTasks: (state, action) => {
            return {
                ...state,
                highPriorityTasks: action.payload
            }
        },
        clearHighPriorityTasks: (state, action) => {
            return {
                ...state,
                highPriorityTasks: action.payload
            }
        },
        updateHighStatus: (state, action) => {
            const { taskId, newStatus } = action.payload;
            const task = state.highPriorityTasks.find(task => task._id === taskId);
            if (task) {
                task.status = newStatus;
            }
        }
    },
    extraReducers: (builder) => {
        builder
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

export const { setHighPriorityTasks, setHighPriorityMetaDecri, updateHighStatus, addHighPriorityTasks, updateHighPriorityTasks, clearHighPriorityTasks, setHighPriorityMetaData } = highPriorityTasksSlice.actions;
export const highPriorityTasksReducer = highPriorityTasksSlice.reducer;
