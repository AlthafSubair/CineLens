import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import themeReducer from './slice/ThemeSlice';
import authReducer from './slice/authSlice';
import adminReducer from './slice/adminSlice';
import userReducer from './slice/userSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    admin: adminReducer,
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

