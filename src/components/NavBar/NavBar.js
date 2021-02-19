import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './style.css';
import cgvlogo from '../../assets/cgvlogo.png';
import usericon from '../../assets/usericon1.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/userSlice';

export default function NavBar() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [expand, setExpand] = useState(false);
	const [menuActive, setMenuActive] = useState(false);
	const [fixedNav, setFixedNav] = useState(false);
	const [userActive, setUserActive] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem('authToken');
		dispatch(logout());
		window.alert('Đăng xuất thành công');
	};

	const navbar = useRef(null);

	useEffect(() => {
		window.onscroll = () => {
			if (window.scrollY !== 0) setFixedNav(true);
			else setFixedNav(false);
		};
	});

	return (
		<div className="header-section">
			<header className={`navbar ${fixedNav && 'fixed'}`} ref={navbar}>
				<div className="container">
					<img src={cgvlogo} alt="logoico" height={50} />
					<div
						className={`hamburger ${menuActive && 'active'}`}
						onClick={() => {
							setMenuActive(!menuActive);
						}}>
						<div className="line line1"></div>
						<div className="line line2"></div>
						<div className="line line3"></div>
					</div>
					<ul className={menuActive ? 'menu active' : 'menu'}>
						<li className="menu-item">
							<NavLink to="/">TRANG CHỦ</NavLink>
						</li>
						<li
							className="menu-item"
							onClick={() => {
								setExpand(!expand);
							}}>
							<NavLink to="#">PHIM</NavLink>
							<ul className={`submenu ${expand && 'expand'}`}>
								<li>
									<Link to="/movies/list/nowshowing">Phim đang chiếu</Link>
								</li>
								<li>
									<Link to="/movies/list/upcoming">Phim sắp chiếu</Link>
								</li>
							</ul>
						</li>
						<li className="menu-item">
							<NavLink to="/events/list">SỰ KIỆN</NavLink>
						</li>
						<li className="menu-item">
							<NavLink to="/contact">LIÊN HỆ</NavLink>
						</li>
						{!user.isLogged && (
							<li className="register-btn">
								<Link to="/register">ĐĂNG KÝ</Link>
							</li>
						)}
						{user.isLogged && (
							<li className="user-info">
								<div
									className="icon"
									onClick={() => setUserActive(!userActive)}>
									<img src={usericon} alt="" />
								</div>
								<div className={`info ${userActive && 'active'}`}>
									<p>Xin chào {user.info.name}</p>
									<p>Số dư: {user.info.cash} ₫</p>
									<Link to="/user/history">Lịch sử giao dịch</Link>
									<div className="logout-btn" onClick={handleLogout}>
										<i className="fas fa-sign-out-alt"></i>
										<span>Đăng xuất</span>
									</div>
								</div>
							</li>
						)}
					</ul>
				</div>
			</header>
			<div className={menuActive ? 'overlay' : ''}></div>
		</div>
	);
}
