import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';

export default function ScrollButton() {
	const isShow = useSelector((state) => state.scrollBtn.isActive);

	const goToTop = () => {
		window.scrollTo(0, 0);
	};

	return (
		<div
			id="scroll-top-btn"
			className={`${isShow && 'show'}`}
			onClick={goToTop}>
			<i className="fas fa-angle-up"></i>
		</div>
	);
}
