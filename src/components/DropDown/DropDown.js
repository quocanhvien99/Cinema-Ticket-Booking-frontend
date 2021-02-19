import React from 'react';
import { useState } from 'react';
import './style.css';

export default function DropDown({ values, activeValue, onClickItem }) {
	const [active, setActive] = useState(false);

	return (
		<div className="DropDown" onClick={() => setActive(!active)}>
			{activeValue}
			<i className={`fas fa-angle-down ${active && 'active'}`}></i>
			<ul className={active ? 'active' : ''}>
				{values.map((value, index) => (
					<li onClick={() => onClickItem(value)} key={index}>
						{value}
					</li>
				))}
			</ul>
		</div>
	);
}
