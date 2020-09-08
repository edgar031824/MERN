import React, { useContext } from 'react';
import taskContext from '../../context/tasks/taskContext';

function Task({ task, currentProject }) {
	const taskContextRef = useContext(taskContext);
	const { deleteTask, getTasks, editTask, currentTaskfn } = taskContextRef;
	const onDelete = (id) => {
		deleteTask(id, currentProject._id);
		getTasks(currentProject._id);
	}
	const onSetState = task => {
		const modifiedTask = { ...task, state: !task.state }
		editTask(modifiedTask);
		getTasks(currentProject._id);
	};
	const onSetCurrent = task => {
		currentTaskfn(task);
	}

	return (
		<li className="tarea sombra">
			<p>{task.name}</p>
			<div className="estado">
				{task.state ?
					(
						<button
							type="button"
							onClick={(e) => onSetState(task)}
							className="completo"
						>
							Completed
						</button>
					)
					:
					(
						<button
							type="button"
							onClick={(e) => onSetState(task)}
							className="incompleto"
						>
							Incompleted
						</button>
					)
				}
			</div>
			<div className="acciones">
				<button className="btn btn-primario"
					onClick={() => onSetCurrent(task)}
				>Edit
				</button>
				<button
					className="btn btn-secundario"
					onClick={() => onDelete(task._id)}
				>
					Delete
				</button>
			</div>
		</li >
	);
}

export default Task;