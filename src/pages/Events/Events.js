import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import ListEvent from './List/ListEvent';
import DetailEvent from './Detail/DetailEvent';
import './style.css';

export default function Events() {
	const { path } = useRouteMatch();

	return (
		<div className="Events">
			<NavBar />
			<Switch>
				<Route path={`${path}/list`}>
					<ListEvent />
				</Route>
				<Route path={`${path}/detail/:id`}>
					<DetailEvent />
				</Route>
			</Switch>
			<Footer />
		</div>
	);
}
