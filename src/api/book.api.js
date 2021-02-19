import { url } from './apiUrl';

export const fetchBook = async (scheduleId, newSeats) => {
	const payload = {
		authToken: localStorage.authToken,
		newSeats,
		scheduleId,
	};
	const res = await fetch(`${url}/book`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	return res;
};
