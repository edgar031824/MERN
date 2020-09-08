import alertContext from '../alerts/alertContext';
import alertReducer from '../alerts/alertReducer';
import React, { useReducer } from 'react';
import { SHOW_ALERT, HIDE_ALERT } from '../../types';

const AlertState = ({ children }) => {
	const initialState = {
		alert: null
	};
	const [state, dispatch] = useReducer(alertReducer, initialState);
	const showAlert = ({ msg, category }) => {
		dispatch({
			type: SHOW_ALERT,
			payload: {
				msg,
				category
			}
		});
		setTimeout(() => {
			dispatch({
				type: HIDE_ALERT
			});
		}, 5000);
	};
	return (
		<alertContext.Provider
			value={{
				alert: state.alert,
				showAlert
			}}
		>
			{children}
		</alertContext.Provider >
	)
}

export default AlertState;