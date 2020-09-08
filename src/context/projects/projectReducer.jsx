import { SHOW_FORM, GET_PROJECT, ADD_PROJECT, CURRENT_PROJECT, DELETE_PROJECT, ERROR_REQUEST } from '../../types';

const projectReducer = (state, action) => {
	switch (action.type) {
		case SHOW_FORM:
			return {
				...state,
				form: true
			}
		case GET_PROJECT:
			return {
				...state,
				projects: action.payload
			}
		case ADD_PROJECT:
			return {
				...state,
				projects: [...state.projects, action.payload],
				form: false
			}
		case CURRENT_PROJECT:
			return {
				...state,
				currentProject: state.projects.filter(item => item._id === action.payload)[0]
			}
		case DELETE_PROJECT:
			return {
				...state,
				projects: [...state.projects.filter(item => item._id !== action.payload)],
				currentProject: null
			}
		case ERROR_REQUEST:
			return {
				...state,
				message: action.payload
			}

		default:
			break;
	}
}

export default projectReducer;