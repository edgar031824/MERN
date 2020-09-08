import React from 'react';
import Task from './task';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import { useContext } from 'react';

function List(props) {
	const projectContextRef = useContext(projectContext);
	const taskContextRef = useContext(taskContext);
	const { currentProject, deleteProject } = projectContextRef;
	const { tasksByProject } = taskContextRef;
	const onDelete = (currentProject) => {
		if (currentProject) {
			deleteProject(currentProject._id);
		}
	}
	return (
		<>
			{currentProject ?
				<>
					<h2>{`Current project: ${currentProject.name}`}</h2>
					<ul className="listado-tareas">
						{tasksByProject.length ?
							tasksByProject.map((item, idx) => (
								<Task task={item} key={idx} currentProject={currentProject} />
							))
							: <li className="tarea sombra"><p>there is no tasks</p></li>
						}
					</ul>
					<button
						className="btn btn-eliminar"
						type="button"
						onClick={(e) => onDelete(currentProject)}
					>
						Eliminar&times;
			</button>
				</>
				: <h2>Select a project</h2>}
		</>
	);
}

export default List;