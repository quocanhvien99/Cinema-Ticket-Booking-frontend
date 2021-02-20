import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes/RouteConfig';
import './App.css';
import './assets/bootstrap.min.css';
import Spinner from './components/Spinner/Spinner';
import ScrollToTop from './components/ScrollTotop/ScrollToTop';
import { useDispatch } from 'react-redux';
import { fetchUserInfo } from './api/user.api';
import { login } from './slices/userSlice';

function App() {
	const dispatch = useDispatch();

	//Kiểm tra xem đã đăng nhập chưa
	useEffect(() => {
		const fetchData = async () => {
			if (localStorage.getItem('authToken')) {
				let res = await fetchUserInfo();
				if (res.status === 200) dispatch(login(await res.json()));
				else {
					localStorage.removeItem('authToken');
				}
			}
		};
		fetchData();
	}, [dispatch]);

	return (
		<div className="App">
			<Spinner />
			<Router>
				<ScrollToTop />
				<Switch>
					{routes.map((route) => (
						<Route exact={route.exact} path={route.path} key={route.path}>
							<route.component />
						</Route>
					))}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
