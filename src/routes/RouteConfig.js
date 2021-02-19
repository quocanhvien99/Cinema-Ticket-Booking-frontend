import Home from '../pages/Home/Home';
import Movies from '../pages/Movies/Movies';
import Events from '../pages/Events/Events';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import Ticket from '../pages/Ticket/Ticket';
import User from '../pages/User/User';
import Contact from '../pages/Contact/Contact';

const config = [
	{ path: '/', exact: true, component: Home },
	{ path: '/movies', component: Movies },
	{ path: '/events', component: Events },
	{ path: '/register', exact: true, component: Register },
	{ path: '/login', exact: false, component: Login },
	{ path: '/ticket/:movieId', exact: false, component: Ticket },
	{ path: '/user/history', component: User },
	{ path: '/contact', component: Contact },
];

export default config;
