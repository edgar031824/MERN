import React from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import {
	REGISTER_SUCESSFUL,
	REGISTER_FAILED,
	GET_USER,
	LOGIN_SUCESSFUL,
	LOGIN_FAILED,
	CLOSE_SESSION
} from '../../types/index';
import baseRequest from '../../config/request';
import tokenAuth from '../../config/tokenAuth';
import { useReducer } from 'react';

const AuthState = ({ children }) => {
	const initialState = {
		token: localStorage.getItem('token'),
		authenticated: false,
		user: null,
		message: null,
		loading: true
	}

	const [state, dispatch] = useReducer(authReducer, initialState);

	const logIn = async data => {
		try {
			const response = await await baseRequest.post('/api/auth', data);
			dispatch({
				type: LOGIN_SUCESSFUL,
				payload: response.data
			});

			authenticatedUser();
		} catch (error) {
			console.log(error.response.data.msg,);
			const alert = {
				msg: error.response.data.msg,
				category: 'alert-error'
			}
			dispatch({
				type: LOGIN_FAILED,
				payload: alert
			});
		}
	}

	const logOut = () => {
		dispatch({
			type: CLOSE_SESSION,
			payload: null
		});
	}

	const registerUser = async data => {
		try {
			const response = await baseRequest.post('/api/user/createUser', data);
			dispatch({
				type: REGISTER_SUCESSFUL,
				payload: response.data
			});

			authenticatedUser();

		} catch (error) {
			const alert = {
				msg: error.response.data.msg,
				category: 'alert-error'
			}
			dispatch({
				type: REGISTER_FAILED,
				payload: alert
			});
		}
	}

	const authenticatedUser = async () => {
		const token = localStorage.getItem('token');

		if (token) {
			tokenAuth(token);
		}
		try {
			const authenticatedUser = await baseRequest.get('/api/auth');
			dispatch({
				type: GET_USER,
				payload: authenticatedUser.data.user
			});

		} catch (error) {
			dispatch({
				type: LOGIN_FAILED,
				payload: null
			});
		}
	}
	return (
		<authContext.Provider
			value={{
				token: state.token,
				authenticated: state.authenticated,
				user: state.user,
				message: state.message,
				registerUser,
				logIn,
				authenticatedUser,
				logOut,
				loading: state.loading
			}}
		>
			{children}
		</authContext.Provider>
	);
};



export default AuthState;