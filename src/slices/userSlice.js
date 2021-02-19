import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		info: {},
		isLogged: false,
	},
	reducers: {
		login: (state, action) => {
			state.info = action.payload;
			state.isLogged = true;
		},
		logout: (state) => {
			state.info = {};
			state.isLogged = false;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
