import React, { useEffect, useContext } from 'react';
import authContext from '../../context/auth/authContext';

function Header(props) {
	const { authenticatedUser, user, logOut } = useContext(authContext);

	useEffect(() => {
		authenticatedUser();
	}, []);
	return (
		<header className="app-header">
			{user && (
				<p className="nombre-usuario">Hi <span>{user.name}</span></p>
			)}
			<nav className="nav-principal">
				<button
					className="btn btn-blank cerrar-sesion"
					onClick={() => logOut()}
				>Cerrar sesion</button>
			</nav>
		</header>
	);
}

export default Header;