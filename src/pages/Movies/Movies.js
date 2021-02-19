import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import ListMovie from './List/ListMovie';
import DetailMovie from './Detail/DetailMovie';
import './style.css';

export default function Movies() {
	const { path } = useRouteMatch();

	return (
		<div className="Movies">
			<NavBar />
			<Switch>
				<Route path={`${path}/list/:type`}>
					<ListMovie />
				</Route>
				<Route path={`${path}/detail/:id`}>
					<DetailMovie />
				</Route>
			</Switch>
			<Footer />
		</div>
	);
}
