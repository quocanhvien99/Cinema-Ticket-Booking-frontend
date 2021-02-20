import { configureStore } from '@reduxjs/toolkit';
import spinnerReducer from '../slices/spinnerSlice';
import userSlice from '../slices/userSlice';
import scrollBtnSlice from '../slices/scrollBtnSlice';

export default configureStore({
	reducer: {
		spinner: spinnerReducer,
		user: userSlice,
		scrollBtn: scrollBtnSlice,
	},
});
