import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';

export default function Spinner() {
	const spinnerState = useSelector((state) => state.spinner.isActive);

	return (
		spinnerState && (
			<div className="Spinner">
				<div className="circle circle1">
					<div></div>
				</div>
				<div className="circle circle2">
					<div></div>
				</div>
			</div>
		)
	);
}
