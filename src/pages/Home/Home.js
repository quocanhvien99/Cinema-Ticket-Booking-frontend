import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import './style.css';
import Carousel from '../../components/Carousel/Carousel';
import { getMovieList } from '../../api/movie.api';
import { getEventList } from '../../api/event.api';
import { toggleSpinner } from '../../slices/spinnerSlice';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default function Home() {
	const [movieList, setMovieList] = useState([]);
	const [eventList, setEventList] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchData = async () => {
			dispatch(toggleSpinner());
			const data = await Promise.all([
				getMovieList(1, 5, 'now'),
				getEventList(1, 5),
			]);
			//const list = await getMovieList(1, 5, 'now');
			setMovieList(data[0].movies);
			setEventList(data[1].events);
			dispatch(toggleSpinner());
		};
		fetchData();
	}, [dispatch]);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
	};

	return (
		<div className="Home">
			<NavBar />
			<div className="slide-top">
				<div className="slide">
					<Slider {...settings}>
						<Link to="#">
							<img
								src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980_x_449_1.png"
								alt="banner"
							/>
						</Link>
						<Link to="#">
							<img
								src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-digital-team-phim-hay-ngay-tet-980x448-2021_2.jpg"
								alt="banner"
							/>
						</Link>
						<Link to="#">
							<img
								src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/h/a/happy-new-year-980x448_1.png"
								alt="banner"
							/>
						</Link>
						<Link to="#">
							<img
								src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/g/r/grabtetdaydu_980x448.jpg"
								alt="banner"
							/>
						</Link>
						<Link to="#">
							<img
								src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-production-team-tarot-team-kv-980x448.jpg"
								alt="banner"
							/>
						</Link>
						<Link to="#">
							<img
								src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/k/v/kv_980x448.jpg"
								alt="banner"
							/>
						</Link>
						<Link to="#">
							<img
								src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/t/_/t_j_sneakshow_resize_980x448px.jpg"
								alt="banner"
							/>
						</Link>
					</Slider>
				</div>
			</div>
			<div className="movies">
				<div className="container">
					<h2 className="title">phim</h2>
					<span>Những bộ phim nổi bật đang chiếu trong ngày.</span>
				</div>
				<Carousel items={movieList} type="movie" />
			</div>
			<div className="events">
				<div className="container">
					<h2 className="title">sự kiện</h2>
					<span>Các sự kiện đang diễn ra.</span>
				</div>
				<Carousel items={eventList} type="event" />
			</div>

			<Footer />
		</div>
	);
}
