import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleSpinner } from '../../../slices/spinnerSlice';
import { getEventList } from '../../../api/event.api';
import ReactPaginate from 'react-paginate';
import Grid from '../../../components/Grid/Grid';

export default function List() {
	const limit = 6;

	const [eventList, setEventList] = useState({ events: [], pages: 0 });
	const [currPage, setCurrPage] = useState(1);

	const dispatch = useDispatch();
	useEffect(() => {
		const fetchData = async () => {
			dispatch(toggleSpinner());
			const list = await getEventList(currPage, limit);
			setEventList(list);
			dispatch(toggleSpinner());
		};
		fetchData();
	}, [dispatch, limit, currPage]);

	return (
		<div className="movie-list">
			<div className="container">
				<Grid items={eventList.events} type="event" />
				<ReactPaginate
					pageCount={eventList.pages}
					pageRangeDisplayed={2}
					marginPagesDisplayed={3}
					onPageChange={(curr) => setCurrPage(curr.selected + 1)}
					containerClassName="paginate"
					previousLabel={<i className="fas fa-angle-double-left"></i>}
					nextLabel={<i className="fas fa-angle-double-right"></i>}
				/>
			</div>
		</div>
	);
}
