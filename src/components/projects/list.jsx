/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import Project from './project';
import projectContext from '../../context/projects/projectContext';
import alertContext from '../../context/alerts/alertContext';
import { useEffect } from 'react';

function List() {
	const projectContextRef = useContext(projectContext);
	const { alert, showAlert } = useContext(alertContext);
	const { projects, getProject, message } = projectContextRef;

	useEffect(() => {
		const fetchProjects = async () => {
			await getProject();
		}
		fetchProjects();
	}, []);

	useEffect(() => {
		if (message) {
			showAlert({
				msg: message.msg,
				category: 'alert-error'
			});
		}
	}, [message]);


	return (
		<ul className="listado-proyectos">
			{alert && (<div className={`${alert.category}`} > {alert.msg} </div>)}
			{!!projects.length &&
				(projects.map((item) => (
					<Project key={item._id} project={item} />
				)))}
		</ul>
	);
}

export default List;