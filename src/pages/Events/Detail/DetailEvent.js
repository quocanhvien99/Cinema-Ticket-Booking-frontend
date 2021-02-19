import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toggleSpinner } from '../../../slices/spinnerSlice';
import { getEventDetail } from '../../../api/event.api';
import './style.css';

export default function DetailEvent() {
	const { id } = useParams();
	const [eventDetail, setEventDetail] = useState({});

	const dispatch = useDispatch();
	useEffect(() => {
		const fetchData = async () => {
			dispatch(toggleSpinner());
			const detail = await getEventDetail(id);
			setEventDetail(detail);
			dispatch(toggleSpinner());
		};
		fetchData();
	}, [dispatch, id]);

	return (
		<div className="event-detail">
			<div className="container">
				<h2>{eventDetail.title}</h2>
				<div>
					<div className="poster">
						<img src={eventDetail.poster} alt="" />
					</div>
					<div
						className="content"
						dangerouslySetInnerHTML={{ __html: eventDetail.content }}></div>
				</div>
			</div>
		</div>
	);
}
