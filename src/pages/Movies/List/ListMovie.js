import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DropDown from '../../../components/DropDown/DropDown';
import Grid from '../../../components/Grid/Grid';
import { toggleSpinner } from '../../../slices/spinnerSlice';
import { getMovieList } from '../../../api/movie.api';
import './style.css';
import ReactPaginate from 'react-paginate';
import List from '../../../components/List/List';

export default function ListMovie() {
	const { type } = useParams();
	const [limit, setLimit] = useState(6); //6 12 18 24
	const [sort, setSort] = useState(
		type === 'nowshowing' ? 'Đang chiếu' : 'Sắp chiếu'
	);
	const [display, setDisplay] = useState('grid'); // grid or list
	const [movieList, setMovieList] = useState({ movies: [], pages: 0 });
	const [currPage, setCurrPage] = useState(1);

	const limitList = [6, 12, 18, 24];
	const sortList = ['Đang chiếu', 'Sắp chiếu'];

	const dispatch = useDispatch();
	useEffect(() => {
		const fetchData = async () => {
			dispatch(toggleSpinner());
			const list = await getMovieList(
				currPage,
				limit,
				sort === 'Đang chiếu' ? 'now' : 'soon'
			);
			setMovieList(list);
			dispatch(toggleSpinner());
		};
		fetchData();
	}, [dispatch, limit, sort, currPage]);

	return (
		<div className="movie-list">
			<div className="container">
				<div className="filter-bar">
					<div>
						<div>Hiển Thị:</div>
						<DropDown
							values={limitList}
							activeValue={limit}
							onClickItem={(value) => setLimit(value)}
						/>
					</div>
					<div>
						<div>Theo:</div>
						<DropDown
							values={sortList}
							activeValue={sort}
							onClickItem={(value) => setSort(value)}
						/>
					</div>
					<div>
						<div
							className={`button ${display === 'grid' && 'active'}`}
							onClick={() => setDisplay('grid')}>
							<i className="fas fa-th"></i>
						</div>
						<div
							className={`button ${display !== 'grid' && 'active'}`}
							onClick={() => setDisplay('list')}>
							<i className="fas fa-bars"></i>
						</div>
					</div>
				</div>
				{display === 'grid' ? (
					<Grid items={movieList.movies} type="movie" />
				) : (
					<List items={movieList.movies} />
				)}
				<ReactPaginate
					pageCount={movieList.pages}
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
