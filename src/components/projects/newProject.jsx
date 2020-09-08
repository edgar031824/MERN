import React, { useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext'

function NewProject(props) {
	const projectContextRef = useContext(projectContext);
	const { form, showForm, addProject } = projectContextRef;
	const [project, setProject] = useState({
		name: ''
	});
	const [error, setError] = useState(false);
	const onchange = (e) => {
		setProject({
			...project,
			[e.target.name]: e.target.value
		});
	};
	const onClickForm = (e) => {
		showForm();
	}
	const onSubmit = (e) => {
		e.preventDefault();
		if (!project.name) {
			setError(true);
			return;
		}
		addProject(project);
		setProject({ name: '' });
		setError(false);
	};


	return (
		<>
			<button
				type='button'
				className='btn btn-block btn-primario'
				onClick={(e) => onClickForm(e)}
			>New project</button>
			{form && (
				<form className="formulario-nuevo-proyecto" onSubmit={(e) => onSubmit(e)}>
					<input type="text"
						className='input-text'
						name='name'
						placeholder='Project name'
						value={project.name}
						onChange={(e) => onchange(e)}
					/>
					<input type="submit" className='btn btn-block btn-primario' value='Add project' />
				</form>
			)}
			{error && <p className="mensaje error">The project name is mandatory</p>}
		</>
	);
};

export default NewProject;