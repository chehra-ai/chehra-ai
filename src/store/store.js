import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'store/authSlice';
import loaderReducer from 'store/loaderSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
  },
})