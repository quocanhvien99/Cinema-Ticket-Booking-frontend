import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toggleSpinner } from '../../../slices/spinnerSlice';
import { getMovieDetail } from '../../../api/movie.api';
import tomato from '../../../assets/tomato2.png';
import cake from '../../../assets/cake2.png';
import './style.css';

export default function DetailMovie() {
	const { id } = useParams();
	const history = useHistory();

	const [movieDetail, setMovieDetail] = useState({
		genre: [],
		score: { tomatometer: 0, audience: 0 },
		trailer: '',
		actor: [],
	});
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

	const dispatch = useDispatch();
	useEffect(() => {
		const fetchData = async () => {
			dispatch(toggleSpinner());
			let detail = await getMovieDetail(id);
			while (detail.actor.length <= 3)
				detail.actor = detail.actor.concat(detail.actor);
			setMovieDetail(detail);
			dispatch(toggleSpinner());
		};
		fetchData();
	}, [dispatch, id]);

	let date = new Date(movieDetail.releaseDate);
	date = `${months[date.getMonth()]} ${date.getDate()} , ${date.getFullYear()}`;

	const getActorPic = (index) => {
		index = index + 1;
		if (index % 4 === 0)
			return 'https://cdn.britannica.com/28/215028-050-94E9EA1E/American-actor-Chris-Evans-2019.jpg';
		if (index % 3 === 0)
			return 'https://media1.popsugar-assets.com/files/thumbor/HwtAUAufmAZv-FgGEIMJS2eQM-A/0x1:2771x2772/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/03/30/878/n/1922398/eb11f12e5e825104ca01c1.02079643_/i/Robert-Downey-Jr.jpg';
		if (index % 2 === 0)
			return 'https://phillystylemag.com/get/files/image/galleries/Elizabeth-Olsen-philadelphia-style-1.jpg';
		return 'https://cdn.britannica.com/92/215392-050-96A4BC1D/Australian-actor-Chris-Hemsworth-2019.jpg';
	};

	const bookBtnHandle = () => {
		history.push(`/ticket/${movieDetail._id}`);
	};

	return (
		<div className="movie-detail">
			<div className="container">
				<div>
					<div className="poster">
						<img src={movieDetail.poster} alt="" />
					</div>
					<div className="detail">
						<div className="name">{movieDetail.name}</div>
						<div className="language">{movieDetail.language}</div>
						<div className="genre">
							{movieDetail.genre.map((genre, index) => (
								<div key={index}>{genre}</div>
							))}
						</div>
						<div className="time">
							<div>
								<i className="fas fa-calendar-alt"></i>
								{date}
							</div>
							<div>
								<i className="far fa-clock"></i>
								{movieDetail.time} phút
							</div>
						</div>
						<div className="book-wrapper">
							<div className="book">
								<div className="score">
									<div>
										<div>
											<img src={tomato} alt="" />
											{movieDetail.score.tomatometer}%
										</div>
										<span>tomatometer</span>
									</div>
									<div>
										<div>
											<img src={cake} alt="" />
											{movieDetail.score.audience}%
										</div>
										<span>audience score</span>
									</div>
								</div>
								<div className="book-btn" onClick={bookBtnHandle}>
									đặt vé
								</div>
							</div>
							<div className="bg"></div>
						</div>
					</div>
				</div>
				<div>
					<div className="trailer">
						<h2>trailer</h2>
						<div>
							<iframe
								width="500"
								height="315"
								src={`https://www.youtube.com/embed/${
									movieDetail.trailer.split('/')[3]
								}`}
								allowFullScreen={true}
								title="trailer"></iframe>
						</div>
					</div>
					<div className="summary">
						<h2>nội dung</h2>
						<p>{movieDetail.summery}</p>
					</div>
					<div className="cast">
						<h2>diễn viên</h2>
						<div>
							<Slider {...settings}>
								{movieDetail.actor.map((item, index) => (
									<div className="actor" key={index}>
										<div>
											<div className="pic">
												<img src={getActorPic(index)} alt="" />
											</div>
										</div>
										<div className="name">{item}</div>
									</div>
								))}
							</Slider>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
