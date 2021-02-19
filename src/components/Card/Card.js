import React from 'react';
import tomato from '../../assets/tomato.png';
import cake from '../../assets/cake.png';
import './style.css';
import { useHistory } from 'react-router-dom';

export default function Card(props) {
	const history = useHistory();

	const handleOnClick = (id) => {
		if (props.type === 'movie') return history.push(`/movies/detail/${id}`);

		history.push(`/events/detail/${id}`);
	};

	return (
		<div className="Card" onClick={() => handleOnClick(props._id)}>
			<div className="poster">
				<img src={props.poster} alt="poster" />
			</div>
			<div className="name">{props.name || props.title}</div>
			{props.type === 'movie' ? (
				<div className="score">
					<div>
						<img src={tomato} alt="icon" />
						<span>{props.score.tomatometer}%</span>
					</div>
					<div>
						<img src={cake} alt="icon" />
						<span>{props.score.audience}%</span>
					</div>
				</div>
			) : (
				<div className="event">Sự kiện CGV Việt Nam</div>
			)}
		</div>
	);
}
