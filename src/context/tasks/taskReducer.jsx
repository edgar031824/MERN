import { GET_TASKS, ADD_TASK, DELETE_TASK, CURRENT_TASK, EDIT_TASK } from '../../types';

const taskReducer = (state, action) => {
	switch (action.type) {
		case GET_TASKS:
			return {
				...state,
				tasksByProject: action.payload
			};
		case ADD_TASK:
			return {
				...state,
				tasksByProject: [...state.tasksByProject, action.payload]
			};
		case DELETE_TASK:
			return {
				...state,
				tasksByProject: state.tasksByProject.filter(item => item._id !== action.payload)
			};
		case EDIT_TASK:
			return {
				...state,
				tasksByProject: state.tasksByProject.map(item => item.id === action.payload.id ? action.payload : item),
				currentTask: null
			};
		case CURRENT_TASK:
			return {
				...state,
				currentTask: action.payload
			};
		default:
			break;
	}
}

export default taskReducer;