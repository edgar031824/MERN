import {
	REGISTER_SUCESSFUL,
	REGISTER_FAILED,
	GET_USER,
	LOGIN_SUCESSFUL,
	LOGIN_FAILED,
	CLOSE_SESSION
} from '../../types/index';

const authReducer = (state, action) => {
	switch (action.type) {
		case LOGIN_SUCESSFUL:
		case REGISTER_SUCESSFUL:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				authenticated: true,
				token: action.payload.token || null,
				message: null,
				loading: false
			}

		case CLOSE_SESSION:
		case LOGIN_FAILED:
		case REGISTER_FAILED: {
			localStorage.removeItem('token');
			return {
				...state,
				message: action.payload,
				token: null,
				user: null,
				authenticated: false,
				loading: false
			}
		}
		case GET_USER: {
			return {
				...state,
				user: action.payload,
				authenticated: true,
				loading: false
			}
		}
		default:
			break;
	}
}

export default authReducer;