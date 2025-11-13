import { combineReducers } from '@reduxjs/toolkit'

import { sharedReducer } from './slices/shared.slice'
import { authReducer } from './slices/auth.slice'

const rootReducer = combineReducers({
  shared: sharedReducer,
  authentication: authReducer,
})

export default rootReducer
