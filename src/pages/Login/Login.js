import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
	fetchLogin,
	fetchSocialLogin,
	fetchUserInfo,
} from '../../api/user.api';
import { login } from '../../slices/userSlice';
import './style.css';

export default function Login() {
	const history = useHistory();
	const dispatch = useDispatch();

	if (localStorage.getItem('authToken')) history.push('/');

	const [social, setSocial] = useState(null);
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const submit = async () => {
		const user = {
			password: pass,
			email: email,
		};
		let res = await fetchLogin(user);
		if (res.status === 200) {
			const token = await res.json();
			localStorage.setItem('authToken', token);

			res = await fetchUserInfo();
			dispatch(login(await res.json()));

			window.alert('Đăng nhập thành công');
			return history.push('/');
		}
		window.alert(await res.json());
	};

	const socialLogin = async (res) => {
		let type;
		let user;
		if (social === 0) {
			type = 'facebook';
			user = {
				id: res.id,
				email: res.email,
				name: res.name,
			};
		} else {
			type = 'google';
			user = {
				id: res.profileObj.googleId,
				email: res.profileObj.email,
				name: res.profileObj.name,
			};
		}
		const respone = await fetchSocialLogin(user, type);
		const token = await respone.json();
		localStorage.setItem('authToken', token);

		res = await fetchUserInfo();
		dispatch(login(await res.json()));

		window.alert('Đăng nhập thành công');
		return history.push('/');
	};
	return (
		<div className="Login">
			<div className="container">
				<div className="form col-12 col-lg-6  mx-auto">
					<h2>đăng nhập</h2>
					<label htmlFor="email">email</label>
					<input
						type="email"
						id="email"
						placeholder="Nhập email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="password">mật khẩu</label>
					<input
						type="password"
						id="password"
						placeholder="Mật khẩu"
						value={pass}
						onChange={(e) => setPass(e.target.value)}
					/>
					<div className="btn" onClick={submit}>
						đăng nhập
					</div>
					<div className="register">
						Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
					</div>
					<div className="or">or</div>
					<ul className="social-icons">
						<FacebookLogin
							appId="885545255341383"
							autoLoad={false}
							fields="name,email"
							callback={socialLogin}
							render={(renderProps) => (
								<li
									className={`${social === 0 && 'active'}`}
									onPointerEnter={() => setSocial(0)}
									onClick={renderProps.onClick}>
									<i className="fab fa-facebook-f"></i>
								</li>
							)}
						/>
						<GoogleLogin
							clientId="741754797892-antklbqvpl19q0oc59b5mqf97hg3vt2d.apps.googleusercontent.com"
							render={(renderProps) => (
								<li
									onPointerEnter={() => setSocial(1)}
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}
									className={`${social === 1 && 'active'}`}>
									<i className="fab fa-google"></i>
								</li>
							)}
							buttonText="Login"
							onSuccess={socialLogin}
							onFailure={socialLogin}
							cookiePolicy={'single_host_origin'}
						/>
					</ul>
				</div>
			</div>
		</div>
	);
}
