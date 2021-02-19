import { url } from './apiUrl';

export const getEventList = async (page, limit) => {
	const res = await fetch(`${url}/events?page=${page}&limit=${limit}`);
	const data = await res.json();
	return data;
};
export const getEventDetail = async (id) => {
	const res = await fetch(`${url}/events/${id}}`);
	const data = await res.json();
	return data;
};
