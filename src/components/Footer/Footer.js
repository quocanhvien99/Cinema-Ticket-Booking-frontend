import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/cgvlogo.png';
import './style.css';

export default function Footer() {
	const [social, setSocial] = useState(null);

	return (
		<footer className="footer-section">
			<div className="container">
				<div className="footer-top">
					<img src={logo} alt="logoico" />
					<ul className="social-icons">
						<li
							className={`${social === 0 && 'active'}`}
							onPointerEnter={() => setSocial(0)}>
							<i className="fab fa-facebook-f"></i>
						</li>
						<li
							className={`${social === 1 && 'active'}`}
							onPointerEnter={() => setSocial(1)}>
							<i className="fab fa-twitter"></i>
						</li>
						<li
							className={`${social === 2 && 'active'}`}
							onPointerEnter={() => setSocial(2)}>
							<i className="fab fa-instagram"></i>
						</li>
						<li
							className={`${social === 3 && 'active'}`}
							onPointerEnter={() => setSocial(3)}>
							<i className="fab fa-github"></i>
						</li>
					</ul>
				</div>
				<div className="footer-bottom">
					<div className="left">
						<p>
							Copyright © 2021.All Rights Reserved By <span>Quocanhvien99</span>
						</p>
					</div>
					<ul className="links">
						<li>
							<Link to="#">Giới Thiệu</Link>
						</li>
						<li>
							<Link to="#">Điều Khoản</Link>
						</li>
						<li>
							<Link to="#">Chính Sách</Link>
						</li>
						<li>
							<Link to="#">FAQ</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}
