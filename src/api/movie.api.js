import { url } from './apiUrl';

export const getMovieList = async (page, limit, type) => {
	const res = await fetch(
		`${url}/movies?page=${page}&limit=${limit}&type=${type}`
	);
	const data = await res.json();
	return data;
};

export const getMovieDetail = async (id) => {
	const res = await fetch(`${url}/movies/${id}}`);
	const data = await res.json();
	return data;
};
