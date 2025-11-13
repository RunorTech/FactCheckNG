import { AuthReduxState } from '@/types/reduxStore'
import { createSlice } from '@reduxjs/toolkit'

import { PersistConfig, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


// import { cookieStorage } from '@repo/ui/lib/reduxSlice/cookieStorage'

const initialState: AuthReduxState = {
  id: ''
}

export const userSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    
  },
})

export const {
  
} = userSlice.actions

const persistConfig: PersistConfig<AuthReduxState> = {
  key: 'authentication',
  storage: storage,
  whitelist: ['accessToken', 'refreshToken', 'currentAPIUrl', 'keepMeLoggedIn',],
}

export const authReducer = persistReducer(persistConfig, userSlice.reducer)
