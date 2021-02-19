import { url } from './apiUrl';

export const fetchRegister = async (user) => {
	const payload = {
		name: user.name,
		email: user.email,
		password: user.password,
	};
	const res = await fetch(`${url}/user/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	return res;
};
export const fetchLogin = async (user) => {
	const payload = {
		email: user.email,
		password: user.password,
	};
	const res = await fetch(`${url}/user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	return res;
};
export const fetchSocialLogin = async (user, type) => {
	const payload = {
		id: user.id,
		email: user.email,
		name: user.name,
		type,
	};
	const res = await fetch(`${url}/user/social`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	return res;
};
export const fetchUserInfo = async () => {
	const payload = {
		authToken: localStorage.authToken,
	};
	const res = await fetch(`${url}/user/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	return res;
};
