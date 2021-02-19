import { url } from './apiUrl';

export const getSchedule = async (movieId) => {
	const res = await fetch(`${url}/schedule/${movieId}`);
	const data = await res.json();
	return data;
};
