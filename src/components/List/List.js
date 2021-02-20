import React from 'react';
import tomato from '../../assets/tomato.png';
import cake from '../../assets/cake.png';
import book from '../../assets/book.png';
import play from '../../assets/play-button.png';
import './style.css';
import { Link } from 'react-router-dom';

export default function List({ items }) {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	return (
		<div className="List">
			{items.map((item, index) => {
				let date = new Date(item.releaseDate);
				date = `${
					months[date.getMonth()]
				} ${date.getDate()} , ${date.getFullYear()}`;
				return (
					<div key={index}>
						<div className="poster">
							<img src={item.poster} alt="poster" />
						</div>
						<div className="info">
							<div className="name">{item.name}</div>
							<div className="time">{item.time} phút</div>
							<div className="genre">
								{item.genre.map((element, index) =>
									index + 1 === item.genre.length ? (
										<span key={index}>{element}</span>
									) : (
										<span key={index}>
											{element}
											<span>|</span>
										</span>
									)
								)}
							</div>
							<div className="release-date">Khởi chiếu : {date}</div>
							<div className="score">
								<div>
									<img src={tomato} alt="icon" />
									<span>{item.score.tomatometer}%</span>
								</div>
								<div>
									<img src={cake} alt="icon" />
									<span>{item.score.audience}%</span>
								</div>
							</div>
							<div className="nav-movie">
								<div>
									<div className="thumb">
										<img src={book} alt="" />
									</div>
									<Link to={`/ticket/${item._id}`}>Đặt vé</Link>
								</div>
								<div>
									<div className="thumb">
										<img src={play} alt="" />
									</div>
									<div onClick={() => window.open(item.trailer)}>
										Xem trailer
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
