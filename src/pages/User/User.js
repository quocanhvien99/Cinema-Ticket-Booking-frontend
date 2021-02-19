import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style.css';

export default function User() {
	const history = useHistory();
	const user = useSelector((state) => state.user);

	if (!user.isLogged) {
		history.push('/login');
		return null;
	}

	const tickets = user.info.tickets;

	const formatDate = (dateString) => {
		let date = new Date(dateString);
		return `${date.getUTCDate()} Tháng ${
			date.getUTCMonth() + 1
		}, ${date.getUTCFullYear()} ${date.getUTCHours()}:00`;
	};

	return (
		<div className="User">
			<NavBar />
			<div className="container wrapper">
				<h2>Lịch sử giao dịch</h2>
				<ul>
					{tickets.map((ticket, index) => (
						<li key={index}>
							<div className="movie-name">{ticket.movieName}</div>
							<div>
								<div>
									<div className="start">{formatDate(ticket.start)}</div>
									<div className="position">
										Phòng chiếu số {ticket.room} | Ghế {ticket.position}
									</div>
								</div>
								<div className="price">50000 ₫</div>
							</div>
						</li>
					))}
				</ul>
			</div>
			<Footer />
		</div>
	);
}
