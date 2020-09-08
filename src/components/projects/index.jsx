
import React, { useContext, useEffect } from 'react';
import SideBar from '../layout/sideBar';
import Header from '../layout/header';
import Form from '../tasks/form';
import List from '../tasks/list';
import authContext from '../../context/auth/authContext';

const Project = () => {
	const { authenticatedUser } = useContext(authContext);

	useEffect(() => {
		authenticatedUser();
	}, []);

	return (
		<div className="contenedor-app">
			<SideBar />
			<div className="seccion-principal">
				<Header />
				<main>
					<Form />
					<div className="contenedor-tareas">
						<List />
					</div>
				</main>
			</div>
		</div>
	);
};

export default Project;