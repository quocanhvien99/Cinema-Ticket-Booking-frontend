import { configureStore } from '@reduxjs/toolkit';
import spinnerReducer from '../slices/spinnerSlice';
import userSlice from '../slices/userSlice';

export default configureStore({
	reducer: {
		spinner: spinnerReducer,
		user: userSlice,
	},
});
