import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { plansApi } from './services/plan';
import planReducer from './slices/planSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['plan'], // Add the slices you want to persist
};

const persistedReducer = persistReducer(persistConfig, planReducer);

// Create store with RTK Query and the persisted reducer
export const store = configureStore({
  reducer: {
    [plansApi.reducerPath]: plansApi.reducer,
    plan: persistedReducer, // Plan slice for general state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(plansApi.middleware),
});

export const persistor = persistStore(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);