import { configureStore } from "@reduxjs/toolkit";


import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import state from "./state";

const persistConfig = {
    key: "root",
    version: 2,
    storage,
};

const persistedReducer = persistReducer(persistConfig, state); // Use the correct reducer here

export const store = configureStore({
    reducer: persistedReducer, // Corrected: Use persistedReducer here
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store); // Ensure you're exporting persistor here
