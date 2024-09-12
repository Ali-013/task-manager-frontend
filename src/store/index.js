// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { formatReducer } from './slices//formatSlice';
import { appearanceReducer } from './slices/appearanceSlice';
import { authReducer } from "./slices/authSlice";
// import { getAllTasksReducer } from './slices/get_all_tasks_slice';
import { taskReducer } from './slices/taskSlice';



const persistConfig = {
    key: 'root',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// const persistedUserReducer = persistReducer(persistConfig, authReducer);
// const persistedCreateTaskReducer = persistReducer(persistConfig, createTaskReducer);
// const persistedGetAllTasksReducer = persistReducer(persistConfig, getAllTasksReducer);
const persistedAppearanceReducer = persistReducer(persistConfig, appearanceReducer )
const persistedFormatReducer = persistReducer(persistConfig, formatReducer);
const persistedReducer = persistReducer(persistConfig, taskReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        // createTask: persistedCreateTaskReducer,
        appearance: persistedAppearanceReducer,
        format: persistedFormatReducer,
        tasks: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
});

export const persistor = persistStore(store);

export * from './thunks/authThunks';

export * from 'src/store/thunks/create_task_thunk';

