import React, { useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import { useContext } from 'react';

function Form(props) {
	const projectContextRef = useContext(projectContext);
	const taskContextRef = useContext(taskContext);
	const { currentProject } = projectContextRef;
	const { addTasks, getTasks, currentTask, editTask } = taskContextRef;
	const [newtask, setNewtask] = useState({
		name: ''
	});
	const [error, setError] = useState(false);
	const onChangeInput = (e) => {
		setNewtask({
			...newtask,
			[e.target.name]: e.target.value
		});
	}
	const onSubmit = (e) => {
		e.preventDefault();
		const finalTask = { ...newtask, project: currentProject._id }

		if (!finalTask.name) {
			setError(true);
			return;
		}

		if (!currentTask) {
			addTasks(finalTask);
		} else {
			editTask(finalTask);
		}

		getTasks(currentProject._id);
		setError(false);
		setNewtask({
			name: ''
		});
	};

	useEffect(() => {
		const saveTask = () => {
			if (currentTask) {
				setNewtask(currentTask);
			} else {
				setNewtask({
					name: ''
				});
			}
		};
		saveTask();
	}, [currentTask]);

	return (
		<>
			{currentProject ? (<div className="formulario">
				<form onSubmit={(e) => onSubmit(e)}>
					<div className="contenedor-input">
						<input type="text"
							name="name"
							id="name"
							placeholder="task name"
							className="input-text"
							value={newtask.name}
							onChange={e => onChangeInput(e)}
						/>

					</div>
					<div className="contenedor-input">
						<input
							type="submit"
							value={!currentTask ? "Add task" : "Edit task"}
							className="btn btn-primario btn-submit btn-block"
						/>
					</div>
				</form>
			</div>) : null}
			{error && <p className="mesaje error">The name is mandatory</p>}
		</>
	);
}

export default Form;