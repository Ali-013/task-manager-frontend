// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { authReducer } from "./slices/authSlice";
import { getAllTasksReducer } from './slices/get_all_tasks_slice';
import { appearanceReducer } from './slices/appearanceSlice';



const persistConfig = {
    key: 'root',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// const persistedUserReducer = persistReducer(persistConfig, authReducer);
// const persistedCreateTaskReducer = persistReducer(persistConfig, createTaskReducer);
// const persistedGetAllTasksReducer = persistReducer(persistConfig, getAllTasksReducer);
const persistedAppearanceReducer = persistReducer(persistConfig, appearanceReducer )

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        // createTask: persistedCreateTaskReducer,
        getAllTasks: getAllTasksReducer,
        appearance:  persistedAppearanceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
});

export const persistor = persistStore(store);

export * from './thunks/authThunks';

export * from 'src/store/thunks/create_task_thunk';

