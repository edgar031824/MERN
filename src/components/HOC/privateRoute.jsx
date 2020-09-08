import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import { useContext, useEffect } from 'react';

const PrivateRoute = ({ component: Component, ...props }) => {
	const { authenticated, authenticatedUser, loading } = useContext(authContext);

	useEffect(() => {
		authenticatedUser();
	}, []);

	return (
		<Route {...props} render={props => !authenticated && !loading ?
			(
				<Redirect to="/" />
			)
			: (<Component {...props} />)}></Route>
	);
};

export default PrivateRoute;