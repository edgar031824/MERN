import React from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import { useContext } from 'react';

function Project({ project }) {
	const { name, _id } = project;
	const projectContextRef = useContext(projectContext);
	const { currentProjectFn } = projectContextRef;
	const taskContextRef = useContext(taskContext);
	const { getTasks } = taskContextRef;
	const onClick = (id) => {
		currentProjectFn(id);
		getTasks(id);
	}

	return (
		<li>
			<button type='button'
				className="btn btn-blank"
				onClick={(e) => onClick(_id)}
			>
				{name}
			</button>
		</li>
	);
}

export default Project;