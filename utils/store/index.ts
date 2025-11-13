import { persistStore } from 'redux-persist'

import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './redux/combine.reducers'

// Create the Redux store with the persisted reducer
export const store = configureStore({
  reducer: rootReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['auth.register', 'auth.rehydrate'],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
