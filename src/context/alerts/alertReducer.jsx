import { SHOW_ALERT, HIDE_ALERT } from '../../types';

const alertReducer = (state, action) => {
	switch (action.type) {
		case SHOW_ALERT:
			return {
				...state,
				alert: action.payload
			}

		case HIDE_ALERT:
			return {
				...state,
				alert: null
			}
		default:
			break;
	}
}

export default alertReducer;