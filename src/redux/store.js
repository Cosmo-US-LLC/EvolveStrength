import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { plansApi } from './services/plan';
import planReducer from './slices/planSlice';

// Combine all reducers
const rootReducer = combineReducers({
  [plansApi.reducerPath]: plansApi.reducer,
  plan: planReducer,
});

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['plan'], // Only 'plan' slice will be persisted
};

// Wrap the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['plan'],
      },
    }).concat(plansApi.middleware),
});

export const persistor = persistStore(store);