import { createSlice } from '@reduxjs/toolkit';

const scrollBtnSlice = createSlice({
	name: 'scrollBtn',
	initialState: { isActive: false },
	reducers: {
		toggleScrollBtn: (state, action) => {
			state.isActive = action.payload;
		},
	},
});

export const { toggleScrollBtn } = scrollBtnSlice.actions;
export default scrollBtnSlice.reducer;
