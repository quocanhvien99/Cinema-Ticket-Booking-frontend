import { createSlice } from '@reduxjs/toolkit';

const spinnerSlice = createSlice({
	name: 'spinner',
	initialState: { isActive: false },
	reducers: {
		toggleSpinner: (state) => {
			state.isActive = !state.isActive;
		},
	},
});

export const { toggleSpinner } = spinnerSlice.actions;
export default spinnerSlice.reducer;
