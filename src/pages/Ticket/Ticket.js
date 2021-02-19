import React, { useCallback, useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSpinner } from '../../slices/spinnerSlice';
import { getSchedule } from '../../api/schedule.api';
import { fetchUserInfo } from '../../api/user.api';
import { fetchBook } from '../../api/book.api';
import { login } from '../../slices/userSlice';
import './style.css';

export default function Ticket() {
	const { movieId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.user);

	if (!user.isLogged) history.push('/login');

	const [schedule, setSchedule] = useState([]);
	const [listDate, setListDate] = useState([]);
	const [listTime, setListTime] = useState([]);
	const [listRoom, setListRoom] = useState([]);
	const [seats, setSeats] = useState([]);
	const [curDate, setCurDate] = useState(null);
	const [curTime, setCurTime] = useState(null);
	const [curRoom, setCurRoom] = useState(null);
	const [total, setTotal] = useState(0);
	const [count, setCount] = useState(0);

	const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

	const getDate = (datestring) => {
		let date = new Date(datestring);
		date = `${date.getUTCDate()}-${
			date.getUTCMonth() + 1
		}-${date.getUTCFullYear()}`;
		return date;
	};

	const getTime = (datestring) => {
		let date = new Date(datestring);
		return `${date.getUTCHours()}:00`;
	};

	const filter = useCallback(() => {
		let scheduleFilter = schedule.filter((x) => {
			if (getDate(x.start) === curDate) return true;
			return false;
		});
		if (curTime) {
			scheduleFilter = scheduleFilter.filter((x) => {
				if (getTime(x.start) === curTime) return true;
				return false;
			});
		}
		if (curRoom) {
			scheduleFilter = scheduleFilter.filter((x) => {
				if (x.room === curRoom) return true;
				return false;
			});
		}
		return scheduleFilter;
	}, [curDate, curTime, curRoom, schedule]);

	useEffect(() => {
		const fetchData = async () => {
			dispatch(toggleSpinner());
			const schedule = await getSchedule(movieId);
			setSchedule(schedule);
			dispatch(toggleSpinner());
		};
		fetchData();
	}, [dispatch, movieId]);

	const handleDatePick = (date) => {
		setSeats([]);
		setListRoom([]);
		setCurDate(date);
		setCurTime(null);
		setCurRoom(null);
		setTotal(0);
		setCount(0);
	};
	const handleTimePick = (time) => {
		setSeats([]);
		setCurTime(time);
		setCurRoom(null);
		setTotal(0);
		setCount(0);
	};
	const handleRoomPick = (room) => {
		setCurRoom(room);
		setTotal(0);
		setCount(0);
	};
	useEffect(() => {
		const scheduleFilter = filter();
		let list = [];
		if (curRoom) {
			setSeats(scheduleFilter[0].seats);
			return;
		}
		if (curTime) {
			list = [];
			for (const x of scheduleFilter) {
				list.push(x.room);
			}
			setListRoom(list);
			return;
		}
		if (curDate) {
			for (const x of scheduleFilter) {
				const time = getTime(x.start);
				if (list.find((x) => x === time) === undefined) list.push(time);
			}
			setListTime(list);
			return;
		}
		list = [];
		for (const x of schedule) {
			const date = getDate(x.start);
			if (list.find((x) => x === date) === undefined) list.push(date);
		}
		setListDate(list);
	}, [curDate, curTime, curRoom, schedule, filter]);

	const handleSeatPick = (y, x) => {
		let newSeats = [...seats];

		if (count === 10 && newSeats[y][x] === 0) {
			window.alert(
				'Bạn đã chọn vượt quá số ghế quy định trong 1 lần chọn | max = 10'
			);
			return;
		}

		if (newSeats[y][x] === 0) {
			newSeats[y][x] = 2;
			setTotal(total + 50000);
			setCount(count + 1);
		} else {
			newSeats[y][x] = 0;
			setTotal(total - 50000);
			setCount(count - 1);
		}
		setSeats(newSeats);
	};

	const bookticket = async () => {
		const scheduleFilter = filter();
		let res = await fetchBook(scheduleFilter[0]._id, seats);
		if (res.status === 200) {
			window.alert(await res.json());

			res = await fetchUserInfo();
			dispatch(login(await res.json()));

			return history.push('/');
		}

		window.alert(await res.json());
	};

	return (
		<div className="Ticket">
			<NavBar />
			<div className="container book-section">
				<div className="picker date">
					<span>Ngày:</span>
					{listDate.map((date) => {
						const datesplit = date.split('-');
						return (
							<div
								className={`${curDate === date && 'active'}`}
								onClick={() => handleDatePick(date)}>
								<div>
									<div className="month">{datesplit[1]}</div>
									<div className="year">{datesplit[2]}</div>
								</div>
								<div className="day">{datesplit[0]}</div>
							</div>
						);
					})}
				</div>
				<div className="picker time">
					<span>Thời gian:</span>
					{listTime.map((time) => (
						<div
							className={`${curTime === time && 'active'}`}
							onClick={() => handleTimePick(time)}>
							{time}
						</div>
					))}
				</div>
				<div className="picker room">
					<span>Phòng:</span>
					{listRoom.map((room) => (
						<div
							className={`${curRoom === room && 'active'}`}
							onClick={() => handleRoomPick(room)}>
							{room}
						</div>
					))}
				</div>
				{seats.length !== 0 ? (
					<div>
						<div className="choose-seat">
							<div className="screen"></div>
							{seats.map((row, y) => {
								let rowSeat = row.map((seat, x) => (
									<div
										className={`seat ${seat === 1 && 'lock'} ${
											seat === 2 && 'active'
										}`}
										onClick={() => {
											if (seats[y][x] !== 1) return handleSeatPick(y, x);
										}}></div>
								));
								return (
									<div className="row">
										<span>{alphabet[y]}</span>
										{rowSeat}
									</div>
								);
							})}
							<div className="description">
								<div>
									<div className="seat"></div>
									<span> Còn trống</span>
								</div>
								<div>
									<div className="seat lock"></div>
									<span> Đã chọn</span>
								</div>
								<div>
									<div className="seat active"></div>
									<span> Đang chọn</span>
								</div>
							</div>
						</div>
						<div className="total">Tổng số tiền: {total} ₫</div>
						<div className="buy" onClick={bookticket}>
							<div>đặt vé</div>
						</div>
					</div>
				) : (
					''
				)}
			</div>
			<Footer />
		</div>
	);
}
