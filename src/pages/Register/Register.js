import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchRegister } from '../../api/user.api';
import './style.css';

export default function Register() {
	const history = useHistory();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [re, setRe] = useState('');

	const submit = async () => {
		if (pass !== re)
			return window.alert('Mật khẩu và mật khẩu xác nhận không trùng nhau');
		const user = {
			name: name,
			password: pass,
			email: email,
		};
		const res = await fetchRegister(user);
		if (res.status === 200) {
			window.alert('Đăng ký thành công');
			return history.push('/login');
		}
		window.alert(await res.json());
	};

	return (
		<div className="Register">
			<div className="container">
				<div className="form col-12 col-lg-6  mx-auto">
					<h2>đăng ký</h2>
					<label htmlFor="name">họ tên</label>
					<input
						type="text"
						id="name"
						placeholder="Nhập họ tên của bạn"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<label htmlFor="email">email</label>
					<input
						type="email"
						id="email"
						placeholder="Email"
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
					<label htmlFor="retype">xác nhận mật khẩu</label>
					<input
						type="password"
						id="retype"
						placeholder="Mật khẩu"
						value={re}
						onChange={(e) => setRe(e.target.value)}
					/>
					<div className="btn" onClick={submit}>
						đăng ký
					</div>
					<div>
						Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
