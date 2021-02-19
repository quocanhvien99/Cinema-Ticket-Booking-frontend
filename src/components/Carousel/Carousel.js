import React from 'react';
import Slider from 'react-slick';
import Card from '../Card/Card';
import './style.css';

export default function Carousel({ items, type }) {
	const settings = {
		arrows: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		autoplay: true,
		autoplaySpeed: 2000,
		swipeToSlide: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	return (
		<div>
			<div className="container">
				<Slider {...settings}>
					{items.map((item, index) => (
						<Card {...item} type={type} key={index} />
					))}
				</Slider>
			</div>
		</div>
	);
}
