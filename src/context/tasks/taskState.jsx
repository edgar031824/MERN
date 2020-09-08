import React, { useReducer } from 'react';
import taskContext from './taskContext';
import taskReducer from './taskReducer';
import { GET_TASKS, ADD_TASK, DELETE_TASK, CURRENT_TASK, EDIT_TASK } from '../../types';
import baseRequest from '../../config/request';


function TaskState({ children }) {
	const initialState = {
		tasksByProject: [],
		currentTask: null
	}
	const [state, dispatch] = useReducer(taskReducer, initialState);
	const getTasks = async project => {
		try {
			const tasks = await baseRequest.get('/api/task', { params: { project } });
			dispatch({
				type: GET_TASKS,
				payload: tasks.data.tasks
			});
		} catch (error) {
			console.log(error)
		}
	};
	const addTasks = async task => {
		try {
			const result = await baseRequest.post('/api/task', task);
			dispatch({
				type: ADD_TASK,
				payload: result.data.task
			});
		} catch (error) {
			console.log(error);
		}
	};
	const deleteTask = async (taskId, project) => {
		try {
			await baseRequest.delete(`/api/task/${taskId}`, { params: { project } });
			dispatch({
				type: DELETE_TASK,
				payload: taskId
			})
		} catch (error) {
			console.log(error);
		}
		;
	};
	const currentTaskfn = task => {
		dispatch({
			type: CURRENT_TASK,
			payload: task
		});
	};
	const editTask = async task => {

		try {
			const updatedTask = await baseRequest.put('/api/task', task);

			dispatch({
				type: EDIT_TASK,
				payload: updatedTask.data.task
			});

		} catch (error) {
			console.log(error);
		}
	}

	return (
		<taskContext.Provider
			value={{
				tasksByProject: state.tasksByProject,
				currentTask: state.currentTask,
				getTasks,
				addTasks,
				deleteTask,
				currentTaskfn,
				editTask
			}}
		>
			{children}
		</taskContext.Provider>
	);
}


export default TaskState;