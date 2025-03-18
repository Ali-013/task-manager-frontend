import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardData } from "src/store/thunks/dashboardThunk.js";
import { resetState } from './resetSlice';

const graphDataSlice = createSlice({
    name: 'graphData',
    initialState: {
        graphData: {
            barGraph: {

            },
            pieGraph: {
                PENDING: { HIGH: 0, MEDIUM: 0, LOW: 0 },
                IN_PROGRESS: { HIGH: 0, MEDIUM: 0, LOW: 0 },
                COMPLETED: { HIGH: 0, MEDIUM: 0, LOW: 0 },
                NOT_STARTED: { HIGH: 0, MEDIUM: 0, LOW: 0 }
            },
            statusGraph: {
                PENDING: 0,
                IN_PROGRESS: 0,
                COMPLETED: 0,
                NOT_STARTED: 0
            }
        },
        status: 'idle',
        successMsg: '',
        errorMsg: '',
        loading: false,
        error: null,
        loaded: false,
    },
    // reducers: {
    //     setGraphValue: (state, action) => {
    //         state.value = action.payload;
    //     },
    // },
    reducers: {
        setGraphValue: (state, action) => {
            state.value = action.payload;
        },

        addTaskToGraph: (state, action) => {
            const { status, priority } = action.payload;
            if (state.graphData.pieGraph[status]) {
                state.graphData.pieGraph[status][priority]++;
            }
            if (state.graphData.statusGraph[status] !== undefined) {
                state.graphData.statusGraph[status]++;
            }
        },
        updateTaskInGraph: (state, action) => {
            const { prevStatus, prevPriority, newStatus, newPriority } = action.payload;
            if (prevStatus === newStatus && prevPriority !== newPriority) {
                state.graphData.pieGraph[prevStatus][prevPriority]--;
            }
            if (prevStatus !== newStatus && newStatus !== undefined) {
                state.graphData.pieGraph[prevStatus][prevPriority]--;
                state.graphData.pieGraph[newStatus][newPriority]++;
                state.graphData.statusGraph[prevStatus]--;
                state.graphData.statusGraph[newStatus]++;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.graphData = action.payload.data;
                state.loaded = true;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(resetState, (state) => {
                return {
                    graphData: {
                        barGraph: {

                        },
                        pieGraph: {

                        },
                        statusGraph: {

                        }
                    },
                    status: 'idle',
                    successMsg: '',
                    errorMsg: '',
                    loading: false,
                    error: null,
                    loaded: false,
                };
            });
    },
});

export const { setGraphValue, updateTaskInGraph, addTaskToGraph } = graphDataSlice.actions;
export const graphDataReducer = graphDataSlice.reducer;
