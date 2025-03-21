import { createSlice } from '@reduxjs/toolkit';
import { resetState } from './resetSlice';

const mediumPriorityTasksSlice = createSlice({
    name: 'mediumPriorityTasks',
    initialState: {
        mediumPriorityTasks: [],
        mediumPriorityMetaData: {},
        loaded: false,
        loading: false,
    },
    reducers: {
        setMediumPriorityTasks: (state, action) => {
            console.log('inside the priorityTaskSlice', action.payload);
            state.mediumPriorityTasks = action.payload?.data?.data || [];
            state.mediumPriorityMetaData = action.payload?.data?.metaData || {};
            state.loaded = action.payload?.loaded || false;
            state.loading = action.payload?.loading || false;
        },
        setMediumPriorityMetaData: (state, action) => {
            return {
                ...state,
                mediumPriorityMetaData: action.payload
            }
        },
        setMediumPriorityMetaDecri: (state, action) => {
            if (state.mediumPriorityTasks?.range?.end !== undefined) {
                state.mediumPriorityTasks.range.end -= 1;
            }
        },
        addMediumPriorityTasks: (state, action) => {
            return {
                ...state,
                mediumPriorityTasks: [action.payload, ...state.mediumPriorityTasks]
            }
        },
        updateMediumPriorityTasks: (state, action) => {
            return {
                ...state,
                mediumPriorityTasks: action.payload
            }
        },
        clearMediumPriorityTasks: (state, action) => {
            return {
                ...state,
                mediumPriorityTasks: action.payload
            }
           
        },
        updateMediumStatus: (state, action) => {
            const { taskId, newStatus } = action.payload;
            const task = state.mediumPriorityTasks.find(task => task._id === taskId);
            if (task) {
                task.status = newStatus;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetState, (state) => {
                return {
                    mediumPriorityTasks: [],
                    mediumPriorityMetaData: {},
                    loaded: false,
                    loading: false,
                };
            });
    },
});

export const { setMediumPriorityTasks, updateMediumStatus, setMediumPriorityMetaDecri, addMediumPriorityTasks, updateMediumPriorityTasks, clearMediumPriorityTasks, setMediumPriorityMetaData } = mediumPriorityTasksSlice.actions;
export const mediumPriorityTasksReducer = mediumPriorityTasksSlice.reducer;
