import React from 'react';
import Card from '../Card/Card';
import './style.css';

export default function Grid({ items, type }) {
	return (
		<div className="Grid">
			<div className="row">
				{items.map((item, index) => (
					<div className="col-12 col-xl-3 col-lg-4 col-sm-6" key={index}>
						<Card {...item} type={type} />
					</div>
				))}
			</div>
		</div>
	);
}
