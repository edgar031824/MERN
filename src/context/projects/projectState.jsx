import projectReducer from './projectReducer';
import projectContext from './projectContext';
import React, { useReducer } from 'react';
import { SHOW_FORM, GET_PROJECT, ADD_PROJECT, CURRENT_PROJECT, DELETE_PROJECT, ERROR_REQUEST } from '../../types';
import baseRequest from '../../config/request';


function ProjectState({ children }) {
	const initialState = {
		projects: [],
		form: false,
		currentProject: null,
		message: null
	};
	const [state, dispatch] = useReducer(projectReducer, initialState);
	const showForm = () => {
		dispatch({
			type: SHOW_FORM
		});
	};

	const getProject = async () => {

		try {
			const projects = await baseRequest.get('/api/project');
			dispatch({
				type: GET_PROJECT,
				payload: projects.data.projects
			})
		} catch (error) {
			const alert = {
				msg: error.response.data.msg || 'Error',
				category: 'alert-error'
			}
			dispatch({
				type: ERROR_REQUEST,
				payload: alert
			});
		}
	};

	const addProject = async projectData => {

		try {
			const project = await baseRequest.post('/api/project', projectData);
			dispatch({
				type: ADD_PROJECT,
				payload: project.data.project
			})
		} catch (error) {
			const alert = {
				msg: error.response.data.msg || 'Error',
				category: 'alert-error'
			}
			dispatch({
				type: ERROR_REQUEST,
				payload: alert
			});
		}
	};

	const currentProjectFn = projectId => {
		dispatch({
			type: CURRENT_PROJECT,
			payload: projectId
		})
	};

	const deleteProject = async projectid => {

		try {
			await baseRequest.delete(`/api/project/${projectid}`);
			dispatch({
				type: DELETE_PROJECT,
				payload: projectid
			});
		} catch (error) {
			const alert = {
				msg: error.response.data.msg || 'Error',
				category: 'alert-error'
			}
			dispatch({
				type: ERROR_REQUEST,
				payload: alert
			});
		}
	};

	return (
		<projectContext.Provider
			value={{
				form: state.form,
				showForm: showForm,
				projects: state.projects,
				getProject,
				addProject,
				currentProject: state.currentProject,
				currentProjectFn,
				deleteProject,
				message: state.message
			}}
		>
			{children}
		</projectContext.Provider>
	);
}

export default ProjectState;